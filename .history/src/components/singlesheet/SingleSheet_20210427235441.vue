<template>
  <div>
    <a class="cover">
      <img :src="sheet.picUrl" :alt="sheet.name" />
      <div class="bottom">
        <div class="num">
          <i class="icon erji"></i>
          <span>{{ (sheet.playCount / 10000).toFixed(0) + "万" }}</span>
        </div>
        <i class="icon play" @click="getTracks(sheet.id)"></i>
      </div>
    </a>
    <span class="dec">{{ sheet.name }}</span>
  </div>
</template>

<script>
export default {
  name: "SingleSheet",
  props: {
    sheet: Object,
  },
  methods: {
    getTracks(id) {
      console.log(id);
      this.$store.dispatch("setPlayList", id);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
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