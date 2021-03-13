import { App } from 'vue'
import {
  DayUIComponent,
  DayUIComponentSize,
  DayUIHorizontalAlignment
} from './component'

export { DButton } from './button'
export { DButtonGroup } from './button-group'
export { DIcon } from './icon'

export interface InstallationOptions {
  locale: any
  i18n: any
  size: string
}

export function install(app: App, ...options: any[]): any

export type Component = DayUIComponent

/** Component size definition for button, input, etc */
export type ComponentSize = DayUIComponentSize

/** Horizontal alignment */
export type HorizontalAlignment = DayUIHorizontalAlignment

export type GlobalOptions = {
  size?: number | string
  zIndex?: number
}
