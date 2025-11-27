export function extractColorsFromSvg(svgHtml: string): string[] {
    const colors = new Set<string>();
    const colorRegex = /(stroke|fill)="([^"\s]+)"/g;
    let match: RegExpExecArray | null;

    // 先赋值再检查，避免在表达式中赋值
    match = colorRegex.exec(svgHtml);
    while (match !== null) {
        const color = match[2];
        if (color && color !== 'none') {
            colors.add(color);
        }
        match = colorRegex.exec(svgHtml);
    }

    return Array.from(colors);
}

export function replaceColorsWithCssVars(svgHtml: string, colors: string[]): string {
    let modifiedSvg = svgHtml;

    colors.forEach((color, index) => {
        const colorRegex = new RegExp(`(stroke|fill)="${color}"`, 'g');
        modifiedSvg = modifiedSvg.replace(colorRegex, `$1="var(--zzu-icon-color-${index}, ${color})"`);
    });

    return modifiedSvg;
}

export const getIconVue = ({ name, componentName, svgHtml }: { name: string; componentName: string; svgHtml: string }) => {
    // 提取颜色并替换为CSS变量
    const colors = extractColorsFromSvg(svgHtml);
    const modifiedSvgHtml = replaceColorsWithCssVars(svgHtml, colors);

    return `<template>
    ${modifiedSvgHtml}
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
import { iconEmits, iconProps } from '../type';
import { useNamespace } from '@zzu/use';
import { addUnit, isUndefined } from '@zzu/utils';

defineOptions({
    name: '${componentName}'
})

const ns = useNamespace('icon');

const { spin, color, size, rotate } = defineProps(iconProps);
const emit = defineEmits(iconEmits);

const cls = computed(() => {
    return [
        ns.b(),
        '${name}',
        ns.is('loading', spin),
    ]
})

const innerStyle = computed(() => {
    const styles: CSSProperties = {};

    if (color) {
        const colors = Array.isArray(color) ? color : [color];
        colors.forEach((color, index) => {
            styles[\`--zzu-icon-color-\${index}\`] = color;
        });
    }

    if (size) {
        styles.fontSize = isUndefined(size) ? undefined : addUnit(size);
    }

    if (rotate) {
        styles.transform = \`rotate(\${rotate}deg)\`;
    }

    return styles;
})

const onClick = (ev: MouseEvent) => {
    emit('click', ev);
}

defineExpose({
    cls,
    innerStyle,
    onClick,
})
</script>
`;
};

export const getIconType = () => {
    return `import type { ExtractPropTypes, PropType } from 'vue';

export const iconProps = {
	size: {
		type: [Number, String],
		default: '',
	},
	rotate: {
		type: Number,
		default: 0,
	},
	spin: {
		type: Boolean,
		default: false,
	},
	strokeWidth: {
		type: [Number, String],
		default: 2,
	},
	strokeLinecap: {
		type: String as PropType<'round' | 'butt' | 'square'>,
		default: 'butt',
	},
	strokeLinejoin: {
		type: String as PropType<'bevel' | 'miter' | 'round'>,
		default: 'miter',
	},
	color: {
		type: [String, Array] as PropType<string | string[]>,
		default: () => '',
	},
};

export type IconProps = ExtractPropTypes<typeof iconProps>;

export const iconEmits = {
	click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type IconEmits = typeof iconEmits;`;
};

export const getIconIndex = ({ name, componentName }: { name: string; componentName: string }) => {
    return `import { withInstall } from '@zzu/utils';
import type { SFCWithInstall } from '@zzu/utils';
import _${componentName} from './${name}.vue';

export const ${componentName}: SFCWithInstall<typeof _${componentName}> = withInstall(_${componentName});

export default ${componentName};

declare module 'vue' {
    export interface GlobalComponents {
        ${componentName}: typeof ${componentName};
    }
}`;
};

export const getIcon = ({ imports, components }: { imports: string[]; components: string[] }) => {
    return `import type { App, Plugin } from 'vue';
import type { InstallOptions } from '@zzu/utils';
${imports.join('\n')}

const icons: Record<string, Plugin> = {
    ${components.join(',\n    ')}
};

const install = (app: App, options?: InstallOptions) => {
    for (const key of Object.keys(icons)) {
        app.use(icons[key], options);
    }
};

const Icon = {
    ...icons,
    install
};

export default Icon;`;
};

export const getIndex = ({ exports }: { exports: string[] }) => {
    return `export { default } from './icon';
${exports.join('\n')}

export * from './type';`;
};

export const getType = ({ exports }: { exports: string[] }) => {
    return `declare module 'vue' {
  export interface GlobalComponents {
${exports.map((item) => `${' '.repeat(4)}${item}`).join('\n')}
  }
}

export * from './type';

export {};`;
};
