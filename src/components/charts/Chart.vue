<template>
    <div id="current-chart" @click="this.redraw">
    </div>
</template>

<script>
import echarts from 'echarts'
import { mapState, mapGetters} from 'vuex'
import merger from '@/util/chart-options-merger'
import datasetMapper from '@/util/chart-dataset-mapper'
import dataMapper from '@/util/chart-data-mapper'
import sorter from '@/util/chart-data-sorter'
import lodash from 'lodash'
import { defaultData } from '@/config/chart-data-alt.js'

export default {
    name: 'Chart',
    computed: {
        getChartSystemUpdates() {
            return this.getChartSystem()
        },
        getSortUpdates() {
            return this.getSort()
        },
        getDataUpdates() {
            return this.getData()
        },
        ...mapGetters([
            'getChartSystem',
            'getSort',
            'getData'
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
        /*throttledRedraw() {
            _.throttle(this.redraw, 500);
        },*/
        dispose() {
            // DEBUG console.log('DISPOSE');
            echarts.dispose(document.getElementById('current-chart'));
        },
        drawLine(){
            let myChart = echarts.init(document.getElementById('current-chart'));
            let vm = this;
            let cs = vm.getChartSystem();
            let st = vm.getSort();
            let data = _.cloneDeep(vm.getData());
            let options = merger.merge(cs.allowedParameters);
            let optionsAlt = _.cloneDeep(options);
            data.dataset = sorter.sort(data.dataset, st);
            options = datasetMapper.mapData(options, data, cs);
            optionsAlt = dataMapper.mapData(optionsAlt, defaultData, cs);
            // DEBUG console.log("STORE: ", cc.chartType);
            // DEBUG console.log("MERGED: ",options);
            myChart.setOption(optionsAlt);
        },
    },
    watch: {
        getChartSystemUpdates: {
            handler: function(getChartSystemUpdates, oldGetChartSystemUpdates) {
                this.redraw();
            },
            deep: true,
        },
        getSortUpdates: {
            handler: function(getSortUpdates, oldGetSortUpdates) {
                this.redraw();
            },
            deep: true,
        },
        getDataUpdates: {
            handler: function(getDataUpdates, oldGetDataUpdates) {
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
