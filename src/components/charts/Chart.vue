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
    name: 'Chart',
    computed: {
        getChartSystemUpdates() {
            return this.getChartSystem()
        },
        getSortedDataUpdates() {
            return this.getSortedData()
        },
        getSortTypeUpdates() {
            return this.getSortType()
        },
        getDataUpdates() {
            return this.getData()
        },
        ...mapGetters([
            'getChartSystem',
            'getSortedData',
            'getSortType',
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
        dispose() {
            // DEBUG console.log('DISPOSE');
            echarts.dispose(document.getElementById('current-chart'));
        },
        drawLine(){
            let myChart = echarts.init(document.getElementById('current-chart'));
            let vm = this;
            let cs = vm.getChartSystem();
            let st = vm.getSortType();
            let sd = vm.getSortedData();
            let data = vm.getData();
            
            console.log(this.$store);

            let options = merger.merge(cs.allowedParameters);
            options = mapper.mapData(options, data, cs.name);
            // DEBUG console.log("STORE: ", cc.chartType);
            // DEBUG console.log("MERGED: ",options);
            console.log(options);
            myChart.setOption(options);
        },
    },
    watch: {
        getChartSystemUpdates: {
            handler: function(getChartSystemUpdates, oldGetChartSystemUpdates) {
                this.redraw();
            },
            deep: true,
        },
        getSortedDataUpdates: {
            handler: function(getSortedDataUpdates, oldGetSortedDataUpdates) {
                this.redraw();
            }
        },
        getSortTypeUpdates: {
            handler: function(getSortTypeUpdates, oldGetSortTypeUpdates) {
                this.redraw();
            }
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
