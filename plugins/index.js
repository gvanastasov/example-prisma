const install = function (app, id) {
    let plugin = require(`./${id}.js`);
    if (plugin) {
        plugin(app);
    }
};

module.exports = { install };