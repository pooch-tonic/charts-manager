/* eslint-disable indent */
import store from '@/store';
import Mapper from './chart-data-mapper'

export default {

    merge: function(options) {
        let chartType = store.getters.getChartType();
        let filteredOptions = {};
        options.forEach(option => {
            let content = option.content;
            let propsToInsert = {};

            if (option.name !== "series") {
                _.forEach(content, function(parentValue, key) {
                    propsToInsert[key] = parentValue.value;
                });
            } else {
                propsToInsert = content.value;
            }

            filteredOptions[option.name] = propsToInsert;
        });

        filteredOptions = Mapper.mapData(filteredOptions, chartType.type, chartType.isPolar);
        
        return filteredOptions;
    },
}