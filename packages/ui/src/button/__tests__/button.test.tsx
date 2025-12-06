import { describe, it, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { IconLoading, IconSearch } from '@zzu/icon';
import Button from '../src/button.vue';
import ButtonGroup from '../src/button-group.vue';
import { nextTick, ref } from 'vue';

const HELLO = 'Hello World';

describe('Button.vue', () => {
    it('create', () => {
        const wrapper = mount(() => <Button type="primary" />);
        expect(wrapper.classes()).toContain('zzu-button--primary');
    });

    it('icon', () => {
        const wrapper = mount(() => <Button type="primary" icon={<IconSearch />} />);
        expect(wrapper.findComponent(IconSearch).exists()).toBeTruthy();
    });

    it('plain', () => {
        const wrapper = mount(() => <Button type="primary" plain />);
        expect(wrapper.classes()).toContain('is-plain');
    });

    it('round', () => {
        const wrapper = mount(() => <Button type="primary" round />);
        expect(wrapper.classes()).toContain('is-round');
    });

    it('circle', () => {
        const wrapper = mount(() => <Button type="primary" circle />);
        expect(wrapper.classes()).toContain('is-circle');
    });

    it('link', () => {
        const wrapper = mount(() => <Button type="primary" link />);
        expect(wrapper.classes()).toContain('is-link');
    });

    it('size', () => {
        const wrapper = mount(() => <Button type="primary" size="small" />);
        expect(wrapper.classes()).toContain('zzu-button--small');
    });

    it('type', () => {
        const wrapper = mount(() => <Button type="primary" />);
        expect(wrapper.classes()).toContain('zzu-button--primary');
    });

    test('render text', () => {
        const wrapper = mount(() => <Button v-slots={{ default: () => HELLO }} />);

        expect(wrapper.text()).toEqual(HELLO);
    });

    test('handle click', async () => {
        const wrapper = mount(() => (
            <Button
                v-slots={{
                    default: () => HELLO,
                }}
            />
        ));

        await wrapper.trigger('click');
        expect(wrapper.emitted()).toBeDefined();
    });

    test('handle click inside', async () => {
        const wrapper = mount(() => (
            <Button
                v-slots={{
                    default: () => <span class="inner-slot">{HELLO}</span>,
                }}
            />
        ));

        await wrapper.find('.inner-slot').trigger('click');
        expect(wrapper.emitted()).toBeDefined();
    });

    test('loading', async () => {
        const fn = vi.fn();
        const wrapper = mount(() => <Button type="primary" loading onClick={fn} />);
        expect(wrapper.classes()).toContain('is-loading');
        expect(wrapper.findComponent(IconLoading).exists()).toBeTruthy();
        await wrapper.trigger('click');
        expect(fn).toBeCalledTimes(0);
    });

    test('disabled', async () => {
        const fn = vi.fn();
        const wrapper = mount(() => <Button type="primary" disabled onClick={fn} />);
        expect(wrapper.classes()).toContain('is-disabled');
        await wrapper.trigger('click');
        expect(fn).toBeCalledTimes(0);
    });
});

describe('ButtonGroup.vue', () => {
    it('create', () => {
        const wrapper = mount(() => (
            <ButtonGroup>
                <Button type="primary"></Button>
                <Button type="primary"></Button>
            </ButtonGroup>
        ));
        expect(wrapper.classes()).toContain('zzu-button-group');
        expect(wrapper.findAll('button')).toHaveLength(2);
    });

    it('vertical', () => {
        const wrapper = mount(() => (
            <ButtonGroup direction="vertical">
                <Button type="primary"></Button>
                <Button type="primary"></Button>
            </ButtonGroup>
        ));
        expect(wrapper.classes()).toContain('zzu-button-group--vertical');
    });

    it('size', async () => {
        const size = ref<'small' | 'large'>('small');
        const wrapper = mount({
            setup() {
                return () => (
                    <ButtonGroup size={size.value}>
                        <Button type="primary"></Button>
                        <Button type="primary"></Button>
                    </ButtonGroup>
                );
            },
        });
        expect(wrapper.classes()).toContain('zzu-button-group');
        expect(wrapper.findAll('.zzu-button-group button.zzu-button--small')).toHaveLength(2);

        size.value = 'large';
        await nextTick();
        expect(wrapper.findAll('.zzu-button-group button.zzu-button--large')).toHaveLength(2);
    });

    it('type', () => {
        const wrapper = mount(() => (
            <ButtonGroup type="danger">
                <Button type="primary"></Button>
                <Button></Button>
            </ButtonGroup>
        ));
        expect(wrapper.findAll('.zzu-button-group button.zzu-button--danger')).toHaveLength(1);
        expect(wrapper.findAll('.zzu-button-group button.zzu-button--primary')).toHaveLength(1);
    });
});
