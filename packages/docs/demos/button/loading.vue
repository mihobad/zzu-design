<template>
    <div class="button-container">
        <div>
            <zzu-button type="primary" :loading="loading">Loading</zzu-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(true);
</script>

<style scoped lang="scss">
.button-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>
