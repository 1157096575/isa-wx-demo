/**
 * 年月日时分
 * @param {*} date 
 * return xxxx-xx-xx xx:xx
 */
export const formatTime = (date) => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute,].map(formatNumber).join(':')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 年月日时分秒
 * @param {*} date 
 * return xxxx-xx-xx xx:xx:xx
 */
export const formatYmdhms = (date) => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 年月日
 * @param {*} date 
 * @param {*} symble 
 * return xxxx.x.x
 */
export const formatYmd = (date,symble) => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  if(symble){
    return [year, month, day].map(formatNumber).join(symble)
  }
  return [year, month, day].join('.')
}


export const dateFormat = function(date, fmt) {
  if (!date) {
    return '';
  }
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  fmt = fmt || "yyyy/MM/dd hh:mm:ss";
  var o = {
    // 月份
    "M+": date.getMonth() + 1,
    // 日
    "d+": date.getDate(),
    // 小时
    "h+": date.getHours(),
    // 小时
    "H+": date.getHours(),
    // 分
    "m+": date.getMinutes(),
    // 秒
    "s+": date.getSeconds(),
    // 季度
    "q+": Math.floor((date.getMonth() + 3) / 3),
    // 毫秒
    S: date.getMilliseconds()
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? "/u661f/u671f"
          : "/u5468"
        : "") + week[date.getDay() + ""]
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      /* eslint-disable-next-line */
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};
