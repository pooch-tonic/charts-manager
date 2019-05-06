/*
* a js function that maps all the data into an echart data format.
*/

/* eslint-disable indent */
/* eslint-disable semi */
import lodash from 'lodash';
import { defaultSeries } from '@/config/chart-data'

const bindByChartSystem = function(entry, chartSystem, mainDimensionName) {
    let entryToInsert = {};
    let encodeToInsert = {};
    let mainAxis = null;

    chartSystem.allowedAxisTypes.forEach((axis, index) => {
        encodeToInsert[axis.name] = entry.axis[index].dimension;

        // NOTE: TEMPORARY MAPPING
        if (entry.axis[index].dimension === mainDimensionName) {
            mainAxis = axis.name + 'Axis';
        }
    });

    entryToInsert['type'] = entry.type.type;
    entryToInsert['encode'] = encodeToInsert;
    return {entryToInsert: entryToInsert, mainAxis: mainAxis};
}

const extractColumn = function(baseArray, extractIndex) {
    let extractedArray = [];
    baseArray.forEach((row) => (
        extractedArray.push(row[extractIndex])
    ))
    return extractedArray;
}

const findMainAxis = function(mainAxis) {

}

// https://ecomfe.github.io/echarts-examples/public/editor.html?c=multiple-y-axis

export default {
    mapData: function(options, data, chartSystem) {
        let seriesToInsert = [];
        let dataset = data.dataset;
        let series = data.series;
        let mainAxis = _.find(data.currentAxis, {isMain: true});
        let valueAxis = _.find(data.currentAxis, {isMain: false});
        let valueAxisToInsert = [];
        let mainArray = extractColumn(dataset.source, 0);

        _.assign(options[mainAxis.base.name][0], {
            type: 'category',
            data: mainArray
        });
        series.forEach((entry, index) => {
            if (entry.show) {
                let entryData = extractColumn(dataset.source, _.findIndex(dataset.dimensions, { name: entry.dimension }))
                let entryToPush = {
                    name: entry.name,
                    type: entry.type.type,
                    data: entryData
                };
                entryToPush[valueAxis.base.name + 'Index'] = entry.valueAxisIndex

                // enable smoothing for line series only
                if (entry.smooth > 0) {
                    entryToPush['smooth'] = entry.smooth / 100;
                }

                seriesToInsert.push(entryToPush);
                let valueAxisItemToPush = {
                    type: 'value',
                    name: entry.name,
                    min: entry.min,
                    max: entry.max,
                    // NOTE this condition could be optimized
                    offset: (entry.valueAxisIndex !== 0 ? ((entry.valueAxisIndex - 1) * valueAxis.spacing) : 0),
                    position: _.get(data.currentAxis[valueAxis.base.name], 'axisList')[entry.valueAxisIndex].position,
                    axisLine: {lineStyle: {}}
                }
                options.grid[valueAxisItemToPush.position] += valueAxis.spacing;
                valueAxisToInsert.push(valueAxisItemToPush);
                console.log(options.grid);
            }
        })
        options[valueAxis.base.name] = valueAxisToInsert;
        options.series = seriesToInsert;
        console.log('OPTIONS-ALT', options);
        return options;
    }
}