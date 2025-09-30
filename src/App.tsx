import { useEffect, useState } from "react"
import { languages } from "./languages"
import { getRandomWord } from "./utils"

import ConfettiContainer from "./components/ConfettiContainer"
import Header from "./components/Header"
import HeaderEs from "./components/HeaderEs"
import GameStatus from "./components/GameStatus"
import LanguageChips from "./components/LanguageChips"
import WordLetters from "./components/WordLetters"
import AriaLiveStatus from "./components/AriaLiveStatus"
import Keyboard from "./components/Keyboard"
import NewGameButton from "./components/NewGameButton"
import LangugageSelector from "./components/LanguageSelector"

export default function AssemblyEndgame() {
  // State values
  const [menuOpen, setMenuOPen] = useState<boolean>(false)
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [currentWord, setCurrentWord] = useState<string>(() => getRandomWord("en"))
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  // Hanlde language setttings
  function handleOpenMenu(): void {
    setMenuOPen((prev) => !prev)
  }

  function toggleLanguage() {
    setLanguage((prev) => (prev === "en" ? "es" : "en"))
    handleOpenMenu()
  }

  // Derived values
  const numGuessesLeft: number = languages.length - 1
  const wrongGuessCount: number = guessedLetters.filter(
    (letter: string): boolean => !currentWord.includes(letter)
  ).length
  const isGameWon: boolean = currentWord
    .split("")
    .every((letter: string): boolean => guessedLetters.includes(letter))
  const isGameLost: boolean = wrongGuessCount >= numGuessesLeft
  const isGameOver: boolean = isGameWon || isGameLost
  const lastGuessedLetter: string = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = !!lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedLetter(letter: string): void {
    setGuessedLetters((prevLetters: string[]): string[] =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    )
  }

  function startNewGame(): void {
    setCurrentWord(getRandomWord(language)) // usar el idioma actual
    setGuessedLetters([])
  }

  // Reset keyword language
  useEffect(() => {
    setCurrentWord(getRandomWord(language))
    setGuessedLetters([]) // reinicia letras
  }, [language])

  return (
    <main className="w-full min-h-screen max-w-7xl mx-auto px-4 py-4 sm:px-0 sm:py-10 flex justify-center items-center">
      <div className="bg-[#111828] border border-[#202938] rounded-2xl p-5 flex flex-col justify-center items-center shadow-2xl">
        <ConfettiContainer isGameWon={isGameWon} />

        <LangugageSelector
          menuOpen={menuOpen}
          handleOpenMenu={handleOpenMenu}
          language={language}
          toggleLanguage={toggleLanguage}
        />

        {language === "en" ? <Header /> : <HeaderEs />}

        <GameStatus
          language={language}
          isGameWon={isGameWon}
          isGameLost={isGameLost}
          isGameOver={isGameOver}
          isLastGuessIncorrect={isLastGuessIncorrect}
          wrongGuessCount={wrongGuessCount}
        />

        <LanguageChips languages={languages} wrongGuessCount={wrongGuessCount} />

        <WordLetters
          currentWord={currentWord}
          guessedLetters={guessedLetters}
          isGameLost={isGameLost}
        />

        <AriaLiveStatus
          currentWord={currentWord}
          lastGuessedLetter={lastGuessedLetter}
          guessedLetters={guessedLetters}
          numGuessesLeft={numGuessesLeft}
        />

        <Keyboard
          alphabet={alphabet}
          guessedLetters={guessedLetters}
          currentWord={currentWord}
          isGameOver={isGameOver}
          addGuessedLetter={addGuessedLetter}
        />

        <NewGameButton language={language} isGameOver={isGameOver} startNewGame={startNewGame} />
      </div>
    </main>
  )
}
