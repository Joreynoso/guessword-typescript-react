import { useState } from "react"
import { languages } from "./languages"
import { getRandomWord } from "./utils"

import ConfettiContainer from "./components/ConfettiContainer"
import Header from './components/Header'
import GameStatus from "./components/GameStatus";
import LanguageChips from "./components/LanguageChips";
import WordLetters from "./components/WordLetters";
import AriaLiveStatus from "./components/AriaLiveStatus";
import Keyboard from "./components/Keyboard";
import NewGameButton from "./components/NewGameButton";

export default function AssemblyEndgame() {
    // State values
    const [menuOpen, setMenuOPen] = useState<boolean>(false)
    const [currentWord, setCurrentWord] = useState<string>((): string => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState<string[]>([])

    // Derived values
    const numGuessesLeft: number = languages.length - 1
    const wrongGuessCount: number =
        guessedLetters.filter((letter: string): boolean => !currentWord.includes(letter)).length
    const isGameWon: boolean =
        currentWord.split("").every((letter: string): boolean => guessedLetters.includes(letter))
    const isGameLost: boolean = wrongGuessCount >= numGuessesLeft
    const isGameOver: boolean = isGameWon || isGameLost
    const lastGuessedLetter: string = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect =
        !!lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    // Static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuessedLetter(letter: string): void {
        setGuessedLetters((prevLetters: string[]): string[] =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }

    function startNewGame(): void {
        setCurrentWord(getRandomWord())
        setGuessedLetters([])
    }

    const arrowIconDown = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-[#F9F4DA]">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
    )

    const arrowIconUp = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-[#F9F4DA]">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>
    )

    function handleOpenMenu(): void {
        setMenuOPen(prev => !prev)
    }

    return (
        <main className="w-full min-h-screen max-w-7xl mx-auto px-4 py-4 sm:px-0 sm:py-10">
            <div className='bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-center items-center'>
                <ConfettiContainer isGameWon={isGameWon} />

                {/* language component */}
                <div className='relative w-full min-h-16 bg-neutral-900 border border-neutral-800 rounded-xl mb-10
                    flex flex-col justify-center items-center'>

                    <div className='flex justify-center items-center gap-2 mb-2'>
                        <p className='text-[#F9F4DA] font-medium'>choose a language</p>

                        {/* toggle menu button */}
                        <button
                            onClick={handleOpenMenu}
                            className='w-10 h-10 rounded-sm bg-neutral-900 border border-neutral-800 aspect-square flex justify-center items-center'>
                            { menuOpen ? arrowIconUp : arrowIconDown}
                        </button>
                    </div>


                    {/* dropdown options */}
                    {menuOpen ? (<div className='absolute top-14 ml-14 w-32 bg-neutral-800 border border-neutral-700 rounded-md flex flex-col items-center py-1'>
                        <p className='text-[#F9F4DA] font-medium py-1 cursor-pointer'>ESP</p>
                        <p className='text-[#F9F4DA] font-medium py-1 cursor-pointer'>ENG</p>
                    </div>)
                        :
                        null}
                </div>
                <Header />

                <GameStatus
                    isGameWon={isGameWon}
                    isGameLost={isGameLost}
                    isGameOver={isGameOver}
                    isLastGuessIncorrect={isLastGuessIncorrect}
                    wrongGuessCount={wrongGuessCount}
                />

                <LanguageChips
                    languages={languages}
                    wrongGuessCount={wrongGuessCount}
                />

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

                <NewGameButton
                    isGameOver={isGameOver}
                    startNewGame={startNewGame}
                />
            </div>
        </main>
    )
}
