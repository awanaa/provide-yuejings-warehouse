import { createRouter, createWebHistory } from 'vue-router';
export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            component: () => import('@/pages/home/index.vue'),
            name: 'home'
        },
        {
            path: '/ai',
            component: () => import('@/pages/ai/index.vue')
        },
        {
            path: '/login',
            component: () => import('@/pages/login/index.vue')
        },
        {
            path: '/',
            redirect: '/home'
        },
        {
            path:'/person',
            component:()=>import('@/pages/person/index.vue')
        },
        {
            path:'/task',
            component:()=>import('@/pages/task/index.vue'),
            name:'task',
            children:[
              
              ]
        },
        {
           path:'/planinfor',
           component:()=>import('@/pages/task/components/planinfor.vue')
         },
         {
            path:'/task/details/:id',
            component:()=>import('@/pages/task/components/details.vue'),
            name:'Details'
             },
         {
            path:'/aichat',
            component:()=>import('@/pages/task/components/functions/aichat.vue'),
            name:'Aichat'
         },
         {
            path:'/quizzes/:itemId',
            component:()=>import('@/pages/task/components/functions/quizzes.vue'),
            name:'Quizzes'
         },
         {
            path:'/chouka/:itemId',
            component:()=>import('@/pages/task/components/functions/chouka.vue'),
            name:'Chouka'
         },
         {
            path:'/dochat',
            component:()=>import('@/pages/task/components/functions/dochat.vue'),
            name:'Dochat'
         },
         {
            path:'/wendang',
            component:()=>import('@/pages/task/components/functions/wendang.vue'),
            name:'Wendang'
         },
         {
            path:'/resource/:itemId',
            component:()=>import('@/pages/task/components/functions/resource.vue'),
            name:'Resource'
         },
         {
            path:'/note/:itemId',
            component:()=>import('@/pages/task/components/functions/note.vue'),
            name:'Note'
         },
    ],
    scrollBehavior(){
        return {
            left: 0,
            top: 0
        }
    }
})