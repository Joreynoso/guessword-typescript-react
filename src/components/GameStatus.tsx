import clsx from "clsx"
import { getFarewellText } from "../utils"
import { languages } from "../languages"
import type { JSX } from "react"

type GameStatusProps = {
  language: "en" | "es"
  isGameWon: boolean
  isGameLost: boolean
  isGameOver: boolean
  isLastGuessIncorrect: boolean
  wrongGuessCount: number
}

export default function GameStatus({
  language,
  isGameWon,
  isGameLost,
  isGameOver,
  isLastGuessIncorrect,
  wrongGuessCount,
}: GameStatusProps): JSX.Element {
  const gameStatusClass: string = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  })

  return (
    <section aria-live="polite" role="status" className={gameStatusClass}>
      {!isGameOver && isLastGuessIncorrect && (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name, language)}
        </p>
      )}

      {isGameWon && (
        <>
          <h2>{language === "en" ? "You win!" : "Ganaste!"}</h2>
          <p>{language === "en" ? "Well done! 🎉" : "Buen trabajo! 🎉"}</p>
        </>
      )}

      {isGameLost && (
        <>
          <h2 className="text-center">{language === "en" ? "Game over!" : "Game Over!"}</h2>
          <p className="text-center">
            {language === "en"
              ? "You lose! Better start learning Assembly 😭"
              : "Perdiste! es momento de aprender lenguaje ensamblador 😭"}
          </p>
        </>
      )}

      {/* If none of the above conditions met, render nothing inside but keep the section */}
    </section>
  )
}
