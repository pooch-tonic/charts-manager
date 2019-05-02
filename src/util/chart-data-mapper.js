/*
* a js function that maps all the data into an echart data format.
*/

/* eslint-disable indent */
/* eslint-disable semi */
import lodash from 'lodash';
import { defaultSeries } from '@/config/chart-data'

/*const assignToCoordinateSystem = function(dataset, coordinateSystemName) {
    dataset['coordinateSystem'] = coordinateSystemName;
    return dataset;
}

const assignToType = function(dataset, typeName) {
    dataset['type'] = typeName;
    return dataset;
}

const assignToAxis = function(dataset, options) {
    let axisName = 'xAxis'
    let axisObject = null;
    let mappedData = [];

    if (dataset.type.isPolar) {
        axisName = 'radiusAxis'
    }

    mappedData = _.map(dataset.data, 'property')
    axisObject = _.get(options, axisName);
    axisObject['data'] = mappedData;
    options[axisName] = axisObject
}

const removeKeys = function(dataset, keysToRemove) {
    keysToRemove.forEach((keyName) => (
        dataset = _.omit(dataset, keyName)
    ))
    return dataset;
}

const pushDatasetToOptions = function(dataset, options) {
    options.series.push(dataset);
}

const assignToOptions = function(dataset, options) {
    let typeObject = dataset.type;
    let coordinateSystem = 'cartesian2d';
    let datasetClone = _.clone(dataset);

    if (typeObject.isPolar) {
        coordinateSystem = 'polar';
    }

    datasetClone = assignToCoordinateSystem(datasetClone, coordinateSystem);
    datasetClone = assignToType(datasetClone, typeObject.type);
    datasetClone = removeKeys(datasetClone, ['show', 'sort']);
    pushDatasetToOptions(datasetClone, options);
}

const getSortedData = function(dataset) {
    let sortType = dataset.sort;
    let data = dataset.data;

    switch(sortType) {
        case 'ascendant':
        data = _.sortBy(data, ['value', 'property']);
        break;
        case 'descendant':
        data = _.reverse(_.sortBy(data, ['value', 'property']));
        break;
        case 'alphabetical':
        data = _.sortBy(data, ['property', 'value']);
        break;
        case 'none':
        default:
        break;
    }

    dataset.data = data;
    return dataset;
}*/

const bindByChartSystem = function(entry, chartSystem, mainCategoryName) {
    let entryToInsert = {};
    let encodeToInsert = {};
    let categoryAxis = null;

    chartSystem.allowedAxisTypes.forEach((axis, index) => {
        encodeToInsert[axis.name] = entry.axis[index].dimension;

        // NOTE: TEMPORARY MAPPING
        if (entry.axis[index].dimension === mainCategoryName) {
            categoryAxis = axis.name + 'Axis';
        }
    });

    entryToInsert['type'] = entry.type.type;
    entryToInsert['encode'] = encodeToInsert;
    return {entryToInsert: entryToInsert, categoryAxis: categoryAxis};
}

export default {
    mapData: function(options, data, chartSystem) {
        let datasetToInsert = {};
        let seriesToInsert = [];
        let dimensions = data.dataset.dimensions;
        let mainCategoryName = dimensions[0].name;
        let categoryAxis = null;


        datasetToInsert['source'] = data.dataset.source;
        datasetToInsert['dimensions'] = _.map(dimensions, 'name');

        options['dataset'] = datasetToInsert;

        data.series.forEach(entry => {
            if (entry.show) {
                let result = bindByChartSystem(entry, chartSystem, mainCategoryName);

                if (result.categoryAxis !== null) {
                    categoryAxis = result.categoryAxis;
                }
                
                seriesToInsert.push(result.entryToInsert);
            }
        });

        if (categoryAxis !== null) {
            options[categoryAxis] = _.assign(options[categoryAxis], {type: 'category'});
        }
        
        options.series = seriesToInsert;

        console.log('OPTIONS', options);
        return options;
    }
}