export const isMd = (id: string) => id.endsWith('.md');

export const toPascalCase = (string: string): string => {
    return string
        .replace(/^./, (match) => match.toLocaleUpperCase())
        .replace(/-(.)/g, (_, p1: string) => {
            return p1.toLocaleUpperCase();
        });
};
