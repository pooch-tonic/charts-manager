/* eslint-disable indent */
import Vue from 'vue'
import Vuex from 'vuex'
import { chartSystemTypes } from '@/config/chart-options'
import { defaultData } from '@/config/chart-data'
import lodash from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        appTitle: 'Charts Manager',
        chartConfig: {
            chartSystem: chartSystemTypes.cartesian2d,
            sortType: 'none',
            sortedData: null,
        },
        data: _.clone(defaultData)
    },
    getters: {
        getChartConfig: function(state) {
            return () => {
                return state.chartConfig
            }
        },
        getChartSystem: function(state) {
            return () => {
                return state.chartConfig.chartSystem
            }
        },
        getData: function(state) {
            return () => {
                return state.data
            }
        },
        getSortedData: function(state) {
            return () => {
                return state.chartConfig.sortedData
            }
        },
        getSortType: function(state) {
            return () => {
                return state.chartConfig.sortType
            }
        }
    },
    mutations: {
        UPDATE_SORT_TYPE: function(state, newSortType) {
            state.chartConfig.sortType = newSortType;
        },
        UPDATE_SORTED_DATA: function(state, newSortedData) {
            state.chartConfig.sortedData = newSortedData;
        },
        UPDATE_CHART_SYSTEM: function(state, newChartSystem) {
            state.chartConfig.chartSystem = newChartSystem;
        },
        UPDATE_DATA_SORT: function(state, newDataSort) {
            state.dataSort = newDataSort;
        },
        UPDATE_SERIES: function(state, newSeries) {
            Vue.set(state.series, 'series', newSeries);
        }
    },
    actions: {

    }
})
