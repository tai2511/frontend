import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeDashboard from '@/views/admin/Home.vue'
import Homepage from '@/views/frontend/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    meta: {
      title: 'Login',
      auth: 0
    },
    path: '/login',
    component: Login
  },
  {
    meta: {
      title: 'Register',
      auth: 0
    },
    path: '/register',
    component: Register
  },
  { path: '*', redirect: '/' },
  {
    meta: {
      title: 'Home'
    },
    path: '/',
    component: Homepage,
    name: 'home'
  },
  {
    meta: {
      title: 'Dashboard'
    },
    path: '/admin',
    name: 'admin',
    component: HomeDashboard
  },
  {
    meta: {
      title: 'Tables'
    },
    path: '/admin/tables',
    name: 'tables',
    component: () => import(/* webpackChunkName: "tables" */ '@/views/admin/Tables.vue')
  },
  {
    meta: {
      title: 'Forms'
    },
    path: '/admin/forms',
    name: 'forms',
    component: () => import(/* webpackChunkName: "forms" */ '@/views/admin/Forms.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/admin/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/admin/Profile.vue')
  },
  {
    meta: {
      title: 'New client'
    },
    path: '/admin/client/new',
    name: 'client.new',
    component: () => import(/* webpackChunkName: "client-form" */ '@/views/admin/ClientForm.vue')
  },
  {
    meta: {
      title: 'Edit client'
    },
    path: '/admin/client/:id',
    name: 'client.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '@/views/admin/ClientForm.vue'),
    props: true
  },
  {
    meta: {
      title: 'Add Product'
    },
    path: '/admin/product',
    name: 'add.product',
    component: () => import(/* webpackChunkName: "tables" */ '@/views/admin/ProductForm.vue')
  },
  {
    meta: {
      title: 'Edit Product'
    },
    path: '/admin/product/:slug',
    name: 'edit.product',
    component: () => import(/* webpackChunkName: "ProductForm" */ '@/views/admin/ProductForm.vue'),
    props: true
  },
  {
    meta: {
      title: 'All Product'
    },
    path: '/admin/all-product',
    name: 'all_product',
    component: () => import(/* webpackChunkName: "tables" */ '@/views/admin/AllProduct.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  // process.env.
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

import store from '@/store'

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    // const currentUserRole = store.state.userRole
    const currentUserRole = 1
    if (to.path.includes('/admin') && currentUserRole !== 1) {
      next({ path: '/' })
    }
    next()
  } else {
    if (to.path.includes('/login') || to.path.includes('/register')) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

export default router
