/* eslint-disable indent */
import Vue from 'vue'
import Vuex from 'vuex'
import { chartTypes } from '@/config/chart-options'
import lodash from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        appTitle: 'Charts Manager',
        chartConfig: {
            chartType: _.clone(chartTypes[1]),
        },
        dataSort: null
    },
    getters: {
        getChartConfig: function(state) {
            return () => {
                return state.chartConfig
            }
        },
        getChartType: function (state) {
            return () => {
                return state.chartConfig.chartType
            }
        },
        getDataSort: function (state) {
            return () => {
                return state.dataSort
            }
        }
    },
    mutations: {
        UPDATE_CHART_TYPE: function (state, newChartType) {
            Vue.set(state.chartConfig, 'chartType', newChartType)
        },
        UPDATE_DATA_SORT: function (state, newDataSort) {
            Vue.set(state.dataSort, 'dataSort', newDataSort)
        }
    },
    actions: {

    }
})
