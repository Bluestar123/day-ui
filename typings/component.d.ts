import { App } from 'vue'

/** ElementUI component common definition */
export interface DayUIComponent {
  /** Install component into Vue */
  install: (app: App, ...options: any[]) => any
}

/** Component size definition for button, input, etc */
export type DayUIComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type DayUIHorizontalAlignment = 'left' | 'center' | 'right'
