/* eslint-disable indent */
const types = {
    boolean: 'boolean',
    number: 'number',
    text: 'text',
    array: 'array',
    color: 'color',
    select: 'select'
}

const defaultAxisData = [
    "Abel", "Bart", "Chris", "Diana", "Edward", "Flora", "Gregory", "Henry", "Iris", "Jayce", "Krystal", "Leo", "Mark", "Norman", "Oriana", "Peter", "Quinn", "Raphael", "Stacie", "Trevor", "Ursula", "Vladimir", "William", "Xiang", "Yannis", "Zephyr"
]
const defaultSeriesData = {
    name: "Installed Apps",
    data: [
        5, 20, 36, 10, 10, 20, 1, 18, 48, 16, 24, 10, 44, 5, 18, 46, 17, 34, 35, 27, 0, 6, 19, 4, 24, 56
    ]
}

const chartParameters = {
    title: {
        name: 'title',
        content: {
            text: {
                value: 'Installed apps',
                type: types.text
            }
        }
    },
    legend: {
        name: 'legend',
        content: {
            align: {
                value: 'left',
                type: types.select,
                options: [
                    { value: 'left', text: 'left'},
                    { value: 'center', text: 'center'},
                    { value: 'right', text: 'right'}
                ]
            }
        }
    },
    grid: {
        name: 'grid',
        content: {
            top: {
                value: 100,
                type: types.number
            }
        }
    },
    xAxis: {
        name: 'xAxis',
        content: {
            max: {
                value: null,
                type: types.number
            }
        }
    },
    yAxis: {
        name: 'yAxis',
        content: {
            max: {
                value: null,
                type: types.number
            }
        }
    },
    polar: {
        name: 'polar',
        content: {
        }
    },
    angleAxis: {
        name: 'angleAxis',
        content: {
        }
    },
    radiusAxis: {
        name: 'radiusAxis',
        content: {
        }
    },
    series: {
        name: 'series',
        content: {
            value: [{}],
            type: types.array
        }
    }
}

const chartTypes = [
    {
        name: 'line',
        type: 'line',
        isPolar: false,
        allowedParameters: [
            chartParameters.title,
            chartParameters.legend,
            chartParameters.grid,
            chartParameters.xAxis,
            chartParameters.yAxis,
            chartParameters.series
        ]
    },
    {
        name: 'bar (cartesian 2D)',
        type: 'bar',
        isPolar: false,
        allowedParameters: [
            chartParameters.title,
            chartParameters.legend,
            chartParameters.grid,
            chartParameters.xAxis,
            chartParameters.yAxis,
            chartParameters.series
        ]
    },
    {
        name: 'bar (polar)',
        type: 'bar',
        isPolar: true,
        allowedParameters: [
            chartParameters.title,
            chartParameters.legend,
            chartParameters.polar,
            chartParameters.angleAxis,
            chartParameters.radiusAxis,
            chartParameters.series
        ]
    },
    {
        name: 'pie',
        type: 'pie',
        isPolar: true,
        allowedParameters: [
            chartParameters.title,
            chartParameters.legend,
            chartParameters.polar,
            chartParameters.angleAxis,
            chartParameters.radiusAxis,
            chartParameters.series
        ]
    }
]

export {
    chartParameters,
    chartTypes
}
