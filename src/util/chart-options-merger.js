/* eslint-disable indent */
import lodash from 'lodash';
import store from '@/store';

export default {

    /* OLD FILTER FUNCTION
    merge: function(options) {
        let chartType = store.getters.getChartType();
        let filteredOptions = {};
        options.forEach(option => {
            if (store.getters.isParameterAllowed(option.name)) {
                _.merge(filteredOptions, option.content);
            }
        });

        if (chartType.isPolar) {
            let series = filteredOptions.series;
            series.forEach(item => {
                _.assign(item, {coordinateSystem: "polar"});
            })
        }

        return filteredOptions
    },
    */

   merge: function(options) {
        let chartType = store.getters.getChartType();
        let filteredOptions = {};
        options.forEach(option => {
            let content = option.content;
            let propsToInsert = {};

            if (option.name !== "series") {
                _.forEach(content, function(parentvalue, key) {
                    propsToInsert[key] = parentvalue.value;
                });
            } else {
                propsToInsert = content.value;
            }

            filteredOptions[option.name] = propsToInsert;
        });

        let series = filteredOptions.series;
        if (chartType.isPolar) {
            series.forEach(item => {
                _.assign(item, {coordinateSystem: "polar"});
                _.assign(item, {type: chartType.type});
            })
        } else {
            series.forEach(item => {
                _.assign(item, {type: chartType.type});
            })
        }

        return filteredOptions;
    },
}