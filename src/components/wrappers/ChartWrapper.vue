<template>
    <div id="chart-wrapper">
        <ErrorBoundary>
            <BarSimple />
        </ErrorBoundary>
    </div>
</template>

<script>
import BarSimple from '@/components/charts/BarSimple'
import { ErrorBoundary } from 'vue-error-boundary'

export default {
    name: 'ChartWrapper',
    components: {
        BarSimple,
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

