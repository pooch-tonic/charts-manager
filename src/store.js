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
            sort: {
                primary: {
                    type: null,
                    dataName: 'name'
                },
                secondary: {
                    type: null,
                    dataName: 'installed apps'
                }
            }
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
        getSort: function(state) {
            return () => {
                return state.chartConfig.sort
            }
        }
    },
    mutations: {
        UPDATE_SORT: function(state, newSort) {
            Vue.set(state.series, 'sort', newSort)
        },
        UPDATE_CHART_SYSTEM: function(state, newChartSystem) {
            state.chartConfig.chartSystem = newChartSystem
        },
        UPDATE_SERIES: function(state, newSeries) {
            Vue.set(state.series, 'series', newSeries)
        },
        CREATE_ENTRY: function(state, newEntry) {
            state.data.series.push(newEntry)
        },
        CREATE_AXIS: function(state, newAxis) {
            state.data.currentAxis.push(newAxis)
        }
    },
    actions: {
        createEntry({commit}, newEntry) {
            commit('CREATE_ENTRY', newEntry)
        },
        createAxis({commit}, newAxis) {
            // TODO no same names
            commit('CREATE_AXIS', newAxis)
        }
    }
})
