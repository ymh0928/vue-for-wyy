<template>
  <div class="m-player">
    <div class="lock">
      <div class="left">
        <i></i>
      </div>
    </div>
    <div class="hand"></div>
    <div class="container">
      <div class="wrap">
        <div class="btns">
          <i class="prev"></i>
          <i class="toggle"></i>
          <i class="next"></i>
        </div>
        <div class="head">
          <img src="" />
          <i class="mask"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Player",
};
</script>
<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
</style>