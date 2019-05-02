<template>
    <BTabs>
        <BTab title="chart" active>
            <div id="chart-toolbar" class="tablist" role="tablist">
                <BInputGroup prepend="sort (primary)">
                    <BFormSelect
                    label="data" 
                    v-model="storeSort.primary.dataName"
                    :options="storeDimensions"
                    />
                    <BFormSelect
                    label="type" 
                    v-model="storeSort.primary.type"
                    :options="getSortTypes()"
                    />
                </BInputGroup>
                <BInputGroup prepend="sort (secondary)" v-if="storeSort.primary.type !== null">
                    <BFormSelect
                    label="data" 
                    v-model="storeSort.secondary.dataName"
                    :options="storeDimensions"
                    />
                    <BFormSelect
                    label="type" 
                    v-model="storeSort.secondary.type"
                    :options="getSortTypes()"
                    />
                </BInputGroup>
                <hr/>
                <div v-for="(parameter, index) in storeChartSystem.allowedParameters" :key="index">
                    <div v-if="toType(parameter) !== 'array'">
                        <BCard 
                        no-body 
                        v-if="Object.keys(parameter.content).length !== 0"
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
                </div>
            </div>
            <!--<BButton type="submit">Submit</BButton>-->
        </BTab>
        <BTab title="series">
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
                            v-for="(axis, index) in storeData.currentAxis"
                            :key="index"
                            :prepend="axis.name"
                            >
                                <BFormSelect
                                label="axis bind" 
                                v-model="axis.dimension"
                                >
                                    <option
                                    value=null
                                    >
                                        none
                                    </option>
                                    <option
                                    v-for="(dimension, index) in storeDimensions"
                                    :value="dimension"
                                    :key="index"
                                    >
                                        {{ dimension }}
                                    </option>
                                </BFormSelect>
                            </BInputGroup>
                        </BCardBody>
                    </BCollapse>
                </BCard>
                <BCard 
                no-body
                bg-variant="light"
                >
                    <div v-if="!createEntryForm" @click="this.handleEntryCreationStart" variant="light">
                        <BButton block variant="light">
                            +
                        </BButton>
                    </div>
                    <div v-else>
                        <BCardHeader>
                            <BButtonToolbar justify>
                                <BButtonGroup>
                                    <BButton disabled variant="default">
                                        Create a new entry
                                    </BButton>
                                </BButtonGroup>
                                <BButtonGroup>
                                    <BButton @click="this.handleEntryCreationCancel">
                                        x
                                    </BButton>
                                </BButtonGroup>
                            </BButtonToolbar>
                        </BCardHeader>
                        <BCardBody>
                            <BInputGroup prepend="name">
                                <BInput
                                label="name" 
                                type="text"
                                v-model="createEntryForm.name"
                                />
                            </BInputGroup>
                            <BInputGroup prepend="type">
                                <BFormSelect
                                label="type" 
                                v-model="createEntryForm.type"
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
                            v-for="(axis, index) in createEntryForm.axis"
                            :key="index"
                            :prepend="axis.id"
                            >
                                <BFormSelect
                                label="axis bind" 
                                v-model="axis.dimension"
                                :options="storeDimensions"
                                />
                            </BInputGroup> 
                        </BCardBody>
                        <BCardFooter>
                            <BButton @click="this.handleEntryCreationSubmit">Submit</BButton>
                        </BCardFooter>
                    </div>
                </BCard><!-- -->
            </div>
        </BTab>
        <BTab title="axis">
            <div id="axis-toolbar" class="tablist" role="tablist">
                <BInputGroup prepend="type">
                    <BFormSelect label="chart-type" v-model="storeChartSystem">
                        <option :value="getChartSystemTypes().cartesian2d">cartesian 2D</option>
                        <option :value="getChartSystemTypes().polar">polar</option>
                    </BFormSelect>
                </BInputGroup>
                <br></br>
                <BCard 
                no-body
                v-for="(axisItem, index) in storeData.currentAxis"
                :key="index"
                >
                    <BCardHeader header-tag="header" role="tab">
                        <BButton v-b-toggle="'series-accordion-' + index" block variant="info">
                            {{ axisItem.name }}
                        </BButton>
                    </BCardHeader>
                    <BCollapse :id="'series-accordion-' + index" accordion="seriesToolbarMenu">
                        <BCardBody>
                            <span>TODO: Settings</span>
                        </BCardBody>
                    </BCollapse>
                </BCard>
                <BCard 
                no-body
                bg-variant="light"
                >
                    <div v-if="!createAxisForm" @click="this.handleAxisCreationStart" variant="light">
                        <BButton block variant="light">
                            +
                        </BButton>
                    </div>
                    <div v-else>
                        <BCardHeader>
                            <BButtonToolbar justify>
                                <BButtonGroup>
                                    <BButton disabled variant="default">
                                        Add a new axis
                                    </BButton>
                                </BButtonGroup>
                                <BButtonGroup>
                                    <BButton @click="this.handleAxisCreationCancel">
                                        x
                                    </BButton>
                                </BButtonGroup>
                            </BButtonToolbar>
                        </BCardHeader>
                        <BCardBody>
                            <BInputGroup prepend="name">
                                <BInput
                                label="name" 
                                type="text"
                                v-model="createAxisForm.name"
                                />
                            </BInputGroup>
                            <BInputGroup prepend="base">
                                <BFormSelect
                                label="axis bind" 
                                v-model="createAxisForm.base"
                                >
                                    <option
                                    v-for="(axisType, index) in storeChartSystem.allowedAxisTypes"
                                    :key="index"
                                    :value="axisType"
                                    >
                                        {{ axisType.displayName }}
                                    </option>
                                </BFormSelect>
                            </BInputGroup> 
                        </BCardBody>
                        <BCardFooter>
                            <BButton @click="this.handleAxisCreationSubmit">Submit</BButton>
                        </BCardFooter>
                    </div>
                </BCard>
            </div>
        </BTab>
    </BTabs>
