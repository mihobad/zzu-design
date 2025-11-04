import path from 'node:path';
import url from 'node:url';
import { Transform } from 'node:stream';
import { dest, parallel, series, src } from 'gulp';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import * as dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import postcss from 'postcss';
import cssnano from 'cssnano';
import consola from 'consola';
import chalk from 'chalk';
import type { TaskFunction } from 'gulp';

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
        .pipe(rename({ extname: '.css' }))
        .pipe(dest(distPath));
}

/**
 * copy source file to theme folder，not include style folder
 * example: dist/divider/style/index.css -> dist/style/divider/index.css
 */
function copyThemeSource() {
    return src([path.resolve(distPath, '**', '*.css'), '!' + path.resolve(distPath, 'style', '**', '*.css')])
        .pipe(
            rename(function (file) {
                // 处理路径转换，例如：divider/style/index.css -> divider/index.css
                if (file.dirname.includes('/style')) {
                    file.dirname = file.dirname.replace('/style', '');
                }
            }),
        )
        .pipe(dest(styleDestPath));
}

// merge all dist/xx/style/index.css to dist/style/index.css
function mergeThemeStyle() {
    return src([path.resolve(distPath, 'style/base.css'), path.resolve(distPath, '**', 'style/index.css')])
        .pipe(concat('index.css'))
        .pipe(dest(styleDestPath));
}

export const build: TaskFunction = parallel(series(buildThemeChalk, copyThemeSource, mergeThemeStyle));

export default build;
