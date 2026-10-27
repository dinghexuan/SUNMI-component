# SUNMI Component

商米 React 组件库。

## Button

Button 根据 Figma `Button 按钮` 组件集实现，支持：

- 颜色：`primary`、`neutral`、`success`、`error`
- 类型：`solid`、`outline`、`fill`、`text`
- 尺寸：`xxl`、`xl`、`lg`、`md`、`sm`、`xs`
- 状态：`normal`、`hover`、`active`、`disabled`、`loading`
- 左右图标、仅图标和自定义 loading 图标

```tsx
import { Button, FigmaIcon } from '@sunmi/components'
import '@sunmi/components/style.css'
import arrowLeft from './arrow-left.svg'

export function Example() {
  return (
    <Button
      color="primary"
      leftIcon={<FigmaIcon src={arrowLeft} />}
      size="xl"
      variant="solid"
    >
      按钮
    </Button>
  )
}
```

仅图标按钮必须提供可访问名称：

```tsx
<Button
  aria-label="删除"
  color="error"
  icon={<DeleteIcon />}
  iconOnly
  variant="text"
/>
```

## 开发

需要 Node.js 22 或更高版本。

```bash
npm install
npm run check
```

构建产物位于 `dist/`。

## Figma Code Connect

- Figma 文件：`aATQihwvfKdi5TUjXU3ADs`
- Button 组件集节点：`48:81`
- 模板：[`src/components/Button/Button.figma.ts`](./src/components/Button/Button.figma.ts)
- 配置：[`figma.config.json`](./figma.config.json)

Code Connect 映射需要组件发布在 Figma Organization 或 Enterprise 团队组件库中。当前模板使用 `.figma.ts` + `figma.code` 的 MCP parserless 格式。
