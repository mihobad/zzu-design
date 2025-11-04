import { ref, type Ref } from 'vue';
import { inBrowser } from 'vitepress';

export function useCopy(code: string): {
    copyState: Ref<boolean>;
    copyCode: () => void;
} {
    const copyState = ref(false);

    const copyCode = () => {
        if (!inBrowser) {
            return;
        }
        navigator.clipboard.writeText(code);
        copyState.value = true;

        setTimeout(() => {
            copyState.value = false;
        }, 2000);
    };

    return {
        copyState,
        copyCode,
    };
}
