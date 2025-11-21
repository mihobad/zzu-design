<template>
    <div class="icon-container">
        <IconRotateCw size="24" spin stroke-width="2" />
    </div>
</template>

<script setup lang="ts">
import { IconRotateCw } from '@zzu/icon';

defineOptions({
    name: 'DocZzuIconSpin',
    components: {
        IconRotateCw,
    },
});
</script>
