/*
* a js function that maps all the data into an echart data format.
*/

/* eslint-disable indent */
/* eslint-disable semi */
import lodash from 'lodash';

const calculateOffset = function(axis, axisList, spacing) {
    let targetPosition = axis.position
    let relatedAxisList = _.filter(axisList, {position: targetPosition})
    relatedAxisList = _.orderBy(relatedAxisList, 'axisIndex')
    return (_.indexOf(relatedAxisList, axis) * spacing)
}

const extractColumn = function(baseArray, extractIndex) {
    let extractedArray = [];
    baseArray.forEach((row) => (
        extractedArray.push(row[extractIndex])
    ))
    return extractedArray;
}

const findcategoryAxis = function(categoryAxis) {

}

// https://ecomfe.github.io/echarts-examples/public/editor.html?c=multiple-y-axis

export default {
    mapData: function(options, data, chartSystem) {
        let seriesToInsert = [];
        let dataset = data.dataset;
        let categories = data.categories;
        let series = data.series;
        let categoryAxis = _.find(data.currentAxis, {isMain: true});
        let valueAxis = _.find(data.currentAxis, {isMain: false});
        let categoryAxisToInsert = [];
        let valueAxisToInsert = [];
        console.log(data, categoryAxis, valueAxis);

        categories.forEach(category => {
            if (category.show) {
                let categoryData = extractColumn(dataset.source, _.findIndex(dataset.dimensions, { name: category.dimension }))
                let currentAxisList = categoryAxis.axisList
                let currentAxisListItem = currentAxisList[category.categoryAxisIndex]
                let categoryAxisItemToPush;

                if (chartSystem.name === 'polar') {
                    categoryAxisItemToPush = {
                        type: 'category',
                        data: categoryData
                    }
                } else {
                    let offsetCalcResult = calculateOffset(currentAxisListItem, currentAxisList, categoryAxis.spacing)
                    categoryAxisItemToPush = {
                        type: 'category',
                        data: categoryData,
                        offset: offsetCalcResult,
                        position: currentAxisListItem.position,
                    }
                    options.grid[currentAxisListItem.position] += offsetCalcResult;
                }
                categoryAxisToInsert.push(categoryAxisItemToPush)
            } else {
                let hiddenCategoryAxisIndex = category.categoryAxisIndex
                categories.forEach(_category => {
                    if (_category.categoryAxisIndex > hiddenCategoryAxisIndex) {
                        _category.categoryAxisIndex--
                    }
                })
            }
        })

        series.forEach(entry => {
            if (_.findIndex(chartSystem.allowedChartTypes, entry.type) < 0) {
                entry.type = chartSystem.allowedChartTypes[0]
            }

            if (entry.show) {
                let entryData = extractColumn(dataset.source, _.findIndex(dataset.dimensions, { name: entry.dimension }))
                let entryToPush = {
                    name: entry.name,
                    type: entry.type.type,
                    data: entryData,
                    coordinateSystem: chartSystem.name
                };

                if (chartSystem.name !== 'polar') {
                    entryToPush[valueAxis.base.name + 'Index'] = entry.valueAxisIndex
                }

                // enable smoothing for line series only
                if (entry.smooth > 0) {
                    entryToPush['smooth'] = entry.smooth / 100;
                }

                seriesToInsert.push(entryToPush);
                let currentAxisList = valueAxis.axisList
                let currentAxisListItem = currentAxisList[entry.valueAxisIndex]
                let valueAxisItemToPush;
                
                if (chartSystem.name === 'polar') {
                    /*valueAxisItemToPush = {
                        type: 'value',
                        name: entry.name,
                        min: entry.min,
                        max: entry.max
                    }*/
                    valueAxisToInsert = {}
                } else {
                    let offsetCalcResult = calculateOffset(currentAxisListItem, currentAxisList, valueAxis.spacing)
                    valueAxisItemToPush = {
                        type: 'value',
                        name: entry.name,
                        min: entry.min,
                        max: entry.max,
                        offset: offsetCalcResult,
                        position: currentAxisListItem.position,
                        axisLine: {lineStyle: {}}
                    }
                    options.grid[currentAxisListItem.position] += offsetCalcResult;
                    valueAxisToInsert.push(valueAxisItemToPush);
                }
            } else {
                let hiddenEntryAxisIndex = entry.valueAxisIndex
                series.forEach(_entry => {
                    if (_entry.valueAxisIndex > hiddenEntryAxisIndex) {
                        _entry.valueAxisIndex--
                    }
                })
            }
        })
        options[categoryAxis.base.name] = categoryAxisToInsert;
        options[valueAxis.base.name] = valueAxisToInsert;
        options.series = seriesToInsert;
        console.log('OPTIONS-ALT', options);
        return options;
    }
}