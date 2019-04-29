/* eslint-disable indent */
import Vue from 'vue'
import Vuex from 'vuex'
import { chartTypes } from '@/config/chart-options'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        appTitle: 'Charts Manager',
        chartConfig: {
            chartType: chartTypes[1],
            currentParameters: {}
        }
    },
    getters: {
        getCurrentParameters: function (state) {
            return () => {
                return state.chartConfig.currentParameters
            }
        },
        getChartConfig: state => state.chartConfig,
        getChartType: function (state) {
            return () => {
                return state.chartConfig.chartType
            }
        },
        isParameterAllowed: function (state) {
            return (parameterName) => {
                let allowedParameters = state.chartConfig.chartType.allowedParameters
                if (allowedParameters.indexOf(parameterName) > -1) {
                    return true
                }
                return false
            }
        }
    },
    mutations: {
        UPDATE_CHART_TYPE: function (state, {field, value}) {
            Object.assign(state.chartConfig, {
                [field]: value
            })
        }
    },
    actions: {

    }
})
