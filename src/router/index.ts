import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import * as middleware from './middleware'

const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  meta: {
    role: 'admin'
  },
  children: [
    {
      path: '',
      name: 'admin.home',
      component: () => import('@/views/admin/HomeView.vue')
    },
    {
      path: 'admins',
      name: 'admin.admins',
      component: () => import('@/views/admin/HomeView.vue'),
    }
  ]
};

const sellerRoutes: RouteRecordRaw = {
  path: '/seller',
  meta: {
    role: 'seller'
  },
  children: [
    {
      path: '',
      name: 'seller.home',
      component: () => import('@/views/seller/HomeView.vue')
    }
  ]
};

const userRoutes: RouteRecordRaw = {
  path: '/',
  meta: {
    role: 'user'
  },
  children: [
    {
      path: '',
      name: 'user.home',
      component: () => import('@/views/user/HomeView.vue')
    },
    {
      path: 'products',
      name: 'user.products',
      component: () => import('@/views/user/ProductsView.vue'),
      // beforeEnter: middleware.checkUserAuth
    },
    {
      path: 'products/:slug',
      name: 'user.productBySlug',
      component: () => import('@/views/user/ProductBySlug.vue')
    },
    {
      path: 'categories/:name',
      name: 'user.productByCategory',
      component: () => import('@/views/user/ProductByCategory.vue')
    },
    {
      path: 'test',
      name: 'user.test',
      component: () => import('@/components/user/ProductCard.vue'),
      meta: {
        hideNavbar: true,
        hideFooter: true
      }
    },
    {
      path: 'categories',
      name: 'user.categories',
      component: () => import('@/views/user/CategoriesView.vue')
    },
    {
      path: 'login',
      name: 'user.login',
      component: () => import('@/views/user/LoginView.vue'),
      meta: {
        hideNavbar: true,
        hideFooter: true
      }
    },
    {
      path: 'register',
      name: 'user.register',
      component: () => import('@/views/user/RegisterView.vue'),
      meta: {
        hideNavbar: true,
        hideFooter: true
      }
    },
  ]
};

const notFound: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'PageNotFound',
  component: () => import('@/views/error/NotFoundView.vue')
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    userRoutes,
    sellerRoutes,
    adminRoutes,
    notFound
  ]
})

export default router
