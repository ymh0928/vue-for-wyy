<template>
  <div class="carousel">
    <div style="position: relative">
      <div class="arrow-left">
        <a-icon type="left" />
      </div>
      <div class="arrow-right">
        <a-icon type="right" />
      </div>
    </div>
    <div style="display: flex; justify-content: center">
      <div class="image">
        <a-carousel>
          <div v-for="(item, index) in banners" :key="item.targetId">
            <a :href="item.url">
              <img
                :src="item.imageUrl"
                :alt="item.targetId"
                style="width: 980px; height: 363px"
              />
            </a>
          </div>
        </a-carousel>
      </div>
    </div>
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
  width: 100%;
  height: 382.96px;
  background-color: #001529;
  display: flex;
  justify-content: center;
  padding: 10px 0;

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
</style>