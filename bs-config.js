const APP_CONFIG = require('./app-config');

module.exports = {
  proxy: `http://${APP_CONFIG.HOST}:${APP_CONFIG.PORT}`,
  files: ['public/**/*.{js,css,ejs,png,jpg,jpeg}', 'src/**/*.{js,css,ejs,png,jpg,jpeg}'],
  browser: 'chrome',
  port: APP_CONFIG.BROWSER_SYNC_PORT,
};