import path from 'node:path';
import url from 'node:url';
import { Transform } from 'node:stream';
import { dest, parallel, series, src, watch as gulpWatch } from 'gulp';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import * as dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import postcss from 'postcss';
import cssnano from 'cssnano';
import consola from 'consola';
import chalk from 'chalk';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const distPath = path.resolve(__dirname, 'dist');
const styleDestPath = path.resolve(__dirname, 'dist/style');

function compressWithCssnano() {
    const processor = postcss([cssnano({ preset: ['default', { colormin: false, minifyFontValues: false }] })]);

    return new Transform({
        objectMode: true,
        transform(chunk, _encoding, callback) {
            const file = chunk;
            if (file.isNull()) {
                callback(null, file);
                return;
            }
            if (file.isStream()) {
                callback(new Error('Streaming not supported'));
                return;
            }
            const cssString = file.contents?.toString();
            processor.process(cssString, { from: file.path }).then((result) => {
                const name = path.basename(file.path);
                file.contents = Buffer.from(result.css);
                consola.success(`${chalk.cyan(name)}: ${chalk.yellow(cssString.length / 1000)} KB -> ${chalk.green(result.css.length / 1000)} KB`);
                callback(null, file);
            });
        },
    });
}

function buildThemeChalk() {
    const sass = gulpSass(dartSass);

    return src(path.resolve(__dirname, 'src/**/*.scss'))
        .pipe(sass.sync())
        .pipe(autoprefixer({ cascade: false }))
        .pipe(compressWithCssnano())
        .pipe(
            rename(function (file) {
                if (file.dirname.includes('/style')) {
                    file.dirname = file.dirname.replace('/style', '');
                }
                file.extname = '.css';
            }),
        )
        .pipe(dest(distPath));
}

/**
 * copy source file to theme folder，not include style folder
 * example: dist/divider/style/index.css -> dist/style/divider/index.css
 */
function copyThemeSource() {
    return src([path.resolve(distPath, '**', '*.css'), '!' + path.resolve(distPath, 'style', '**', '*.css')]).pipe(dest(styleDestPath));
}

// merge all dist/xx/style/index.css to dist/style/index.css
function mergeThemeStyle() {
    return src([path.resolve(distPath, 'style/base.css'), path.resolve(distPath, '**', 'index.css')])
        .pipe(concat('index.css'))
        .pipe(dest(styleDestPath));
}

// generate index.js file content pipeline
function setJsContent() {
    return new Transform({
        objectMode: true,
        transform(file, _encoding, callback) {
            const stylePath = file.dirname;
            const distStylePath = path.join(stylePath, 'style');
            const components = stylePath.split(path.sep);
            const componentName = components[components.length - 1]; // 获取组件名

            const jsContent = `import '../../style/base.css';
import '../index.css';`;

            const vinylFile = new file.constructor({
                base: distStylePath,
                path: path.join(distStylePath, 'index.js'),
                contents: Buffer.from(jsContent),
            });

            consola.success(`${chalk.cyan(`Generated ${componentName}/style/index.js`)}`);
            callback(null, vinylFile);
        },
    });
}

// auto import style
function autoImportStyle() {
    return src([path.resolve(distPath, '**', '*.css'), '!' + path.resolve(distPath, 'style', '**', '*.css')])
        .pipe(setJsContent())
        .pipe(dest((file) => file.dirname));
}

export const build = parallel(series(buildThemeChalk, copyThemeSource, mergeThemeStyle, autoImportStyle));

export function watch() {
    build();
    return gulpWatch(path.resolve(__dirname, 'src/**/*.scss'), function (cb) {
        consola.info('scss file changed, start build...');
        build();
        cb();
    });
}

export default build;
