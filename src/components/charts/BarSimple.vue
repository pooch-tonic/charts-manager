<template>
    <div id="current-chart" @click="this.drawLine">
    </div>
</template>

<script>
import echarts from 'echarts'
import store from '@/store'
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'BarSimple',
    computed: {
        getChartParametersUpdates() {
            return store.getters.getChartParameters
        }
    },
    mounted() {
        this.drawLine();
    },
    methods: {
        ...mapGetters([
            'getChartParameters'
        ]),
        adjustChartParameters(chartParameters) {
            if (!chartParameters.xmax) {
                chartParameters.xmax = null;
            }
            if (!chartParameters.ymax) {
                chartParameters.ymax = null;
            }
            return chartParameters;
        },
        drawLine(){
            let myChart = echarts.init(document.getElementById('current-chart'))
            let vm = this;
            //DEBUG console.log("store state: " + vm.$store.state.chartParameters.xmax, vm.$store.state.chartParameters.ymax);
            //DEBUG console.log("component: " + vm.getxmax(), vm.getymax());
            myChart.setOption({
                title: { text: 'Simple Bar example' },
                tooltip: {},
                legend: {
                    align: vm.getChartParameters().legendAlign,
                },
                angleAxis: {
                    type: 'value',
                    startAngle: 0
                },
                xAxis: {
                    data: ["Abel","Bart","Chris","Diana","Edward","Flora"],
                    max: vm.adjustChartParameters(vm.getChartParameters()).xmax,
                },
                yAxis: {
                    max: vm.adjustChartParameters(vm.getChartParameters()).ymax,
                },
                series: [{
                    name: 'Installed apps',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }
    },
    watch: {
        getChartParametersUpdates: {
            handler: function(getChartParametersUpdates, oldGetChartParametersUpdates) {
                this.drawLine();
            },
            deep: true,
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    font-weight: normal;
}
a {
    color: #42b983;
}
#current-chart {
    height: 100%;
    width: 100%;
}
</style>
