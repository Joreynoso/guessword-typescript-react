import type { JSX } from "react"

type NewGameButtonProps = {
  language: "en" | "es"
  isGameOver: boolean
  startNewGame: () => void
}

export default function NewGameButton({
  isGameOver,
  startNewGame,
  language,
}: NewGameButtonProps): JSX.Element | null {
  if (!isGameOver) {
    return null
  } else {
    return (
      <button className="new-game" onClick={startNewGame}>
        {language === "en" ? "New Game" : "Jugar de Nuevo"}
      </button>
    )
  }
}
