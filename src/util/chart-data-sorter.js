/*
* a js function that sorts a chosen dataset.
*/

/* eslint-disable indent */
/* eslint-disable semi */
import lodash from 'lodash'

const createSortingArray = function(array, mainIndexes) {
    let sortingArray = [];
    array.forEach((item, index) => {
        sortingArray.push({
            id: index,
            primaryValue: item[mainIndexes.primary],
            secondaryValue: item[mainIndexes.secondary]
        })
    });
    return sortingArray;
}

const createFinalArray = function(array, sortingArray) {
    let finalArray = [];
    sortingArray.forEach((row) => {
        finalArray.push(array[row.id]);
    });
    return finalArray;
}

export default {

    sort: function(datasetCopy, sort) {
        
        if (sort.primary.type !== null) {
            let sortedDataIndexes = { 
                primary: _.indexOf(_.map(datasetCopy.dimensions, 'name'), sort.primary.dataName),
                secondary: _.indexOf(_.map(datasetCopy.dimensions, 'name'), sort.secondary.dataName)
            };
            let sortingArray = createSortingArray(datasetCopy.source, sortedDataIndexes);

            if (sort.secondary.type !== null) {
                sortingArray = _.orderBy(sortingArray, function(o) { return [o.primaryValue, o.secondaryValue] }, [sort.primary.type, sort.secondary.type]);
            } else {
                sortingArray = _.orderBy(sortingArray, function(o) { return o.primaryValue }, sort.primary.type);
            }
            datasetCopy.source = createFinalArray(datasetCopy.source, sortingArray);
        } else {
            sort.secondary.type = null;
        }

        return datasetCopy;
    }
}