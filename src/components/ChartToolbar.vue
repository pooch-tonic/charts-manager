<template>
    <div id="chart-toolbar" role="tablist">
        <BCard no-body>
            <BCardHeader header-tag="header" role="tab">
                <BButton block v-b-toggle.menu-axis variant="info">
                    Axis
                </BButton>
            </BCardHeader>
            <BCollapse id="menu-axis" accordion="chartsToolbarMenu">
                <BCardBody>
                    <BInputGroup  prepend="xmax">
                        <BInput label="xmax" type="number" placeholder="default: null" v-model.number="xmax"/>
                    </BInputGroup>
                    <BInputGroup  prepend="ymax">
                        <BInput label="ymax" type="number" placeholder="default: null" v-model.number="ymax"/>
                    </BInputGroup>
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
import { mapMutations, mapGetters } from 'vuex';
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
            'chartParameters.legendAlign',
            'chartParameters.xmax',
            'chartParameters.ymax'
        ])
    },
    methods: {
        ...mapMutations({
            updateChartParameters: 'UPDATE_CHART_PARAMETERS', 
        }),
        getChartOptions() {
            return chartOptions;
        }
    },
    watch: {
        'chartParameters': {
            handler: function(chartParameters, oldChartParameters) {
                let vm = this;
                vm.updateChartParameters(vm.chartParameters);
            },
            deep: true,
        },
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
