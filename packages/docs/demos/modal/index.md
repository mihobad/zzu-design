# Modal

Modal 组件提供了 `createModal` 函数式调用打开弹窗的方式。

## 函数式调用

::: code-preview
basic.vue
:::

## API

### showModal(component, ModalOptions?)

| 参数名    | 说明     | 类型           |
| --------- | -------- | -------------- |
| component | 弹窗组件 | `Component`    |
| options   | 配置选项 | `ModalOptions` |

**interface ModalOptions**

| 属性名              | 说明             | 类型                               | 默认值 | 可选值 |
| ------------------- | ---------------- | ---------------------------------- | ------ | ------ |
| zIndex              | zIndex 值        | `number` \| `string`               | -      | -      |
| overlay             | 是否显示遮罩     | `boolean`                          | true   | -      |
| overlayPenetrable   | 遮罩是否可穿透   | `boolean`                          | false  | -      |
| overlayClass        | 遮罩额外类名     | `string` \| `string[]` \| `object` | ''     | -      |
| overlayStyle        | 遮罩样式         | `object`                           | {}     | -      |
| closeOnClickOverlay | 点击遮罩是否关闭 | `boolean`                          | true   | -      |
| onClose             | 关闭回调函数     | `function`                         | -      | -      |
