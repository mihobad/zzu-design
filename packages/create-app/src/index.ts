import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import spawn from 'cross-spawn';
import mri from 'mri';
import * as prompts from '@clack/prompts';
import colors from 'picocolors';
import ora from 'ora';
import pkgJson from '../package.json';

const { blue, green, yellow } = colors;

const argv = mri<{
    template?: string;
    help?: boolean;
    overwrite?: boolean;
}>(process.argv.slice(2), {
    alias: { h: 'help', t: 'template' },
    boolean: ['help', 'overwrite'],
    string: ['template'],
});

const cwd = process.cwd();

// biome-ignore format: this is message
const helpMessage = `\
Usage: capp [OPTION]... [DIRECTORY]

Create a new ZUU H5 project in JavaScript or TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template

Available templates:
${green('vue-ts         vue')}`;

type ColorFunc = (str: string | number) => string;
type Framework = {
    name: string;
    display: string;
    color: ColorFunc;
    variants: FrameworkVariant[];
};
type FrameworkVariant = {
    name: string;
    display: string;
    color: ColorFunc;
    customCommand?: string;
};

const FRAMEWORKS: Framework[] = [
    {
        name: 'vue',
        display: 'Vue',
        color: green,
        variants: [
            {
                name: 'vue-ts',
                display: 'TypeScript',
                color: blue,
            },
            {
                name: 'vue',
                display: 'JavaScript',
                color: yellow,
            },
        ],
    },
];

const TEMPLATES = FRAMEWORKS.map((f) => f.variants.map((v) => v.name)).reduce((a, b) => a.concat(b), []);

const renameFiles: Record<string, string | undefined> = {
    _gitignore: '.gitignore',
    _npmrc: '.npmrc',
};

const defaultTargetDir = 'zuu-app';
const registry = 'http://npm-registry.zhihuishu.com:4873/';

const packageManagerShell = {
    pnpm: ['pnpm install', 'pnpm dev'],
    yarn: ['yarn', 'yarn dev'],
    npm: ['npm install', 'npm run dev'],
};

