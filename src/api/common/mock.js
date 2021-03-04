import url from './index.js';

class Mock {
  mockMap = new Map();

  mock(url, callback) {
    this.mockMap.set(url, callback);
  }

  emit(url, params) {
    if (this.mockMap.has(url)) {
      return this.mockMap.get(url)(params);
    }
    return {
      message: '没有对应的mock接口',
      code: '000001'
    };
  }
}

export const mock = new Mock();

if (process.env.NODE_ENV !== 'production') {
  // const Mockjs = require('mockjs');
  // const Random = Mockjs.Random;

  mock.mock(url.getMenus, function(req) {
    console.log(req);
    const result = [];

    return result;
  });
}
