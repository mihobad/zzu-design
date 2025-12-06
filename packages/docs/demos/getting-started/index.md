# 快速开始

欢迎使用 zzu-design UI 组件库！这是一个基于 Vue 3 开发的现代化 UI 组件库，提供了丰富的组件。

## 安装

```bash
pnpm add @zzu/ui @zzu/icon
```

## 引入组件

### 全局引入

在入口文件中引入所有组件和样式：

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import ZzuDesign from '@zzu/ui';
import '@zzu/ui/style/index.css';

const app = createApp(App);
app.use(ZzuDesign);
app.mount('#app');
```

### 按需引入

根据需要引入单个组件：

```vue
<template>
    <zzu-button type="primary">按钮</zzu-button>
</template>

<script setup lang="ts">
import { Button as ZzuButton } from '@zzu/ui';
import '@zzu/ui/style/button/index.css';
</script>
```

### 自动引入（推荐）

```bash
pnpm add -D unplugin-vue-components unplugin-auto-import @zzu/ui-auto-import-resolver
```

在 Vite 配置中添加：

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ZzuUiResolver } from '@zzu/ui-auto-import-resolver';

export default defineConfig({
    plugins: [
        AutoImport({
            resolvers: [ZzuUiResolver()],
        }),
        Components({
            resolvers: [ZzuUiResolver()],
        }),
    ],
});
```

## 主题定制

### 使用 CSS 变量

zzu-design 支持使用 CSS 变量进行主题定制：

```css
:root {
    /* 修改主色调 */
    --zzu-color-primary: #1677ff;
    /* 修改边框圆角 */
    --zzu-border-radius-base: 4px;
    /* 修改字体大小 */
    --zzu-font-size-base: 14px;
}
```

### 完整主题变量

查看 `@zzu/ui/style/css-variables.css` 文件获取所有可用的主题变量。