</template>

<script>
import { BTabs, BTab, BForm, BFormCheckbox, BFormCheckboxGroup, BButton, BButtonGroup, BButtonToolbar, BInput, BInputGroup, BCard, BCardHeader, BCardBody, BCardFooter, BCardText, BCollapse, BFormSelect } from 'bootstrap-vue'
import { mapGetters, mapActions } from 'vuex';
import { chartSystemTypes, chartTypes, chartParameters, sortTypes, axisTypes } from '@/config/chart-options';
import { toType } from '@/util/type-checker';
import lodash from 'lodash';
import store from '@/store';

export default {
    name: 'ChartToolbar',
    data() {
        return {
            createEntryForm: null,
            createAxisForm: null
        }  
    },
    components: {
        'b-input': BInput,
        'b-input-group': BInputGroup,
        'b-button': BButton,
        'b-button-group': BButtonGroup,
        'b-button-toolbar': BButtonToolbar,
        'b-card': BCard,
        'b-card-header': BCardHeader,
        'b-card-body': BCardBody,
        'b-card-footer': BCardFooter,
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
            'getSort',
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
        storeSort: {
            get() {
                return this.getSort();
            },
            set(newSort) {
                this.$store.commit('UPDATE_SORT', newSort);
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
        ...mapActions([
            'createEntry',
            'createAxis'
        ]),
        toType(parameter) {
            return toType(parameter);
        },
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
        },
        handleEntryCreationStart() {
            this.createEntryForm = {
                name: '',
                type: chartTypes.line,
                axis: [
                    {
                        id: 'x1',
                        dimension: 'name'
                    },
                    {
                        id: 'y1',
                        dimension: 'age'
                    },
                ],
                show: true
            };
        },
        handleEntryCreationCancel() {
            this.createEntryForm = null;
        },
        handleEntryCreationSubmit() {
            this.createEntry(this.createEntryForm);
            this.handleEntryCreationCancel();
        },
        handleAxisCreationStart() {
            this.createAxisForm = {
                base: store.getters.getChartSystem().allowedAxisTypes[0],
                name: '',
            };
        },
        handleAxisCreationCancel() {
            this.createAxisForm = null;
        },
        handleAxisCreationSubmit() {
            this.createAxis(this.createAxisForm);
            this.handleAxisCreationCancel();
        }
    }
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
