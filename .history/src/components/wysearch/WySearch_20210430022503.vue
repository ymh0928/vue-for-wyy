<template>
  <div class="search-panel">
    <div class="list-wrap">
      <div class="list-item clearfix">
        <div class="hd">
          <i class="ico ico-song"></i>
          <span>单曲</span>
        </div>
        <ul>
          <li
            class="ellipsis"
            v-for="(item, index) in searchResult.songs"
            :key="index"
          >
            <router-link>
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="list-item clearfix">
        <div class="hd">
          <i class="ico ico-singer"></i>
          <span>歌手</span>
        </div>
        <ul>
          <li
            class="ellipsis"
            v-for="(item, index) in searchResult.artists"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="list-item clearfix">
        <div class="hd">
          <i class="ico ico-sheet"></i>
          <span>歌单</span>
        </div>
        <ul>
          <li
            class="ellipsis"
            v-for="(item, index) in searchResult.playlists"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "WySearch",
  computed: {
    ...mapState(["searchResult"]),
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";

.search-panel {
  border: 1px solid #bebebe;
  border-radius: 4px;
  background: @white-color;
  box-shadow: 0 4px 7px #555;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);

  .list-wrap {
    .list-item {
      .hd {
        float: left;
        width: 52px;
        margin-right: -100px;
        padding: 10px 0 0 10px;
        padding-top: 9px;
        line-height: 17px;
        line-height: 19px;
        font-size: @font-size-sm;
        .ico {
          margin: 2px 4px 0 0;
          float: left;
          .icon("../images/icon.png", 14px, 15px);
          &.ico-song {
            background-position: -35px -300px;
          }
          &.ico-singer {
            background-position: -50px -300px;
          }
          &.ico-sheet {
            background-position: -50px -320px;
          }
        }
        span {
          float: left;
        }
      }
      ul {
        width: 180px;
        margin-left: 62px;
        margin-top: -1px;
        margin-bottom: 0;
        padding: 6px 0 5px;
        border-top: 1px solid #e2e2e2;
        border-left: 1px solid #e2e2e2;
        li {
          padding: 6px 12px 5px 0;
          text-indent: 12px;
          line-height: 24px;
          color: @black-color;
          cursor: pointer;
          &:hover {
            background-color: #e0e6e3;
          }
        }
      }
    }
  }
}
</style>