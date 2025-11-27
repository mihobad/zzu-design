import { defineComponent } from 'vue';
import { isClient } from '@zzu/utils';
import IconFont from './icon-font.vue';

const scriptUrlCache: string[] = [];

export interface IconFontOptions {
    src?: string;
    extraProps?: { [key: string]: any };
}

export const addIconFont = (options: IconFontOptions) => {
    const { src, extraProps = {} } = options;

    if (isClient && src && !scriptUrlCache.includes(src)) {
        const script = document.createElement('script');
        script.setAttribute('src', src);
        script.setAttribute('data-namespace', src);
        scriptUrlCache.push(src);
        document.body.appendChild(script);
    }

    return defineComponent({
        name: 'IconFont',
        props: {
            type: String,
            size: [Number, String],
            rotate: Number,
            spin: Boolean,
        },
        setup(props, { slots }) {
            return () => {
                const children = props.type ? <use xlinkHref={`#${props.type}`} /> : slots.default?.();

                return (
                    <IconFont {...props} {...extraProps}>
                        {children}
                    </IconFont>
                );
            };
        },
    });
};
