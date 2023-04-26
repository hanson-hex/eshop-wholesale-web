import { login, logout } from '@/api/login';
import type { UserAccount } from '@/api/types/login';
import { getUserDetail } from '@/api/user';
import { getToken, setToken, setUserInfo, remove } from '@/utils/auth';
import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    userInfo: null,
  }),
  actions: {
    // 登录
    login(userInfo: UserAccount) {
      return new Promise((resolve, reject) => {
        //     login(userInfo)
        //       .then((res: any) => {
        const token = 'xxxxxxxx';
        setToken(token);
        // setToken(res.data.token);
        // setUserInfo(res.data.user);
        // this.token = res.data.token;
        // this.name = res.data.user.clinicName;
        resolve(null);
      });
      // .catch((error) => {
      //   reject(error);
      // });
      //    });
    },
    getUserDetail() {
      return new Promise((resolve, reject) => {
        getUserDetail().then((res) => {
          console.log('user', res);
          this.userInfo = res;
          resolve(res);
        });
      });
    },

    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        // logout()
        //   .then(() => {
        this.token = '';
        remove('cb_token');
        remove('cb_user_info');
        resolve(null);
      });
      //     .catch((error) => {
      //       reject(error);
      //     });
      // });
    },
  },
});

export default useUserStore;
