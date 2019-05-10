/* eslint-disable indent */
import Vue from 'vue'
import store from '@/store'
import lodash from 'lodash'
import { chartSystemTypes } from '@/config/chart-options'

const importData = function(storeDataCopy, newData) {
    storeDataCopy.dataset.source = newData.data
    storeDataCopy.title = newData.title
    newData.dimensions.forEach((dimension, index) => {
        if (storeDataCopy.dataset.dimensions[index] !== undefined) {
            storeDataCopy.dataset.dimensions[index].name = dimension
        } else {
            storeDataCopy.dataset.dimensions.push({ name: dimension, type: 'value' })
        }
    })
    return storeDataCopy
}

const importConf = function(storeDataCopy, storeChartSystemCopy, newConf) {
    storeDataCopy.categories = []
    storeDataCopy.series = []

    newConf.bindings.forEach((binding, index) => {
        let refDimension = _.find(storeDataCopy.dataset.dimensions, { name: binding.name })
        refDimension.type = binding.type

        if (binding.type === 'value') {
            let confToMerge = _.find(newConf.series, { dimension: binding.name })
            let entryToPush = _.merge({ dimension: binding.name, valueAxisIndex: binding.axisIndex }, confToMerge)
            storeDataCopy.series.push(entryToPush)
        } else {
            let confToMerge = _.find(newConf.categories, { dimension: binding.name })
            let categoryToPush = _.merge({ dimension: binding.name, categoryAxisIndex: binding.axisIndex }, confToMerge)
            storeDataCopy.categories.push(categoryToPush)
        }
    })

    storeDataCopy.stacks = newConf.stacks
    storeDataCopy.currentAxis = newConf.axis
    storeChartSystemCopy = chartSystemTypes[newConf.coordinateSystem]

    return { storeData: storeDataCopy, storeChartSystem: storeChartSystemCopy }
}

export const importChart = function(storeData, storeChartSystem, newData, newConf) {
    console.log(newData, newConf)

    if (newConf !== null && newConf !== undefined) {
        let storeDataCopy = _.cloneDeep(storeData)
        let storeChartSystemCopy = _.cloneDeep(storeChartSystem)
        let res = importConf(storeDataCopy, storeChartSystemCopy, newConf)
        Vue.set(store.state, 'data', res.storeData)
        Vue.set(store.state.chartConfig, 'chartSystem', res.storeChartSystem)
        return true
    } else if (newData !== null && newData !== undefined) { 
        let storeDataCopy = _.cloneDeep(storeData)
        let res = importData(storeDataCopy, newData)
        Vue.set(store.state, 'data', res)
        return true
    } 
    return false
}