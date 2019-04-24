<template>
    <div id="chart-config">
        <div id="chart-view">
            <ChartWrapper/>
        </div>
        <div id="chart-parameters">
            <ChartToolbar/>
        </div>
    </div>
</template>

<script>
import ChartWrapper from '@/components/wrappers/ChartWrapper'
import ChartToolbar from '@/components/ChartToolbar'
import { mapState } from 'vuex'

export default {
    name: 'ChartConfig',
    components: {
        ChartWrapper,
        ChartToolbar,
    },
    computed: {
        ...mapState([
            'chartParameters'
        ]),
    },
    data () {
        return {
            msg: 'ChartConfig'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    font-weight: normal;
}

a {
    color: #42b983;
}

#chart-config {
    display: flex;
    height: 100%;
    width: 100%;
}

#chart-view {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}

#chart-parameters {
    box-shadow: -3px 0 5px -2px #eaeaea;
    height: 100%;
    width: 480px;
}
</style>