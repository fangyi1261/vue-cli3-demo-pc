// 定义全局变量函数
const storage = function () {
  const myStore = window.localStorage;

  return myStore;
};

// 定义全局变量myStorage
const myStorage = {};

// 设置缓存
myStorage.setStorage = function (key, value) {
  let val = value;

  if (typeof v === 'object') {
    val = JSON.stringify(val);
    val = 'obj-' + val;
  } else {
    val = 'str-' + val;
  }
  const myStore = storage();

  if (myStore) {
    myStore.setItem(key, val);
  }
};
// 获取缓存
myStorage.getStorage = function (key) {
  const myStore = storage();

  if (myStore) {
    let value = myStore.getItem(key);

    if (!value) {
      return;
    }
    if (value.indexOf('obj-') === 0) {
      value = value.slice(4);
      return JSON.parse(value);
    } else if (value.indexOf('str-') === 0) {
      return value.slice(4);
    }
  }
};

export default myStorage;
