import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/vues/HelloWorld'
import ChartConfig from '@/vues/ChartConfig'

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
        }
    ]
})
