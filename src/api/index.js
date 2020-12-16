import axios from 'axios';
import querystring from 'querystring';

import { getToken, getClientId } from '../utils/cookie';

export const CancelToken = axios.CancelToken;

const env = process.env.NODE_ENV;

// 是否开发模式
export const isDev = env === 'development';

export const getRequest = url => {
  const server = {
    request: function(params) {
      const source = CancelToken.source();
      const token = getToken();
      const clientId = getClientId();
      const instance = axios.create({
        baseURL: url,
        headers: {
          'K-Access-Token': token,
          'K-Client': `id: ${clientId}`
        },
        cancelToken: source.token
      });

      this.cancel = source.cancel;
      const reqUrl = `${url}?${querystring.stringify(params)}`;

      return instance
        .get(reqUrl)
        .then(res => res.data)
        .then(data => {
          if (data.status === '00' || data.status === 200) {
            return data.result;
          } else {
            // eslint-disable-next-line no-useless-escape
            if (/^<([a-z]+)([^<])*(?:>(.*)<\/\1>|\s+\>)$/.test(data)) {
              window.location.replace(`http://${window.location.host}/caslogout`);
            } else {
              throw new Error(data.message || '获取数据发生错误');
            }
          }
        });
    },
    cancel: null
  };

  return server;
};

export const postRequest = url => {
  const server = {
    request: function(params) {
      // eslint-disable-next-line no-param-reassign
      params = params || {};
      const source = CancelToken.source();
      const token = getToken();
      const clientId = getClientId();
      const instance = axios.create({
        baseURL: url,
        headers: {
          'K-Access-Token': token,
          'K-Client': `id: ${clientId}`
        },
        cancelToken: source.token
      });

      this.cancel = source.cancel;
      const reqUrl = `${url}`;

      return instance
        .post(reqUrl, params)
        .then(res => res.data)
        .then(data => {
          if (data.status === '00' || data.status === 200) {
            return data.result;
          } else {
            // eslint-disable-next-line no-useless-escape
            if (/^<([a-z]+)([^<])*(?:>(.*)<\/\1>|\s+\>)$/.test(data)) {
              window.location.replace(`http://${window.location.host}/caslogout`);
            } else {
              throw new Error(data.message || '获取数据发生错误');
            }
          }
        });
    },
    cancel: null
  };

  return server;
};
