import { defineComponent, renderSlot } from 'vue';
import { configProviderProps } from './config-provider-props';
import { provideGlobalConfig } from './hooks/use-global-config';

const ConfigProvider = defineComponent({
    name: 'ConfigProvider',
    props: configProviderProps,

    setup(props, { slots }) {
        const config = provideGlobalConfig(props);

        return () =>
            renderSlot(slots, 'default', {
                config: config?.value,
            });
    },
});

export default ConfigProvider;
