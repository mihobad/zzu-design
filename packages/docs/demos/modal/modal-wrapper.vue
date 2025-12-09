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
    width: 332px;
    background: rgba(193, 255, 186, 0.6);
    border-radius: 12px;
    padding: 35px 0;
    margin: 0 auto;

    &-title {
        position: relative;
        z-index: 0;
        width: 248px;
        height: 43px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(115, 144, 103, 1);
        backdrop-filter: blur(35px);
        box-shadow: 0px 2px 10px 0px rgba(81, 125, 146, 0.11);
        border-radius: 8px;
        border: 1px solid linear-gradient(#ffffff 30.56%, #ffffff 69.44%, #ffffff 100%);

        span {
            font-size: 18px;
            line-height: 27px;
            color: #fff;
            font-family: '$v-500', '$s-500';
            margin: 0 18px;
        }
    }

    &-content {
        position: relative;
        z-index: 1;
        margin-top: -10px;
        font-family: '$v-300', '$s-300';
    }

    &-close {
        width: 32px;
        height: 32px;
        margin: 0 auto;
        margin-top: 15px;
    }
}
</style>
