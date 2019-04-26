<template>
    <div id="chart-wrapper">
        <ErrorBoundary>
            <BarChart />
        </ErrorBoundary>
    </div>
</template>

<script>
import BarChart from '@/components/charts/BarChart'
import { ErrorBoundary } from 'vue-error-boundary'

export default {
    name: 'ChartWrapper',
    components: {
        BarChart,
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

