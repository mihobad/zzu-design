<template>
    <div class="docs-icons">
        <div v-for="icon in icons" :key="icon.id" class="icon" @click="clkCopyIcon(icon.name)">
            <div class="icon-svg">
                <component :is="icon.is" :stroke-width="2" size="24" :color="['#4e5969', '#62c558']" />
            </div>
            <span class="icon-name">{{ icon.name }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';

defineOptions({
    name: 'DocZzuIcon',
});

const appComponents = getCurrentInstance()?.appContext?.components || {};

const toHyphen = (str: string) =>
    str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase()
        .slice(2);

const icons = Object.keys(appComponents)
    .filter((key) => key.startsWith('$$Icon'))
    .map((key) => ({
        id: key,
        is: key,
        name: toHyphen(key).replace('icon-', ''),
    }));

const clkCopyIcon = (name: string) => {
    navigator.clipboard.writeText(`icon-${name}`);
};

defineExpose({
    icons,
    clkCopyIcon,
});
</script>

<style scoped lang="scss">
.docs-icons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;

    .icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        overflow: hidden;

        &-svg {
            width: 100%;
            height: 100px;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            background-color: rgb(233 236 239);
        }

        &-name {
            width: 100%;
            font-size: 12px;
            line-height: 20px;
            color: #666;
            text-align: center;
            height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        &:hover {
            .icon-svg {
                background-color: rgba(13 110 253 / 10%);
            }

            .icon-name {
                color: rgb(13 110 253);
            }
        }
    }
}
</style>
