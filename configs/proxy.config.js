const targetService = 'https://0.0.0.0:1111/';
module.exports = {
    '/xxx/': {
        ws: true,
        secure: false,
        changeOrigin: true,
        target: targetService,
    },
}