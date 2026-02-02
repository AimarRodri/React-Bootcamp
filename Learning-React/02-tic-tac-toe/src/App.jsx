import { useState } from "react"
import confetti from 'canvas-confetti'

const TURNS = {
  X: 'x',
  O: 'o'
}


// Define ac constant that will be our cells, this ones has a children, that is
// what they have inside, updateBoard, cause the board has to be updated everytime
// when someone click the cell, and the index, which by the moment will be what the
// cell has inside itself.
const Square = ({children, isSelected, updateBoard, index}) => {
  
  const className= `square ${isSelected ? 'is-selected' : ''}`
  
  const handleClick = () =>{
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  // Create the board, which will be an array filled of nulls until someone click
  // them. To make the board updateable, we will use the hook useState defining
  // the board we had, and now we dont just have the board but also have a way to
  // update the board
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : 
    Array(9).fill(null)
  })
  
  // Its also necessary to create a state for the players turn, to know with what
  // its we have to fill the cell the players click on
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  
  // Null means no winner, false means draw and true means winner
  const [winner, setWinner] = useState(null)
  
  const WinnerCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  const checkWinner = (boardToCheck) => {
    for (const combo of WinnerCombos) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    //If not winner
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const checkEndGame = (newBoard) => {
    // Check if every cell is filled
    return newBoard.every((cell) => cell !== null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    // Dont update the position if it has something
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    // Check if there is a winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // draw
    }
  }

  return(
    <main className="board">
      <h1>Tic-Tac-Toe</h1>
      <button onClick={resetGame}>Restart game</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn===TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn===TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <section>
        {
          winner !== null && (
            <section className="winner">
              <div className="text">
                <h2>
                  { winner === false ? 'Empate' : 'Ha ganado: '}
                </h2>
                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button onClick={resetGame}>Restart the game</button>
                </footer>
              </div>
            </section>
          )
        }
      </section>      
    </main>
  )
}

export default App
