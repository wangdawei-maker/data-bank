/**
 *
 * @param {string} url - 获取链接地址参数
 * @returns { object } - 地址参数对象
 */
export const getUrlParams = (url: string) => {
  let tstr = url.substring(url.indexOf('?') + 1).split('&');
  let result = {};
  tstr.forEach(item => {
    let res = item.split('=');
    result[res[0]] = decodeURIComponent(res[1]);
  });
  return result;
};
/**
 * @function postMessageToSemFront - 向Sem-Front发送消息
 * @param {string} type - 消息类型
 * @param {any} data - 消息数据
 */
export const postMessageToSemFront = (type: string, data: string | number) => {
  window.parent.postMessage({ type, data }, '*');
};
