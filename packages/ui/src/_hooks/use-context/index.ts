import { ref, type AppContext } from 'vue';

const appContext = ref<AppContext>();

export function useContext(context?: AppContext): AppContext {
    if (context) {
        appContext.value = context;
    }

    return appContext.value!;
}
