/**
 * Vueアプリケーションの起動時に最初に読み込まれるファイル.
 * このファイルを起点としてアプリケーションの画面が表示される.
 */

import Vue from 'vue';
import App from './App.vue';

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';

import '@/scss/custom-bootstrap.scss';

if (process.env.NODE_ENV === 'development' || USE_MSW === 'true') {
  // USE_MSWは, NODE_ENV!=='development'となるmake deploy-upの時もmswを利用したいため設定する変数.
  // USE_MSWはwebpack.DefinePluginでビルド時に決定される. 詳細はvue.config.jsを参照.

  // ECMAScript2020を利用できるようにしないとimportではエラーになるのでrequireで回避.
  const {worker} = require('./mocks/browser');
  worker.start({onUnhandledRequest: 'bypass'});
}

Vue.config.productionTip = false;

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
