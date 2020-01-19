export const dateDMY = (date) => date.split("-").reverse().join("-");

export const toPersent = (one, all) => all === 0 ? '0%' : `${(one*100/all).toFixed(2)}%`;

export const filterVia = (type) => {
  switch (type) {
  case "App\\Entities\\Branch":
    return 'chi nhánh';
  case "App\\Entities\\Teacher":
    return '1 giáo viên';
  case "App\\Entities\\Course":
    return '1 lớp học';
  default:
    return 'Toàn bộ trung tâm';
  }
};
