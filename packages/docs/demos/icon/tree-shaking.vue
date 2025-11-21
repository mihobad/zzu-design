<template>
    <div class="icon-container">
        <IconCheck size="24" />
    </div>
</template>

<script setup lang="ts">
import { IconCheck } from '@zzu/icon';

defineOptions({
    name: 'DocZzuTreeShaking',
    components: {
        IconCheck,
    },
});
</script>

<style scoped lang="scss">
.icon-container {
    display: flex;
    align-items: center;
    gap: 12px;
}
</style>
