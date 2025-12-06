# Button 按钮

常用的操作按钮。

## 基本用法

使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

::: code-preview
basic.vue
:::

## 禁用状态

使用 `disabled` 属性来定义按钮是否被禁用。

::: code-preview
disabled.vue
:::

## 加载状态

使用 `loading` 属性来定义按钮是否加载中。

::: code-preview
loading.vue
:::

## 链接按钮

::: code-preview
link.vue
:::

## API

### 属性

| 属性     | 说明           | 类型                                                                   | 默认值    |
| -------- | -------------- | ---------------------------------------------------------------------- | --------- |
| type     | 按钮类型       | `default` \| `primary` \| `success` \| `warning` \| `info` \| `danger` | ''        |
| size     | 按钮尺寸       | `large` \| `default` \| `small`                                        | ''        |
| plain    | 是否为朴素按钮 | boolean                                                                | undefined |
| link     | 是否为链接按钮 | boolean                                                                | undefined |
| round    | 是否为圆角按钮 | boolean                                                                | undefined |
| circle   | 是否为圆形按钮 | boolean                                                                | false     |
| loading  | 是否加载中     | boolean                                                                | false     |
| disabled | 是否禁用       | boolean                                                                | false     |
| icon     | `Icon` 组件    | Component                                                              | null      |

### 事件

| 事件名 | 说明     | 回调参数          |
| ------ | -------- | ----------------- |
| click  | 点击事件 | (evt: MouseEvent) |
