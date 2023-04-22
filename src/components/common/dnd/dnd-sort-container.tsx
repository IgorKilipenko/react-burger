import React from "react"
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd"
import type { Identifier, XYCoord } from "dnd-core"
import { DbObjectType } from "../../../data"

export interface DragItem<T extends any> {
  index: number
  item: { object: T }
  type: string
}

interface DargHoverArgs<T extends any> {
  item: DragItem<T>
  monitor: DropTargetMonitor<DragItem<T>>
  //ref: React.MutableRefObject<HTMLDivElement>
  ref: React.RefObject<HTMLDivElement>
  elementIndex: number
  moveItem: ({ dragIndex, hoverIndex }: { dragIndex: number; hoverIndex: number }) => void
}

export const dargHover: <T extends any>(args: DargHoverArgs<T>) => void = ({
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

interface TargetProps {
  dataHandlerId: Identifier | null
}

export interface DndSortContainerProps {
  target: React.ForwardRefExoticComponent<React.PropsWithoutRef<TargetProps> & React.RefAttributes<HTMLDivElement>>
  key?: React.Key | null
  uid: string | number
  index: number
  accept: string
  moveItem: ({ dragIndex, hoverIndex }: { dragIndex: number; hoverIndex: number }) => void
}

export const DndSortContainer: React.FC<DndSortContainerProps> = ({ target: Target, uid, index, accept, moveItem }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  
  const [{ handlerId }, drop] = useDrop<DragItem<DbObjectType>, void, { handlerId: Identifier | null }>({
    accept: accept,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem<DbObjectType>, monitor) {
      return dargHover<DbObjectType>({ item, monitor, ref: ref, elementIndex: index, moveItem })
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: accept,
    item: () => {
      return { uid, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))
  
  return <Target {...{ ref, dataHandlerId: handlerId, key: `dnd-${uid}` }} />
}
