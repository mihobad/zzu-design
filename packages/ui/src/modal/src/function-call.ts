import { createVNode, render, type AppContext, type Component } from 'vue';
import ModalConstructor from './modal.vue';
import type { ModalOptions } from './type';
import { useContext } from '@/_hooks';

let seed = 1;

const closeModal = (instance: any) => {
    const { handler } = instance;
    handler.close();
};

const showModal = (Comp: Component, options?: ModalOptions) => {
    const id = `modal-${seed++}`;

    const userOnClose = options?.onClose;

    const container = document.createElement('div');

    const _props = {
        ...options,
        id,
        onClose: () => {
            userOnClose?.();
            closeModal(instance);
        },
        onDestroy: () => {
            render(null, container);
        },
    };

    const vnode = createVNode(ModalConstructor, _props, { default: () => createVNode(Comp, { onClose: _props.onClose }) });

    vnode.appContext = useContext();

    render(vnode, container);

    document.body.appendChild(container.firstElementChild!);

    const vm = vnode.component!;

    const handler = {
        close: () => {
            vm.exposed!.close();
        },
    };

    const instance = {
        id,
        vnode,
        vm,
        handler,
        props: (vnode.component as any).props,
    };

    return instance;
};

export { showModal, closeModal };
