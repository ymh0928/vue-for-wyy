<template>
  <div class="member">
    <div class="login" v-if="!hasToken">
      <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <a-button class="btn" @click="handleBlock">用户登录</a-button>
    </div>
    <div class="n-myinfo" v-else>
      <div class="f-cb clearfix">
        <div class="head">
          <img
            :src="userDetail.profile ? userDetail.profile.avatarUrl : ''"
            :alt="userDetail.profile ? userDetail.profile.nickname : ''"
          />
        </div>
        <div class="info">
          <h4>
            <a class="nm ellipsis">
              {{ userDetail.profile ? userDetail.profile.nickname : "" }}
            </a>
          </h4>
          <p class="lv">
            <span class="u-lv u-icn2">
              {{ userDetail.level }} <i class="lvright u-icn2"></i>
            </span>
          </p>
          <div class="btnwrap f-pr">
            <a-button type="primary" style="width: 100%" @click="signin"
              >签到</a-button
            >
          </div>
        </div>
      </div>
      <ul class="dny clearfix">
        <li class="fst">
          <strong class="ellipsis">{{
            userDetail.profile ? userDetail.profile.eventCount : ""
          }}</strong>
          <span>动态</span>
        </li>
        <li>
          <strong class="ellipsis">{{
            userDetail.profile ? userDetail.profile.follows : ""
          }}</strong>
          <span>关注</span>
        </li>
        <li class="lst">
          <strong class="ellipsis">{{
            userDetail.profile ? userDetail.profile.followeds : ""
          }}</strong>
          <span>粉丝</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "MemberCard",
  computed: {
    ...mapState(["userDetail", "hasToken"]),
  },
  methods: {
    handleBlock() {
      this.$store.commit("setIsModalVisibleTrue");
      this.$store.commit("changeDefault");
    },
    async signin() {
      const res = await this.$axios.put(`daily_signin`);
      console.log(res);
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
.member {
  .login {
    height: 126px;
    background: url("../../assets/images/index.png") no-repeat;
    p {
      width: 205px;
      margin: 0 auto;
      padding: 16px 0;
      line-height: 22px;
      font-size: @font-size-sm;
    }
    .btn {
      display: block;
      color: @white-color;
      width: 100px;
      height: 30px;
      margin: 0 auto;
      background: url("../../assets/images/index.png") no-repeat 0 -195px;
      text-shadow: 0 1px 0 @wy-btn-red;
      border-color: @error-color;
    }
  }

  .n-myinfo {
    height: 184px;
    padding-top: 20px;
    background: url("../../assets/images/index.png") no-repeat 0 -270px;
    .f-cb {
      .head {
        position: relative;
        float: left;
        display: block;
        width: 80px;
        height: 80px;
        margin-left: 20px;
        padding: 2px;
        background: @white-color;
        border: 1px solid #dadada;
      }

      .info {
        float: left;
        width: 115px;
        margin-left: 12px;
        .lv {
          margin: 5px 0 10px 0;
          .u-icn2 {
            display: inline-block;
            overflow: hidden;
            vertical-align: middle;
            background: url("../../assets/images/icon2.png") no-repeat 0 9999px;
          }
          .u-lv {
            height: 17px;
            padding-left: 25px;
            line-height: 18px;
            color: #999;
            font-weight: bold;
            font-style: italic;
            background-position: -130px -64px;
            .lvright {
              float: right;
              width: 8px;
              height: 17px;
              background-position: -192px -64px;
            }
          }
        }
      }
    }

    .dny {
      margin: 12px 0 0 20px;
      color: #666;
      li {
        float: left;
        height: 40px;
        padding: 0 18px;
        border-right: 1px solid #e4e4e4;
        &.fst {
          padding-left: 0;
        }
        &.lst {
          padding-right: 0;
          border-right: none;
        }
        strong {
          display: block;
          max-width: 40px;
          font-size: 20px;
          font-weight: normal;
        }
        span {
          margin-left: 2px;
        }
      }
    }
  }
}
</style>