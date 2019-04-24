import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/vues/HelloWorld'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/charts/bar-simple',
            name: 'BarSimple',
            component: BarSimple
        }
    ]
})
