/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { notification, message } from 'antd';
import { extend } from 'umi-request';
import {
  postMessageToSemFront,
  // getAuthInfo,
  getToken,
  getRequestTimeFromLocalStorage,
  setRequestTimeToLocalStorage,
  removeToken,
} from '@/utils';

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * @zh-CN 异常处理程序
 * @en-US Exception handler
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `Request error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'Network anomaly',
    });
  }
  return response;
};

const request = extend({
  prefix: SERVICE_URL,
  errorHandler,
  credentials: 'include',
});

request.interceptors.request.use((url, options) => {
  const token = getToken();
  // const authInfo = getAuthInfo();
  // const userInfo = JSON.stringify({
  //   mobile: authInfo.mobile || '',
  //   name: authInfo.name ? encodeURI(authInfo.name) : '',
  //   userId: authInfo.userId,
  //   username: authInfo.username,
  // });
  return {
    url,
    options: {
      ...options,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        // AuthUserInfo: userInfo ? userInfo : '',
      },
    },
  };
});


// 子系统触发刷新token的机制存在bug，已经删除
request.interceptors.response.use(async (response, options) => {
  const result = options.responseType === 'blob' ? response.clone() : await response.clone().json();
  const localStorageRequestTime = getRequestTimeFromLocalStorage();
  postMessageToSemFront('requestTime', localStorageRequestTime);
  if(result?.code !== 200){
    !options.noMsg && result.message && message.error(result.message)
  }
  if (result?.code === 200) {
    setRequestTimeToLocalStorage();  // 这个时间给sem刷新token
  }else if (result?.code === 304007 || result?.code === 304020 || result?.code === 401) {
    removeToken();
    message.error('验证信息失效,请重新登录', 1);
    postMessageToSemFront('error', 403);
  }

  return result;
});

export default request;
