/* eslint-disable indent */
import { chartTypes, sortTypes, axisTypes, dimensionTypes } from './chart-options'

const defaultData = {
    title: 'Installed apps',
    dataset: {
        dimensions: [
            {
                name: 'name',
                type: dimensionTypes.category
            },
            {
                name: 'installed apps',
                type: dimensionTypes.value
            },
            {
                name: 'age',
                type: dimensionTypes.value
            },
            {
                name: 'smartphone time in hrs',
                type: dimensionTypes.value
            },
            {
                name: 'TV time in hrs',
                type: dimensionTypes.value
            }
        ],
        source: [
            [ "Abel", 5, 19, 1, 2 ],
            [ "Bart", 20, 24, 1, 2 ],
            [ "Chris", 36, 22, 2, 0 ],
            [ "Diana", 10, 18, 5, 5 ],
            [ "Edward", 10, 19, 3, 6 ],
            [ "Flora", 20, 12, 3, 4 ],
            [ "Gregory", 1, 56, 5, 5 ],
            [ "Henry", 18, 45, 4, 3 ],
            [ "Iris", 12, 26, 1, 4 ],
            [ "Jayce", 42, 18, 6, 2 ],
            [ "Krystal", 25, 17, 6, 3 ],
            [ "Leo", 34, 20, 1, 5 ],
            [ "Mark", 12, 38, 2, 4 ],
            [ "Norman", 0, 42, 1, 5 ],
            [ "Oriana", 27, 15, 3, 4 ],
            [ "Peter", 35, 63, 5, 2 ],
            [ "Quinn", 31, 49, 4, 4 ],
            [ "Raphael", 15, 57, 7, 3 ],
            [ "Stacie", 11, 25, 1, 0 ],
            [ "Trevor", 26, 61, 2, 4 ],
            [ "Ursula", 17, 51, 5, 8 ],
            [ "Vladimir", 8, 44, 3, 5 ],
            [ "William", 37, 29, 4, 6 ],
            [ "Xiang", 21, 18, 7, 4 ],
            [ "Yannis", 10, 11, 6, 5 ],
            [ "Zephyr", 24, 48, 2, 2 ]
        ],
    },
    categories: [
        {
            name: 'name',
            dimension: 'name',
            categoryAxisIndex: 0,
            show: true
        }
    ],
    series: [
        {
            name: 'TV time (hrs)',
            type: chartTypes.line2d,
            dimension: 'TV time in hrs',
            min: 0,
            max: 15,
            show: true,
            smooth: 0,
            stack: 'total screen time',
            step: 'none',
            symbol: 'rect',
            areaStyle: false,
            roseType: 'none',
            innerRadius: 0,
            outerRadius: 75,
            valueAxisIndex: 0
        },
        {
            name: 'smartphone time (hrs)',
            type: chartTypes.line2d,
            dimension: 'smartphone time in hrs',
            min: 0,
            max: 15,
            show: true,
            smooth: 0,
            stack: 'total screen time',
            step: 'none',
            symbol: 'triangle',
            areaStyle: false,
            roseType: 'none',
            innerRadius: 0,
            outerRadius: 75,
            valueAxisIndex: 1
        },
        {
            name: 'age',
            type: chartTypes.line2d,
            dimension: 'age',
            min: 0,
            max: 100,
            show: true,
            smooth: 0,
            stack: 'none',
            step: 'none',
            symbol: 'none',
            areaStyle: true,
            roseType: 'none',
            innerRadius: 0,
            outerRadius: 75,
            valueAxisIndex: 2
        },
        {
            name: 'apps',
            type: chartTypes.line2d,
            dimension: 'installed apps',
            min: 0,
            max: 50,
            show: true,
            smooth: 0,
            stack: 'none',
            step: 'start',
            symbol: 'circle',
            areaStyle: false,
            roseType: 'none',
            innerRadius: 0,
            outerRadius: 75,
            valueAxisIndex: 3
        }
    ],
    stacks: [
        {
            name: 'total screen time',
            show: true
        }
    ],
    sort: sortTypes.none,
    categoryAxis: 'primaryAxis',
    valueAxis: 'secondaryAxis',
    currentAxis: {
        primaryAxis: {
            spacing: 80,
            base: axisTypes.x,
            axisList: [
                {
                    axisIndex: 0,
                    name: 'x1',
                    position: 'bottom'
                }
            ]
        },
        secondaryAxis: {
            spacing: 80,
            base: axisTypes.y,
            axisList: [
                {
                    axisIndex: 0,
                    name: 'y1',
                    position: 'left'
                },
                {
                    axisIndex: 1,
                    name: 'y2',
                    position: 'left'
                },
                {
                    axisIndex: 2,
                    name: 'y3',
                    position: 'right'
                },
                {
                    axisIndex: 3,
                    name: 'y4',
                    position: 'right'
                }
            ]
        }
    }
}

export {
    defaultData
}