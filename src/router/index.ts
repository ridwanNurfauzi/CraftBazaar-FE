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
      component: () => import('@/views/seller/HomeView.vue'),
      beforeEnter: middleware.checkSellerAuth
    },
    {
      path: 'profile',
      name: 'seller.profile',
      component: () => import('@/views/seller/ProfileView.vue'),
      beforeEnter: middleware.checkSellerAuth
    },
    {
      path: 'profile/edit',
      name: 'seller.profileEdit',
      component: () => import('@/views/seller/ProfileEditView.vue'),
      beforeEnter: middleware.checkSellerAuth
    },
    {
      path: 'products',
      beforeEnter: middleware.checkSellerAuth,
      children: [
        {
          path: '',
          name: 'seller.products',
          component: () => import('@/views/seller/products/IndexView.vue')
        },
        {
          path: 'add',
          name: 'seller.productsAdd',
          component: () => import('@/views/seller/products/AddView.vue')
        },
        {
          path: ':id',
          name: 'seller.productsShow',
          component: () => import('@/views/seller/products/ShowView.vue')
        },
        {
          path: 'edit/:id',
          name: 'seller.productsEdit',
          component: () => import('@/views/seller/products/EditView.vue')
        }
      ]
    },
    {
      path: 'login',
      name: 'seller.login',
      component: () => import('@/views/seller/LoginView.vue'),
      meta: {
        hideSidebar: true
      },
      beforeEnter: middleware.sellerAuthenticated
    },
    {
      path: 'register',
      name: 'seller.register',
      component: () => import('@/views/seller/RegisterView.vue'),
      meta: {
        hideSidebar: true
      },
      beforeEnter: middleware.sellerAuthenticated
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
      path: 'profile',
      name: 'user.profile',
      component: () => import('@/views/user/ProfileView.vue'),
      beforeEnter: middleware.checkUserAuth
    },
    {
      path: 'profile/edit',
      name: 'user.profileEdit',
      component: () => import('@/views/user/ProfileEditView.vue'),
      beforeEnter: middleware.checkUserAuth
    },
    {
      path: 'sellers/:code',
      name: 'user.sellerByCode',
      component: () => import('@/views/user/SellerByCodeView.vue')
    },
    {
      path: 'products',
      name: 'user.products',
      component: () => import('@/views/user/ProductsView.vue'),
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
      },
      beforeEnter: middleware.userAuthenticated
    },
    {
      path: 'register',
      name: 'user.register',
      component: () => import('@/views/user/RegisterView.vue'),
      meta: {
        hideNavbar: true,
        hideFooter: true
      },
      beforeEnter: middleware.userAuthenticated
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
