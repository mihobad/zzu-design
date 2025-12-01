<template>
    <div class="icon-container">
        <IconLoading size="24" spin stroke-width="2" />
    </div>
</template>

<script setup lang="ts">
import { IconLoading } from '@zzu/icon';

defineOptions({
    name: 'DocZzuIconSpin',
    components: {
        IconLoading,
    },
});
</script>
