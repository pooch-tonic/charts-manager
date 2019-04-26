import lodash from 'lodash';
import store from '@/store';

export default {

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
}