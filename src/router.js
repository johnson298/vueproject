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
      meta: {
        authRequired: true
      },
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
            pageTitle: 'Nhân viên',
            authRequired: true,
          },
        },
        {
          path: '/employees/:employee',
          name: 'employee',
          component: () => import('./views/employees/DetailEmployee.vue'),
          meta: {
            breadcrumb: [
              { title: 'Chi tiết nhân viên', url: '/'}
            ],
            pageTitle: 'Chi tiết nhân viên'
          }
        },
        {
          path: '/students',
          name: 'students',
          component: () => import('./views/students/StudentsList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Học viên', url: '/'}
            ],
            pageTitle: 'Học viên'
          }
        },
        {
          path: '/students/:student',
          name: 'student',
          component: () => import('./views/students/DetailStudent.vue'),
          meta: {
            breadcrumb: [
              { title: 'Chi tiết học viên', url: '/'}
            ],
            pageTitle: 'Chi tiết học viên'
          }
        },
        {
          path: '/programs',
          name: 'programs',
          component: () => import('./views/programs/ProgramsList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Chương trình học', url: '/'}
            ],
            pageTitle: 'Chương trình học'
          }
        },
        {
          path: '/settings',
          component: () => import('./views/settings/Settings.vue'),
          meta: {
            breadcrumb: [
              { title: 'Cài đặt', url: '/'}
            ],
            pageTitle: 'Cài đặt'
          },
          children: [
            {
              path: '',
              name: 'SettingsSystems',
              component: () => import('./views/settings/systems/SettingsSystems.vue'),
              meta: {
                breadcrumb: [
                  { title: 'Cài đặt hệ thống', url: '/'}
                ],
                pageTitle: 'Cài đặt hệ thống'
              }
            },
            {
              path: 'branches',
              name: 'SettingsBranches',
              component: () => import('./views/settings/branches/DataListListView.vue'),
              meta: {
                breadcrumb: [
                  { title: 'Cài đặt chi nhánh', url: '/'}
                ],
                pageTitle: 'Cài đặt chi nhánh'
              }
            },
            {
              path: 'branches/:branch/rooms',
              name: 'branch',
              component: () => import('./views/settings/branches/rooms/BranchRooms.vue'),
              meta: {
                breadcrumb: [
                  { title: 'Chi tiết phòng học', url: '/'}
                ],
                pageTitle: 'Chi tiết phòng học'
              }
            },
            {
              path: 'coupons',
              name: 'SettingsCoupons',
              component: () => import('./views/settings/coupons/CouponsList.vue'),
              meta: {
                breadcrumb: [
                  { title: 'Khuyến mại', url: '/'}
                ],
                pageTitle: 'Khuyến mại'
              }
            },
          ]
        },
        {
          path: '/courses',
          name: 'courses',
          component: () => import('./views/courses/DataListListView.vue'),
          meta: {
            breadcrumb: [
              {title: 'Lớp học ', url: '/'}
            ],
            pageTitle: 'Lớp học'
          }
        },
        {
          path: 'courses/:course',
          component: () => import('./views/courses/DetailCourses.vue'),
          meta: {
            breadcrumb: [
              { title: 'Chi tiết lớp học', url: '/'}
            ],
            pageTitle: 'Chi tiết lớp học'
          },
          children: [
            {
              path: '',
              name: 'statisticcourse',
              component: () => import('./views/courses/statistic/StatisticCourse.vue'),
              meta: {
                breadcrumb: [
                  { title: 'Thống kê lớp học', url: '/'}
                ],
                pageTitle: 'Thống kê lớp học'
              },
            },
            {
              path: 'student',
              name: 'studentregisters',
              component: () => import('./views/courses/students/ListStudent.vue'),
              meta: {
                breadcrumb: [
                  { title: 'Học viên trong lớp', url: '/'}
                ],
                pageTitle: 'Học viên trong lớp'
              },
            },
            {
              path: 'teacher',
              name: 'teacherregisters',
              component: () => import('./views/courses/teachers/GetDataTeachers.vue'),
              meta: {
                breadcrumb: [
                  { title: 'Giáo viên viên trong lớp', url: '/'}
                ],
                pageTitle: 'Giáo viên trong lớp'
              },
            },
            {
              path: 'calendar',
              name: 'calendar',
              component: () => import('./views/courses/calendar/SimpleCalendar.vue'),
              meta: {
                breadcrumb: [
                  { title: 'Lịch học', url: '/'}
                ],
                pageTitle: 'Lịch học'
              },
            },
            {
              path: 'history',
              name: 'historycourse',
              component: () => import('./views/courses/history/HistoryCourse.vue'),
              meta: {
                breadcrumb: [
                  { title: 'Lịch sử lớp học', url: '/'}
                ],
                pageTitle: 'Lịch sử lớp học'
              },
            },
          ]
        },
        {
          path: '/invoices',
          component: () => import('./views/money/Invoices.vue'),
          meta: {
            breadcrumb: [
              { title: 'Thu chi', url: '/'}
            ],
            pageTitle: 'Thu chi'
          },
        },
        {
          path: '/customer',
          component: () => import('./views/customer/CustomerList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Khách hàng', url: '/'}
            ],
            pageTitle: 'Khách hàng'
          },
        },
        {
          path: '/customers',
          name: 'customer',
          component: () => import('./views/customer/DetailEmployee.vue'),
          meta: {
            breadcrumb: [
              { title: 'Chi tiết khách hàng', url: '/'}
            ],
            pageTitle: 'Chi tiết khách hàng'
          }
        },
        {
          path: '/campaign',
          name: 'campaign',
          component: () => import('./views/campaign/DataListListView.vue'),
          meta: {
            breadcrumb: [
              { title: 'Chi tiết chiến dịch', url: '/'}
            ],
            pageTitle: 'Chi tiết chiến dịch'
          }
        },
      ],
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
