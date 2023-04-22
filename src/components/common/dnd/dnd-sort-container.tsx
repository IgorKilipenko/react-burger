import React from "react"
import type { DropTargetMonitor, XYCoord } from "react-dnd"
import { DbObjectType } from "../../../data"

export interface DragItem<T extends DbObjectType> {
  index: number
  item: { object: T }
  type: string
}

interface DargHoverArgs<T extends DbObjectType> {
  item: DragItem<T>
  monitor: DropTargetMonitor<DragItem<T>>
  ref: React.MutableRefObject<HTMLDivElement>
  elementIndex: number
  moveItem: ({ dragIndex, hoverIndex }: { dragIndex: number; hoverIndex: number }) => void
}

export const dargHover: <T extends DbObjectType>(args: DargHoverArgs<T>) => void = ({
  item,
  monitor,
  ref,
  elementIndex,
  moveItem,
}) => {
  if (!ref.current) {
    return
  }
  const dragIndex = item.index
  const hoverIndex = elementIndex

  if (dragIndex === hoverIndex) {
    return
  }

  const hoverBoundingRect = ref.current?.getBoundingClientRect()

  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

  const clientOffset = monitor.getClientOffset()

  const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

  if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    return
  }

  if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    return
  }

  moveItem && moveItem({ dragIndex, hoverIndex })

  item.index = hoverIndex
}

interface TargetProps/*<T extends HTMLElement> */{
  //ref: React.RefObject<HTMLDivElement>
  //ref: React.ForwardedRef<T>
  dataHandlerId: string
}

export interface DndSortContainerProps {
  //target: React.FC<TargetProps<HTMLDivElement>>
  //target: typeof React.forwardRef<HTMLDivElement, TargetProps>
  target: React.ForwardRefExoticComponent<React.PropsWithoutRef<TargetProps> & React.RefAttributes<HTMLDivElement>>
  key?: React.Key | null
  uid: string | number
  index?: number
  accept?: string
  moveItem?: ({ dragIndex, hoverIndex }: { dragIndex: number; hoverIndex: number }) => void
}

export const DndSortContainer: React.FC<DndSortContainerProps> = ({ target:Target, uid, index, moveItem }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  return <Target {...{ref, dataHandlerId: `${uid}`, key:`dnd-${uid}` }}/>
}
