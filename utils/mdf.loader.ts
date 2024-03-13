/* eslint-disable @typescript-eslint/ban-ts-comment */

/**
 * 读取模块联邦导出函数
 * @param scope 模块联邦名称
 * @param url entry地址
 * @returns
 */
export function loadDynamicComponent(module: string, url: string, scope = 'components'): Promise<any> {
    const loader = async (resolve, reject) => {
        try{
            const { removeScript } = await loadDynamicScript(url);
            await __webpack_init_sharing__('default');
            const container = window[scope]; // 或从其他地方获取容器
            // 初始化容器 它可能提供共享模块
            // @ts-ignore
            await container.init(__webpack_share_scopes__.default);
            const factory = await window[scope].get(module);
            const Module = factory();
            removeScript();
            resolve(await Module.default);
        }catch(err) {
            reject(err);
        }
    }
    return new Promise(loader);
}

/**
 * 加载模块联邦js
 * @param url
 * @returns
 */
export function loadDynamicScript(url: string): Promise<{ removeScript: () => void }> {
    return new Promise((resolve, reject) => {
        const element = document.createElement('script');
        const removeScript = () => {
            document.head.removeChild(element);
        };
        element.src = url;
        element.type = 'text/javascript';
        element.async = true;
        element.onload = () => {
            resolve({ removeScript });
        };
        element.onerror = (err) => {
            reject(err);
        };
        document.head.appendChild(element);
    });
}
