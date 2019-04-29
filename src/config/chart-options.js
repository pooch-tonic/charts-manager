/* eslint-disable indent */
const types = {
    boolean: 'boolean',
    number: 'number',
    text: 'text',
    array: 'array',
    color: 'color',
    select: 'select'
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
                value: null,
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
            value: [{
                name: 'Installed apps',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }],
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
        isPolar: false,
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
