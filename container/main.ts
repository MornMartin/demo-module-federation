import { createApp } from "vue";
import App from "./index.vue";
import router from "./router";
import i18n from "./i18n";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import { injectThemeVar } from "./theme";

createApp(App)
.use(Antd)
.use(injectThemeVar)
.use(router)
.use(i18n)
.mount("#app");

