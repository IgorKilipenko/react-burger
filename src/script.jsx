import React from "react"
import { ReactDOM } from "react"

const NeonCursor = () => {
  const [state, setState] = React.useState({ top: 0, left: 0 })

  const handleMouseMove = (e) => {
    setState({
      top: e.pageY,
      left: e.pageX,
    })
  }

  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.documentElement.classList.add("no-cursor")

    return () => {
      document.documentElement.classList.remove("no-cursor")
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <img
      src="https://code.s3.yandex.net/web-code/react/cursor.svg"
      width={30}
      style={{
        position: "absolute",
        top: state.top,
        left: state.left,
        pointerEvents: "none",
      }}
    />
  )
}

function App() {
  const [isCustomCursor, setIsCustomCursor] = React.useState()

  function handleChange() {
    setIsCustomCursor(!isCustomCursor)
  }

  return (
    <>
      <label>
        <input type="checkbox" onChange={handleChange} />
        Включить неоновый курсор
      </label>
      {isCustomCursor && <NeonCursor />}
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(<App />)
