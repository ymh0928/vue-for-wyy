<template>
  <div class="carousel">
    <div class="wrap">
      <div class="arrow left">
        <a-icon type="left" />
      </div>
      <div class="arrow left">
        <a-icon type="right" />
      </div>
    </div>
    <div class=""></div>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      banners: [],
    };
  },
  async created() {
    const { data: res } = await this.$axios.get("banner");
    this.banners = res.banners;
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";

.carousel {
  .wrap {
    position: relative;
    .arrow-left {
      display: block;
      position: absolute;
      width: 37px;
      top: 46.5%;
      margin-top: -20px;
      color: #fff;
      font-size: 40px;
      cursor: pointer;
      left: -68px;
    }
    .arrow-right {
      display: block;
      position: absolute;
      width: 37px;
      top: 46.5%;
      margin-top: -20px;
      color: #fff;
      font-size: 40px;
      cursor: pointer;
      left: 1011px;
    }
  }
}
</style>