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
                seriesToInsert.push({
                    name: entry.name,
                    type: entry.type.type,
                    data: entryData,
                    xAxisIndex: entry.xAxisIndex,
                    yAxisIndex: entry.yAxisIndex
                });
                valueAxisToInsert.push({
                    type: 'value',
                    name: entry.name,
                    min: entry.min,
                    max: entry.max,
                    offset: (entry.yAxisIndex !== 0 ? ((entry.yAxisIndex - 1) * 80) : 0),
                    position: entry.position,
                    axisLine: {lineStyle: {}}
                });
                console.log(valueAxisToInsert)
            }
        })
        options[valueAxis.base.name] = valueAxisToInsert;
        options.series = seriesToInsert;
        console.log('OPTIONS-ALT', options);
        return options;
    }
}