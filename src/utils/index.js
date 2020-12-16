import _ from 'lodash';
import { isArray as _isArray } from 'util';

export function param2Obj(url) {
  const search = url.split('?')[1];
  if(!search) {
    return {};
  }
  return JSON.parse(`{"${
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}
    "}`);
};

export function waiting(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
};

export function hasPermission (roles, route) {
  if (route && route.roles) {
    return roles.some(role => route.roles.indexOf(role) >= 0);
  } else {
    return true;
  }
}