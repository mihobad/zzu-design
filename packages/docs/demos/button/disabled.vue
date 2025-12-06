<template>
    <div class="button-container">
        <div>
            <zzu-button disabled>Default</zzu-button>
            <zzu-button type="primary" disabled>Primary</zzu-button>
            <zzu-button type="success" disabled>Success</zzu-button>
            <zzu-button type="info" disabled>Info</zzu-button>
            <zzu-button type="warning" disabled>Warning</zzu-button>
            <zzu-button type="danger" disabled>Danger</zzu-button>
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
