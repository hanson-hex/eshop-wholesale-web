import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
    // baseURL: https://gateway.cbyyk.com, // url = base url + request url http://localhost:8080/api/
    baseURL: 'http://localhost:8080/api/', // url = base url + request url 
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
});

// request拦截器
service.interceptors.request.use(
    (config) => {
        // do something before request is sent
        config.headers["Authorization"] =
            "Bearer pig::13211111114::1486d4b2-f09f-4bc1-8f3e-f7f9ab9f107f";
        // config.headers['Content-Type'] = 'multipart/json'
        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers["X-Token"] = getToken();
        }
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

        // if the custom code is not 20000, it is judged as an error.
        if (res.status !== 200) {
            Message({
                message: res.message || "Error",
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
            return Promise.reject(new Error(res.message || "Error"));
        } else {
            return res.data;
        }
    },
    (error) => {
        console.log("err" + error); // for debug
        Message({
            message: error.message,
            type: "error",
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    }
);

export default service;