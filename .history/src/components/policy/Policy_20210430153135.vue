<template>
  <a-drawer
    title="服务条款及数据使用政策"
    placement="right"
    :closable="false"
    @close="onClose"
  >
    <div style="padding: 10px"></div>
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