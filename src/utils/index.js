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
* 防抖函数 => 在连续的时间段内只执行一次 “fn” 函数（只执行一次）
* @param fn {Function}   实际要执行的函数
* @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
*
* @return {Function}     返回一个“去弹跳”了的函数
*/
export function debounce(fn, delay=200) {

  // 定时器，用来 setTimeout
  let timer;

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {

    // 保存函数调用时的上下文和参数，传递给 fn
    let context = this, args = arguments;

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    if(timer) {
      clearTimeout(timer);
    }
    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

/**
* 节流函数 => 在规定 “fn” 函数以固定速率执行（执行多次）
* @param fn {Function}   实际要执行的函数
* @param threshold {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
*
* @return {Function}     返回一个“节流”了的函数
*/
export function throttle(fn, threshold=250) {
  let last, timer; // last 上次执行的时间

  return function () {
    let context = this, args = arguments;

    let now = +new Date();

    if (last && now < last + threshold) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(context, args)
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  }
}