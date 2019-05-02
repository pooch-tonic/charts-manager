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
                        label="data" 
                        v-model="storeSortedData"
                        :options="storeDimensions"
                        />
                        <BFormSelect
                        label="type" 
                        v-model="storeSortType"
                        :options="getSortTypes()"
                        />
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
                                {{ parameter.displayName }}
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
                    v-for="(entry, index) in storeData.series"
                    :key="index"
                    >
                        <BCardHeader header-tag="header" role="tab">
                            <BButton v-b-toggle="'series-accordion-' + index" block variant="info">
                                {{ entry.name }}
                            </BButton>
                        </BCardHeader>
                        <BCollapse :id="'series-accordion-' + index" accordion="seriesToolbarMenu">
                            <BCardBody>
                                <BInputGroup prepend="show">
                                    <BFormCheckbox
                                    switch
                                    size="lg"
                                    label="show" 
                                    type="checkbox"
                                    v-model="entry.show"
                                    />
                                </BInputGroup>
                                <BInputGroup prepend="name">
                                    <BInput
                                    label="name" 
                                    type="text"
                                    v-model="entry.name"
                                    />
                                </BInputGroup>
                                <BInputGroup prepend="type">
                                    <BFormSelect
                                    label="type" 
                                    v-model="entry.type"
                                    >
                                        <option 
                                        v-for="(chartType, index) in storeChartSystem.allowedChartTypes" 
                                        :key="index"
                                        :value="chartType"
                                        >
                                            {{ chartType.name }}
                                        </option>
                                    </BFormSelect>
                                </BInputGroup>
                                <BInputGroup
                                v-for="(axis, index) in entry.axis"
                                :key="index"
                                :prepend="axis.id"
                                >
                                    <BFormSelect
                                    label="axis bind" 
                                    v-model="axis.dimension"
                                    :options="storeDimensions"
                                    />
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
        <!--<BTab title="axis">
            <BForm>
                <div id="axis-toolbar" class="tablist" role="tablist">
                    <BCard no-body>
                        <BCardHeader header-tag="header" role="tab">
                            <BButton v-b-toggle="'axis-accordion-1'" block variant="info">
                                X Axis
                            </BButton>
                        </BCardHeader>
                        <BCollapse id="axis-accordion-1" accordion="axisToolbarMenu">
                            <BCardBody>
                                <BInputGroup 
                                v-for="(dimension, index) in storeData.dataset.dimensions" 
                                :key="index"
                                :prepend="dimension.name">
                                    <BFormCheckbox
                                    switch
                                    size="lg"
                                    :label="dimension.name" 
                                    type="checkbox"
                                    v-model="dimension."
                                    />
                                </BInputGroup>
                            </BCardBody>
                        </BCollapse>
                    </BCard>
                </div>
            </BForm>
        </BTab>-->
    </BTabs>
</template>

<script>
import { BTabs, BTab, BForm, BFormCheckbox, BFormCheckboxGroup, BButton, BInput, BInputGroup, BCard, BCardHeader, BCardBody, BCardText, BCollapse, BFormSelect } from 'bootstrap-vue'
import { mapGetters } from 'vuex';
import { chartSystemTypes, chartParameters, sortTypes, axisTypes } from '@/config/chart-options';
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
        'b-form-checkbox-group': BFormCheckboxGroup,
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
        storeDimensions: {
            get() {
                return _.map(this.getData().dataset.dimensions, 'name');
            }
        }
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
        },
        getAxisTypes() {
            return axisTypes;
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
.multiselect {
    text-align: left;
}
</style>
