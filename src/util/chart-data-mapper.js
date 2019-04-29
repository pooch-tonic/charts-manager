/*
* a js function that maps all the data into an echart data format.
*/

/* eslint-disable indent */
import lodash from 'lodash';
import ChartData from '@/config/chart-data'

const defaultData = ChartData.defaultData;

const assignToSeriesItem = function(item, coordinateSystemName, chartTypeName, sortedData) {
    _.assign(item, {coordinateSystem: coordinateSystemName});
    _.assign(item, {name: defaultData.name});
    _.assign(item, {type: chartTypeName});
    _.assign(item, {data: _.map(sortedData, 'value')});
    return item;
}

const assignToAxis = function(options, axisName) {
    _.assign(options[axisName], {data: _.map(defaultData.data, 'property')})
    return options;
}

const getSortedData = function(dataSortType) {
    let sortedData = _.clone(defaultData.data);

    switch(dataSortType) {
        case 'ascendant':
        sortedData = _.sortBy(sortedData, ['value', 'property'])
        break;
        case 'descendant':
        sortedData = _.reverse(_.sortBy(sortedData, ['value', 'property']))
        break;
        case 'none':
        default:
        break;
    }
    return sortedData;
}

export default {
    mapData: function(options, chartTypeName, isPolar, dataSortType) {
        let series = options.series;
        let sortedData = getSortedData(dataSortType);
        if (isPolar) {
            series.forEach(item => assignToSeriesItem(item, 'polar', chartTypeName, sortedData));
            assignToAxis(options, 'angleAxis');
        } else {
            series.forEach(item => assignToSeriesItem(item, 'cartesian2d', chartTypeName, sortedData));
            assignToAxis(options, 'xAxis');
        }

        console.log(options);
        return options;
    }
}