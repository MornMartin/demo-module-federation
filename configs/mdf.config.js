const fs = require('fs');
const path = require('path');
const dependencies = require('../package.json').dependencies;
const shared = {};

Object.keys(dependencies).forEach(d => {
    shared[d] = { eager: true, singleton: true }
})

const components = fs.readdirSync(path.resolve('./components'));

const exposes = {};

for(const item of components) {
    exposes[`/components/${item}`] = `./components/${item}/index.vue`;
}

console.log('exposes', exposes)

module.exports = { name: 'components', filename: 'remoteEntry.js', shared, exposes };
