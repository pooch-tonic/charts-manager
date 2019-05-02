/* eslint-disable indent */
/* eslint-disable semi */
const types = {
    boolean: 'boolean',
    number: 'number',
    text: 'text',
    array: 'array',
    color: 'color',
    select: 'select'
}

const sortTypes = {
    none: 'none',
    ascendant: 'ascendant',
    descendant: 'descendant',
    alphabetical: 'alphabetical'
}

const axisTypes = {
    x: {
        name: 'x',
        displayName: 'x axis'
    },
    y: {
        name: 'y',
        displayName: 'y axis'
    },
    angle: {
        name: 'angle',
        displayName: 'angle axis'
    },
    radius: {
        name: 'radius',
        displayName: 'radius axis'
    }
}

const chartParameters = {
    title: {
        name: 'title',
        displayName: 'title',
        content: {
            text: {
                value: 'Installed apps',
                type: types.text
            }
        }
    },
    legend: {
        name: 'legend',
        displayName: 'legend',
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
        displayName: 'grid',
        content: {
            top: {
                value: 100,
                type: types.number
            }
        }
    },
    xAxis: {
        name: 'xAxis',
        displayName: 'x axis',
        content: {
            min: {
                value: null,
                type: types.number
            },
            max: {
                value: null,
                type: types.number
            }
        }
    },
    yAxis: {
        name: 'yAxis',
        displayName: 'y axis',
        content: {
            min: {
                value: null,
                type: types.number
            },
            max: {
                value: null,
                type: types.number
            }
        }
    },
    polar: {
        name: 'polar',
        displayName: 'polar',
        content: {
        }
    },
    angleAxis: {
        name: 'angleAxis',
        displayName: 'angle axis',
        content: {
            startAngle: {
                value: 90,
                type: types.number
            },
            clockwise: {
                value: true,
                type: types.boolean
            },
            min: {
                value: null,
                type: types.number
            },
            max: {
                value: null,
                type: types.number
            }
        }
    },
    radiusAxis: {
        name: 'radiusAxis',
        displayName: 'radius axis',
        content: {
        }
    },
    tooltip: {
        name: 'tooltip',
        displayName: 'tooltip',
        content: {

        }
    }
};

const chartTypes = {
    line: {
        name: 'line',
        type: 'line',
        isPolar: false,
        allowedParameters: [
            chartParameters.title,
            chartParameters.legend,
            chartParameters.grid,
            chartParameters.xAxis,
            chartParameters.yAxis,
            chartParameters.tooltip
        ]
    },
    bar2d: {
        name: 'bar (cartesian 2D)',
        type: 'bar',
        //typeSerie: donne la compatibilité
        isPolar: false,
        allowedParameters: [
            chartParameters.title,
            chartParameters.legend,
            chartParameters.grid,
            chartParameters.xAxis,
            chartParameters.yAxis,
            chartParameters.tooltip
        ]
    },
    barPolar: {
        name: 'bar (polar)',
        type: 'bar',
        isPolar: true,
        allowedParameters: [
            chartParameters.title,
            chartParameters.legend,
            chartParameters.polar,
            chartParameters.angleAxis,
            chartParameters.radiusAxis,
            chartParameters.tooltip
        ]
    },
    pie: {
        name: 'pie',
        type: 'pie',
        isPolar: true,
        allowedParameters: [
            chartParameters.title,
            chartParameters.legend,
            chartParameters.polar,
            chartParameters.angleAxis,
            chartParameters.radiusAxis,
            chartParameters.tooltip
        ]
    }
}

const chartSystemTypes = {
    cartesian2d: {
        name: 'cartesian2d',
        allowedParameters: [
            chartParameters.title,
            chartParameters.legend,
            chartParameters.grid,
            chartParameters.xAxis,
            chartParameters.yAxis,
            chartParameters.tooltip
        ],
        allowedChartTypes: [
            chartTypes.line,
            chartTypes.bar2d
        ],
        allowedAxisTypes: [
            axisTypes.x,
            axisTypes.y
        ]
    },
    polar: {
        name: 'polar',
        allowedParameters: [
            chartParameters.title,
            chartParameters.legend,
            chartParameters.polar,
            chartParameters.angleAxis,
            chartParameters.radiusAxis,
            chartParameters.tooltip
        ],
        allowedChartTypes: [
            chartTypes.barPolar,
            chartTypes.pie
        ],
        allowedAxisTypes: [
            axisTypes.angle,
            axisTypes.radius
        ]
    }
}

export {
    chartParameters,
    chartSystemTypes,
    chartTypes,
    axisTypes,
    sortTypes
}
