<template>
    <div>
        <icon-font type="icon-person" size="24"></icon-font>
        <icon-font type="icon-vue" size="24"></icon-font>
        <icon-font type="icon-earth" size="24"></icon-font>
    </div>
</template>

<script setup lang="ts">
import { ZzuIconFont } from '@zzu/ui';

const IconFont = ZzuIconFont.addIconFont({
    src: 'https://at.alicdn.com/t/font_180975_ue66sq60vyd.js',
    extraProps: {
        class: 'iconfont',
    },
});
</script>
