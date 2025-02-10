
import "../components/Game.css"
import { useState, useEffect } from "react"


const CHOICES = ["Pierre", "Papier", "Ciseaux"]

export default function Game() {
  const [playerChoice, setPlayerChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState("")
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem("gameScore")
    return savedScore ? Number.parseInt(savedScore) : 0
  })

  useEffect(() => {
    localStorage.setItem("gameScore", score)
  }, [score])

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * CHOICES.length)
    return CHOICES[randomIndex]
  }

  const determineWinner = (player, computer) => {
    if (player === computer) return "Égalité!"
    if (
      (player === "Papier" && computer === "Pierre") ||
      (player === "Pierre" && computer === "Ciseaux") ||
      (player === "Ciseaux" && computer === "Papier")
    ) {
      setScore(score + 1)
      return "Vous avez gagné!"
    }
    setScore(score - 1)
    return "Vous avez perdu!"
  }

  const handleChoice = (choice) => {
    const computer = getComputerChoice()
    setPlayerChoice(choice)
    setComputerChoice(computer)
    setResult(determineWinner(choice, computer))
  }

  return (
    <div className="game-container">
      <h1>Pierre, Papier, Ciseaux</h1>
      <div className="score">Score: {score}</div>

      <div className="choices">
        {CHOICES.map((choice) => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            className={`choice-btn ${playerChoice === choice ? "selected" : ""}`}
          >
            {choice.toUpperCase()}
          </button>
        ))}
      </div>

      {playerChoice && computerChoice && (
        <div className="result">
          <p>Votre choix: {playerChoice}</p>
          <p>Choix de l'ordinateur: {computerChoice}</p>
          <p className="result-text">{result}</p>
        </div>
      )}
    </div>
  )
}

