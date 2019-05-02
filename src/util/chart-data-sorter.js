/*
* a js function that sorts a chosen dataset.
*/

/* eslint-disable indent */
/* eslint-disable semi */
import lodash from 'lodash'

const getValueByIndex = function(array, index) {
    let value = array[index]
    return value;
}

export default {

    sort: function(dataset, sortedDataName, sortType) {
        let sortedDataIndex = _.indexOf(_.map(dataset.dimensions, 'name'), sortedDataName);
        let data = dataset.source;
        console.log(sortedDataName, sortedDataIndex)

        switch (sortType) {
            case 'ascendant':
            data = _.sortBy(data, getValueByIndex(data, sortedDataIndex));
            break;
            case 'descendant':
            data = _.reverse(_.sortBy(data, getValueByIndex(data, sortedDataIndex)));
            break;
            case 'alphabetical':
            data = _.sortBy(data, getValueByIndex(data, sortedDataIndex));
            break;
            case 'none':
            default:
            break;
        }
    
        dataset.source = data;
        return dataset;
    }
}