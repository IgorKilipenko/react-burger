import React, { useEffect, useState } from "react"
import DragList from "../drag-list/drag-list"
import DropTarget from "../drop-target/drop-target"
import puzzleImage from "../../images/puzzle.png"

export default function DragContainer() {
  const [sourceElements, setSourceElements] = useState([])
  const [draggedElements, setDraggedElements] = useState([])
  const [draggedElement, setDraggedElement] = useState({})

  const handleDrag = React.useCallback((e, currentElement) => {
    e.preventDefault()
    setDraggedElement(currentElement)
  }, [])

  const handleDrop = React.useCallback((e, index) => {
    e.preventDefault()

    setSourceElements((prevState) => prevState.filter((el) => el.id !== draggedElement.id))
    setDraggedElements((prevState) => prevState.map((el, i) => (i === index ? draggedElement : el)))
    setDraggedElement({})
  }, [draggedElement])

  useEffect(() => {
    const parts = [...Array(25)]
      .map((element, index) => ({
        elementSrc: `puzzle-piece-${index}.png`,
        id: index,
      }))
      .sort(() => Math.random() - 0.5)
    const emptyPuzzleData = [...Array(25)].map(() => ({}))

    setSourceElements([...parts])
    setDraggedElements([...emptyPuzzleData])
  }, [])

  return (
    <section className="container">
      <ul className="list">
        {sourceElements.map((item) => (
          <DragList key={item.id} puzzleElement={item} handleDrag={handleDrag} />
        ))}
      </ul>

      <ul className="list" style={{ backgroundImage: `url(${puzzleImage})` }}>
        {draggedElements.map((item, index) => (
          <DropTarget key={index} dropTargetIndex={index} puzzleElement={item} handleDrop={handleDrop} />
        ))}
      </ul>
    </section>
  )
}
