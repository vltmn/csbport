import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () =>
                import(/*webpackChunkName: "home" */ './views/Create.vue')
        },
        {
            path: '/open/:requestId',
            name: 'open',
            component: () =>
                import(/* webpackChunkName: "about" */ './views/Open.vue'),
            props: true
        }
    ]
});
