/* eslint-disable indent */
import { chartTypes, sortTypes } from './chart-options'

const defaultData = {
    title: "Installed apps",
    dataset: {
        dimensions: [
            {
                name: "name",
                show: true
            },
            {
                name: "installed apps",
                type: chartTypes.bar2d,
                show: true
            },
            {
                name: "age",
                type: chartTypes.bar2d,
                show: true
            },
            {
                name: "screen time in hrs",
                type: chartTypes.bar2d,
                show: true
            }
        ],
        source: [
            [ "Abel", 5, 19, 1 ],
            [ "Bart", 20, 24, 1 ],
            [ "Chris", 36, 22, 2 ],
            [ "Diana", 10, 18, 5 ],
            [ "Edward", 10, 19, 3 ],
            [ "Flora", 20, 12, 3 ],
            [ "Gregory", 1, 56, 5 ],
            [ "Henry", 18, 45, 4 ],
            [ "Iris", 12, 26, 1 ],
            [ "Jayce", 42, 18, 6 ],
            [ "Krystal", 25, 17, 6 ],
            [ "Leo", 34, 20, 1 ],
            [ "Mark", 12, 38, 2 ],
            [ "Norman", 0, 42, 1 ],
            [ "Oriana", 27, 15, 3 ],
            [ "Peter", 35, 63, 5 ],
            [ "Quinn", 31, 49, 4 ],
            [ "Raphael", 15, 57, 7 ],
            [ "Stacie", 11, 25, 1 ],
            [ "Trevor", 26, 61, 2 ],
            [ "Ursula", 17, 51, 5 ],
            [ "Vladimir", 8, 44, 3 ],
            [ "William", 37, 29, 4 ],
            [ "Xiang", 21, 18, 7 ],
            [ "Yannis", 10, 11, 6 ],
            [ "Zephyr", 24, 48, 2 ]
        ],
    },   
    show: true,
    sort: sortTypes.none
}

export {
    defaultData
}