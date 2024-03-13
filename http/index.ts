import axios from 'axios';
import { $t } from './i18n';
import { message } from 'ant-design-vue';
import { nanoid } from 'nanoid';

let errMsgTemp: {timestamp: number, msg: string}[] = [];

const setHeader = config => {
    return {...config};
}

//http request 拦截器
axios.interceptors.request.use(
    setHeader,
    error => {
        return Promise.reject(error);
    }
);

const alertErrMsg = (msg: string) => {
    const validTimeRange = 2000;
    const timestamp = new Date().getTime();
    errMsgTemp = errMsgTemp.filter(item => timestamp - item.timestamp < validTimeRange);
    const isRecentAlerted = errMsgTemp.find(item => item.msg === msg);
    if(!isRecentAlerted) {
        message.error(msg);
        errMsgTemp.push({timestamp, msg})
    }
}

//响应拦截器即异常处理
axios.interceptors.response.use(
    res => {
        return res.data;
    },
    err => {
        if (err && err.response) {
            const msg = transMessageToString(err.response?.data?.data?.message);
            switch (err.response.status) {
                case 400:
                    alertErrMsg(msg || $t('netErrMsg.400'))
                    break;
                case 401:
                    break;
                case 403:
                    alertErrMsg(msg || $t('netErrMsg.403'))
                    break;
                case 423:
                    alertErrMsg(msg || $t('netErrMsg.423'))
                    break;
                case 404:
                    alertErrMsg(msg || $t('netErrMsg.404'))
                    break;
                case 405:
                    alertErrMsg(msg || $t('netErrMsg.405'))
                    break;
                case 408:
                    alertErrMsg(msg || $t('netErrMsg.408'))
                    break;
                case 500:
                    alertErrMsg(msg || $t('netErrMsg.500'))
                    break;
                case 501:
                    alertErrMsg(msg || $t('netErrMsg.501'))
                    break;
                case 502:
                    alertErrMsg(msg || $t('netErrMsg.502'))
                    break;
                case 503:
                    alertErrMsg(msg || $t('netErrMsg.503'))
                    break;
                case 504:
                    alertErrMsg(msg || $t('netErrMsg.504'))
                    break;
                case 505:
                    alertErrMsg(msg || $t('netErrMsg.505'))
                    break;
                default:
                    alertErrMsg(msg || $t('netErrMsg.common', {code: err.response.status}))
            }
        } else {
            alertErrMsg($t('netErrMsg.connectFailed'))
        }
        return Promise.reject(err.response || {})
    }
)
const transMessageToString = (msg: any): string => {
    if (Array.isArray(msg)) {
        return msg.join('');
    }
    return msg;
}
const feedback = (res, showError) => {
    const code = res?.code;
    // 接口状态码响应成功，但还需通过code码判断是否业务成功
    const isFailed = typeof code !== 'undefined' ? code !== '0' : false;
    if (isFailed && showError) {
        const message = transMessageToString(res?.message || res?.messages)
        alertErrMsg(message)
    }
    if (isFailed) {
        return Promise.reject(res)
    }
    return Promise.resolve(res?.data || res);
}
export default {
    get(url, params = {}, showError = true, responseType = undefined) {
        return axios
            .get(url, { params, responseType })
            .then(res => {
                return feedback(res, showError);
            })
    },
    post(url, data = {}, headers = {}, showError = true) {
        return axios
            .post(url, data, { headers })
            .then(res => {
                return feedback(res, showError);
            })
    },
    patch(url, data = {}, headers = {}, showError = true) {
        return axios
            .patch(url, data, { headers })
            .then(res => {
                return feedback(res, showError);
            })
    },
    put(url, data = {}, headers = {}, showError = true) {
        return axios
            .put(url, data, { headers })
            .then(res => {
                return feedback(res, showError);
            })
    },
    delete(url, data = {}, showError = true) {
        return axios
            .delete(url, data)
            .then(res => {
                return feedback(res, showError);
            })
    }
};

export const HOST = window.location.host;
export const DOMAIN = window.location.origin;
export const SESSION_ID = nanoid();
