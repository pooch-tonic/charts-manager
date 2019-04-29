/* eslint-disable indent */
import store from '@/store'
import Mapper from './chart-data-mapper'

export default {

    merge: function(options, dataSortType) {
        let chartType = store.getters.getChartType();
        let filteredOptions = {};
        options.forEach(option => {
            let content = option.content;
            let propsToInsert = {};

            _.forEach(content, function(parentValue, key) {
                if (parentValue.type === 'number' && parentValue.value === '') {
                    propsToInsert[key] = null;
                } else {
                    propsToInsert[key] = parentValue.value;
                }
            });

            filteredOptions[option.name] = propsToInsert;
        });
        return filteredOptions;
    },
}