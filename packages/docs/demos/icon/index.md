# 图标 Icon

内置常用图标

## 基础使用

ZzuDesign图标是一个独立的库，需要额外引入并注册使用。
::: code-group

```js
import { createApp } from 'vue';
import App from './App.vue';
import ZzuUi from '@zzu/ui';
import ZzuIcon from '@zzu/icon';
import '@zzu/ui/style/index.css';

const app = createApp(App);
app.use(ZzuUi);
app.use(ZzuIcon);
app.mount('#app');
```

```vue
<icon-check />
```

:::

### Props

| 参数名         | 描述     | 类型                    | 说明         | 默认值 |
| -------------- | -------- | ----------------------- | ------------ | ------ |
| size           | 图标大小 | Number                  | 图标大小     | 24     |
| strokeWidth    | 线宽     | Number                  | 图标线宽     | 2      |
| strokeLinecap  | 线帽     | butt \| round \| square | 图标线帽     | butt   |
| strokeLinejoin | 线接     | miter \| round \| bevel | 图标线接     | miter  |
| rotate         | 旋转角度 | Number                  | 图标旋转角度 | 0      |
| spin           | 旋转动画 | Boolean                 | 图标旋转动画 | false  |
| color          | 图标颜色 | String \| Array         | 图标颜色     | -      |

## 按需加载

可以通过单独引入图标的方式实现按需加载。

::: code-preview
tree-shaking.vue
:::

## 旋转状态

通过设置 `spin`，可以将图标设置为旋转状态。也可以使用 `rotate` 自定义旋转角度。

::: code-preview
spin.vue
:::

## iconfont.cn

调用 addIconFont 方法支持 iconfont.cn 图标。

::: code-preview
icon-font.vue
:::

## 图标列表

::: code-preview
icons.vue
:::
