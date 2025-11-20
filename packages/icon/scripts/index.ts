import path from 'node:path';
import fs from 'fs-extra';
import { globSync } from 'glob';
import { optimize } from 'svgo';
import { JSDOM } from 'jsdom';
import { toPascalCase } from '@zzu/utils';
import { svgoConfig } from './svgo.config';
import { getIconIndex, getIconType, getIconVue, getIcon, getIndex } from './vue-template';

interface IconData {
    name: string;
    componentName: string;
    path: string;
}

const cwd = process.cwd();

function getSVGData(): IconData[] {
    const data: IconData[] = [];

    const files = globSync('source/**/*.svg', {
        cwd: cwd,
        absolute: true,
    });

    for (const filePath of files) {
        const name = `icon-${path.basename(filePath, '.svg')}`;

        data.push({
            name,
            componentName: `${toPascalCase(name)}`,
            path: filePath,
        });
    }

    return data;
}

async function buildIconComponent(data: IconData[]) {
    await fs.emptyDirSync(path.join(cwd, 'src'));

    for (const item of data) {
        const svgFile = fs.readFileSync(item.path, 'utf-8');

        const optimizedSvg = optimize(svgFile, {
            path: item.path,
            ...svgoConfig,
        });

        // Icon
        if ('data' in optimizedSvg) {
            const { data: optimizedSvgData } = optimizedSvg;
            const svgElement = JSDOM.fragment(optimizedSvgData).firstElementChild;

            if (svgElement) {
                fs.outputFile(
                    path.join(cwd, 'src', `${item.name}/${item.name}.vue`),
                    getIconVue({
                        name: item.name,
                        componentName: item.componentName,
                        svgHtml: svgElement.outerHTML,
                    }),
                    (err) => {
                        if (err) {
                            console.log(`Build icon ${item.componentName} failed.`);
                        } else {
                            console.log(`Build icon ${item.componentName} success.`);
                        }
                    },
                );
            }
        }

        // IconIndex
        fs.outputFileSync(path.join(cwd, 'src', `${item.name}/index.ts`), getIconIndex(item));
    }

    // IconType
    fs.outputFileSync(path.join(cwd, 'src', `type.ts`), getIconType());
}

async function buildIndex(data: IconData[]) {
    const imports = [];
    const exports = [];
    const components = [];

    for (const item of data) {
        components.push(item.componentName);
        imports.push(`import ${item.componentName} from './${item.name}';`);
        exports.push(`export { default as ${item.componentName} } from './${item.name}';`);
    }

    const IconContent = getIcon({ imports, components });
    const indexContent = getIndex({ exports });

    fs.outputFileSync(path.join(cwd, 'src', 'icon.ts'), IconContent);
    fs.outputFileSync(path.join(cwd, 'src', 'index.ts'), indexContent);
    fs.outputFileSync(path.join(cwd, 'source', 'icons.json'), JSON.stringify(data, null, 2));
}

// async function buildType(data: IconData[]) {
//     const exports = [];

//     for (const item of data) {
//         exports.push(`${item.componentName}: typeof import('@zzu/icon')['${item.componentName}'];`);
//     }

//     const typeContent = getType({ exports });

//     fs.outputFileSync(path.join(cwd, 'src', 'icon-components.ts'), typeContent);
// }

const generate = async () => {
    const data = getSVGData();
    await buildIconComponent(data);
    await buildIndex(data);
    // await buildType(data);
};

generate();
