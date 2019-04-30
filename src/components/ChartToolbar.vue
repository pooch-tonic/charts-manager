<template>
    <BTabs>
        <BTab title="chart" active>
            <BForm>
                <div id="chart-toolbar" class="tablist" role="tablist">
                    <BInputGroup prepend="type">
                        <BFormSelect label="chart-type" v-model="storeChartSystem">
                            <option :value="getChartSystemTypes().cartesian2d">cartesian 2D</option>
                            <option :value="getChartSystemTypes().polar">polar</option>
                        </BFormSelect>
                    </BInputGroup>
                    <BInputGroup prepend="sort">
                        <BFormSelect
                        label="type" 
                        v-model="storeSortType"
                        >
                            <option 
                            v-for="(sortType, key) in getSortTypes()" 
                            :key="key"
                            :value="sortType"
                            >
                                {{ sortType }}
                            </option>
                        </BFormSelect>
                    </BInputGroup>
                    <hr/>
                    <BCard 
                    no-body 
                    v-for="parameter in storeChartSystem.allowedParameters" 
                    v-if="Object.keys(parameter.content).length !== 0" 
                    :key="parameter.name"
                    >
                        <BCardHeader header-tag="header" role="tab">
                            <BButton block v-b-toggle="'accordion-' + parameter.name" variant="info">
                                {{ parameter.name }}
                            </BButton>
                        </BCardHeader>
                        <BCollapse :id="'accordion-' + parameter.name" accordion="chartsToolbarMenu">
                            <BCardBody>
                                <BInputGroup v-for="(subParameter, key) in parameter.content" :key="subParameter.key" :prepend="key">
                                    <BFormCheckbox
                                    switch
                                    size="lg"
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
        </BTab>
        <BTab title="series">
            <BForm>
                <div id="series-toolbar" class="tablist" role="tablist">
                    <BCard 
                    no-body
                    v-for="(dimension, index) in storeData.dataset.dimensions"
                    :key="index"
                    >
                        <BCardHeader header-tag="header" role="tab">
                            <BButton v-b-toggle="'dimension-accordion-' + index" block variant="info">
                                {{ dimension.name }}
                            </BButton>
                        </BCardHeader>
                        <BCollapse :id="'dimension-accordion-' + index" accordion="dimensionsToolbarMenu">
                            <BCardBody>
                                <!--<BInputGroup prepend="show">
                                    <BFormCheckbox
                                    switch
                                    size="lg"
                                    label="show" 
                                    type="checkbox"
                                    v-model="dimension.show"
                                    />
                                </BInputGroup>-->
                                <BInputGroup prepend="name">
                                    <BInput
                                    label="name" 
                                    type="text"
                                    v-model="dimension.name"
                                    />
                                </BInputGroup>
                                <BInputGroup prepend="type" v-if="dimension.type">
                                    <BFormSelect
                                    label="type" 
                                    v-model="dimension.type"
                                    >
                                        <option 
                                        v-for="(type, index) in storeChartSystem.allowedChartTypes" 
                                        :key="index"
                                        :value="type"
                                        >
                                            {{ type.name }}
                                        </option>
                                    </BFormSelect>
                                </BInputGroup>
                                <!--<BInputGroup prepend="sort">
                                    <BFormSelect
                                    label="type" 
                                    v-model="dataset.sort"
                                    >
                                        <option 
                                        v-for="(sortType, key) in getSortTypes()" 
                                        :key="key"
                                        :value="sortType"
                                        >
                                            {{ sortType }}
                                        </option>
                                    </BFormSelect>
                                </BInputGroup>-->
                            </BCardBody>
                        </BCollapse>
                    </BCard>
                </div>
                <!--<BButton type="submit">Submit</BButton>-->
            </BForm>
        </BTab>
    </BTabs>
    
</template>

<script>
import { BTabs, BTab, BForm, BFormCheckbox, BButton, BInput, BInputGroup, BCard, BCardHeader, BCardBody, BCardText, BCollapse, BFormSelect } from 'bootstrap-vue'
import { mapGetters } from 'vuex';
import { chartSystemTypes, chartParameters, sortTypes } from '@/config/chart-options';
import lodash from 'lodash';
import store from '@/store';

export default {
    name: 'ChartToolbar',
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
        'b-form-checkbox': BFormCheckbox,
        'b-form-select': BFormSelect,
        'b-tab': BTab,
        'b-tabs': BTabs  
    },
    computed: {
        ...mapGetters([
            'getChartSystem',
            'getSortedData',
            'getSortType',
            'getData'
        ]),
        storeChartSystem: {
            get() {
                return this.getChartSystem();
            },
            set(newChartSystem) {
                this.$store.commit('UPDATE_CHART_SYSTEM', newChartSystem);
            },
        },
        storeSortedData: {
            get() {
                return this.getSortedData();
            },
            set(newSortedData) {
                this.$store.commit('UPDATE_SORTED_DATA', newSortedData);
            },
        },
        storeSortType: {
            get() {
                return this.getSortType();
            },
            set(newSortType) {
                this.$store.commit('UPDATE_SORT_TYPE', newSortType);
            },
        },
        storeData: {
            get() {
                return this.getData();
            },
            set(newData) {
                this.$store.commit('UPDATE_DATA', newData);
            },
        },
    },
    methods: {
        getChartSystemTypes() {
            return chartSystemTypes;
        },
        getChartParameters() {
            return chartParameters;
        },
        getSortTypes() {
            return sortTypes;
        }
    },
}
</script>

<style scoped>
.input-group {
    display: flex;
    padding: 3px 0;
    width: 100%;
}
.input {
    flex: 1;
}
.tablist {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px 15px 0;
}
form, .tablist, .tab-pane, .tab-content {
    outline: none !important;
}
.custom-switch {
    height: 100%;
    padding: 7px 0 0 60px;
    transform: scale(1.8);
}
</style>
