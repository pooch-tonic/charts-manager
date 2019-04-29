<template>
    <BForm @submit="onSubmit">
        <div id="chart-toolbar" role="tablist">
            <BInputGroup prepend="type">
                <BFormSelect label="chart-type" v-model="localChartType">
                    <option 
                    v-for="chartType in getChartTypes()" 
                    :key="chartType.name" 
                    :value="chartType"
                    :selected="localChartType.name == chartType.name"
                    >
                        {{ chartType.name }}
                    </option>
                </BFormSelect>
            </BInputGroup>
            <hr></hr>
            <BCard no-body v-for="parameter in localChartType.allowedParameters" v-if="parameter.name !== 'series'" :key="parameter.name">
                <BCardHeader header-tag="header" role="tab">
                    <BButton block v-b-toggle="'accordion-' + parameter.name" variant="info">
                        {{ parameter.name }}
                    </BButton>
                </BCardHeader>
                <BCollapse :id="'accordion-' + parameter.name" accordion="chartsToolbarMenu">
                    <BCardBody>
                        <BInputGroup v-for="(subParameter, key) in parameter.content" :key="subParameter.key" :prepend="key">
                            <BInput 
                            v-if="subParameter.type === 'boolean'" 
                            :label="key" 
                            type="checkbox"
                            v-model="subParameter.value"
                            />
                            <BInput 
                            v-if="subParameter.type === 'number'" 
                            :label="key" type="number" 
                            v-model="subParameter.value"
                            />
                            <BInput 
                            v-if="subParameter.type === 'text'" 
                            :label="key" type="text" 
                            v-model="subParameter.value"
                            />
                            <BFormSelect 
                            v-if="subParameter.type === 'select'" 
                            :label="key"
                            v-model="subParameter.value"
                            >
                                <option 
                                v-for="option in subParameter.options"
                                :key="option.value"
                                :value="option.value"
                                :selected="option.value == subParameter.default ? 'selected' : ''"
                                >
                                    {{ option.text }}
                                </option>
                            </BFormSelect>
                        </BInputGroup>
                    </BCardBody>
                </BCollapse>
            </BCard>
        </div>
        <!--<BButton type="submit">Submit</BButton>-->
    </BForm>
</template>

<script>
import { BForm, BButton, BInput, BInputGroup, BCard, BCardHeader, BCardBody, BCardText, BCollapse, BFormSelect } from 'bootstrap-vue'
import { mapGetters, mapState } from 'vuex';
import { chartTypes } from '@/config/chart-options';
import lodash from 'lodash';
import store from '@/store';

export default {
    name: 'ChartToolbar',
    data() {
        return {
            localChartType: store.getters.getChartType()
        }
    },
    components: {
        'b-input': BInput,
        'b-input-group': BInputGroup,
        'b-button': BButton,
        'b-card': BCard,
        'b-card-header': BCardHeader,
        'b-card-body': BCardBody,
        'b-card-text': BCardText,
        'b-collapse': BCollapse,
        'b-form': BForm,
        'b-form-select': BFormSelect,
    },
    computed: {
        ...mapGetters([
            'isParameterAllowed',
            'getChartType'
        ]),
    },
    methods: {
        onSubmit(e) {

        },
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
