<template>
  <a-drawer
    title="服务条款及数据使用政策"
    placement="right"
    :closable="false"
    @close="onClose"
  >
    <div style="padding: 10px">
      <h3>前言</h3>
      <p>
        本站提醒您在注册前仔细阅读以下条款。倘若您对任何条款表示异议，
        可以选择不加入。但一旦注册成功，无论是在本站上发布任何内容，或者是直接或间接通过任何方式使用、操作本站数据或服务的行为，都将被视作已无条件接受本声明所涉全部内容。
      </p>
      <h3>使用规则</h3>
    </div>
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