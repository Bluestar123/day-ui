import { DayUIComponent, DayUIComponentSize } from './component'

/** Button type */
export type ButtonType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'text'
  | 'default'

/** Same as native button's type */
export type ButtonNativeType = 'button' | 'submit' | 'reset'

interface IButton extends DayUIComponent {
  /** Button size */
  size: DayUIComponentSize

  /** Button type */
  type: ButtonType

  /** Determine whether it's a plain button */
  plain: boolean

  /** Determine whether it's a round button */
  round: boolean

  /** Determine whether it's loading */
  loading: boolean

  /** Disable the button */
  disabled: boolean

  /** Button icon, accepts an icon name of Element icon component */
  icon: string

  /** Same as native button's autofocus */
  autofocus: boolean

  /** Same as native button's type */
  nativeType: ButtonNativeType
}

/** Button Component */
export const DButton: IButton
