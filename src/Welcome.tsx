import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Calendar.css'
import { Link } from 'react-router'

function Welcome() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Link to="/Dashboard">Go to Dashboard</Link>
      <br />
      <Link to="/Calendar">Open Calendar App</Link>
      <br />
      <Link to="/List">Open List View</Link>
      <br />
      <Link to="/Chart">Open Chart View</Link>
      <br />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Welcome
