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
      beforeEnter: middleware.checkAdminAuth,
      component: () => import('@/views/admin/HomeView.vue')
    },
    {
      path: 'profile',
      name: 'admin.profile',
      component: () => import('@/views/admin/ProfileView.vue'),
      beforeEnter: middleware.checkAdminAuth
    },
    {
      path: 'profile/edit',
      name: 'admin.profileEdit',
      component: () => import('@/views/admin/ProfileEditView.vue'),
      beforeEnter: middleware.checkAdminAuth
    },
    {
      path: 'categories',
      beforeEnter: middleware.checkAdminAuth,
      children: [
        {
          path: '',
          name: 'admin.categories',
          component: () => import('@/views/admin/categories/IndexView.vue')
        },
        {
          path: 'add',
          name: 'admin.categoriesAdd',
          component: () => import('@/views/admin/categories/AddView.vue')
        },
        {
          path: ':id',
          name: 'admin.categoriesShow',
          component: () => import('@/views/admin/categories/ShowView.vue')
        },
        {
          path: 'edit/:id',
          name: 'admin.categoriesEdit',
          component: () => import('@/views/admin/categories/EditView.vue')
        }
      ]
    },
    {
      path: 'admins',
      beforeEnter: middleware.checkAdminAuth,
      children: [
        {
          path: '',
          name: 'admin.admins',
          component: () => import('@/views/admin/admins/IndexView.vue')
        },
        {
          path: 'add',
          name: 'admin.adminsAdd',
          component: () => import('@/views/admin/admins/AddView.vue')
        },
        {
          path: ':id',
          name: 'admin.adminsShow',
          component: () => import('@/views/admin/admins/ShowView.vue')
        },
        {
          path: 'edit/:id',
          name: 'admin.adminsEdit',
          component: () => import('@/views/admin/admins/EditView.vue')
        }
      ]
    },
    {
      path: 'login',
      name: 'admin.login',
      component: () => import('@/views/admin/LoginView.vue'),
      meta: {
        hideSidebar: true
      },
      beforeEnter: middleware.adminAuthenticated
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
      component: () => import('@/views/user/ProductBySlugView.vue')
    },
    {
      path: 'categories/:name',
      name: 'user.productByCategory',
      component: () => import('@/views/user/ProductByCategoryView.vue')
    },
    {
      path: 'categories',
      name: 'user.categories',
      component: () => import('@/views/user/CategoriesView.vue')
    },
    {
      path: 'cart',
      name: 'user.cart',
      component: () => import('@/views/user/CartView.vue'),
      beforeEnter: middleware.checkUserAuth
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
