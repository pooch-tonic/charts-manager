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
                                    <BContainer>
                                        <BRow>
                                            <BCol>
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
                                                    v-model.lazy="subParameter.value"
                                                    />
                                                    <BInput 
                                                    v-if="subParameter.type === 'percentage'" 
                                                    :label="key" type="range"
                                                    min="-500"
                                                    max="500"
                                                    v-model="subParameter.value"
                                                    />
                                                    <BInput 
                                                    v-if="subParameter.type === 'text'" 
                                                    :label="key" type="text" 
                                                    v-model.lazy="subParameter.value"
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
                                            </BCol>
                                        </BRow>
                                    </BContainer>
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
                            <BContainer>
                                <BRow align-h="between">
                                    <BCol cols="9">
                                        <BInputGroup prepend="show">
                                            <BFormCheckbox
                                            switch
                                            size="lg"
                                            label="show" 
                                            type="checkbox"
                                            v-model="entry.show"
                                            />
                                        </BInputGroup>
                                    </BCol>
                                    <BCol cols="3">
                                        <BButton 
                                        block 
                                        variant="danger" 
                                        @click="handleEntryDeletion(entry)"
                                        v-if="entry.valueAxisIndex > 0"
                                        >
                                            delete
                                        </BButton>
                                    </BCol>
                                </BRow>
                                <BRow>
                                    <BCol>
                                        <BInputGroup prepend="name">
                                            <BInput
                                            label="name" 
                                            type="text"
                                            v-model.lazy="entry.name"
                                            />
                                        </BInputGroup>
                                    </BCol>
                                </BRow>
                                <BRow>
                                    <BCol>
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
                                    </BCol>
                                </BRow>
                                <BRow v-if="entry.type.type === 'line'">
                                    <BCol>
                                        <BInputGroup prepend="smoothness">
                                            <BInput  
                                            label="smoothness" type="range"
                                            min="0"
                                            max="100"
                                            v-model.number="entry.smooth"
                                            />
                                        </BInputGroup>
                                    </BCol>
                                </BRow>
                                <BRow>
                                    <BCol>
                                        <BInputGroup prepend="dimension">
                                            <BFormSelect
                                            label="dimension" 
                                            v-model="entry.dimension"
                                            >
                                                <option
                                                v-for="(dimension, index) in getValueDimensions()"
                                                :value="dimension.name"
                                                :key="index"
                                                >
                                                    {{ dimension.name }}
                                                </option>
                                            </BFormSelect>
                                        </BInputGroup>
                                    </BCol>
                                </BRow>
                                <BRow>
                                    <BCol>
                                        <BInputGroup prepend="value axis bind">
                                            <BFormSelect
                                            label="axis bind" 
                                            v-model="entry.valueAxisIndex"
                                            >
                                                <option
                                                v-for="(axis, index) in getValueAxisFromCurrentAxis().axisList"
                                                :value="axis.axisIndex"
                                                :key="index"
                                                >
                                                    {{ axis.name }}
                                                </option>
                                            </BFormSelect>
                                        </BInputGroup>
                                    </BCol>
                                </BRow>
                                <BRow>
                                    <BCol>
                                        <BInputGroup prepend="min">
                                            <BInput v-model="entry.min" label="min"/>
                                        </BInputGroup>
                                    </BCol>
                                    <BCol>
                                        <BInputGroup prepend="max">
                                            <BInput v-model="entry.max" label="max"/>
                                        </BInputGroup>
                                    </BCol>
                                </BRow>
                            </BContainer>
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
                            <BContainer>
                                <BRow>
                                    <BCol>
                                        <BInputGroup prepend="name">
                                            <BInput
                                            label="name" 
                                            type="text"
                                            v-model.lazy="createEntryForm.name"
                                            />
                                        </BInputGroup>
                                    </BCol>
                                </BRow>
                                <BRow>
                                    <BCol>
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
                                    </BCol>
                                </BRow>
                                <BRow>
                                    <BCol>
                                        <BInputGroup
                                        prepend="dimension"
                                        >
                                            <BFormSelect
                                            label="dimension" 
                                            v-model="createEntryForm.dimension"
                                            >
                                                <option
                                                v-for="(dimension, index) in getValueDimensions()"
                                                :value="dimension.name"
                                                :key="index"
                                                >
                                                    {{ dimension.name }}
                                                </option>
                                            </BFormSelect>
                                        </BInputGroup>
                                    </BCol>
                                </BRow>
                                <BRow>
                                    <BCol>
                                        <BInputGroup
                                        prepend="value axis bind"
                                        >
                                            <BFormSelect
                                            label="axis bind" 
                                            v-model="createEntryForm.valueAxisIndex"
                                            >
                                                <option
                                                v-for="(axis, index) in getValueAxisFromCurrentAxis().axisList"
                                                :value="axis.axisIndex"
                                                :key="index"
                                                >
                                                    {{ axis.name }}
                                                </option>
                                            </BFormSelect>
                                        </BInputGroup>
                                    </BCol>
                                </BRow>
                                <BRow>
                                    <BCol>
                                        <BInputGroup prepend="min">
                                            <BInput v-model="createEntryForm.min" label="min"/>
                                        </BInputGroup>
                                    </BCol>
                                    <BCol>
                                        <BInputGroup prepend="max">
                                            <BInput v-model="createEntryForm.max" label="max"/>
                                        </BInputGroup>
                                    </BCol>
                                </BRow>
                            </BContainer>
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
                v-for="(axisType, key, index) in storeData.currentAxis"
                :key="index"
                >
                    <BCardHeader header-tag="header" role="tab">
                        <BButton v-b-toggle="'axis-accordion-' + index" block variant="info">
                            {{ key }}
                        </BButton>
                    </BCardHeader>
                    <BCollapse :id="'axis-accordion-' + index" accordion="axisToolbarMenu">
                        <BCardBody>
                            <BContainer>
                                <BRow>
                                    <BCol>
                                        <BInputGroup prepend="spacing (px)">
                                            <BInput
                                            type="range"
                                            min="0"
                                            max="200"
                                            v-model.number="axisType.spacing"
                                            />
                                        </BInputGroup>
                                        <br/>
                                    </BCol>
                                </BRow>
                                <BRow v-for="(axis, index) in axisType.axisList" :key="index" class="space-bottom">
                                    <BCol>
                                        <BCard no-body>
                                            <BCardHeader header-tag="header" role="tab">
                                                {{ axis.name }}
                                            </BCardHeader>
                                            <BCardBody>
                                                <BContainer>
                                                    <BRow>
                                                        <BCol offset="9">
                                                            <BButton 
                                                            block 
                                                            variant="danger" 
                                                            @click="handleAxisDeletion(axisType.base, axis)"
                                                            v-if="axis.axisIndex > 0"
                                                            >
                                                                delete
                                                            </BButton>
                                                        </BCol>
                                                    </BRow>
                                                    <BRow>
                                                        <BCol>
                                                            <BInputGroup prepend="name">
                                                                <BFormInput
                                                                type="text"
                                                                v-model="axis.name"
                                                                />
                                                            </BInputGroup>
                                                        </BCol>
                                                    </BRow>
                                                    <BRow>
                                                        <BCol>
                                                            <BInputGroup prepend="order">
                                                                <BFormSelect
                                                                label="id" 
                                                                v-model="axis.axisIndex"
                                                                >
                                                                    <option
                                                                    v-for="id in axisType.axisList.length"
                                                                    :key="id"
                                                                    :value="id - 1"
                                                                    >
                                                                        {{ id }}
                                                                    </option>
                                                                </BFormSelect>
                                                            </BInputGroup>
                                                        </BCol>
                                                    </BRow>
                                                    <BRow>
                                                        <BCol>
                                                            <BInputGroup prepend="position">
                                                                <BFormSelect
                                                                label="position" 
                                                                v-model="axis.position"
                                                                :options="axisType.base.positions"
                                                                />
                                                            </BInputGroup>
                                                        </BCol>
                                                    </BRow>
                                                </BContainer>
                                            </BCardBody>
                                        </BCard>
                                    </BCol>
                                </BRow>
                                <BRow>
                                    <BCol>
                                        <BCard 
                                        no-body
                                        bg-variant="light"
                                        >
                                            <div v-if="!createAxisForm" @click="handleAxisCreationStart(axisType)" variant="light">
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
                                                            <BButton @click="handleAxisCreationCancel">
                                                                x
                                                            </BButton>
                                                        </BButtonGroup>
                                                    </BButtonToolbar>
                                                </BCardHeader>
                                                <BCardBody>
                                                    <BContainer>
                                                        <BRow>
                                                            <BCol>
                                                                <BInputGroup prepend="name">
                                                                    <BInput
                                                                    label="name" 
                                                                    type="text"
                                                                    v-model.lazy="createAxisForm.name"
                                                                    />
                                                                </BInputGroup>                                       
                                                            </BCol>
                                                        </BRow>
                                                    </BContainer>
                                                </BCardBody>
                                                <BCardFooter>
                                                    <BButton @click="handleAxisCreationSubmit">Submit</BButton>
                                                </BCardFooter>
                                            </div>
                                        </BCard>
                                    </BCol>
                                </BRow>          
                            </BContainer>
                        </BCardBody>
                    </BCollapse>
                </BCard>
            </div>
        </BTab>
    </BTabs>
