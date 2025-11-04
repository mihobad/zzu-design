<template>
    <section class="example">
        <div class="example-content">
            <div class="example-showcase">
                <slot />
            </div>
            <div class="example-divider--horizontal"></div>
            <div class="example-actions">
                <div>
                    <!-- <PlaygroundIcon class="pointer" /> -->
                </div>
                <div class="example-actions--right">
                    <CopyIcon class="pointer" @click="copyCode" />
                    <CodeIcon class="pointer" @click="toggleExpanded" />
                </div>
                <span v-show="copyState" class="example-actions-tip">复制成功</span>
            </div>
            <CollapseTransition>
                <div v-show="isExpanded" class="example-source-wrapper">
                    <div class="example-source language-vue">
                        <pre><code v-html="code"></code></pre>
                    </div>
                </div>
            </CollapseTransition>
            <Transition name="fade-in-linear">
                <div v-show="isExpanded" class="example-control" @click="toggleExpanded">
                    <span class="control-icon"></span>
                    <span class="control-text">隐藏源代码</span>
                </div>
            </Transition>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CopyIcon from './icons/copy.vue';
import CodeIcon from './icons/code.vue';
import PlaygroundIcon from './icons/playground.vue';
import CollapseTransition from './collapse-transition.vue';
import { useCopy } from './use/useCopy';
import { codeToHtml } from 'shiki';
import './index.scss';

defineOptions({
    name: 'CodePreview',
});

const { hlSource } = defineProps<{
    hlSource: string;
}>();
const code = ref('');

const isExpanded = ref(false);
const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value;
};

const decodeSource = (source: string) => {
    return decodeURIComponent(escape(atob(source)));
};

onMounted(async () => {
    code.value = await codeToHtml(decodeSource(hlSource), {
        lang: 'vue',
        themes: {
            light: 'min-light',
            dark: 'nord',
        },
    });
});

const { copyState, copyCode } = useCopy(decodeSource(hlSource));

defineExpose({
    copyState,
    copyCode,
    code,
    toggleExpanded,
    CodeIcon,
    PlaygroundIcon,
    CopyIcon,
    CollapseTransition,
});
</script>

<style scoped lang="scss">
:global(.vp-doc .example-source[class*='language-']) {
    margin: 0;
    border-radius: 0;
}

:global(.example-source[class*='language-'] pre) {
    margin: 0;
    padding: 1rem;
    white-space: pre-wrap;
    word-break: break-word;
}

:global(.example-source[class*='language-'] code) {
    padding: 0;
    background-color: transparent;
    font-family: var(--vp-font-family-mono);
}

.example {
    position: relative;
}

.example-content {
    border: 1px solid var(--preview-border);
    border-radius: 4px;
    margin: 20px 0 50px;
}

.example-showcase {
    position: relative;
    padding: 1rem;
    color: var(--preview-text-1);
    background-color: var(--preview-bg);
    transform: translate3d(0, 0, 0);
}

.example-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
}

.example-actions {
    position: relative;
    display: flex;
    height: 40px;
    padding: 0 8px;
    align-items: center;
    justify-content: space-between;
    border-top: 1px dashed var(--preview-divider);
}

.example-actions--right {
    display: flex;
    align-items: center;
    gap: 15px;
}

.example-source-wrapper {
    overflow: hidden;
    border-top: 1px dashed var(--preview-divider);
    transition: 0.3s;
}

.example-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--preview-border);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--preview-bg);
    color: var(--preview-text-2);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
}

.example-control .control-text {
    margin-left: 10px;
    font-size: 14px;
}

.control-icon {
    content: '';
    width: 0;
    height: 0;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    border-bottom: 6px solid var(--preview-text-3);
}

.example-control:hover .control-icon {
    border-bottom-color: var(--preview-primary-color);
}

.example-control:hover {
    color: var(--preview-primary-color);
}

.example-actions-tip {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    font-size: 14px;
    color: var(--preview-green-3);
}

.pointer {
    cursor: pointer;
}
</style>
