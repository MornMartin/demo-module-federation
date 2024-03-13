import blue from './blue.json';
import green from './green.json';
import { theme as defaultTheme } from 'ant-design-vue';

const { darkAlgorithm, compactAlgorithm } = defaultTheme;
export const theme = {
    ...green,
    algorithm: [darkAlgorithm, compactAlgorithm],
};

const transToken2CssVar = () => {
    const token = theme?.token || {};
    let temp = '';
    for(const key in token) {
        temp += `\t--${key}:${token[key]};\n`
    }
    return `:root {\n${temp}}`
}

export const injectThemeVar = {
    install(Vue) {
        window.addEventListener('load', () => {
            const css = transToken2CssVar();
            const style = document.createElement('style');
            style.setAttribute('type', "text/css");
            style.innerHTML = css;
            document.head.appendChild(style);
        })
    }
}
