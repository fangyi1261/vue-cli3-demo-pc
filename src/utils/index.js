/* eslint-disable */

// import _ from 'lodash';

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

/**
* 防抖函数
* @param fn {Function}   实际要执行的函数
* @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
*
* @return {Function}     返回一个“去弹跳”了的函数
*/
export function debounce(fn, delay) {

  // 定时器，用来 setTimeout
  var timer;

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {

    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this;
    var args = arguments;

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer);

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
