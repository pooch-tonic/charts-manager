<template>
    <div id="chart-wrapper">
        <BarSimple />
    </div>
</template>

<script>
import BarSimple from '@/components/charts/BarSimple'

export default {
    name: 'ChartWrapper',
    components: {
        BarSimple,
    },
}
</script>

<style>
#chart-wrapper {
    height: 100%;
    padding: 20px 15px;
}
</style>