</template>

<script>
import { BContainer, BRow, BCol, BTabs, BTab, BForm, BFormCheckbox, BFormCheckboxGroup, BButton, BButtonGroup, BButtonToolbar, BInput, BInputGroup, BCard, BCardHeader, BCardBody, BCardFooter, BCardText, BCollapse, BFormSelect } from 'bootstrap-vue'
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
        'b-container': BContainer,
        'b-row': BRow,
        'b-col': BCol,
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
            }
        },
        storeSort: {
            get() {
                return this.getSort();
            }
        },
        storeData: {
            get() {
                return this.getData();
            }
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
            'createAxis',
            'deleteEntry',
            'deleteAxis'
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
        getValueDimensions() {
            return _.tail(store.getters.getData().dataset.dimensions)
        },
        getMainAxisFromCurrentAxis() {
            return _.find(store.getters.getData().currentAxis, {isMain: true});
        },
        getValueAxisFromCurrentAxis() {
            return _.find(store.getters.getData().currentAxis, {isMain: false});
        },
        handleEntryCreationStart() {
            this.createEntryForm = {
                name: '',
                type: chartTypes.line,
                dimension: this.getValueDimensions()[0].name,
                min: 0,
                max: 100,
                valueAxisIndex: this.getValueAxisFromCurrentAxis().axisList[0].axisIndex,
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
        handleEntryDeletion(entryToDelete) {
            this.deleteEntry(entryToDelete);
        },
        handleAxisCreationStart(baseAxisType) {
            this.createAxisForm = {
                name: '',
                base: baseAxisType.base
            };
        },
        handleAxisCreationCancel() {
            this.createAxisForm = null;
        },
        handleAxisCreationSubmit() {
            this.createAxis(this.createAxisForm);
            this.handleAxisCreationCancel();
        },
        handleAxisDeletion(axisType, axisToDelete) {
            this.deleteAxis({axisType, axisToDelete});
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
.card-body {
    padding-left: 0;
    padding-right: 0;
}
.space-bottom {
    margin-bottom: 8px;
}
</style>
