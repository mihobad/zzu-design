# ConfigProvider 全局配置

ConfigProvider 用于为组件提供全局配置，支持设置组件尺寸、命名空间和初始 zIndex 等。

## 基本使用

:::code-preview
basic.vue
:::

## API

### 属性

| 属性名    | 类型   | 默认值 | 说明               | 可选值                |
| --------- | ------ | ------ | ------------------ | --------------------- |
| size      | string | ''     | 全局组件尺寸       | large, default, small |
| namespace | string | 'zzu'  | 组件类名前缀       | -                     |
| zIndex    | number | -      | 全局初始 zIndex 值 | -                     |

### 插槽

| 插槽名  | 说明                 |
| ------- | -------------------- |
| default | 配置作用域内的子组件 |
