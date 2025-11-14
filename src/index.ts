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
export { Avatar, AvatarGroup } from './components/Avatar'
export { Radio, RadioGroup } from './components/Radio'
export { Progress } from './components/Progress'
export { Tabs, TabPanel } from './components/Tabs'
export { Select } from './components/Select'
export { Toast, ToastContainer } from './components/Toast'
export { Skeleton } from './components/Skeleton'
export { Accordion, AccordionItem } from './components/Accordion'
export { Breadcrumb } from './components/Breadcrumb'
export { Pagination } from './components/Pagination'
export { Table } from './components/Table'
export type { TableColumn } from './components/Table'
export { Divider } from './components/Divider'
export { Tag } from './components/Tag'
export { Rating } from './components/Rating'
export { Drawer } from './components/Drawer'
export { Dialog } from './components/Dialog'
export { Stepper } from './components/Stepper'
export type { Step } from './components/Stepper'
export { Slider } from './components/Slider'
export { DatePicker } from './components/DatePicker'

// Export composables
export { useToast } from './composables/useToast'
export type { Toast as ToastType } from './composables/useToast'

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
import { Avatar, AvatarGroup } from './components/Avatar'
import { Radio, RadioGroup } from './components/Radio'
import { Progress } from './components/Progress'
import { Tabs, TabPanel } from './components/Tabs'
import { Select } from './components/Select'
import { Toast, ToastContainer } from './components/Toast'
import { Skeleton } from './components/Skeleton'
import { Accordion, AccordionItem } from './components/Accordion'
import { Breadcrumb } from './components/Breadcrumb'
import { Pagination } from './components/Pagination'
import { Table } from './components/Table'
import { Divider } from './components/Divider'
import { Tag } from './components/Tag'
import { Rating } from './components/Rating'
import { Drawer } from './components/Drawer'
import { Dialog } from './components/Dialog'
import { Stepper } from './components/Stepper'
import { Slider } from './components/Slider'
import { DatePicker } from './components/DatePicker'

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
    app.component('UIAvatar', Avatar)
    app.component('UIAvatarGroup', AvatarGroup)
    app.component('UIRadio', Radio)
    app.component('UIRadioGroup', RadioGroup)
    app.component('UIProgress', Progress)
    app.component('UITabs', Tabs)
    app.component('UITabPanel', TabPanel)
    app.component('UISelect', Select)
    app.component('UIToast', Toast)
    app.component('UIToastContainer', ToastContainer)
    app.component('UISkeleton', Skeleton)
    app.component('UIAccordion', Accordion)
    app.component('UIAccordionItem', AccordionItem)
    app.component('UIBreadcrumb', Breadcrumb)
    app.component('UIPagination', Pagination)
    app.component('UITable', Table)
    app.component('UIDivider', Divider)
    app.component('UITag', Tag)
    app.component('UIRating', Rating)
    app.component('UIDrawer', Drawer)
    app.component('UIDialog', Dialog)
    app.component('UIStepper', Stepper)
    app.component('UISlider', Slider)
    app.component('UIDatePicker', DatePicker)
  }
}

// Default export
export default UILibPlugin
