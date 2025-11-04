import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { toPascalCase, isMd } from '../../utils';

function convertFileNameToComponentName(fileName: string): string {
    const baseName = path.basename(fileName, '.vue');
    return `Doc${toPascalCase(baseName)}`;
}

function insertScript(code: string): string {
    return `<script setup lang="ts">${code}</script>`;
}

function encodeSource(source: string): string {
    return btoa(unescape(encodeURIComponent(source)));
}

export function codePreviewPlugin(): Plugin {
    return {
        name: 'code-preview-plugin',
        enforce: 'pre',
        transform(code: string, id: string) {
            if (!isMd(id)) {
                return null;
            }

            // 获取当前文件所在目录
            const baseDir = path.dirname(id);

            // 定义匹配特定格式的正则表达式
            const codeBlockRegex = /:::\s*code-preview\s*([^\n]+?)\s*:::/g;
            let transformedCode = code;
            const imports: string[] = [];
            const importedFiles = new Set<string>();
            const replacements: { original: string; newContent: string }[] = [];

            let match: RegExpExecArray | null = codeBlockRegex.exec(code);
            while (match !== null) {
                const [fullMatch, filePath] = match;
                const trimmedFilePath = filePath.trim();
                if (trimmedFilePath && !importedFiles.has(trimmedFilePath)) {
                    importedFiles.add(trimmedFilePath);
                    const componentName = convertFileNameToComponentName(trimmedFilePath);
                    imports.push(`import ${componentName} from './${trimmedFilePath}'`);
                }
                const componentName = convertFileNameToComponentName(trimmedFilePath);
                // 读取vue组件的源代码
                let componentSource = '';
                const fullFilePath = path.join(baseDir, trimmedFilePath);
                if (fs.existsSync(fullFilePath)) {
                    componentSource = fs.readFileSync(fullFilePath, 'utf-8');
                }
                const replacementContent = `<code-preview hlSource="${encodeSource(componentSource)}"><${componentName} /></code-preview>`;
                replacements.push({ original: fullMatch, newContent: replacementContent });
                match = codeBlockRegex.exec(code);
            }

            // 执行所有代码块的替换
            for (const { original, newContent } of replacements) {
                transformedCode = transformedCode.replace(original, newContent);
            }

            // 添加导入语句
            if (imports.length) {
                // 检查是否已经存在 script setup 标签
                const scriptSetupRegex = /<script\s+setup\s+lang="ts">([\s\S]*?)<\/script>/;
                const match = transformedCode.match(scriptSetupRegex);

                if (match) {
                    // 已存在 script setup 标签，将导入语句添加到现有标签中
                    const existingScriptContent = match[1];
                    const newScriptContent = `${imports.join('\n')}\n${existingScriptContent}`;
                    transformedCode = transformedCode.replace(scriptSetupRegex, `<script setup lang="ts">${newScriptContent}</script>`);
                } else {
                    // 不存在 script setup 标签，创建新的标签
                    transformedCode = `${insertScript(imports.join('\n'))}\n\n${transformedCode}`;
                }
            }
            return transformedCode;
        },
    };
}
