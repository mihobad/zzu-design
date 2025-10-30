import type { Config, PluginConfig } from 'svgo';

const svgoConfig: Config = {
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {},
            },
        } as PluginConfig,
        'removeStyleElement',
        'removeScripts',
        'removeDimensions',
        {
            name: 'removeAttrs',
            params: {
                attrs: ['class', 'style', 'stroke-width', 'stroke-linecap', 'stroke-linejoin'],
            },
        },
        {
            name: 'addAttributesToSVGElement',
            params: {
                attributes: [
                    { ':class': 'cls' },
                    { ':style': 'innerStyle' },
                    { ':stroke-width': 'strokeWidth' },
                    { ':stroke-linecap': 'strokeLinecap' },
                    { ':stroke-linejoin': 'strokeLinejoin' },
                    { '@click': 'onClick' },
                ],
            },
        },
    ],
};

export { svgoConfig };
