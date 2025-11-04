export interface KgUiResolverOptions {
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

function getSideEffects(dirName: string, options: KgUiResolverOptions) {
    const { importStyle = true } = options;

    if (!importStyle) {
        return;
    }

    return `@kg-design/ui/${dirName}/style/index`;
}

export function KgUiResolver(options: KgUiResolverOptions = {}) {
    return {
        type: 'component' as const,
        resolve: (name: string) => {
            if (name.startsWith('Kg')) {
                const partialName = name.slice(2);

                return {
                    name: name,
                    from: `@kg-design/ui`,
                    sideEffects: getSideEffects(kebabCase(partialName), options),
                };
            }
        },
    };
}
