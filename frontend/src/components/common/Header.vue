<!--ページヘッダーのコンポーネント.-->

<template>
  <header>
    <b-navbar type="dark" variant="primary" fuild class="px-2 py-0">
      <b-navbar-brand class="app-name-font">
        {{ appName }}  <h3> TEST PIK </h3>
      </b-navbar-brand>
      <b-nav-text class="ml-auto p-0 text-light">
        {{ cn }}
        <b-dropdown right variant="primary" no-caret>
          <template #button-content>
            <b-avatar
              type="dark"
              variant="dark"
              size="1.4em"
              class="ml-1"
            ></b-avatar
          ></template>
          <b-dropdown-item variant="dark" :href="logoutUrl"
            >logout</b-dropdown-item
          >
        </b-dropdown>
      </b-nav-text>
    </b-navbar>
  </header>
</template>

<script>
import axios from 'axios';
import {notifyApiErrorMessage} from '@/common/utils/error.js';

const HEADER_INFO_URL = '/asia-oee/api/header';
const LOGOUT_URL = '/samlsp/saml/logout';

export default {
  name: 'Header',
  data() {
    return {
      appName: '',
      cn: '',
      logoutUrl: LOGOUT_URL,
    };
  },
  async mounted() {
    // マウント時にバックエンドからHeader情報を取得し, dataにセットする
    const data = await fetchHeaderData();
    this.appName = data.appName;
    this.cn = data.cn;
  },
};

/**
 * バックエンドからHeader情報を取得.
 * @return {Object} res.data - レスポンスデータ
 */
const fetchHeaderData = async () => {
  const res = await axios.get(HEADER_INFO_URL).catch((error) => {
    // エラーの場合, エラーメッセージを出力
    notifyApiErrorMessage(error);
    throw error;
  });
  return res.data;
};
</script>

<style scoped>
.app-name-font {
  font-size: 1.2rem;
  font-weight: 500;
}
h3{
  color: blueviolet;
}
</style>
