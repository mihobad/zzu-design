<template>
    <div>
        <zzu-button-group>
            <zzu-button type="primary" @click="direction = 'horizontal'">horizontal</zzu-button>
            <zzu-button type="primary" @click="direction = 'vertical'">vertical</zzu-button>
        </zzu-button-group>
    </div>
    <div style="margin-top: 10px">
        <zzu-button-group :direction="direction" :type="'primary'">
            <zzu-button :icon="IconCaretTop" />
            <zzu-button :icon="IconSetting" />
            <zzu-button :icon="IconCheck" />
        </zzu-button-group>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconCaretTop, IconSetting, IconCheck } from '@zzu/icon';

const direction = ref<'horizontal' | 'vertical'>('horizontal');
</script>
