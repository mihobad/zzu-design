# Icon 图标

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

| 参数名         | 说明     | 类型                                    | 默认值  |
| -------------- | -------- | --------------------------------------- | ------- |
| size           | 图标大小 | Number                                  | 24      |
| strokeWidth    | 线宽     | Number                                  | 2       |
| strokeLinecap  | 线帽     | `butt` \| `round` \| `square` \| `butt` | `butt`  |
| strokeLinejoin | 线接     | `miter` \| `round` \| `bevel`           | `miter` |
| rotate         | 旋转角度 | Number                                  | 0       |
| spin           | 旋转动画 | Boolean                                 | false   |
| color          | 图标颜色 | `String` \| `Array`                     | -       |

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
