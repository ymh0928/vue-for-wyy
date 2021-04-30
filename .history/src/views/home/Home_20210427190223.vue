<template>
  <div id="app">
    <a-layout>
      <a-layout-header>
        <div class="wrap">
          <div class="left">
            <h1>Music</h1>
            <a-menu theme="dark" mode="horizontal">
              <a-menu-item key="mail"> 发现 </a-menu-item>
              <a-menu-item key="app"> 歌单 </a-menu-item>
            </a-menu>
          </div>
        </div>
      </a-layout-header>
    </a-layout>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../../assets/layout";
@import "../../assets/varibles";
@import "../../assets/mixins";

#app .layout {
  .header {
    .wrap {
      display: flex;
      justify-content: space-between;
      width: 1100px;
      .left {
        display: flex;
        h1 {
          width: 157px;
          color: @border-color-base;
          font-size: @font-size-lgx;
          margin-bottom: 0;
          margin-right: 20px;
          text-align: center;
        }
        ul {
          height: 64px;
          line-height: 64px;
        }
      }
      .right {
        display: flex;
        .member {
          display: flex;
          align-items: center;
          color: @white-color;
        }
      }
    }
  }
  .content {
    background-color: @body-color;
  }
  .footer {
    text-align: center;
  }
}
</style>