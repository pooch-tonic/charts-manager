<template>
    <div id="chart-wrapper">
        <BarSimple 
        v-bind:xmax="chartParameters.xmax"
        v-bind:ymax="chartParameters.ymax"
        />
    </div>
</template>

<script>
import BarSimple from '@/components/charts/BarSimple'
import { mapState } from 'vuex'

export default {
    name: 'ChartWrapper',
    components: {
        BarSimple,
    },
    computed: {
        ...mapState([
            'chartParameters'
        ]),
    }
}
</script>

<style>
#chart-wrapper {
    height: 100%;
    padding: 20px 15px;
}
</style>

