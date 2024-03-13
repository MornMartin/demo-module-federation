# Demo Module Federation

语法高亮插件：
* [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
* [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

## Directory structure
```
Root
|-- components 联邦模块组件目录
    |-- demo 
        |-- api 组件接口定义
        |-- assets 组件静态资源
        |-- i18n 组件国际化
        |-- store 组件全局变量
        |-- index.vue 组件入口文件（必需）
|-- configs 编包配置
    |-- mdf.config.js 模块联邦相关配置
    |-- proxy.config.js 代理相关配置
|-- container 调试容器
    |-- assets html模板
    |-- i18n 国际化
    |-- router 路由
    |-- theme 主题配置
    |-- Home.vue 模块联邦加载组件
    |-- index.vue App组件
    |-- main.ts 入口文件
|-- http 公共网络请求模块
    |-- i18n 网络响应提示词条
    |-- index.ts axios配置
|-- utils 公共方法库
    |-- Channel.ts 广播信道
    |-- const.ts 常量定义
    |-- mdf.loader.ts 联邦模块加载相关方法
    |-- protocols.ts 通用消息定义
    |-- xxx.util.ts
```
## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
