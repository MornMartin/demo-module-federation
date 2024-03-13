import http, { SESSION_ID, DOMAIN, } from "@http/index";
import { ENV_PREFIX } from '@utils/const';

export default {
    /**
     * 测试
     * @returns 
     */
    test() {
        return http.get(`${DOMAIN}/${ENV_PREFIX}/test`);
    },
}
