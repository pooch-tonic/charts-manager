/* eslint-disable indent */
import { chartTypes, sortTypes } from './chart-options'

const defaultSeries = [
    {
        name: "Installed apps",
        data: [
            { property: "Abel", value: 5 },
            { property: "Bart", value: 20 },
            { property: "Chris", value: 36 },
            { property: "Diana", value: 10 },
            { property: "Edward", value: 10 },
            { property: "Flora", value: 20 },
            { property: "Gregory", value: 1 },
            { property: "Henry", value: 18 },
            { property: "Iris", value: 12 },
            { property: "Jayce", value: 42 },
            { property: "Krystal", value: 25 },
            { property: "Leo", value: 34 },
            { property: "Mark", value: 12 },
            { property: "Norman", value: 0 },
            { property: "Oriana", value: 27 },
            { property: "Peter", value: 35 },
            { property: "Quinn", value: 31 },
            { property: "Raphael", value: 15 },
            { property: "Stacie", value: 11 },
            { property: "Trevor", value: 26 },
            { property: "Ursula", value: 17 },
            { property: "Vladimir", value: 8 },
            { property: "William", value: 37 },
            { property: "Xiang", value: 21 },
            { property: "Yannis", value: 10 },
            { property: "Zephyr", value: 24 }
        ],
        type: chartTypes[0],
        show: true,
        sort: sortTypes.none
    },
    {
        name: "Age",
        data: [
            { property: "Abel", value: 19 },
            { property: "Bart", value: 24 },
            { property: "Chris", value: 22 },
            { property: "Diana", value: 18 },
            { property: "Edward", value: 19 },
            { property: "Flora", value: 12 },
            { property: "Gregory", value: 56 },
            { property: "Henry", value: 45 },
            { property: "Iris", value: 26 },
            { property: "Jayce", value: 18 },
            { property: "Krystal", value: 17 },
            { property: "Leo", value: 20 },
            { property: "Mark", value: 38 },
            { property: "Norman", value: 42 },
            { property: "Oriana", value: 15 },
            { property: "Peter", value: 63 },
            { property: "Quinn", value: 49 },
            { property: "Raphael", value: 57 },
            { property: "Stacie", value: 25 },
            { property: "Trevor", value: 61 },
            { property: "Ursula", value: 51 },
            { property: "Vladimir", value: 44 },
            { property: "William", value: 29 },
            { property: "Xiang", value: 18 },
            { property: "Yannis", value: 11 },
            { property: "Zephyr", value: 48 }
        ],
        type: chartTypes[1],
        show: true,
        sort: sortTypes.none
    },
    {
        name: "Screen time per day in hours",
        data: [
            { property: "Abel", value: 1 },
            { property: "Bart", value: 1 },
            { property: "Chris", value: 2 },
            { property: "Diana", value: 5 },
            { property: "Edward", value: 3 },
            { property: "Flora", value: 3 },
            { property: "Gregory", value: 5 },
            { property: "Henry", value: 4 },
            { property: "Iris", value: 1 },
            { property: "Jayce", value: 6 },
            { property: "Krystal", value: 6 },
            { property: "Leo", value: 1 },
            { property: "Mark", value: 2 },
            { property: "Norman", value: 1 },
            { property: "Oriana", value: 3 },
            { property: "Peter", value: 5 },
            { property: "Quinn", value: 4 },
            { property: "Raphael", value: 7 },
            { property: "Stacie", value: 1 },
            { property: "Trevor", value: 2 },
            { property: "Ursula", value: 5 },
            { property: "Vladimir", value: 3 },
            { property: "William", value: 4 },
            { property: "Xiang", value: 7 },
            { property: "Yannis", value: 6 },
            { property: "Zephyr", value: 2 }
        ],
        type: chartTypes[2],
        show: true,
        sort: sortTypes.none
    }
]

export {
    defaultSeries
}