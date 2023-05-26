<!--ページフッターのコンポーネント.-->

<template>
  <footer class="mr-4">
    <p class="text-muted text-right">
      {{ appVersion }}
    </p>
  </footer>
</template>

<script>
import axios from 'axios';
import {notifyApiErrorMessage} from '@/common/utils/error.js';

const FOOTER_INFO_URL = '/asia-oee/api/footer';

export default {
  name: 'Footer',
  data() {
    return {
      appVersion: '',
    };
  },
  async mounted() {
    // マウント時にバックエンドからFooter情報を取得し, dataにセットする
    const data = await fetchFooterData();
    this.appVersion = data.appVersion;
  },
};

/**
 * バックエンドからFooter情報を取得.
 * @return {Object} res.data - レスポンスデータ
 */
const fetchFooterData = async () => {
  const res = await axios.get(FOOTER_INFO_URL).catch((error) => {
    // エラーの場合, エラーメッセージを出力
    notifyApiErrorMessage(error);
    throw error;
  });
  return res.data;
};
</script>
