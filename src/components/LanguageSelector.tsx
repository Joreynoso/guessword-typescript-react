import type { JSX } from "react"

type LanguageSelectorProps = {
  menuOpen: boolean
  language: "en" | "es"
  toggleLanguage: () => void
  handleOpenMenu: () => void
}

export default function LangugageSelector({
  menuOpen,
  language,
  toggleLanguage,
  handleOpenMenu
}: LanguageSelectorProps): JSX.Element {
  const arrowIconDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4 text-[#F9F4DA]"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  )

  const arrowIconUp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4 text-[#F9F4DA]"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
  )

  // return render
  return (
    <>
      {/* language component */}
      <div
        className="relative w-full bg-[#111828] border border-[#202938] rounded-xl mb-10
                            flex  justify-center items-center p-4"
      >
        <div className="flex justify-center items-center gap-2 mb-2">
          <p className="text-[#F9F4DA] font-medium">
            {language === "es" ? "cambiar idioma" : "change language"}
          </p>

          {/* toggle menu button */}
          <button
            onClick={handleOpenMenu}
            className="w-10 h-10 rounded-sm bg-[#111828] border border-[#202938] aspect-square flex justify-center items-center"
          >
            {menuOpen ? arrowIconUp : arrowIconDown}
          </button>
        </div>

        {/* dropdown options */}
        {menuOpen ? (
          <div className="absolute top-14 ml-14 w-32 bg-[#111828] border border-[#202938] rounded-md 
          flex flex-col items-center py-1 hover:bg-[#141d2f] transition-colors duration-200 ease-in-out">
            <button
              onClick={toggleLanguage}
              className="text-[#F9F4DA] font-medium py-1 cursor-pointer"
            >
              {language === "en" ? "ESP" : "ENG"}
            </button>
          </div>
        ) : null}
      </div>
    </>
  )
}
