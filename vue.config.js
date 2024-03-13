const os  = require('os');
const path = require('path');
const { defineConfig } = require('@vue/cli-service')
const isProduction = process.env.NODE_ENV === 'production';
const mdfConfig = require("./configs/mdf.config");
const proxyConfig = require('./configs/proxy.config');
const PORT = 8088;
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = defineConfig({
	publicPath: '/',
	assetsDir: 'static',
	productionSourceMap: false,
	transpileDependencies: true,
	lintOnSave: false,
	configureWebpack: {
		mode: isProduction ? 'production' : 'development',
		plugins: [
			new ModuleFederationPlugin(mdfConfig),
		],
		module: {
			rules: []
		},
		performance: {
			maxEntrypointSize: 10000000,
			maxAssetSize: 30000000
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, ''),
				"@http": path.resolve(__dirname, 'http/'),
				"@utils": path.resolve(__dirname, 'utils/'),
				"@components": path.resolve(__dirname, 'components/'),
			},
		}
	},
	devServer: {
		port: PORT,
		https: true,
		server: 'https',
		host: '0.0.0.0', // 使用本地IP访问（websocket连接时会校验host）
		open: [`https://${getHost()}:${PORT}/`],
		client: {
			progress: true,
			overlay: false,
		},
		proxy: proxyConfig,
	},
	pages: {
		index: {
			entry: 'container/main.ts',
			template: 'container/assets/index.html',
			favicon: 'container/assets/favicon.ico',
			title: 'demo-module-federation',
		}
	}
})
function getHost() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}