import React from "react"

export default function DropTarget(props) {
  const { puzzleElement, handleDrop, dropTargetIndex, handleDrag } = props
  return (
    <li
      className="listItem"
      onDragOver={(e) => e.preventDefault()}
      {...(!puzzleElement.id &&
        handleDrop && {
          onDrop: (e) => handleDrop(e, dropTargetIndex),
        })}
    >
      {puzzleElement.elementSrc && (
        <img src={`./${puzzleElement.elementSrc}`} draggable onDrag={(e) => handleDrag(e, puzzleElement)} />
      )}
    </li>
  )
}