async function init() {
    const argTargetDir = argv._[0] ? formatTargetDir(String(argv._[0])) : undefined;
    const argTemplate = argv.template;
    const argOverwrite = argv.overwrite;

    const help = argv.help;
    if (help) {
        console.log(helpMessage);
        return;
    }

    const cancel = () => prompts.cancel('Operation cancelled');

    // 1. check version
    const spinner = ora('Checking create-app version...').start();

    const latestVersion = await getLatestVersion(pkgJson.name, registry);
    const isLatest = compareVersions(pkgJson.version, latestVersion) === 0;
    if (!isLatest) {
        spinner.fail(`create-app version ${pkgJson.version} is not up to date`);
        prompts.log.step(`Run ${green(`pnpm i ${pkgJson.name}@latest -g`)} to upgrade.`);
        return;
    } else {
        spinner.succeed('create-app version is up to date');
    }

    // 2. Get project name and target dir
    let targetDir = argTargetDir;
    if (!targetDir) {
        const projectName = await prompts.text({
            message: 'Project name:',
            defaultValue: defaultTargetDir,
            placeholder: defaultTargetDir,
            validate: (name) => {
                return name.length === 0 || formatTargetDir(name).length > 0 ? undefined : 'Invalid project name';
            },
        });
        if (prompts.isCancel(projectName)) return cancel();
        targetDir = formatTargetDir(projectName);
    }

    // 3. Handle directory if exist and not empty
    if (fs.existsSync(targetDir) && !isEmpty(targetDir)) {
        const isCurrentDir = targetDir === '.';
        const message = `(${isCurrentDir ? 'Current directory' : `Target directory ${targetDir}`}) is not empty. Please choose how to proceed:`;
        const overwrite = argOverwrite
            ? 'yes'
            : await prompts.select({
                  message,
                  options: [
                      {
                          label: 'Cancel operation',
                          value: 'no',
                      },
                      {
                          label: 'Remove existing files and continue',
                          value: 'yes',
                      },
                      {
                          label: 'Ignore files and continue',
                          value: 'ignore',
                      },
                  ],
              });
        if (prompts.isCancel(overwrite)) return cancel();
        switch (overwrite) {
            case 'yes':
                emptyDir(targetDir);
                break;
            case 'no':
                cancel();
                return;
        }
    }

    // 4. Get package name
    let packageName = path.basename(path.resolve(targetDir));
    if (!isValidPackageName(packageName)) {
        const packageNameResult = await prompts.text({
            message: 'Package name:',
            defaultValue: toValidPackageName(packageName),
            placeholder: toValidPackageName(packageName),
            validate(dir) {
                if (!isValidPackageName(dir)) {
                    return 'Invalid package.json name';
                }
            },
        });

        if (prompts.isCancel(packageNameResult)) return cancel();
        packageName = toValidPackageName(packageNameResult);
    }

    // 5. Choose a framework and variant
    let template = argTemplate;
    let hasInvalidArgTemplate = false;
    if (argTemplate && !TEMPLATES.includes(argTemplate)) {
        template = undefined;
        hasInvalidArgTemplate = true;
    }
    if (!template) {
        const message = hasInvalidArgTemplate ? `"${argTemplate}" isn't a valid template. Please choose from below: ` : 'Select a framework:';
        const framework = await prompts.select({
            message,
            options: FRAMEWORKS.map((framework) => {
                const frameworkColor = framework.color;
                return {
                    label: frameworkColor(framework.display || framework.name),
                    value: framework,
                };
            }),
        });
        if (prompts.isCancel(framework)) return cancel();

        const variant = await prompts.select({
            message: 'Select a variant:',
            options: framework.variants.map((variant) => {
                const variantColor = variant.color;
                const command = variant.customCommand ? variant.customCommand : undefined;

                return {
                    label: variantColor(variant.display || variant.name),
                    value: variant.name,
                    hint: command,
                };
            }),
        });
        if (prompts.isCancel(variant)) return cancel();

        template = variant;
    }

    // 6. Choose a package manager
    const packageManager = await prompts.select({
        message: 'Select a package manager:',
        options: [
            {
                label: 'pnpm',
                value: 'pnpm',
            },
            {
                label: 'yarn',
                value: 'yarn',
            },
            {
                label: 'npm',
                value: 'npm',
            },
        ],
    });
    if (prompts.isCancel(packageManager)) return cancel();

    const root = path.join(cwd, targetDir);
    fs.mkdirSync(root, { recursive: true });

    // 7. custom command
    const { customCommand } = FRAMEWORKS.flatMap((f) => f.variants).find((v) => v.name === template) ?? {};
    if (customCommand) {
        const [command, ...args] = customCommand.split(' ');
        const replacedArgs = args.map((arg) => arg.replace('TARGET_DIR', () => targetDir));
        const { status } = spawn.sync(command, replacedArgs, {
            stdio: 'inherit',
        });
        process.exit(status ?? 0);
    }

    // 8. generate app
    prompts.log.step(`Scaffolding project in ${root}...`);

    const templateDir = path.resolve(fileURLToPath(import.meta.url), '../..', `template-${template}`);

    const write = (file: string, content?: string) => {
        const targetPath = path.join(root, renameFiles[file] ?? file);
        if (content) {
            fs.writeFileSync(targetPath, content);
        } else {
            copy(path.join(templateDir, file), targetPath);
        }
    };

    const files = fs.readdirSync(templateDir);
    for (const file of files.filter((f) => f !== 'package.json')) {
        write(file);
    }

    const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'));
    pkg.name = packageName;
    write('package.json', `${JSON.stringify(pkg, null, 2)}\n`);

    let doneMessage = '';
    const cdProjectName = path.relative(cwd, root);
    doneMessage += `Done. Now run:\n`;
    if (root !== cwd) {
        doneMessage += `\ncd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`;
    }
    const [install, dev] = packageManagerShell[packageManager];
    doneMessage += `\n${install}`;
    doneMessage += `\n${dev}`;
    prompts.outro(doneMessage);
}

async function getLatestVersion(packageName: string, registry = 'https://registry.npmjs.org') {
    const { stdout } = await spawn.sync('npm', ['show', packageName, 'version', '--registry', registry], {
        stdio: 'pipe',
    });
    return stdout.toString().trim();
}

function compareVersions(version1: string, version2: string) {
    const v1 = version1.split('.').map(Number);
    const v2 = version2.split('.').map(Number);
    for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
        const diff = (v1[i] || 0) - (v2[i] || 0);
        if (diff !== 0) {
            return diff > 0 ? 1 : -1;
        }
    }
    return 0;
}

function copyDir(srcDir: string, destDir: string) {
    fs.mkdirSync(destDir, { recursive: true });
    for (const file of fs.readdirSync(srcDir)) {
        const srcFile = path.resolve(srcDir, file);
        const destFile = path.resolve(destDir, file);
        copy(srcFile, destFile);
    }
}

function copy(src: string, dest: string) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        copyDir(src, dest);
    } else {
        fs.copyFileSync(src, dest);
    }
}

function formatTargetDir(targetDir: string) {
    return targetDir.trim().replace(/\/+$/, '');
}

function isEmpty(path: string) {
    const files = fs.readdirSync(path);
    return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

function isValidPackageName(projectName: string) {
    return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

function toValidPackageName(projectName: string) {
    return projectName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/^[._]/, '')
        .replace(/[^a-z\d\-~]+/g, '-');
}

function emptyDir(dir: string) {
    if (!fs.existsSync(dir)) {
        return;
    }
    for (const file of fs.readdirSync(dir)) {
        if (file === '.git') continue;
        fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
    }
}

init().catch((e) => {
    console.error(e);
});
