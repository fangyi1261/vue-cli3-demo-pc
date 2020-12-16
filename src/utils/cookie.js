import Cookies from 'js-cookie';

const TokenKey = 'K-Access-Token';
const ClientKey = 'K-Client';
const UserName = 'K-User-Name';

export function getToken () {
  return Cookies.get(TokenKey);
};

export function setToken (token) {
  return Cookies.set(TokenKey, token);
};

export function removeToken () {
	return Cookies.remove(TokenKey);
};

export function getUserName () {
	return Cookies.get(UserName);
};

export function setUserName (userName) {
	return Cookies.set(UserName, userName);
};

export function removeUserName () {
	return Cookies.remove(UserName);
};

export function getClientId () {
	return Cookies.get(ClientKey);
};

export function setClientId (clientId) {
	return Cookies.set(ClientKey, clientId);
};

export function removeClientId () {
	return Cookies.remove(ClientKey);
};

