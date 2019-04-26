import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getField, updateField } from 'vuex-map-fields';
import chartOptions from '@/config/chart-options';

export default new Vuex.Store({
    state: {
        appTitle: "Charts Manager",
        chartParameters: {
            chartType: chartOptions.chartTypes[0],
            legendAlign: "left",
            xmax: null,
            ymax: null,
        },
    },
    getters: {
        getField,
        getChartParameters: state => state.chartParameters,
        getChartType: function(state) {
            return () => {
                return state.chartParameters.chartType;
            }
        },
        isParameterAllowed: function(state) {
            return (parameterName) => {
                if (state.chartParameters.chartType.allowedParameters.indexOf(parameterName) > -1) {
                    return true;
                }
                return false;
            }
        }
    },
    mutations: {
        updateField,
    },
    actions: {

    }
})
