<template>
    <div id="chart-wrapper">
        <ErrorBoundary>
            <Chart />
        </ErrorBoundary>
    </div>
</template>

<script>
import Chart from '@/components/charts/Chart'
import { ErrorBoundary } from 'vue-error-boundary'

export default {
    name: 'ChartWrapper',
    components: {
        Chart,
        ErrorBoundary,
    },
}
</script>

<style>
#chart-wrapper {
    height: 100%;
    padding: 20px 15px;
}
</style>

