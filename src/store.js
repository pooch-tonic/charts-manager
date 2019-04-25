import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        appTitle: "Charts Manager",
        chartParameters: {
            titleAlign: "center",
            xmax: null,
            ymax: null,
        }
    },
    getters: {
        getChartParameters: state => state.chartParameters,
    },
    mutations: {
        UPDATE_CHART_PARAMETERS: (state, chartParameters) => {
            Vue.set(state, 'chartParameters', chartParameters)
            // DEBUG console.log(state.chartParameters);
        }
    },
    actions: {

    }
})
