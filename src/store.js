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
    mutations: {
        UPDATE_CHART_PARAMETERS: (state, chartParameters) => {
            state.chartParameters = chartParameters
        }
    },
    actions: {

    }
})
