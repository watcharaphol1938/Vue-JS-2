// Unit Test時にBootstrapVueのコンポネントエラーが出ないようにする設定ファイル

import Vue from 'vue';
import {BootstrapVue} from 'bootstrap-vue';

Vue.use(BootstrapVue);

window.URL.createObjectURL = jest.fn();
