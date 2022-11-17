export const questionsDefault = [
    {id: 1, title: "Уточнил Имя клиента", result: 0},
    {id: 2, title: "Задал открытый вопрос", result: 0},
    {id: 3, title: "Задал вопрос на цель использования", result: 0},
    {id: 4, title: "В презентации рассказал о 2-х прейиуществах", result: 0},
    {
        id: 5, title: "Отработка возражения №1:",
        more: [
            {title: "Уточняющий вопрос", result: 0},
            {title: "Аргумент с 2-мя преймущества", result: 0},
            {title: "Вопрос призыв", result: 0}
        ]
    },
    {
        id: 6, title: "Отработка возражения №2:",
        more: [
            {title: "Уточняющий вопрос", result: 0},
            {title: "Аргумент с 2-мя преймущества", result: 0},
            {title: "Вопрос призыв", result: 0}
        ],
    },
    {id: 7, title: "Спросил про детей!", result: 0},
    {id: 8, title: "Озвучил Акцию", result: 0},
    {id: 9, title: "Попрощался!", result: 0},
]

export function getDeepCopyOfQuestionsDefault() {
    return JSON.parse(JSON.stringify(questionsDefault))
}