import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getField, updateField } from 'vuex-map-fields';
import { chartTypes } from '@/config/chart-options';

export default new Vuex.Store({
    state: {
        appTitle: "Charts Manager",
        chartConfig: {
            chartType: chartTypes[1],
            currentParameters: {},
        },
    },
    getters: {
        getField,
        getCurrentParameters: function(state) {
            return () => {
                return state.chartConfig.currentParameters;
            }
        },
        getChartConfig: state => state.chartConfig,
        getChartType: function(state) {
            return () => {
                return state.chartConfig.chartType;
            }
        },
        isParameterAllowed: function(state) {
            return (parameterName) => {
                let allowedParameters = state.chartConfig.chartType.allowedParameters;
                if (allowedParameters.indexOf(parameterName) > -1) {
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
