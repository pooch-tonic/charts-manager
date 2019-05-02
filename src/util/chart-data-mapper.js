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
        let series = data.series
        console.log(dataset);
        let mainAxis = _.find(data.currentAxis, {isMain: true});
        let mainArray = extractColumn(dataset.source, 0)

        _.assign(options[mainAxis.base.name][0], {type: 'category', data: mainArray});
        series.forEach((entry, index) => {
            if (entry.show) {
                let entryToInsert = {};
                entryToInsert['name'] = entry.name;
                entryToInsert['type'] = entry.type.type;
                entryToInsert['data'] = extractColumn(dataset.source, _.findIndex(dataset.dimensions, entry.dimension));
                seriesToInsert.push(entryToInsert);
            }
        })

        options.series = seriesToInsert;
        console.log(dataset);
        console.log('OPTIONS-ALT', options);
        return options;
    }
}