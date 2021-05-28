import { DayUIComponent } from './component'

interface IAffix extends DayUIComponent {
  zIndex: number
  // 在哪个容器内
  target: string
  // 上下偏移量
  offset: number
  position: 'top' | 'bottom'
}

export const DAffix: IAffix
