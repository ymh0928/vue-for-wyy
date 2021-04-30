<template>
  <div id="app">
    <a-layout class="layout">
      <a-layout-header class="header">
        <div class="wrap">
          <div class="left">
            <h1>Music</h1>
            <a-menu
              theme="dark"
              mode="horizontal"
              style="height: 64px; line-height: 64px"
            >
              <a-menu-item key="1">
                <router-link to="/home">发现</router-link>
              </a-menu-item>
              <a-menu-item key="2" ref="menuRef">
                <router-link :to="`/sheet?cat=${cat}`" @click.native="onClick"
                  >歌单</router-link
                >
              </a-menu-item>
            </a-menu>
          </div>
          <div class="right" style="position: relative">
            <a-input-search
              placeholder="歌单/歌手/歌曲"
              style="padding-top: 15px"
              @input="onInput($event)"
            />
            <div
              v-if="searchPanel"
              style="position: absolute; z-index: 1; top: 73px"
            >
              <WySearch />
            </div>
            <div class="member">
              <a-menu theme="dark" mode="horizontal">
                <a-sub-menu title="登录V">
                  <a-menu-item><a-icon type="phone" />手机登录</a-menu-item>
                  <a-menu-item><a-icon type="user-add" />注册</a-menu-item>
                </a-sub-menu>
              </a-menu>
            </div>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer class="footer">
        Ant Design ©2021 Implement By Vue
      </a-layout-footer>
    </a-layout>
    <Player />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Player from "../../components/player/Player";
import WySearch from "../../components/wysearch/WySearch";
export default {
  name: "Home",
  components: {
    Player,
    WySearch,
  },
  computed: {
    ...mapState(["searchPanel", "cat"]),
  },
  methods: {
    onInput(e) {
      this.$store.dispatch("setSearchResult", e.target.value);
    },
    onClick() {
      console.log(this.$refs.menuRef);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";

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