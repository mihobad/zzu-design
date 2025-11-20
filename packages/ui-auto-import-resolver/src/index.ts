export interface ZzuUiResolverOptions {
    /**
     * default: true
     */
    importStyle?: boolean;
}

/**
 * Button->button; ButtonGroup->button-group
 */
function kebabCase(key: string) {
    const result = key.replace(/([A-Z])/g, ' $1').trim();
    return result.split(' ').join('-').toLowerCase();
}

function getSideEffects(dirName: string, options: ZzuUiResolverOptions) {
    const { importStyle = true } = options;

    if (!importStyle) {
        return;
    }

    return `@zzu/ui/${dirName}/style/index`;
}

export function ZzuUiResolver(options: ZzuUiResolverOptions = {}) {
    return {
        type: 'component' as const,
        resolve: (name: string) => {
            if (name.startsWith('Zzu')) {
                const partialName = name.slice(3);

                return {
                    name: name,
                    from: `@zzu/ui`,
                    sideEffects: getSideEffects(kebabCase(partialName), options),
                };
            }
        },
    };
}
