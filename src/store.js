import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getField, updateField } from 'vuex-map-fields';

export default new Vuex.Store({
    state: {
        appTitle: "Charts Manager",
        chartParameters: {
            legendAlign: "left",
            xmax: null,
            ymax: null,
        }
    },
    getters: {
        getField,
        getChartParameters: state => state.chartParameters,
    },
    mutations: {
        updateField,
        UPDATE_CHART_PARAMETERS: (state, chartParameters) => {
            Vue.set(state, 'chartParameters', chartParameters)
            // DEBUG console.log(state.chartParameters);
        }
    },
    actions: {

    }
})
