import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NavLink } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>

      <ul>
      <li><NavLink to={'/'}>Hello</NavLink></li>
      </ul>
    </>
  )
}

export default App
