/*
* a js function that sorts a chosen dataset.
*/

/* eslint-disable indent */
/* eslint-disable semi */
import lodash from 'lodash'

const createStackSortingArray = function(array, mainIndexes) {
    let sortingArray = []
    array.forEach((item, index) => {
        sortingArray.push({
            id: index,
            totalValue: (function() {
                let total = 0;
                mainIndexes.forEach((mainIndex) => (
                    total += item[mainIndex]
                ))
                return total
            })()
        })
    })
    return sortingArray
}

const createDimensionsSortingArray = function(array, mainIndexes) {
    let sortingArray = []
    array.forEach((item, index) => {
        sortingArray.push({
            id: index,
            primaryValue: item[mainIndexes.primary],
            secondaryValue: item[mainIndexes.secondary]
        })
    })
    return sortingArray
}

const createFinalArray = function(array, sortingArray) {
    let finalArray = []
    sortingArray.forEach((row) => {
        finalArray.push(array[row.id]);
    })
    return finalArray
}

export default {

    sort: function(data, sort) {
        let datasetCopy = _.cloneDeep(data.dataset)
        let currentMode = sort.primary.data.dataType
        
        if (sort.primary.type !== null) {
            if (currentMode === 'dimension') {
                let sortedDataIndexes = { 
                    primary: _.indexOf(_.map(datasetCopy.dimensions, 'name'), sort.primary.data.dataName),
                    secondary: _.indexOf(_.map(datasetCopy.dimensions, 'name'), sort.secondary.data.dataName)
                }
                let sortingArray = createDimensionsSortingArray(datasetCopy.source, sortedDataIndexes)
    
                if (sort.secondary.type !== null) {
                    sortingArray = _.orderBy(sortingArray, function(o) { return [o.primaryValue, o.secondaryValue] }, [sort.primary.type, sort.secondary.type])
                } else {
                    sortingArray = _.orderBy(sortingArray, function(o) { return o.primaryValue }, sort.primary.type)
                }
                datasetCopy.source = createFinalArray(datasetCopy.source, sortingArray)
            } else {
                sort.secondary.type = null
                let selectedStack = sort.primary.data.dataName
                let stackedDimensionNames = _.map(_.filter(data.series, {stack: selectedStack}), 'dimension')
                let stackedDimensionIndexes = []
                let dimensionNames = _.map(datasetCopy.dimensions, 'name')
    
                stackedDimensionNames.forEach((name, index) => {
                    let correspondingIndex = _.indexOf(dimensionNames, name)
                    if (_.find(stackedDimensionIndexes, correspondingIndex) === undefined) {
                        stackedDimensionIndexes.push(correspondingIndex)
                    }
                })
                let sortingArray = createStackSortingArray(datasetCopy.source, stackedDimensionIndexes)
                sortingArray = _.orderBy(sortingArray, function(o) { return o.totalValue }, sort.primary.type)
                datasetCopy.source = createFinalArray(datasetCopy.source, sortingArray)
            }
        } else {
            sort.secondary.type = null
        }

        return datasetCopy
    }
}