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
        <div class="play">
          <div class="words clearfix">
            <p class="ellipsis margin-bottom-none"></p>
            <ul class="songs clearfix margin-bottom-none">
              <li></li>
            </ul>
          </div>
          <div class="bar">
            <div class="slider-wrap">
              <a-slider style="margin: 0; padding: 0" />
            </div>
          </div>
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