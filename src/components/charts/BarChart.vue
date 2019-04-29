<template>
    <div id="current-chart" @click="this.redraw">
    </div>
</template>

<script>
import echarts from 'echarts'
import store from '@/store'
import { mapState, mapGetters} from 'vuex'
import merger from '@/util/chart-options-merger'

export default {
    name: 'BarChart',
    computed: {
        getChartTypeUpdates() {
            return store.getters.getChartConfig().chartType
        },
        ...mapGetters([
            'getChartConfig',
        ]),
    },
    mounted() {
        this.drawLine();
    },
    methods: {
        redraw() {
            this.dispose();
            this.drawLine();
        },
        dispose() {
            console.log('DISPOSE');
            echarts.dispose(document.getElementById('current-chart'));
        },
        drawLine(){
            let myChart = echarts.init(document.getElementById('current-chart'))
            let vm = this;
            let cc = vm.getChartConfig();
            let ct = cc.chartType;
            let options = merger.merge(ct.allowedParameters);
            console.log("STORE: ", cc.chartType);
            console.log("MERGED: ",options);
            myChart.setOption(options);
        },
    },
    watch: {
        getChartTypeUpdates: {
            handler: function(getChartTypeUpdates, oldGetChartTypeUpdates) {
                this.redraw();
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
