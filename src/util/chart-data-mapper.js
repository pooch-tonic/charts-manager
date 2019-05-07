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

const getFirstValueFromObject = function(object) {
    let result;
    for (let index = 0; index < 1; index++) {
      let key = Object.keys(object)[0];
      result = object[key];
    }
    return result;
}

// https://ecomfe.github.io/echarts-examples/public/editor.html?c=multiple-y-axis

export default {
    mapData: function(options, data, chartSystem) {
        let seriesToInsert = [];
        let dataset = data.dataset;
        let categories = data.categories;
        let series = data.series;
        let stacks = data.stacks;
        let categoryAxis = data.currentAxis[data.categoryAxis];
        let valueAxisKey = (data.categoryAxis === 'primaryAxis' ? 'secondaryAxis' : 'primaryAxis');
        let valueAxis = data.currentAxis[valueAxisKey];
        let categoryAxisToInsert = [];
        let valueAxisToInsert = [];

        console.log(data)
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
            if (entry.show) {
                let entryData = extractColumn(dataset.source, _.findIndex(dataset.dimensions, { name: entry.dimension }))
                let entryToPush = {
                    name: entry.name,
                    type: entry.type.type,
                    data: entryData,
                    coordinateSystem: chartSystem.name,
                    symbol: entry.symbol
                };

                if (entry.stack !== 'none') {
                    let referenceStack = _.find(stacks, {name: entry.stack});
                    if (referenceStack !== undefined && referenceStack.show) {
                        entryToPush['stack'] = entry.stack;
                    }
                }

                if (chartSystem.name !== 'polar') {
                    entryToPush[valueAxis.base.name + 'Index'] = entry.valueAxisIndex;
                }

                // enable options for line series only
                if (entry.type.type === 'line') {
                    entryToPush['smooth'] = entry.smooth / 100;

                    if (entry.areaStyle) {
                        entryToPush['areaStyle'] = {};
                    }

                    if (entry.step !== 'none') {
                        entryToPush['step'] = entry.step;
                    }
                }

                seriesToInsert.push(entryToPush);
                let currentAxisList = valueAxis.axisList;
                let currentAxisListItem = currentAxisList[entry.valueAxisIndex];
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
                    let offsetCalcResult = calculateOffset(currentAxisListItem, currentAxisList, valueAxis.spacing);
                    valueAxisItemToPush = {
                        type: 'value',
                        name: entry.name,
                        min: entry.min,
                        max: entry.max,
                        offset: offsetCalcResult,
                        position: currentAxisListItem.position,
                        axisLine: {lineStyle: {}}
                    };
                    options.grid[currentAxisListItem.position] += offsetCalcResult;
                    valueAxisToInsert.push(valueAxisItemToPush);
                }
            } else {
                let hiddenEntryAxisIndex = entry.valueAxisIndex;
                series.forEach(_entry => {
                    if (_entry.valueAxisIndex > hiddenEntryAxisIndex) {
                        _entry.valueAxisIndex--;
                    }
                });
            }
        });
        options[categoryAxis.base.name] = categoryAxisToInsert;
        options[valueAxis.base.name] = valueAxisToInsert;
        options.series = seriesToInsert;
        console.log('OPTIONS-ALT', options);
        return options;
    }
}