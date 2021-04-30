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
              <a-slider
                style="margin: 0; padding: 0"
                :tooltipVisible="false"
                :defaultValue="0"
              />
            </div>
            <span class="time">
              <em>{{}}</em>
            </span>
          </div>
        </div>
        <div class="oper">
          <i class="like" title="收藏"></i>
          <i class="share" title="分享"></i>
        </div>
        <div class="ctrl">
          <i class="volume" title="音量"></i>
          <i class="loop"></i>
          <div class="control-vol">
            <a-slider style="margin: 0; padding: 0" vertical />
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