/**
 * @function setItemLocalStorage - 存储内容到LocalStorage
 * @param {string} key - 存储键名
 * @param {object|array}  data - 存储内容
 */
export const setItemLocalStorage = (key: string, data: any) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(
      `ErrorTips:【setItemLocalStorage】-> Error occurred when storing ${key} data into localStorage`,
      error,
    );
  }
};

/**
 * @function getItemLocalStorage - 从LocalStorage取存储内容
 * @param {string} key - 存储键名
 */
export const getItemLocalStorage = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.log(
      `ErrorTips:【getItemLocalStorage】-> Error occurred when fetching ${key} data from localStorage`,
      error,
    );
    return null;
  }
};

/**
 * @function setItemSessionStorage - 存储内容到SessionStorage
 * @param {string} key - 存储键名
 * @param {object|array}  data - 存储内容
 */
export const setItemSessionStorage = (key: string, data: any) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(
      `ErrorTips:【setItemSessionStorage】-> Error occurred when storing ${key} data into sessionStorage`,
      error,
    );
  }
};

/**
 * @function getItemSessionStorage - 从SessionStorage取存储内容
 * @param {string} key - 存储键名
 */
export const getItemSessionStorage = (key: string) => {
  try {
    return window.sessionStorage.getItem(key);
  } catch (error) {
    console.log(
      `ErrorTips:【getItemSessionStorage】-> Error occurred when fetching ${key} data from sessionStorage`,
      error,
    );
    return null;
  }
};
