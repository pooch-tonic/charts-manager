/*
* a js function that maps all the data into an echart data format.
*/

/* eslint-disable indent */
/* eslint-disable semi */
import lodash from 'lodash';
import { defaultSeries } from '@/config/chart-data'

const bindByChartSystem = function(entry, chartSystem, mainCategoryName) {
    let entryToInsert = {};
    let encodeToInsert = {};
    let categoryAxis = null;

    chartSystem.allowedAxisTypes.forEach((axis, index) => {
        encodeToInsert[_.replace(axis.name, 'Axis', '')] = entry.axis[index].dimension;

        // NOTE: TEMPORARY MAPPING
        if (entry.axis[index].dimension === mainCategoryName) {
            categoryAxis = axis.name;
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
                    categoryAxis = _.replace(result.categoryAxis, 'Axis', '');
                }
                
                seriesToInsert.push(result.entryToInsert);
            }
        });

        if (categoryAxis !== null) {
            options[categoryAxis + 'Axis'].forEach(item => (
                _.assign(item, {type: 'category'})
            ))
        }
        
        options.series = seriesToInsert;
        return options;
    }
}