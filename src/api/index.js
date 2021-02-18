/* eslint-disable no-unused-vars */
import axios from 'axios';
import qs from 'querystring';

import { getToken, getClientId } from '../utils/cookie';

export const CancelToken = axios.CancelToken;

// 是否开发模式
export const isDev = process.env.NODE_ENV === 'development';

const baseUrl = isDev ? 'http://10.28.63.9:8080' : window.location.origin;

const http = {
  // eslint-disable-next-line no-unused-vars
  get: function(url, params = {}, context) {
    const source = CancelToken.source();
    const token = getToken();
    const clientId = getClientId();
    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        'K-Access-Token': token,
        'K-Client': `id: ${clientId}`
      },
      cancelToken: source.token
    });

    return new Promise((resolve, reject) => {
      url += '?';
      const userToken = '';

      if (userToken) {
        url += `&userToken=${userToken}`;
      }
      url += qs.stringify(params) + '&tomesTamp=' + new Date().getTime();
      url = encodeURI(url);
      instance.get(url).then(res => {
        if (res.status === 200) {
          if (res.data.status === '00' || res.data.status === 200) {
            resolve(res.data);
          } else {
            if (/^([a-z]+)([^<])*(?:>(.*)<\/\1>|\s+>)$/.test(res.data)) {
              window.location.replace(`http://${window.location.host}/caslogout`);
            } else {
              reject(res.data.message || '获取数据发生错误');
            }
          }
        } else {
          reject(res.statusText);
        }
      });
    });
  },
  post: function(url, params = {}, context) {
    const source = CancelToken.source();
    const token = getToken();
    const clientId = getClientId();

    const headers = {
      'K-Access-Token': token,
      'K-Client': `id: ${clientId}`
    };
    const instance = axios.create({
      baseURL: baseUrl,
      headers: headers,
      cancelToken: source.token
    });

    return new Promise((resolve, reject) => {
      instance.post(url, params).then(res => {
        if (res.status === 200) {
          if (res.data.status === '00' || res.data.status === 200) {
            resolve(res.data);
          } else {
            if (/^([a-z]+)([^<])*(?:>(.*)<\/\1>|\s+>)$/.test(res.data)) {
              window.location.replace(`http://${window.location.host}/caslogout`);
            } else {
              reject(res.data.message || '获取数据发生错误');
            }
          }
        } else {
          reject(res.statusText);
        }
      });
    });
  }
};

export default http;
