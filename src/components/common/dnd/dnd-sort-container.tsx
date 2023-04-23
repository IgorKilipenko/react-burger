import React from "react"
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd"
import type { XYCoord } from "dnd-core"

export interface WithUidType {
  uid: string
}

export interface DragItem<T extends WithUidType> {
  index: number
  item: T
  type: string
}

interface DargHoverArgs<T extends WithUidType> {
  item: DragItem<T>
  monitor: DropTargetMonitor<DragItem<T>>
  ref: React.RefObject<HTMLDivElement>
  elementIndex: number
  elementUid: WithUidType["uid"]
  moveItem: ({ dragIndex, hoverIndex }: { dragIndex: number; hoverIndex: number }) => void
}

export const dropHover: <T extends WithUidType>(args: DargHoverArgs<T>) => void = ({
  item,
  monitor,
  ref,
  elementIndex,
  elementUid,
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

interface TargetProps {}

export interface DndSortContainerProps {
  target: React.ForwardRefExoticComponent<React.PropsWithoutRef<TargetProps> & React.RefAttributes<HTMLDivElement>>
  key?: React.Key | null
  uid: string | number
  index: number
  accept: string
  moveItem: DargHoverArgs<WithUidType>["moveItem"]
}

export const DndSortContainer: React.FC<DndSortContainerProps> = ({ target: Target, uid, index, accept, moveItem }) => {
  type TDragItem = DragItem<WithUidType>

  const ref = React.useRef<HTMLDivElement>(null)

  const [{ isOver }, drop] = useDrop<DragItem<WithUidType>, void, { isOver: boolean }>({
    accept: accept,
    collect(monitor) {
      return {
        isOver: !!monitor.isOver({ shallow: false }),
      }
    },
    hover(item: TDragItem, monitor) {
      return dropHover<WithUidType>({ item, monitor, ref: ref, elementIndex: index, elementUid: `${uid}`, moveItem })
    },
  })

  const [{ isDragging }, drag] = useDrag<TDragItem, TDragItem, { isDragging: boolean }>({
    type: accept,
    item: () => {
      return { item: { uid: `${uid}` }, index, type: accept }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return <Target {...{ ref, key: `dnd-${uid}`, isDragging, isOver }} />
}
