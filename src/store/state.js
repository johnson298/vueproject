import navbarSearchAndPinList from '@/layouts/components/navbarSearchAndPinList';
import themeConfig from '@/../themeConfig.js';
import colors from '@/../themeConfig.js';

const state = {
  isSidebarActive: true,
  breakpoint: null,
  sidebarWidth: "default",
  reduceButton: themeConfig.sidebarCollapsed,
  bodyOverlay: false,
  sidebarItemsMin: false,
  theme: themeConfig.theme || 'light',
  navbarSearchAndPinList: navbarSearchAndPinList,
  AppActiveUser: {
    id: 0,
    name: 'John Doe',
    about: 'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
    img: 'avatar-s-11.png',
    status: 'online',
  },

  themePrimaryColor: colors.primary,

  starredPages: navbarSearchAndPinList.data.filter((page) => page.highlightAction),
  userRole: null,

  // Can be used to get current window with
  // Note: Above breakpoint state is for internal use of sidebar component
  windowWidth: null,
  model: {
    employees: {
      levels: [
        { text: 'Đại học', value: 1},
        { text: 'Cao đẳng', value: 2},
        { text: 'Khác', value: 3},
      ],
      positions: [
        { text: 'Giáo viên', value: 1},
        { text: 'Tư vấn', value: 2},
        { text: 'Kế toán', value: 3},
        { text: 'Quản lý', value: 4},
        { text: 'Khác', value: 5},
      ],
      majors: [
        { text: 'Có', value: 1 },
        { text: 'Không', value: 2 },
      ],
    }
  }
};

export default state;
