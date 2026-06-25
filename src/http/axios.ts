
import axios from "axios";
import {useUserStore} from "@/stores/user.ts";
import {ElMessage} from "element-plus";

export interface ApiResponse<T = any> {
    code: number;
    message: string;
    data: T;
}

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use((config) => {
    const userStore = useUserStore();
    if (userStore.token) {
        config.headers['Authorization'] = `Bearer ${userStore.token}`;
    }
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
        return config;
    }
    if (config.method?.toLowerCase() !== 'get') {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 响应拦截器 - 修正类型问题
instance.interceptors.response.use(
    (response) => {
        const res: ApiResponse = response.data;

        if (res.code === 403) {
            ElMessage.error(res.message || '权限不足，无法操作');
            return Promise.reject(new Error(res.message || 'Forbidden'));
        }

        if (res.code !== 200) {
            ElMessage.warning(res.message || '操作失败');
            return Promise.reject(res);
        }

        // 返回完整的 response 对象，但将 data 替换为我们的 ApiResponse
        return {
            ...response,
            data: res,
        };
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    ElMessage.error("登录状态失效，请重新登录");
                    const userStore = useUserStore();
                    userStore.logout();
                    window.location.href = '/login';
                    break;
                case 403:
                    ElMessage.error("对不起，您没有权限执行此操作");
                    break;
                case 500:
                    ElMessage.error("服务器开小差了，请稍后再试");
                    break;
                default:
                    ElMessage.error(error.response.data?.message || "网络错误");
            }
        } else {
            ElMessage.error("连接服务器失败");
        }
        return Promise.reject(error);
    }
);

// 导出请求函数
export const request = <T = any>(options: any): Promise<ApiResponse<T>> => {
    return instance(options).then((response) => {
        return response.data as ApiResponse<T>;
    });
};

export default request;