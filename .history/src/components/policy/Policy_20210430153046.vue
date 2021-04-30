<template>
  <a-drawer
    title="服务条款及数据使用政策"
    placement="right"
    :closable="false"
    @close="onClose"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>
<script>
export default {
  name: "Policy",
  methods: {
    onClose() {},
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
</style>