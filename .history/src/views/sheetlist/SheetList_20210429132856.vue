<template>
  <div class="sheet wrap feature-wrap">
    <div class="list-r">
      <div class="top">
        <div class="cat">
          <span></span>
        </div>
        <a-radio-group buttonStyle="solid" defaultValue="">
          <a-radio-button value="hot">热门</a-radio-button>
          <a-radio-button value="new">最新</a-radio-button>
        </a-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SheetList",
};
</script>

<style lang="less" scoped>
</style>