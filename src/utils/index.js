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

// //对称二叉树
// const symmetricalTree = {
//   val: 8,
//   left: {
//     val: 6,
//     left: { val: 5, left: null, right: null },
//     right: { val: 7, left: null, right: null }
//   },
//   right: {
//     val: 6,
//     left: { val: 7, left: null, right: null },
//     right: { val: 5, left: null, right: null }
//   }
// }
// //非对称二叉树
// const binaryTree = {
//   val: 8,
//   left: {
//     val: 6,
//     left: { val: 5, left: null, right: null },
//     right: { val: 7, left: null, right: null }
//   },
//   right: {
//     val: 9,
//     left: { val: 7, left: null, right: null },
//     right: { val: 5, left: null, right: null }
//   }
// }
// 判断是不是对称二叉树
export function isSymmetric(rootNode) {
  const isSymmetricalTree  = function(node1, node2) {
    if (!node1 && !node2) {
      return true;
    }
    if (!node1 || !node2) {
      return false;
    }
    if (node1.val !== node2.val) {
      return false;
    }
    return isSymmetricalTree(node1.left, node2.right) && isSymmetricalTree(node1.right, node2.left);
  };
  return isSymmetricalTree(rootNode, rootNode);
}

/**
 * 快速排序（二分法排序）
 * @param {*} arr 目标数组
 * @returns 返回排序后的数组
 */
export function quickSort(arr=[]) {
  if (arr.length <= 1) {
    return arr;
  }
  const index = Math.floor(arr.length/2);
  const temp = arr.splice(index, 1);
  let left = [], right = [];
  arr.forEach(item => {
    if (item < temp) {
      left.push(item);
    }
    if (item >= temp) {
      right.push(item);
    }
  })
  return quickSort(left).concat(temp, quickSort(right));
}

/**
 * 在给定数组中找到两个数，和是给定大小
 * @param arr 目标数组
 * @param target 目标和
 * @returns 返回对应下标
 */

export function twoSum(arr, target) {
  // 方法一
  // for(let i = 0; i < arr.length - 1; i++) {
  //   for(let j = i + 1; j < arr.length; j++) {
  //     if (arr[i] + arr[j] === target) {
  //       return [i, j];
  //     }
  //   }
  // }
  // return [];

  // 方法二
  // let hasMap = new Map();
  // for(let i = 0; i < arr.length; i++) {
  //   if (hasMap.has(target - arr[i])) {
  //     return [hasMap.get(target - arr[i]), i];
  //   } else {
  //     hasMap.set(arr[i], i);
  //   }
  // }
  // return [];

  // 方法三
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (obj[arr[i]] !== undefined) {
      return [arr[i], obj[arr[i]]];
    } else {
      obj[target - arr[i]] = arr[i];
    }
  }
  return [];
}

// 原生网络请求
export const ajax = {
  get: function(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          console.log(xhr.responseText)
          callback(xhr.responseText);
        }
      }
    }
    xhr.send();
  },
  post: function(url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          console.log(xhr.responseText)
          callback(xhr.responseText);
        }
      }
    }
    xhr.send(JSON.stringify(data));
  },
}

export const http = {
  get: function(url) {
    return new Promise((resolve, reject) => {
      const handler = function() {
        if (this.readyState !== 4) {
          return false;
        }
        if (this.status === 200 || this.status === 304) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText))
        }
      }
      const client = new XMLHttpRequest();
      client.open('GET', url);
      client.onreadystatechange = handler;
      client.responseType = 'json';
      client.setRequestHeader('Accept', 'application/json');
      client.send();
    })
  },
  post: function(url, data) {
    return new Promise((resolve, reject) => {
      const handler = function() {
        if (this.readyState !== 4) {
          return false;
        }
        if (this.status === 200 || this.status === 304) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText))
        }
      }
      const client = new XMLHttpRequest();
      client.open('POST', url);
      client.onreadystatechange = handler;
      client.responseType = 'json';
      client.setRequestHeader('Accept', 'application/json');
      client.send(JSON.stringify(data));
    })
  }
}

console.log(111)