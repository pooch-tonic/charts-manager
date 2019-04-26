<template>
    <div id="chart-toolbar" role="tablist">
        <BInputGroup prepend="type">
            <BFormSelect label="chart-type" v-model="chartType">
                <option v-for="chartType in getChartOptions().chartTypes" v-bind:key="chartType.name" :value="chartType">
                    {{ chartType.name }}
                </option>
            </BFormSelect>
        </BInputGroup>
        <hr></hr>
        <BCard no-body>
            <BCardHeader header-tag="header" role="tab">
                <BButton block v-b-toggle.menu-axis variant="info">
                    Axis
                </BButton>
            </BCardHeader>
            <BCollapse id="menu-axis" accordion="chartsToolbarMenu">
                <BCardBody>
                    <div v-if="this.isParameterAllowed('xAxis')">
                        <BInputGroup prepend="xmax">
                            <BInput label="xmax" type="number" placeholder="default: null" v-model.number="xmax"/>
                        </BInputGroup>
                    </div>
                    <div v-if="this.isParameterAllowed('yAxis')">
                        <BInputGroup prepend="ymax">
                            <BInput label="ymax" type="number" placeholder="default: null" v-model.number="ymax"/>
                        </BInputGroup>
                    </div>
                </BCardBody>
            </BCollapse>    
        </BCard>
        <BCard no-body>
            <BCardHeader header-tag="header" role="tab">
                <BButton block v-b-toggle.menu-legend variant="info">
                    Legend
                </BButton>
            </BCardHeader>
            <BCollapse id="menu-legend" accordion="chartsToolbarMenu">
                <BCardBody>
                    <BInputGroup prepend="align">
                        <BFormSelect label="legend-align" v-model="legendAlign" :options="getChartOptions().legendAlign"/>
                    </BInputGroup>
                </BCardBody>
            </BCollapse>    
        </BCard>
    </div>
</template>

<script>
import { BInput, BInputGroup, BCard, BCardHeader, BCardBody, BCardText, BCollapse, BFormSelect } from 'bootstrap-vue'
import { mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import chartOptions from '@/config/chart-options';

export default {
    name: 'ChartToolbar',
    components: {
        'b-input': BInput,
        'b-input-group': BInputGroup,
        'b-card': BCard,
        'b-card-header': BCardHeader,
        'b-card-body': BCardBody,
        'b-card-text': BCardText,
        'b-collapse': BCollapse,
        'b-form-select': BFormSelect,
    },
    computed: {
        ...mapFields([
            'chartParameters.chartType',
            'chartParameters.legendAlign',
            'chartParameters.xmax',
            'chartParameters.ymax'
        ]),        
        ...mapGetters([
            'isParameterAllowed'
        ]),
    },
    methods: {
        getChartOptions() {
            return chartOptions;
        }
    },
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
