<template>
    <div id="chart-toolbar" role="tablist">
        <BInputGroup prepend="type">
            <BFormSelect label="chart-type">
                <option v-for="chartType in getChartTypes()" v-bind:key="chartType.name" :value="chartType">
                    {{ chartType.name }}
                </option>
            </BFormSelect>
        </BInputGroup>
        <hr></hr>
        <BCard no-body v-for="parameter in getChartType().allowedParameters" v-if="parameter.name !== 'series'" v-bind:key="parameter.name">
            <BCardHeader header-tag="header" role="tab">
                <BButton block v-b-toggle="'accordion-' + parameter.name" variant="info">
                    {{ parameter.name }}
                </BButton>
            </BCardHeader>
            <BCollapse :id="'accordion-' + parameter.name" accordion="chartsToolbarMenu">
                <BCardBody>
                    <BInputGroup v-for="(subParameter, key) in parameter.content" v-bind:key="subParameter.key" :prepend="key">
                        <BInput :label="key" type="subParameter.type" :placeholder="'default: ' + (subParameter.default === null ? 'null' : subParameter.default)"/>
                    </BInputGroup>
                </BCardBody>
            </BCollapse>
        </BCard>
    </div>
</template>

<script>
import { BInput, BInputGroup, BCard, BCardHeader, BCardBody, BCardText, BCollapse, BFormSelect } from 'bootstrap-vue'
import { mapGetters } from 'vuex';
import { mapMultiRowFields } from 'vuex-map-fields';
import { chartTypes } from '@/config/chart-options';

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
        ...mapMultiRowFields([
            'chartConfig.chartType.allowedParameters',
        ]),        
        ...mapGetters([
            'isParameterAllowed',
            'getChartType'
        ]),
    },
    methods: {
        getChartTypes() {
            
            return chartTypes;
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
