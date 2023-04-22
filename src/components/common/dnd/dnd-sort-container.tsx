import React from "react"
import { DropTargetMonitor, DragSourceMonitor, useDrag, useDrop } from "react-dnd"
import type { Identifier, XYCoord } from "dnd-core"

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
  moveItem: ({ dragUid, hoverUid }: { dragUid: WithUidType["uid"]; hoverUid: WithUidType["uid"] }) => void
}

export const dargHover: <T extends WithUidType>(args: DargHoverArgs<T>) => void = ({
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

  const dragUid = item.item.uid
  const hoverUid = elementUid

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

  moveItem && moveItem({ dragUid, hoverUid })

  item.index = hoverIndex
  //! console.log(item.item.uid)
  console.log(item.item.uid)
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
  moveItem: DargHoverArgs<WithUidType>['moveItem']
}

export const DndSortContainer: React.FC<DndSortContainerProps> = ({ target: Target, uid, index, accept, moveItem }) => {
  const ref = React.useRef<HTMLDivElement>(null)

  const [{ handlerId, handlerUid }, drop] = useDrop<
    DragItem<WithUidType>,
    void,
    { handlerId: Identifier | null; handlerUid: string }
  >({
    accept: accept,
    collect(monitor: DropTargetMonitor<DragItem<WithUidType>>) {
      return {
        handlerId: monitor.getHandlerId(),
        handlerUid: monitor.getItem()?.item?.uid ?? "",
      }
    },
    hover(item: DragItem<WithUidType>, monitor) {
      return dargHover<WithUidType>({ item, monitor, ref: ref, elementIndex: index, elementUid: `${uid}`, moveItem })
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: accept,
    item: () => {
      return { item: { uid: `${uid}` }, index, type: accept }
    },
    collect: (monitor: DragSourceMonitor<DragItem<WithUidType>, DragItem<WithUidType>>) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return <Target {...{ ref, dataHandlerId: handlerId, key: `dnd-${uid}` }} />
}
