function padLeftZero(str) {
  return (`00${str}`).substr(str.length);
}

export default function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    // eslint-disable-next-line no-param-reassign
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSecondes()
  };

  for (const key in o) {
    if (new RegExp(`(${key})`).test(fmt)) {
      const str = `${o[key]}`;

      // eslint-disable-next-line no-param-reassign
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

export function getAge (birthday, nowDay = '') {
  const today = nowDay ? new Date(nowDay) : new Date();

  if (typeof birthday !== 'object') {
    // eslint-disable-next-line no-param-reassign
    birthday = new Date(birthday);
  }
  let age = today.getFullYear() - birthday.getFullYear();

  if (age < 0) {
    return false;
  }
  // 发生年龄减一的情况
  const m = today.getMonth() - birthday.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age -= 1;
  }
  return age;
}
