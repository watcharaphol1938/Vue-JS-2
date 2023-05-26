<!--ローディングのコンポーネント.-->

<template>
  <div class="text-center">
    <!--
      default slot "label" is not supported.
      see: https://bootstrap-vue.org/docs/components/spinner
    -->
    <b-spinner variant="primary" label="Spinning" class="mt-4"></b-spinner>
    <!-- use div to place text to the next line -->
    <div><slot>Loading...</slot></div>
  </div>
</template>

<script>
export default {
  name: 'SpinnerLoading',
};
</script>
