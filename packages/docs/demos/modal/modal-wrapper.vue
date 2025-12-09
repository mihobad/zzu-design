<template>
    <div class="modal-wrapper">
        <div class="modal-wrapper-content">
            <slot></slot>
        </div>
        <svg class="modal-wrapper-close" @click="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">
            <path
                d="M25.501 24.3304L10.6816 9.5127"
                stroke="black"
                stroke-width="3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M25.3194 9.68921L10.5 24.5069"
                stroke="black"
                stroke-width="3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </svg>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: String,
});
const emit = defineEmits(['close']);

const close = () => {
    emit('close');
};
</script>

<style lang="scss" scoped>
.modal-wrapper {
    position: relative;
    width: 320px;
    background: rgb(255, 255, 255);
    box-shadow: 0px 4px 10px 0px rgba(255, 175, 47, 0.41);
    border-radius: 12px;
    padding: 20px 0;
    margin: 0 auto;

    &-content {
        position: relative;
        z-index: 1;
    }

    &-close {
        width: 32px;
        height: 32px;
        margin: 0 auto;
        margin-top: 15px;
        cursor: pointer;
    }
}
</style>
