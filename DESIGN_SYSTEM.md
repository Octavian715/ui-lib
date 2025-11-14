# Design System Documentation

This document outlines the design system principles and standards used in the UI library.

## 🎨 Design Principles

### 1. **Consistency**
All components follow the same design patterns, spacing, colors, and interactions.

### 2. **Accessibility First**
- WCAG 2.1 AAA compliance
- Keyboard navigation support
- Screen reader friendly
- Visible focus states
- Proper ARIA attributes

### 3. **Modern UX Standards**
- Micro-interactions for better feedback
- Smooth animations (200ms default)
- Clear visual hierarchy
- Intuitive interaction patterns

### 4. **Dark Theme Optimized**
Designed for modern dark interfaces with proper contrast ratios.

## 🎯 Design Tokens

### Color System

#### Primary Colors
- **Primary**: Blue spectrum for primary actions and highlights
  - `primary-500`: Main brand color (#3b82f6)
  - `primary-600`: Hover state (#2563eb)
  - `primary-700`: Active state (#1d4ed8)

#### Neutral/Gray Scale
- **Neutral**: For backgrounds, borders, and text
  - `neutral-900`: Dark background (#0f172a)
  - `neutral-800`: Card background (#1e293b)
  - `neutral-700`: Border color (#334155)
  - `neutral-600`: Subtle border (#475569)

#### Semantic Colors
- **Success**: Green for positive actions (#059669)
- **Warning**: Amber for warnings (#d97706)
- **Error**: Red for errors and destructive actions (#dc2626)
- **Info**: Blue for informational messages (#2563eb)

### Spacing Scale

Based on a 4px grid system:
- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `6` = 24px
- `8` = 32px

### Typography

- **Font Sizes**: `sm` (14px), `base` (16px), `lg` (18px), `xl` (20px)
- **Font Weights**: normal (400), medium (500), semibold (600), bold (700)
- **Line Heights**: Optimized for readability

### Border Radius

- `sm`: 4px - Small elements (badges, tags)
- `md`: 8px - Default for most components
- `lg`: 12px - Larger containers (cards, modals)
- `full`: 9999px - Pills and circular elements

### Shadows

- `sm`: Subtle elevation
- `md`: Default elevation
- `lg`: Prominent elevation
- `xl`: Maximum elevation (modals)
- `glow`: Special effect for focus states

### Transitions

- **Duration**:
  - Fast: 150ms - Hover effects
  - Base: 200ms - Default transitions
  - Slow: 300ms - Complex animations

- **Timing Functions**:
  - `ease-in-out`: Default smooth transition
  - `ease-out`: Entering elements
  - `ease-in`: Exiting elements
  - `spring`: Bouncy effect for micro-interactions

## 🔍 Focus Management

### Focus Ring Standards

All interactive elements use consistent focus rings:
- **Ring width**: 2px
- **Ring offset**: 2px
- **Ring color**: primary-500 with opacity
- **Only visible with keyboard**: Using `focus-visible`

### Keyboard Navigation

All components support:
- Tab navigation
- Enter/Space for activation
- Arrow keys for selection (where applicable)
- Escape for closing modals/dropdowns

## 📏 Component Sizes

### Standard Sizes

All form components share consistent sizing:

#### Small (sm)
- Height: 32px
- Padding: 12px horizontal
- Font size: 14px

#### Medium (md) - Default
- Height: 40px
- Padding: 16px horizontal
- Font size: 16px

#### Large (lg)
- Height: 48px
- Padding: 24px horizontal
- Font size: 18px

## 🎭 States

### Interactive States

All interactive components have these states:

1. **Default**: Base appearance
2. **Hover**: Subtle color change + shadow (200ms transition)
3. **Active**: Pressed state with scale (0.98) or darker color
4. **Focus**: Visible ring for keyboard users
5. **Disabled**: 50% opacity, no pointer events

### Validation States

Form components support:
- **Default**: Normal state
- **Error**: Red border + error message
- **Success**: Green border (optional)
- **Warning**: Amber border (optional)

## ✨ Micro-interactions

### Button Press
- Scale down to 98% on click
- Smooth 150ms transition
- Visual feedback for user action

### Hover Effects
- Color transition: 200ms
- Shadow growth: 200ms
- Scale increase (cards): 1.02

### Focus Transitions
- Ring appearance: 150ms
- Smooth, non-jarring

### Modal/Dialog
- Backdrop fade: 300ms ease-out
- Content scale + fade: 300ms ease-out
- Exit faster: 200ms ease-in

## 📱 Responsive Design

### Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Touch Targets
- Minimum: 44x44px (WCAG AAA)
- Comfortable spacing for mobile users

## 🎨 Usage Examples

### Using Design Tokens

```typescript
import { designTokens } from '@custom/ui-lib'

// Access colors
const primaryColor = designTokens.colors.primary[500]

// Access spacing
const padding = designTokens.spacing[4]
```

### Using Focus Utilities

```vue
<template>
  <button :class="[focusRing, 'custom-classes']">
    Click me
  </button>
</template>

<script setup>
import { focusRing } from '@custom/ui-lib'
</script>
```

### Using Animations

```vue
<template>
  <Transition v-bind="animations.scaleIn">
    <div v-if="show">Content</div>
  </Transition>
</template>

<script setup>
import { animations } from '@custom/ui-lib'
</script>
```

## 🔄 Animation Guidelines

### When to Animate
- State changes (open/close)
- User feedback (loading, success)
- Drawing attention (alerts, notifications)
- Page transitions

### When NOT to Animate
- Reading content
- Data tables
- Continuous interactions
- User preference (prefers-reduced-motion)

### Duration Guidelines
- **75-150ms**: Micro-interactions (hover, focus)
- **200-300ms**: State changes (open/close)
- **300-500ms**: Complex transitions (page changes)

## ♿ Accessibility Checklist

All components must:
- [ ] Have proper ARIA labels
- [ ] Support keyboard navigation
- [ ] Have visible focus indicators
- [ ] Work with screen readers
- [ ] Meet contrast requirements (4.5:1 minimum)
- [ ] Have appropriate touch targets (44x44px minimum)
- [ ] Support reduced motion preference
- [ ] Have semantic HTML

## 🎯 Best Practices

### Do's ✅
- Use design tokens for all colors
- Apply consistent spacing (4px grid)
- Add loading states for async actions
- Provide clear error messages
- Use semantic color names
- Test keyboard navigation
- Support dark theme

### Don'ts ❌
- Hard-code colors or spacing
- Create custom shadows/borders
- Skip focus states
- Use non-semantic color names
- Ignore loading states
- Forget disabled states
- Break keyboard navigation

## 📚 Resources

- **Figma Design File**: [Link to Figma]
- **Storybook**: Run `npm run storybook`
- **Component Examples**: See `USAGE_EXAMPLE.md`

---

**Last Updated**: 2024
**Design System Version**: 1.0.0
