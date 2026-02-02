import {useEffect, useState} from 'react'

function App() {
  const [enable, setEnabled] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  
  useEffect(() => {
    console.log('Effect', {enable})
    const handleMove = (event) => {
      const {clientX, clientY} = event
      console.log('handleMove', {clientX, clientY})
      setPosition({x: clientX, y: clientY})
    }
    if (enable) {
      window.addEventListener('pointermove', handleMove)
    }
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enable])
  return (
    <main> 
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}/>
      <h3>Proyect 3</h3>
      <button onClick={()=>{setEnabled(!enable)}}>
        {enable ? "Disable" : "Enable"} follow cursor
      </button>
    </main>
  )
}

export default App
