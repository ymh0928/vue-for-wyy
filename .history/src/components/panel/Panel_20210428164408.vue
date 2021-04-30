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
        <p class="playing-name">{{ currentSong?.name }}</p>
        <i class="icon close"></i>
      </div>
    </div>
    <div class="bd">
      <img
        src="//music.163.com/api/img/blur/109951163826278397"
        class="imgbg"
      />
      <div class="msk"></div>
      <div class="list-wrap">
        <ul>
          <li v-for="song in playList" :key="song.id">
            {{ song.name }}
          </li>
        </ul>
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