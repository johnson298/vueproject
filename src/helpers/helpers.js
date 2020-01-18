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

export const DOCSO = (s) => {
  let th = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ"];
  let dg = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín"
  ];
  let tn = [
    "mười",
    "mười một",
    "mười hai",
    "mười ba",
    "mười bốn",
    "mười năm",
    "mười sáu",
    "mười bảy",
    "mười tám",
    "mười chín"
  ];
  let tw = [
    "hai mươi",
    "ba mươi",
    "bốn mươi",
    "năm mươi",
    "sáu mươi",
    "bảy mươi",
    "tám mươi",
    "chín mươi"
  ];
  s = s.toString();
  if (s != parseFloat(s)) return "không phải là số";
  let x = s.indexOf(".");
  if (x == -1) x = s.length;
  if (x > 15) return "quá lớn";
  let n = s.split("");
  let str = "";
  let sk = 0;
  for (let i = 0; i < x; i++) {
    if ((x - i) % 3 == 2) {
      if (n[i] == "1") {
        str += tn[Number(n[i + 1])] + " ";
        i++;
        sk = 1;
      } else if (n[i] != 0) {
        str += tw[n[i] - 2] + " ";
        sk = 1;
      }
    } else if (n[i] != 0) {
      // 0235
      str += dg[n[i]] + " ";
      if ((x - i) % 3 == 0) str += "trăm ";
      sk = 1;
    }
    if ((x - i) % 3 == 1) {
      if (sk) str += th[(x - i - 1) / 3] + " ";
      sk = 0;
    }
  }

  if (x != s.length) {
    let y = s.length;
    str += "point ";
    for (let i = x + 1; i < y; i++) str += dg[n[i]] + " ";
  }
  return str.replace(/\s+/g, " ") + "đồng";
};
