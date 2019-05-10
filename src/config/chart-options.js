/* eslint-disable indent */
/* eslint-disable semi */
const types = {
    boolean: 'boolean',
    number: 'number',
    percentage: 'percentage',
    text: 'text',
    array: 'array',
    color: 'color',
    select: 'select',
    object: 'object'
}

const sortTypes = {
    none: {
        value: null,
        text: 'none'
    },
    ascendant: {
        value: 'asc',
        text: 'ascendant'
    },
    descendant: {
        value: 'desc',
        text: 'descendant'
    }
}

const axisTypes = {
    x: {
        name: 'xAxis',
        displayName: 'x axis',
        positions: [
            'bottom',
            'top'
        ]
    },
    y: {
        name: 'yAxis',
        displayName: 'y axis',
        positions: [
            'left',
            'right'
        ]
    },
    angle: {
        name: 'angleAxis',
        displayName: 'angle axis'
    },
    radius: {
        name: 'radiusAxis',
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
                    {value: 'left', text: 'left'},
                    {value: 'center', text: 'center'},
                    {value: 'right', text: 'right'}
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
                type: types.percentage
            },
            right: {
                value: 50,
                type: types.percentage
            },
            left: {
                value: 50,
                type: types.percentage
            },
            bottom: {
                value: 50,
                type: types.percentage
            }
        }
    },
    xAxis: [{
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
    }],
    yAxis: [{
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
    }],
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
            clockwise: {
                value: true,
                type: types.boolean
            },
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
            trigger: {
                value: 'axis',
                type: types.select,
                options: [
                    {value: 'axis', text: 'axis'},
                    {value: 'item', text: 'item'},
                    {value: 'none', text: 'none'}
                ]
            }
            /*axisPointer: {
                value: {type: 'shadow'},
                type: types.object
            }*/
        }
    }
};

const chartTypes = {
    line2d: {
        name: 'line (cartesian 2D)',
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
    linePolar: {
        name: 'line (polar)',
        type: 'line',
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
    bar2d: {
        name: 'bar (cartesian 2D)',
        type: 'bar',
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
    },
    scatter: {
        name: 'scatter',
        type: 'scatter',
        isPolar: false,
        allowedParameters: [
            chartParameters.title,
            chartParameters.legend,
            chartParameters.grid,
            chartParameters.xAxis,
            chartParameters.yAxis,
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
            chartTypes.line2d,
            chartTypes.bar2d,
            chartTypes.scatter
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
            chartTypes.linePolar,
            chartTypes.pie
        ],
        allowedAxisTypes: [
            axisTypes.angle,
            axisTypes.radius
        ]
    }
}

const dimensionTypes = {
    category: 'category',
    value: 'value'
}

const seriesOptions = {
    step: [
        'none',
        'start',
        'middle',
        'end'
    ],
    symbol: [
        'circle',
        'rect',
        'roundRect',
        'triangle',
        'diamond',
        'pin',
        'arrow',
        'none'
    ],
    roseType: [
        'none',
        'radius',
        'area'
    ]
}

export {
    chartParameters,
    chartSystemTypes,
    chartTypes,
    axisTypes,
    sortTypes,
    dimensionTypes,
    seriesOptions
}
