<template>
    <div id="current-chart" @click="this.drawLine">
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
        getChartParametersUpdates() {
            return store.getters.getChartParameters
        },
        ...mapGetters([
            'isParameterAllowed',
            'getChartType',
        ]),
    },
    mounted() {
        this.drawLine();
    },
    methods: {
        ...mapGetters([
            'getChartParameters',
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
        dispose() {
            console.log('DISPOSE');
            echarts.dispose(document.getElementById('current-chart'));
        },
        drawLine(){
            let myChart = echarts.init(document.getElementById('current-chart'))
            let vm = this;
            let cp = vm.getChartParameters();
            let ct = vm.getChartType();
            console.log("drawline called");
            
            let optionsArray = [
                {
                    name: "title",
                    content: {
                        title: {
                            text: "Sample chart"
                        }
                    }
                },
                {
                    name: "legend",
                    content: {
                        legend: {
                            align: "left"
                        }
                        
                    }
                },
                {
                    name: "grid",
                    content: {
                        grid: {
                            top: 100
                        }
                    }
                },
                {
                    name: "xAxis",
                    content: {
                        xAxis: {
                            data: ["Abel","Bart","Chris","Diana","Edward","Flora"],
                            max: vm.adjustChartParameters(cp).xmax,
                        }
                    }
                },
                {
                    name: "yAxis",
                    content: {
                        yAxis: {
                            max: vm.adjustChartParameters(cp).ymax,
                        }
                    }
                },                
                {
                    name: "polar",
                    content: {
                        polar: {

                        }
                    }
                },
                {
                    name: "angleAxis",
                    content: {
                        angleAxis: {
                            data: ["Abel","Bart","Chris","Diana","Edward","Flora"],
                        }
                    }
                },
                {
                    name: "radiusAxis",
                    content: {
                        radiusAxis: {

                        }
                    }
                },
                {
                    name: "series",
                    content: {
                        series: [
                            {
                                name: 'Installed apps',
                                type: ct.type,
                                data: [5, 20, 36, 10, 10, 20],
                            }
                        ]
                    }
                },
            ];

            let options = merger.merge(optionsArray);

            myChart.setOption(options);
        },
    },
    watch: {
        getChartParametersUpdates: {
            handler: function(getChartParametersUpdates, oldGetChartParametersUpdates) {
                this.dispose();
                this.drawLine();
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
