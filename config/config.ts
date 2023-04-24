// https://umijs.org/config/
const path = require('path');
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import { API_ENV_MAP, SYSTEM_CODE } from './constant';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  base: `/${SYSTEM_CODE}/`,
  publicPath: `/${SYSTEM_CODE}/`,
  outputPath: `/${SYSTEM_CODE}/`,
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    antd: true,
    baseNavigator: true,
  },
  targets: {
    ie: 11,
  },
  routes,
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  define: {
    SERVICE_URL: API_ENV_MAP[REACT_APP_ENV || "dev"],
    SYSTEM_CODE: SYSTEM_CODE,
  },
  lessLoader: {
    modifyVars: {
      hack: `true; @import "${path.join(__dirname, '../src/styles/vevor.global.less')}"`,
    },
  }
});
