import navbarSearchAndPinList from "@/layouts/components/navbarSearchAndPinList";
import themeConfig from "@/../themeConfig.js";
import colors from "@/../themeConfig.js";
function checkBranch() {
  let userBranchId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).branch_id : false;
  let branchId = localStorage.getItem("branchId");
  let branchDefault = localStorage.getItem("defaultBranch");
  if (userBranchId) {
    return userBranchId;
  }
  if (branchId) {
    return branchId;
  }
  if (branchDefault) {
    return branchDefault;
  }
}
const state = {
  configuration: null,
  getBranchId: checkBranch(),
  isSidebarActive: true,
  breakpoint: null,
  sidebarWidth: "default",
  reduceButton: themeConfig.sidebarCollapsed,
  bodyOverlay: false,
  sidebarItemsMin: false,
  theme: themeConfig.theme || "light",
  navbarSearchAndPinList: navbarSearchAndPinList,
  AppActiveUser: {
    id: 0,
    name: "John Doe",
    about:
      "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.",
    img: "default.png",
    status: "online"
  },

  themePrimaryColor: colors.primary,

  starredPages: navbarSearchAndPinList.data.filter(
    page => page.highlightAction
  ),
  userRole: null,

  // Can be used to get current window with
  // Note: Above breakpoint state is for internal use of sidebar component
  windowWidth: null,
  model: {
    employees: {
      levels: [
        { text: "Đại học", value: 1 },
        { text: "Cao đẳng", value: 2 },
        { text: "Khác", value: 3 }
      ],
      positions: [
        { text: "Admin", value: 1 },
        { text: "Tư vấn", value: 2 },
        { text: "Quản lý", value: 3 },
        { text: "Kế toán", value: 4 },
        { text: "Giáo viên", value: 5 }
      ],
      majors: [
        { text: "Không", value: 0 },
        { text: "Có", value: 1 }
      ],
      status: [
        { text: "Nghỉ", value: 0 },
        { text: "Hoạt động", value: 1 }
      ]
    },
    students: {
      gender: [
        { text: "Nam", value: 0 },
        { text: "Nữ", value: 1 }
      ],
      source: [
        { text: "Facebook", value: 1 },
        { text: "Bạn bè", value: 2 },
        { text: "Trang chủ", value: 3 },
        { text: "Khách hàng", value: 4 }
      ],
      reserves: [
        { text: "Đang bảo lưu", value: 1 },
        { text: "Đã chuyển", value: 2 },
        { text: "Hủy", value: 3 }
      ]
    },
    courses: {
      status: [
        { text: "Mở", value: 1 },
        { text: "Hoạt động", value: 2 },
        { text: "Hoàn thành", value: 3 },
        { text: "Đã hủy", value: 4 }
      ]
    },
    coupons: {
      type: [
        { text: "Theo tỉ lệ", value: 1 },
        { text: "Theo số tiền", value: 2 }
      ],
      status: [
        { text: "Không khả dụng", value: 1 },
        { text: "Khuyến mại", value: 2 }
      ]
    },
    teachers: {
      role: [
        { text: "Giảng viên", value: 1 },
        { text: "Trợ giảng", value: 2 }
      ]
    },
    calendar: {
      class: [
        { text: "Ca sáng 7h-9h", value: 1 },
        { text: "Ca sáng 9h-11h", value: 2 },
        { text: "Ca chiều 13h-13h", value: 3 },
        { text: "Ca chiều 15h-17h", value: 4 },
        { text: "Ca tối 17h-19h", value: 5 },
        { text: "Ca tối 19h-21h", value: 6 }
      ],
      status: [
        { text: "Nghỉ", value: 1 },
        { text: "Thay giảng viên", value: 2 },
        { text: "Học bù", value: 3 }
      ]
    },
    customer: {
      status: [
        { text: "Chờ chăm sóc", value: 1 },
        { text: "Đang chăm sóc", value: 2 },
        { text: "Thành công", value: 3 },
        { text: "Hủy tư vấn", value: 4 }
      ]
    },
    campaign: {
      target_type: [
        { text: "Toàn bộ trung tâm", value: "" },
        { text: "1 chi nhánh", value: "App\\Entities\\Branch" },
        { text: "1 lớp học", value: "App\\Entities\\Course" },
        { text: "1 học viên", value: "App\\Entities\\Student" },
        { text: "1 giáo viên", value: "App\\Entities\\User" }
      ],
      position: [
        { text: "Giáo viên", value: 1 },
        { text: "Học viên", value: 2 }
      ]
    },
    invoices: {
      source: [
        { text: "Momo", value: 1 },
        { text: "Tiền mặt", value: 2 },
        { text: "Chuyển khoản", value: 3 }
      ]
    }
  }
};

export default state;
