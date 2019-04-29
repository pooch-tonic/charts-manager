/*
* a js function that maps all the data into an echart data format.
*/

/* eslint-disable indent */
import lodash from 'lodash';
import { defaultSeries } from '@/config/chart-data'

const assignToSeriesItem = function(index, dataset, coordinateSystemName, chartTypeName, options) {
    options.series[index] = dataset
    console.log("HERE",options);
    return options;
}

const assignToAxis = function(index, dataset, options, axisName) {
    _.assign(options[axisName], {data: _.map(dataset.data, 'property')})

    return options;
}

const getSortedData = function(dataSortType) {
    
    switch(dataSortType) {
        case 'ascendant':
        result = _.sortBy(result, ['value', 'property'])
        break;
        case 'descendant':
        result = _.reverse(_.sortBy(result, ['value', 'property']))
        break;
        case 'alphabetical':
        result = _.sortBy(result, ['property', 'value'])
        break;
        case 'none':
        default:
        break;
    }
    return result;
}

export default {
    mapData: function(options, chartTypeName, isPolar, dataSortType, series) {
        options['series'] = [];
        if (isPolar) {
            series.forEach((dataset, index) => assignToSeriesItem(index, dataset, 'polar', chartTypeName, options));
            //assignToAxis(0, options, 'angleAxis');
        } else {
            series.forEach((dataset, index) => assignToSeriesItem(index, dataset, 'cartesian2d', chartTypeName, options));
            //assignToAxis(0, options, 'xAxis');
        }
        console.log(options);
        return options;
    }
}