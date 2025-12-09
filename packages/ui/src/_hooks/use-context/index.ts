import { ref, type AppContext, type Ref } from 'vue';

const globalAppContext = ref<AppContext>();

export function setAppContext(context: AppContext): void {
    globalAppContext.value = context;
}

export function useAppContext(): Ref<AppContext | undefined> {
    return globalAppContext;
}
