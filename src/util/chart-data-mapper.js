/*
* a js function that maps all the data into an echart data format.
*/

/* eslint-disable indent */
import lodash from 'lodash';
import { defaultSeries } from '@/config/chart-data'

const assignToSeriesItem = function(index, dataset, coordinateSystemName, chartTypeName, options) {
    dataset['type'] = chartTypeName;
    dataset['coordinateSystem'] = coordinateSystemName;
    options.series[index] = dataset;
    return options;
}

const assignToAxis = function(dataset, options, axisName) {
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
            series.forEach((dataset, index) => {
                if (dataset.show) {
                    assignToSeriesItem(index, dataset, 'polar', chartTypeName, options);
                    assignToAxis(dataset, options, 'angleAxis');
                }
            })
        } else {
            series.forEach((dataset, index) => {
                if (dataset.show) {
                    assignToSeriesItem(index, dataset, 'cartesian2d', chartTypeName, options);
                    assignToAxis(dataset, options, 'xAxis');
                }
            })
        }
        return options;
    }
}