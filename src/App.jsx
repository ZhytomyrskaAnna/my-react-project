import { useState } from 'react'
import Header from './components/Header.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
      <Header />
      <main>
        <p>Hello World</p>
      </main>
    </div>
  )
}

export default App
