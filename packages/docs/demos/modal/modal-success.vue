<template>
    <ModalWrapper title="Success">
        <div class="modal-suc">
            <div class="title">发布成功！</div>
            <div class="sub">感谢您的发布，我们会尽快审核。</div>
        </div>
    </ModalWrapper>
</template>

<script setup lang="ts">
import ModalWrapper from './modal-wrapper.vue';
import { inject } from 'vue';
import { dataSymbol } from 'vitepress';

const data = inject(dataSymbol);

console.log(data);
</script>

<style lang="scss" scoped>
.modal-suc {
    padding-top: 12px;
    background-size: 100% 100%;
    font-size: 16px;
    line-height: 28px;
    text-align: center;
    color: #141414;

    .title {
        font-family: '$v-500', '$s-500';
    }
}
</style>
