<template>
  <div>
    <a class="cover">
      <img :src="coverImg" :alt="sheet.name" />
      <div class="buttom">
        <div class="num">
          <i class="icon erji"></i>
          <span>{{ sheet.playCount }}</span>
        </div>
        <i class="icon play"></i>
      </div>
    </a>
    <span class="dec">{{ sheet.name }}</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>