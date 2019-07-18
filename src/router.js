import Vue from 'vue';
import Router from 'vue-router';
import auth from "@/auth/authService";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 };
  },
  routes: [

    {
    // =============================================================================
    // MAIN LAYOUT ROUTES requiresAuth: true
    // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
      // =============================================================================
      // Theme Routes
      // =============================================================================
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta: {
            breadcrumb: [
              { title: 'Dashboard', url: '/' },
            ],
            pageTitle: 'Dashboard'
          },
        },
        {
          path: '/employees',
          name: 'employees',
          component: () => import('./views/employees/DataListListView.vue'),
          meta: {
            breadcrumb: [
              { title: 'Nhân viên', url: '/' },
            ],
            pageTitle: 'Nhân viên'
          },
        },
      ],
      meta: {
        authRequired: true
      }
    },
    // =============================================================================
    // FULL PAGE LAYOUTS requiresAuth: false
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
      // =============================================================================
      // PAGES
      // =============================================================================
        {
          path: '/pages/login',
          name: 'pageLogin',
          component: () => import('@/views/pages/Login.vue')
        },
        {
          path: '/pages/error-404',
          name: 'pageError404',
          component: () => import('@/views/pages/Error404.vue')
        },
      ],
      meta: {
        authRequired: false,
      }
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ],
});

router.afterEach(() => {
  const appLoading = document.getElementById('loading-bg');
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(m => m.meta.authRequired)) {
    if (await auth.isAuthenticated()) {
      return next();
    }
    else {
      return router.push({ path: '/pages/login', query: { to: to.path } });
    }
  } else {
    return next();
  }
});

export default router;
