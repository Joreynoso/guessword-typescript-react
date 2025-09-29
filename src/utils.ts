import { words, wordsEs } from "./words"

type Language = "en" | "es"

function getRandomIndex(arr: string[]): number {
    return Math.floor(Math.random() * arr.length)
}

// Obtiene una palabra random según el idioma
export function getRandomWord(language: Language = "en"): string {
    console.log('language selected:', language)
    const list = language === "en" ? words : wordsEs
    return list[getRandomIndex(list)]
}

// Mensaje de despedida random
export function getFarewellText(subject: string, language: Language): string {
    const options: Record<Language, string[]> = {
        en: [
            `Farewell, ${subject}`,
            `R.I.P., ${subject}`,
            `We'll miss you, ${subject}`,
            `Oh no, not ${subject}!`,
            `${subject} bites the dust`,
            `Gone but not forgotten, ${subject}`,
            `The end of ${subject} as we know it`,
            `Off into the sunset, ${subject}`,
            `${subject}, it's been real`,
            `${subject}, your watch has ended`,
            `${subject} has left the building`
        ],
        es: [
            `Adiós, ${subject}`,
            `Descansa en paz, ${subject}`,
            `Te vamos a extrañar, ${subject}`,
            `Oh no, no ${subject}!`,
            `${subject} mordió el polvo`,
            `${subject} ya no está con nosotros`,
            `El fin de ${subject} como lo conocemos`,
            `Se fue al atardecer, ${subject}`,
            `${subject}, ha sido un gusto`,
            `${subject}, tu guardia ha terminado`,
            `${subject} se fue del edificio`
        ]
    }

    const list = options[language]
    return list[getRandomIndex(list)]
}
