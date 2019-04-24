import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/vues/HelloWorld'
import ChartConfig from '@/vues/ChartConfig'
import BarSimple from '@/components/charts/BarSimple'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/charts',
            name: 'ChartConfig',
            component: ChartConfig
        },
        {
            path: '/charts/bar-simple',
            name: 'BarSimple',
            component: BarSimple
        }
    ]
})
