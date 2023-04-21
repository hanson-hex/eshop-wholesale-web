const TOKEN_KEY = 'cb_token'; //token
const USER_INFO_KEY = 'cb_user_info'; //用户信息
interface Storage {
  [key: string]: any;
}
type StorageType = Storage | string;

//设置userToken
export function setToken(token: string) {
  set(TOKEN_KEY, token);
}

// 设置用户信息
export function setUserInfo(userInfo: StorageType) {
  set(USER_INFO_KEY, userInfo);
}

//获取Token
export function getToken() {
  return get(TOKEN_KEY) as string | null;
}

//获取用户信息
export function getUserInfo() {
  return get(USER_INFO_KEY) as string | null;
}

export function set(key: string, content: StorageType) {
  if (!content) return;
  if (typeof content === 'object') {
    content = JSON.stringify(content);
  }
  localStorage.setItem(key, content);
}

export function get(key: string): null | string | Record<string, any> {
  const info = localStorage.getItem(key);
  if (!info) return info;
  try {
    return JSON.parse(info);
  } catch (error) {
    return info;
  }
}

export function remove(key: string) {
  localStorage.removeItem(key);
}

export default {
  set,
  get,
  setToken,
  setUserInfo,
  getToken,
  getUserInfo,
  remove,
};
