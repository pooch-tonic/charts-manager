/* eslint-disable indent */
import Vue from 'vue'
import Vuex from 'vuex'
import { chartTypes } from '@/config/chart-options'
import { defaultSeries } from '@/config/chart-data'
import lodash from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        appTitle: 'Charts Manager',
        chartConfig: {
            chartType: _.clone(chartTypes[1])
        },
        dataSort: 'none',
        series: _.clone(defaultSeries)
    },
    getters: {
        getChartConfig: function(state) {
            return () => {
                return state.chartConfig
            }
        },
        getChartType: function(state) {
            return () => {
                return state.chartConfig.chartType
            }
        },
        getSeries: function(state) {
            return () => {
                return state.series
            }
        },
        getDataSort: function(state) {
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
            state.dataSort = newDataSort;
        },
        UPDATE_SERIES: function(state, newSeries) {
            Vue.set(state.series, 'series', newSeries);
        }
    },
    actions: {

    }
})
