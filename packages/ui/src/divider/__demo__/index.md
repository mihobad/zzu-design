# Divider 分隔线

区隔内容的分割线。

## 基本用法

对不同段落的文本进行分割。

:::code-preview
basic.vue
:::

## 设置文案

可以在分割线上自定义文本内容。

:::code-preview
slot.vue
:::

## 虚线

可以设置分隔符的样式。

:::code-preview
dashed.vue
:::

## 垂直分隔线

:::code-preview
vertical.vue
:::

## API

### Attributes

| 参数             | 说明           | 类型                          | 默认值   |
| ---------------- | -------------- | ----------------------------- | -------- |
| content-position | 分隔符文案位置 | `left` \| `right` \| `center` | `center` |
| dashed           | 是否虚线       | `boolean`                     | `false`  |
| vertical         | 是否垂直       | `boolean`                     | `false`  |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 自定义分隔符文案 |
