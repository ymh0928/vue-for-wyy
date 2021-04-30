<template>
  <div>
    <a class="cover">
      <router-link :to="`/sheetInfo/${sheet.id}}`">
        <img
          :src="sheet.picUrl ? sheet.picUrl : sheet.coverImgUrl"
          :alt="sheet.name"
        />
      </router-link>

      <div class="bottom">
        <div class="num">
          <i class="icon erji"></i>
          <span>{{ count }}</span>
        </div>
        <i class="icon play" @click="getTracks(sheet.id)"></i>
      </div>
    </a>
    <span class="dec">{{ sheet.name }}</span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SingleSheet",
  props: {
    sheet: Object,
  },
  computed: {
    count() {
      if (this.sheet.playCount >= 10000) {
        return (this.sheet.playCount / 10000).toFixed(0) + "万";
      } else {
        return this.sheet.playCount;
      }
    },
    ...mapState(["tooltipTitle", "tooltipShow"]),
  },
  methods: {
    getTracks(id) {
      this.$store.dispatch("setPlayList", id);
      const newTooltipTitle = "播放歌曲";
      const newTooltipShow = true;
      this.$store.commit("setTooltipTitle", newTooltipTitle);
      this.$store.commit("setTooltipShow", newTooltipShow);
      this.$store.dispatch("deleteTooltip");
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
import router from '../../../../vue/vue3ts/src/router/index';
.cover {
  position: relative;
  display: block;
  height: 140px;
  img {
    height: 100%;
  }
  .bottom {
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: @black-color;
    color: @white-color;
    opacity: 0.8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 8px;
    .num {
      span {
        margin-left: 8px;
        vertical-align: text-bottom;
      }
    }
    .icon {
      .icon("../../assets/images/iconall.png", 14px, 11px);
      &.erji {
        background-position: 0 -24px;
      }
      &.play {
        width: 16px;
        height: 17px;
        background-position: 0 0;
        &:hover {
          background-position: 0 -60px;
        }
      }
    }
  }
}
.dec {
  display: block;
  margin-top: 8px;
  cursor: pointer;
}
</style>