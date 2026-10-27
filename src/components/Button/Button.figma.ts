// url=https://www.figma.com/design/aATQihwvfKdi5TUjXU3ADs/主题化-变量系统?node-id=48-81
// source=src/components/Button/Button.tsx
// component=Button
import figma from 'figma'

const instance = figma.selectedInstance

const label = instance.getString('按钮名称')
const color = instance.getEnum('颜色', {
  '品牌色 Primary': 'primary',
  '中性色 Neutral': 'neutral',
  '成功色 Success': 'success',
  '错误色 Error': 'error',
})
const variant = instance.getEnum('类型', {
  '实心 solid': 'solid',
  '描边 outline': 'outline',
  '填充 fill': 'fill',
  '文本 Text': 'text',
})
const size = instance.getEnum('尺寸', {
  'XXL（48）': 'xxl',
  'XL（40）': 'xl',
  'L（36）': 'lg',
  'M（32）': 'md',
  'S（28）': 'sm',
  'XS（24）': 'xs',
})
const state = instance.getEnum('状态', {
  '默认态 Normal': 'normal',
  '悬停态 Hover': 'hover',
  '激活态 Active': 'active',
  '禁用态 Disable': 'disabled',
  '加载中 Loading': 'loading',
})
const iconOnly = instance.getEnum('仅图标', {
  no: false,
  yes: true,
})

const showLeftIcon = instance.getBoolean('左侧图标')
const showRightIcon = instance.getBoolean('右侧图标')
const leftIcon = showLeftIcon
  ? instance.getInstanceSwap('替换左侧图标')
  : null
const rightIcon = showRightIcon
  ? instance.getInstanceSwap('替换右侧图标')
  : null
const icon = instance.getInstanceSwap('替换图标')
const loadingIcon = instance.getInstanceSwap('loading 图标')

let leftIconCode
let rightIconCode
let iconCode
let loadingIconCode

if (leftIcon && leftIcon.type === 'INSTANCE') {
  leftIconCode = leftIcon.executeTemplate().example
}
if (rightIcon && rightIcon.type === 'INSTANCE') {
  rightIconCode = rightIcon.executeTemplate().example
}
if (icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}
if (loadingIcon && loadingIcon.type === 'INSTANCE') {
  loadingIconCode = loadingIcon.executeTemplate().example
}

const example = iconOnly
  ? figma.code`
      <Button
        aria-label="${label}"
        color="${color}"
        variant="${variant}"
        size="${size}"
        state="${state}"
        iconOnly
        ${iconCode ? figma.code`icon={${iconCode}}` : ''}
        ${loadingIconCode
          ? figma.code`loadingIcon={${loadingIconCode}}`
          : ''}
      />
    `
  : figma.code`
      <Button
        color="${color}"
        variant="${variant}"
        size="${size}"
        state="${state}"
        ${leftIconCode ? figma.code`leftIcon={${leftIconCode}}` : ''}
        ${rightIconCode ? figma.code`rightIcon={${rightIconCode}}` : ''}
        ${loadingIconCode
          ? figma.code`loadingIcon={${loadingIconCode}}`
          : ''}
      >
        ${label}
      </Button>
    `

export default {
  example,
  imports: ["import { Button } from '@sunmi/components'"],
  id: 'button',
  metadata: {
    nestable: true,
  },
}
