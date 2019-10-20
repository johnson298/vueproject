import Vue from "vue";
import Router from "vue-router";
import auth from "@/auth/authService";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES requiresAuth: true
      // =============================================================================
      path: "",
      component: () => import("./layouts/main/Main.vue"),
      meta: {
        authRequired: true
      },
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "/",
          name: "home",
          component: () => import("./views/Home.vue"),
          meta: {
            breadcrumb: [{ title: "Dashboard", url: "/" }],
            pageTitle: "Dashboard"
          }
        },
        // NHÂN VIÊN
        {
          path: "/employees",
          component: () => import("./views/employees/DataListListView.vue"),
          meta: {
            breadcrumb: [
              { title: "Nhân viên", url: "/employees" },
              { title: "Tài khoản" },
              { title: "Nhân viên", active: true }
            ],
            pageTitle: "Nhân viên",
            authRequired: true
          }
        },
        {
          path: "/employees/:employee",
          component: () => import("./views/employees/DetailEmployee.vue"),
          meta: {
            breadcrumb: [
              { title: "Chi tiết nhân viên", url: "/" },
              { title: "Nhân viên", url: "/employees" },
              { title: "Chi tiết nhân viên", active: true }
            ],
            pageTitle: "Chi tiết nhân viên"
          },
          children: [
            {
              path: "",
              name: "infoEmployee",
              component: () =>
                import("./views/employees/infomation/EmployeeInfo.vue"),
              meta: {
                breadcrumb: [{ title: "Thông tin", active: true }],
                pageTitle: "Nhân viên",
                authRequired: true
              }
            },
            {
              path: "history",
              name: "historyEmployee",
              component: () =>
                import("./views/employees/history/HistoryEmployee.vue"),
              meta: {
                breadcrumb: [{ title: "Lịch sử", active: true }],
                pageTitle: "Nhân viên",
                authRequired: true
              }
            },
            {
              path: "courses",
              name: "coursesEmployee",
              component: () =>
                import("./views/employees/courses/CoursesList.vue"),
              meta: {
                breadcrumb: [{ title: "Lớp học đang tham gia", active: true }],
                pageTitle: "Nhân viên",
                authRequired: true
              }
            }
          ]
        },
        // HỌC VIÊN
        {
          path: "/students",
          name: "students",
          component: () => import("./views/students/StudentsList.vue"),
          meta: {
            breadcrumb: [
              { title: "Học viên", url: "/students" },
              { title: "Tài khoản" },
              { title: "Học viên", active: true }
            ],
            pageTitle: "Học viên"
          }
        },
        {
          path: "/students/:student",
          component: () => import("./views/students/DetailStudent.vue"),
          meta: {
            breadcrumb: [
              { title: "Chi tiết học viên", url: "/" },
              { title: "Học viên", url: "/students" },
              { title: "Chi tiết học viên", active: true }
            ],
            pageTitle: "Chi tiết học viên"
          },
          children: [
            {
              path: "",
              name: "infoStudent",
              component: () =>
                import("./views/students/infomation/StudentInfo.vue"),
              meta: {
                breadcrumb: [{ title: "Thông tin học viên", url: "/" }],
                pageTitle: "Thông tin học viên"
              }
            },
            {
              path: "history",
              name: "historyStudent",
              component: () =>
                import("./views/students/history/HistoryStudent.vue"),
              meta: {
                breadcrumb: [{ title: "Lịch sử học viên", url: "/" }],
                pageTitle: "Lịch sử học viên"
              }
            },
            {
              path: "courses",
              name: "coursesStudent",
              component: () =>
                import("./views/students/courses/CoursesList.vue"),
              meta: {
                breadcrumb: [{ title: "Lớp học đang tham gia", url: "/" }],
                pageTitle: "Lớp học đang tham gia"
              }
            }
          ]
        },
        // CHƯƠNG TRÌNH HỌC
        {
          path: "/programs",
          name: "programs",
          component: () => import("./views/programs/ProgramsList.vue"),
          meta: {
            breadcrumb: [
              { title: "Chương trình học", url: "/programs" },
              { title: "Đào tạo" },
              { title: "Chương trình học", active: true }
            ],
            pageTitle: "Chương trình học"
          }
        },
        {
          path: "/programs/:program/lessons",
          name: "coursesOnline",
          component: () => import("./views/programs/lessons/LessonList.vue"),
          meta: {
            breadcrumb: [{ title: "Khóa học online", url: "/" }],
            pageTitle: "Khóa học online"
          }
        },
        //SETTINGS
        {
          path: "/settings",
          component: () => import("./views/settings/Settings.vue"),
          meta: {
            breadcrumb: [{ title: "Cài đặt", url: "/" }],
            pageTitle: "Cài đặt"
          },
          children: [
            {
              path: "",
              name: "SettingsSystems",
              component: () =>
                import("./views/settings/systems/SettingsSystems.vue"),
              meta: {
                breadcrumb: [{ title: "Cài đặt hệ thống", url: "/" }],
                pageTitle: "Cài đặt hệ thống"
              }
            },
            {
              path: "branches",
              name: "SettingsBranches",
              component: () =>
                import("./views/settings/branches/DataListListView.vue"),
              meta: {
                breadcrumb: [
                  { title: "Cài đặt chi nhánh", url: "/" },
                  { title: "Cài đặt", url: "/settings" },
                  { title: "Chi nhánh", active: true }
                ],
                pageTitle: "Cài đặt chi nhánh"
              }
            },
            {
              path: "branches/:branch/rooms",
              name: "branch",
              component: () =>
                import("./views/settings/branches/rooms/BranchRooms.vue"),
              meta: {
                breadcrumb: [
                  { title: "Chi tiết phòng học", url: "/" },
                  { title: "Cài đặt", url: "/settings" },
                  { title: "Chi nhánh", url: "/settings/branches" },
                  { title: "Phòng học", active: true }
                ],
                pageTitle: "Chi tiết phòng học"
              }
            },
            {
              path: "coupons",
              name: "SettingsCoupons",
              component: () =>
                import("./views/settings/coupons/CouponsList.vue"),
              meta: {
                breadcrumb: [
                  { title: "Khuyến mại", url: "/" },
                  { title: "Cài đặt", url: "/settings" },
                  { title: "Khuyến mại", active: true }
                ],
                pageTitle: "Khuyến mại"
              }
            }
          ]
        },
        // LỚP HỌC
        {
          path: "/courses",
          name: "courses",
          component: () => import("./views/courses/DataListListView.vue"),
          meta: {
            breadcrumb: [
              { title: "Lớp học", url: "/courses" },
              { title: "Đào tạo" },
              { title: "Lớp học", active: true }
            ],
            pageTitle: "Lớp học"
          }
        },
        {
          path: "courses/:course",
          component: () => import("./views/courses/DetailCourses.vue"),
          meta: {
            breadcrumb: [{ title: "Chi tiết lớp học", url: "/" }],
            pageTitle: "Chi tiết lớp học"
          },
          children: [
            {
              path: "",
              name: "statisticcourse",
              component: () =>
                import("./views/courses/statistic/StatisticCourse.vue"),
              meta: {
                breadcrumb: [
                  { title: "Thống kê lớp học", url: "/" },
                  { title: "Lớp học", url: "/courses" },
                  { title: "Thống kế lớp học", active: true }
                ],
                pageTitle: "Thống kê lớp học"
              }
            },
            {
              path: "students",
              name: "studentregisters",
              component: () =>
                import("./views/courses/students/ListStudent.vue"),
              meta: {
                breadcrumb: [
                  { title: "Học viên trong lớp", url: "/" },
                  { title: "Lớp học", url: "/courses" },
                  { title: "Học viên trong lớp", active: true }
                ],
                pageTitle: "Học viên trong lớp"
              }
            },
            {
              path: "teachers",
              name: "teacherregisters",
              component: () =>
                import("./views/courses/teachers/GetDataTeachers.vue"),
              meta: {
                breadcrumb: [{ title: "Giáo viên viên trong lớp", url: "/" }],
                pageTitle: "Giáo viên trong lớp"
              }
            },
            {
              path: "attendances",
              name: "attendancesList",
              component: () =>
                import("./views/courses/attendances/ListAttendances.vue"),
              meta: {
                breadcrumb: [{ title: "Điểm danh" }],
                pageTitle: "Điểm danh"
              }
            },
            {
              path: "attendances/:attendance",
              name: "attendancesCourse",
              component: () =>
                import("./views/courses/attendances/DetailAttendance.vue"),
              meta: {
                breadcrumb: [{ title: "Điểm danh học viên" }],
                pageTitle: "Điểm danh học viên"
              }
            },
            {
              path: "calendar",
              name: "calendar",
              component: () =>
                import("./views/courses/calendar/SimpleCalendar.vue"),
              meta: {
                breadcrumb: [{ title: "Lịch học", url: "/" }],
                pageTitle: "Lịch học"
              }
            },
            {
              path: "history",
              name: "historycourse",
              component: () =>
                import("./views/courses/history/HistoryCourse.vue"),
              meta: {
                breadcrumb: [
                  { title: "Lịch sử lớp học", url: "/" },
                  { title: "Lớp học", url: "/courses" },
                  { title: "Lịch sử lớp học", active: true }
                ],
                pageTitle: "Lịch sử lớp học"
              }
            }
          ]
        },
        // THU HỌC PHÍ
        {
          path: "/invoices/revenues",
          component: () => import("./views/invoices/Invoices.vue"),
          meta: {
            breadcrumb: [
              { title: "Thu học phí", url: "/invoices/revenues" },
              { title: "Thu chi" },
              { title: "Thu học phí", active: true }
            ],
            pageTitle: "Thu học phí"
          }
        },
        // CHI TIÊU
        {
          path: "/invoices/expenditures",
          component: () => import("./views/expense/ExpenseList.vue"),
          meta: {
            breadcrumb: [
              { title: "Chi tiêu", url: "/invoices/expenditures" },
              { title: "Thu chi" },
              { title: "Chi tiêu", active: true }
            ],
            pageTitle: "Chi tiêu"
          }
        },
        // BÁO CÁO
        {
          path: "/reports",
          component: () => import("./views/reports/OverView.vue"),
          meta: {
            breadcrumb: [
              { title: "Báo cáo", url: "/reports" },
              { title: "Thu chi" },
              { title: "Báo cáo", active: true }
            ],
            pageTitle: "Báo cáo"
          }
        },
        {
          path: "/report/employee",
          component: () => import("./views/reports/EmployeeReport.vue"),
          meta: {
            breadcrumb: [{ title: "Báo cáo nhân viên", url: "/" }],
            pageTitle: "Báo cáo nhân viên"
          }
        },
        // KHÁCH HÀNG
        {
          path: "/customers",
          component: () => import("./views/customers/CustomersList.vue"),
          meta: {
            breadcrumb: [{ title: "Khách hàng", url: "/" }],
            pageTitle: "Khách hàng"
          }
        },
        {
          path: "/campaign",
          name: "campaign",
          component: () => import("./views/campaign/DataListListView.vue"),
          meta: {
            breadcrumb: [{ title: "Chi tiết chiến dịch", url: "/" }],
            pageTitle: "Chi tiết chiến dịch"
          }
        },
        {
          path: "/notifications",
          name: "notificationUser",
          component: () => import("./views/notification/ListNotification.vue"),
          meta: {
            breadcrumb: [{ title: "Thông báo", url: "/" }],
            pageTitle: "Thông báo"
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS requiresAuth: false
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: "/pages/login",
          name: "pageLogin",
          component: () => import("@/views/pages/Login.vue")
        },
        {
          path: "/pages/error-404",
          name: "pageError404",
          component: () => import("@/views/pages/Error404.vue")
        }
      ],
      meta: {
        authRequired: false
      }
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/pages/error-404"
    }
  ]
});

router.afterEach(() => {
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(m => m.meta.authRequired)) {
    if (await auth.isAuthenticated()) {
      return next();
    } else {
      return router.push({ path: "/pages/login", query: { to: to.path } });
    }
  } else {
    return next();
  }
});

export default router;
