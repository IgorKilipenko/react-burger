import React from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const Counter = () => {
    const [state, setState] = React.useState({ seconds: 0 })

    React.useEffect(() => {
      const timer = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          seconds: prevState.seconds + 1,
        }))
      }, 1000)
      return () => {
        clearInterval(timer)
      }
    }, [])
    
    return <div>{state.seconds} seconds</div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Counter />
      </header>
    </div>
  )
}

export default App
