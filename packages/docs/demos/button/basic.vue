<template>
    <div class="button-container">
        <div>
            <zzu-button>Default</zzu-button>
            <zzu-button type="primary">Primary</zzu-button>
            <zzu-button type="success">Success</zzu-button>
            <zzu-button type="info">Info</zzu-button>
            <zzu-button type="warning">Warning</zzu-button>
            <zzu-button type="danger">Danger</zzu-button>
        </div>

        <div>
            <zzu-button plain>Plain</zzu-button>
            <zzu-button type="primary" plain>Primary</zzu-button>
            <zzu-button type="success" plain>Success</zzu-button>
            <zzu-button type="info" plain>Info</zzu-button>
            <zzu-button type="warning" plain>Warning</zzu-button>
            <zzu-button type="danger" plain>Danger</zzu-button>
        </div>

        <div>
            <zzu-button round>Round</zzu-button>
            <zzu-button type="primary" round>Primary</zzu-button>
            <zzu-button type="success" round>Success</zzu-button>
            <zzu-button type="info" round>Info</zzu-button>
            <zzu-button type="warning" round>Warning</zzu-button>
            <zzu-button type="danger" round>Danger</zzu-button>
        </div>

        <div>
            <zzu-button circle :icon="IconSearch"></zzu-button>
            <zzu-button type="primary" circle :icon="IconEdit"></zzu-button>
            <zzu-button type="success" circle :icon="IconCheck"></zzu-button>
            <zzu-button type="info" circle :icon="IconClose"></zzu-button>
            <zzu-button type="warning" circle :icon="IconPlus"></zzu-button>
            <zzu-button type="danger" circle :icon="IconSetting"></zzu-button>
        </div>

        <div>
            <zzu-button size="large">Default</zzu-button>
            <zzu-button size="large" type="primary">Primary</zzu-button>
            <zzu-button size="large" type="success">Success</zzu-button>
            <zzu-button size="large" type="info">Info</zzu-button>
            <zzu-button size="large" type="warning">Warning</zzu-button>
            <zzu-button size="large" type="danger">Danger</zzu-button>
        </div>

        <div>
            <zzu-button size="small">Default</zzu-button>
            <zzu-button size="small" type="primary">Primary</zzu-button>
            <zzu-button size="small" type="success">Success</zzu-button>
            <zzu-button size="small" type="info">Info</zzu-button>
            <zzu-button size="small" type="warning">Warning</zzu-button>
            <zzu-button size="small" type="danger">Danger</zzu-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconSearch, IconEdit, IconCheck, IconClose, IconPlus, IconSetting } from '@zzu/icon';
</script>

<style scoped lang="scss">
.button-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>
