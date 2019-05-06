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
            let targetAxisType = state.data.currentAxis[newAxis.base.name]
            let newAxisToPush = {
                name: newAxis.name,
                axisIndex: targetAxisType.axisList.length,
                position: _.last(newAxis.base.positions)
            }
            targetAxisType.axisList.push(newAxisToPush)
        },
        DELETE_ENTRY: function(state, entryToDelete) {
            let series = _.cloneDeep(state.data.series)
            let removedValueAxisIndex = entryToDelete.valueAxisIndex
            _.remove(series, entryToDelete)
            series.forEach(entry => {
                if (entry.valueAxisIndex > removedValueAxisIndex) {
                    entry.valueAxisIndex--
                }
            })
            Vue.set(state.data, 'series', series)
        },
        DELETE_AXIS: function(state, axisData) {
            let axisType = axisData.axisType
            let axisToDelete = axisData.axisToDelete
            let data = _.cloneDeep(state.data)
            let currentAxisType = data.currentAxis[axisType.name]
            let removedAxisIndex = axisToDelete.axisIndex
            _.remove(currentAxisType.axisList, axisToDelete)
            currentAxisType.axisList.forEach((axis) => {
                if (axis.axisIndex > removedAxisIndex) {
                    axis.axisIndex--
                }
            })
            let lastIndex = currentAxisType.axisList.length - 1
            data.series.forEach(entry => {
                if (entry.valueAxisIndex > lastIndex) {
                    _.remove(data.series, entry)
                }
            })
            Vue.set(state, 'data', data)
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
