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
            state.data.currentAxis.primaryAxis.base = newChartSystem.allowedAxisTypes[0]
            state.data.currentAxis.secondaryAxis.base = newChartSystem.allowedAxisTypes[1]
            state.data.series.forEach(entry => {
                if (_.findIndex(newChartSystem.allowedChartTypes, entry.type) < 0) {
                    entry.type = newChartSystem.allowedChartTypes[0]
                }
            })
            state.chartConfig.chartSystem = newChartSystem
        },
        CREATE_CATEGORY: function(state, newCategory) {
            state.data.categories.push(newCategory)
        },
        CREATE_ENTRY: function(state, newEntry) {
            state.data.series.push(newEntry)
        },
        CREATE_AXIS: function(state, newAxis) {
            let targetAxisType = _.find(state.data.currentAxis, {'base': newAxis.base})
            let newAxisToPush = {
                name: newAxis.name,
                axisIndex: targetAxisType.axisList.length,
                position: _.last(newAxis.base.positions)
            }
            targetAxisType.axisList.push(newAxisToPush)
        },
        CREATE_STACk: function(state, newStack) {
            state.data.stacks.push(newStack)
        },
        DELETE_CATEGORY: function(state, categoryToDelete) {
            let categories = _.cloneDeep(state.data.categories)
            let removedCategoryAxisIndex = categoryToDelete.categoryAxisIndex
            _.remove(categories, categoryToDelete)
            categories.forEach(category => {
                if (category.categoryAxisIndex > removedCategoryAxisIndex) {
                    category.categoryAxisIndex--
                }
            })
            Vue.set(state.data, 'categories', categories)
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
            let removedAxisIndex = axisToDelete.axisIndex
            _.remove(axisType.axisList, axisToDelete)
            data.series.forEach(entry => {
                if (entry.valueAxisIndex === removedAxisIndex) {
                    _.remove(data.series, entry)
                } else if (entry.valueAxisIndex > removedAxisIndex) {
                    entry.valueAxisIndex--
                }
            })
            axisType.axisList.forEach((axis) => {
                if (axis.axisIndex > removedAxisIndex) {
                    axis.axisIndex--
                }
            })
            let targetAxis
            _.forEach(data.currentAxis, (_axisType, key) => {
                if (_axisType.base.name === axisType.base.name) {
                    targetAxis = key
                }
            })
            data.currentAxis[targetAxis] = axisType
            Vue.set(state, 'data', data)
        },
        DELETE_STACK: function(state, stackToDelete) {
            let data = _.cloneDeep(state.data)
            _.remove(data.stacks, stackToDelete)
            data.series.forEach(entry => {
                if (entry.stack === stackToDelete.name) {
                    entry.stack = 'none'
                }
            })
            Vue.set(state, 'data', data)
        }
    },
    actions: {
        createCategory({commit}, newCategory) {
            commit('CREATE_CATEGORY', newCategory)
        },
        createEntry({commit}, newEntry) {
            commit('CREATE_ENTRY', newEntry)
        },
        createAxis({commit}, newAxis) {
            commit('CREATE_AXIS', newAxis)
        },
        createStack({commit}, newStack) {
            commit('CREATE_STACK', newStack)
        },
        deleteCategory({commit}, categoryToDelete) {
            commit('DELETE_CATEGORY', categoryToDelete)
        },
        deleteEntry({commit}, entryToDelete) {
            commit('DELETE_ENTRY', entryToDelete)
        },
        deleteAxis({commit}, axisData) {
            commit('DELETE_AXIS', axisData)
        },
        deleteStack({commit}, stackToDelete) {
            commit('DELETE_STACK', stackToDelete)
        }
    }
})
