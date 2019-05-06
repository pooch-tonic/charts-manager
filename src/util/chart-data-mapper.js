/*
* a js function that maps all the data into an echart data format.
*/

/* eslint-disable indent */
/* eslint-disable semi */
import lodash from 'lodash';
import { defaultSeries } from '@/config/chart-data'

const calculateOffset = function(axis, axisList, spacing) {
    let targetPosition = axis.position
    let relatedAxisList = _.filter(axisList, {position: targetPosition})
    relatedAxisList = _.orderBy(relatedAxisList, 'axisIndex')
    return {offset: _.indexOf(relatedAxisList, axis) * spacing, position: targetPosition}
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
        let gridAdditionalValues = {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        }

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
                let currentAxisList =  _.get(data.currentAxis[valueAxis.base.name], 'axisList')
                let currentAxisListItem = currentAxisList[entry.valueAxisIndex]
                let offsetCalcResult = calculateOffset(currentAxisListItem, currentAxisList, valueAxis.spacing)
                let valueAxisItemToPush = {
                    type: 'value',
                    name: entry.name,
                    min: entry.min,
                    max: entry.max,
                    // NOTE this condition could be optimized
                    offset: offsetCalcResult.offset,
                    position: currentAxisListItem.position,
                    axisLine: {lineStyle: {}}
                }
                valueAxisToInsert.push(valueAxisItemToPush);
                console.log(offsetCalcResult.position)
                options.grid[offsetCalcResult.position] += offsetCalcResult.offset;
                
            }
        })
        options[valueAxis.base.name] = valueAxisToInsert;
        options.series = seriesToInsert;
        // console.log('OPTIONS-ALT', options);
        return options;
    }
}