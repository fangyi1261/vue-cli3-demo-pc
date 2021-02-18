// eslint-disable-next-line
import _ from 'lodash';

export function param2Obj(url) {
  const search = url.split('?')[1];

  if (!search) {
    return {};
  }
  return JSON.parse(`{"${
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}
    "}`);
}

export function waiting(duration) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
}

export function hasPermission (roles, route) {
  if (route && route.roles) {
    return roles.some(role => route.roles.indexOf(role) >= 0);
  } else {
    return true;
  }
}

// 是否是数组且非空数组
export function arrayHasData(array) {
  if (Array.isArray(array) && array.length > 0) {
    return true;
  } else {
    return false;
  }
}

// 是否是空字符串且非空字符串
export function stringHasData(string) {
  if (typeof string === 'string' && string.length > 0) {
    return true;
  } else {
    return false;
  }
}

// 对象是否有值
export function objectHasData(object) {
  let length = 0;

  // eslint-disable-next-line no-unused-vars
  for (const key in object) {
    length++;
  }
  if (length === 0) {
    return false;
  } else {
    return true;
  }
}

// 是否是number
export function isNumber(number) {
  if (isNaN(number)) {
    return false;
  }
  if (typeof number === 'number') {
    return true;
  } else {
    return false;
  }
}

// 实现千位分隔符
export function numFormat(num) {
  const res = num.toString().replace(/\d+/, function(n) {
    return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
      return $1 + ',';
    });
  });

  return res;
}

// 防抖
export function debounce(fn, delay) {
  let timer = null;

  return function() {
    const args = arguments;
    // eslint-disable-next-line no-invalid-this
    const context = this;

    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
