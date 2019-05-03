/* eslint-disable indent */
import Vue from 'vue'
import Vuex from 'vuex'
import { chartSystemTypes } from '@/config/chart-options'
import { defaultData } from '@/config/chart-data-alt'
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
        UPDATE_CHART_SYSTEM: function(state, newChartSystem) {
            state.chartConfig.chartSystem = newChartSystem
        },
        UPDATE_SORT: function(state, newChartSystem) {

        },
        CREATE_ENTRY: function(state, newEntry) {
            state.data.series.push(newEntry)
        },
        CREATE_AXIS: function(state, newAxis) {
            state.data.currentAxis.push(newAxis)
        },
        DELETE_ENTRY: function(state, entryToDelete) {
            let data = _.cloneDeep(state.data)
            let axisIndex = entryToDelete.valueAxisIndex  
            data.series = _.pull(data.series, entryToDelete)
            console.log('WITHOUT', data.series)
            Vue.set(state, 'data', data)
            console.log(state)
        },
        DELETE_AXIS: function(state, axisData) {
            Vue.set(state.data, 'series', _.without(state.data.series, axisDataToDelete))
        }
    },
    actions: {
        createEntry({commit}, newEntry) {
            commit('CREATE_ENTRY', newEntry)
        },
        createAxis({commit}, newAxis) {
            // TODO no same names
            commit('CREATE_AXIS', newAxis)
        },
        deleteEntry({commit}, entryToDelete) {
            commit('DELETE_ENTRY', entryToDelete)
        },
        deleteAxis({commit}, axisData) {
            commit('DELETE_AXIS', axisData)
        }
    }
})
