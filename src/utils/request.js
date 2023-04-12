import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
    baseURL: 'https://gateway.cbyyk.com', // url = base url + request url
    // baseURL: 'http://client:8081', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
});
// console.log(https://gateway.cbyyk.com)

// request拦截器
service.interceptors.request.use(
    (config) => {
        // console.log('config', config)
        // do something before request is sent
        // console.log(config.headers["isLogin"])
        if (!config.headers["isLogin"]) {
            config.headers["Authorization"] = 'Bearer ' + getToken()
        }
        // "Bearer pig::13211111114::77de92f0-2a2c-421a-9c3a-ee1f1186a1c1"
        // "Bearer cbwx_mall::13422122004::a207833a-d8a2-4d4c-9acd-0d1e0fb1bd34";
        // config.headers['Content-Type'] = 'multipart/json'
        // if (store.getters.token) {
        //   // let each request carry token
        //   // ['X-Token'] is a custom headers key
        //   // please modify it according to the actual situation
        //   config.headers["X-Token"] = getToken();
        // }
        // if (config['contentType'] === 'blob') {
        //   config.headers['Content-Type'] = 'multipart/form-data'
        // }
        // console.log(config.headers, 333)
        return config;
    },
    (error) => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// response 拦截器
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response) => {
        const res = response;
        // console.log('res', res)

        // if the custom code is not 20000, it is judged as an error.
        if (res.status !== 200) {
            Message({
                message: res.msg || "Error",
                type: "error",
                duration: 5 * 1000,
            });

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm(
                    "登录状态已过期，您可以继续留在该页面，或者重新登录",
                    "系统提示", {
                        confirmButtonText: "重新登录",
                        cancelButtonText: "取消",
                        type: "warning",
                    }
                ).then(() => {
                    store.dispatch("user/resetToken").then(() => {
                        location.reload();
                    });
                });
            }
            return Promise.reject(new Error(res.msg || "Error"));
        } else {
            return res.data;
        }
    },
    (error) => {
        Message({
            message: error.response.data.msg,
            type: "error",
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    }
);

export default service;