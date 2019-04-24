<template>
    <div id="chart-toolbar">
        <BInputGroup  prepend="xmax">
            <BInput label="xmax" type="number" placeholder="default: null" v-model.number="chartParameters.xmax"/>
        </BInputGroup>
        <BInputGroup  prepend="ymax">
            <BInput label="ymax" type="number" placeholder="default: null" v-model.number="chartParameters.ymax"/>
        </BInputGroup>
    </div>
</template>

<script>
import { BInput, BInputGroup } from 'bootstrap-vue'

export default {
    name: 'ChartToolbar',
    components: {
        'b-input': BInput,
        'b-input-group': BInputGroup,
    },
    data() {
        return {
            chartParameters: {
                xmax: null,
                ymax: null,
            }
        }
    },
    methods: {
        updateChartParameters: function() {
            this.$store.commit('UPDATE_CHART_PARAMETERS', this.chartParameters);
            console.log(this.chartParameters);
            console.log(this.$store);
        }
    },
    watch: {
        'chartParameters.xmax': function() {
            this.updateChartParameters();
        },
        'chartParameters.ymax': function() {
            this.updateChartParameters();
        }
    }
}
</script>

<style scoped>
#chart-toolbar {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px 15px 0;
}
.input-group {
    display: flex;
    padding: 3px 0;
    width: 100%;
}
.input {
    flex: 1;
}
</style>
