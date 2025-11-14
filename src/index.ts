import type { App, Plugin } from 'vue'

// Export components
export { Button } from './components/Button'
export { Modal } from './components/Modal'
export { Tooltip } from './components/Tooltip'
export { Dropdown } from './components/Dropdown'
export { Input } from './components/Input'
export { Card } from './components/Card'
export { Checkbox } from './components/Checkbox'
export { TextArea } from './components/TextArea'
export { Badge } from './components/Badge'
export { Alert } from './components/Alert'
export { Switch } from './components/Switch'
export { Spinner } from './components/Spinner'

// Export types
export type { ButtonVariantProps } from './components/Button/buttonVariants'

// Export utilities
export { cn } from './utils/cn'

// Export theme system
export * from './theme'

// Import components for plugin
import { Button } from './components/Button'
import { Modal } from './components/Modal'
import { Tooltip } from './components/Tooltip'
import { Dropdown } from './components/Dropdown'
import { Input } from './components/Input'
import { Card } from './components/Card'
import { Checkbox } from './components/Checkbox'
import { TextArea } from './components/TextArea'
import { Badge } from './components/Badge'
import { Alert } from './components/Alert'
import { Switch } from './components/Switch'
import { Spinner } from './components/Spinner'

// Component registration plugin
export const UILibPlugin: Plugin = {
  install(app: App) {
    app.component('UIButton', Button)
    app.component('UIModal', Modal)
    app.component('UITooltip', Tooltip)
    app.component('UIDropdown', Dropdown)
    app.component('UIInput', Input)
    app.component('UICard', Card)
    app.component('UICheckbox', Checkbox)
    app.component('UITextArea', TextArea)
    app.component('UIBadge', Badge)
    app.component('UIAlert', Alert)
    app.component('UISwitch', Switch)
    app.component('UISpinner', Spinner)
  }
}

// Default export
export default UILibPlugin
