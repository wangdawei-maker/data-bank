import { getItemLocalStorage, setItemLocalStorage } from './storage';
/**
 * @function getToken - 从localStorage获取Token
 * @param {string} tokenKey - 键名
 * @returns {string} - token: string
 */
export const getToken = (tokenKey = 'auth') => {
  const auth = getItemLocalStorage(tokenKey);
  if (auth) {
    let parseAuth = JSON.parse(auth);
    return parseAuth.access_token || '';
  }
  return '';
};

/**
 * @function getAuthInfo - 从localStorage获取auth
 * @param {string} tokenKey - 键名
 * @returns {object} - { mobile, name, userId, username }
 */
export const getAuthInfo = (tokenKey = 'auth') => {
  const auth = getItemLocalStorage(tokenKey);
  return auth ? JSON.parse(auth) : null;
};

/**
 * @function removeToken - 移除Token
 */
export const removeToken = () => {
  localStorage.removeItem('auth');
  localStorage.removeItem('requestTime');
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};

/**
 * @function setRequestTimeToLocalStorage - 设置请求时间到LocalStorage
 * @param {string} requestTimeKey - 键名
 */
export const setRequestTimeToLocalStorage = (requestTimeKey = 'requestTime') => {
  setItemLocalStorage(requestTimeKey, new Date().getTime());
};

/**
 * @function getRequestTimeFromLocalStorage - 从localStorage获取RequestTime
 * @param {string} requestTimeKey - 键名
 * @returns {string} - requestTime: string
 */
export const getRequestTimeFromLocalStorage = (requestTimeKey = 'requestTime') => {
  const requestTime = getItemLocalStorage(requestTimeKey);
  return requestTime ? JSON.parse(requestTime) : '';
};

/**
 * @function setAuth - 设置Auth到localStorage
 * @param {object} auth
 * @param {string} auth.access_token - token
 * @param {number} auth.expires_in - 过期时间
 * @param {string} auth.name - 名字
 * @param {string} auth.username - 用户名
 * @param {array} auth.userRole - 角色
 * @param {number} auth.userId - 用户ID
 * @param {string} auth.token_type - Token类型
 * @param {string} auth.refresh_token - refresh_token
 * @param {string} authKey - 键名
 */
export const setAuth = (auth, authKey = 'auth') => {
  if (auth) {
    auth.expires_in = auth.expires_in * 1000;
    setItemLocalStorage(authKey, auth);
    setItemLocalStorage('username', auth.username);
    setItemLocalStorage('token', `${auth.token_type} ${auth.access_token}`);
  }
};
