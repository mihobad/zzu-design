<template>
    <div class="button-container">
        <div>
            <zzu-button link>Default</zzu-button>
            <zzu-button type="primary" link>Primary</zzu-button>
            <zzu-button type="success" link>Success</zzu-button>
            <zzu-button type="info" link>Info</zzu-button>
            <zzu-button type="warning" link>Warning</zzu-button>
            <zzu-button type="danger" link>Danger</zzu-button>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.button-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>
