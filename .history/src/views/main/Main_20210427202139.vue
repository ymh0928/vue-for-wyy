<template>
  <div>
    <Carousel />
  </div>
</template>

<script>
import Carousel from "../../components/carousel/Carousel";
export default {
  name: "Main",
  components: {
    Carousel,
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
</style>
