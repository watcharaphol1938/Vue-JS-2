<!--main.jsから呼び出されるVueアプリケーションのエントリーポイント.
  内部で以下のコンポーネントを使用している.
    - Header
    - TheCycleTimePage
    - Footer
-->

<template>
  <b-container fluid class="p-0" style="background-color: #eaecec">
    <Header></Header>
    <TheCycleTimePage></TheCycleTimePage>
    <Footer></Footer>
  </b-container>
</template>

<script>
import Header from '@/components/common/Header.vue';
import TheCycleTimePage from '@/components/pages/CycleTimePage/TheCycleTimePage';
import Footer from '@/components/common/Footer.vue';

export default {
  name: 'AppMain',
  components: {
    Header,
    TheCycleTimePage,
    Footer,
  },
};
</script>
