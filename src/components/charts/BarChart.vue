<template>
    <div id="current-chart" @click="this.redraw">
    </div>
</template>

<script>
import echarts from 'echarts'
import { mapState, mapGetters} from 'vuex'
import merger from '@/util/chart-options-merger'
import mapper from '@/util/chart-data-mapper'

export default {
    name: 'BarChart',
    computed: {
        getChartTypeUpdates() {
            return this.getChartConfig().chartType
        },
        getDataSortUpdates() {
            return this.getDataSort()
        },
        getSeriesUpdates() {
            return this.getSeries()
        },
        ...mapGetters([
            'getChartConfig',
            'getDataSort',
            'getSeries'
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
            // DEBUG console.log('DISPOSE');
            echarts.dispose(document.getElementById('current-chart'));
        },
        drawLine(){
            let myChart = echarts.init(document.getElementById('current-chart'));
            let vm = this;
            let cc = vm.getChartConfig();
            let ds = vm.getDataSort();
            let se = vm.getSeries();
            let ct = cc.chartType;
            
            console.log(this.$store);

            let options = merger.merge(ct.allowedParameters, ds);
            options = mapper.mapData(options, ct.type, ct.isPolar, ds, se);
            // DEBUG console.log("STORE: ", cc.chartType);
            // DEBUG console.log("MERGED: ",options);
            myChart.setOption(options);
        },
    },
    watch: {
        getChartTypeUpdates: {
            handler: function(getChartTypeUpdates, oldGetChartTypeUpdates) {
                this.redraw();
            },
            deep: true,
        },
        getDataSortUpdates: {
            handler: function(getDataSortUpdates, oldGetDataSortUpdates) {
                this.redraw();
            }
        },
        getSeriesUpdates: {
            handler: function(getSeriesUpdates, oldGetSeriesUpdates) {
                this.redraw();
            },
            deep: true,
        },
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
