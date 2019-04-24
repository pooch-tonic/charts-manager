<template>
    <div id="current-chart" @click="this.drawLine">
    </div>
</template>

<script>
import echarts from 'echarts'
import { mapState} from 'vuex'

export default {
    name: 'BarSimple',
    props: {
        xmax: {
            default: null,
            type: Number
        },
        ymax: {
            default: null,
            type: Number
        },
    },
    computed: {
        ...mapState([
            'chartParameters'
        ]),
    },
    mounted() {
        this.drawLine();
    },
    methods: {
        drawLine(){
            let myChart = echarts.init(document.getElementById('current-chart'))
            myChart.setOption({
                title: { text: 'Simple Bar example' },
                tooltip: {},
                xAxis: {
                    data: ["Abel","Bart","Chris","Diana","Edward","Flora"],
                    max: this.$store.state.chartParameters.xmax,
                },
                yAxis: {
                    max: this.$store.state.chartParameters.ymax,
                },
                series: [{
                    name: 'Installed apps',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
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
