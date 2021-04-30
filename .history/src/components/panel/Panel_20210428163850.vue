<template>
  <div class="play-panel">
    <div class="hd">
      <div class="hdc">
        <h4>
          播放列表（<span>{{ playList.length }}</span
          >）
        </h4>
        <div class="add-all"><i class="icon" title="收藏全部"></i>收藏全部</div>
        <span class="line"></span>
        <div class="clear-all"><i class="icon trush" title="清除"></i>清除</div>
        <p class="playing-name"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Panel",
  props: {
    playList: Array,
    currentSong: Object,
  },
};
</script>

<style lang="less" scoped>
</style>