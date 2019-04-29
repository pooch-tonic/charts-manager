/*
* a js function that maps all the data into an echart data format.
*/

/* eslint-disable indent */
import lodash from 'lodash';
import ChartData from '@/config/chart-data'

const defaultData = ChartData.defaultData;

const assignToSeriesItem = function(item, coordinateSystemName, chartTypeName, defaultData) {
    _.assign(item, {coordinateSystem: coordinateSystemName});
    _.assign(item, {name: defaultData.name});
    _.assign(item, {type: chartTypeName});
    _.assign(item, {data: _.map(defaultData.data, 'value')});
    return item;
}

const assignToAxis = function(options, axisName) {
    _.assign(options[axisName], {data: _.map(defaultData.data, 'property')})
    return options;
}

export default {
    mapData: function(options, chartTypeName, isPolar, dataSortType) {
        let series = options.series;
        if (isPolar) {
            series.forEach(item => assignToSeriesItem(item, 'polar', chartTypeName, defaultData));
            assignToAxis(options, 'angleAxis');
        } else {
            series.forEach(item => assignToSeriesItem(item, 'cartesian2d', chartTypeName, defaultData));
            assignToAxis(options, 'xAxis');
        }

        return options;
    }
}