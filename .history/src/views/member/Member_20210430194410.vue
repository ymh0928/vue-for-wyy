<template>
  <div class="user-center wrap feature-wrap">
    <div class="page-wrap">
      <div class="m-proifo clearfix">
        <div class="f-pr">
          <img
            :src="userDetail.profile ? userDetail.profile.avatarUrl : ''"
            :alt="userDetail.profile ? userDetail.profile.nickname : ''"
          />
        </div>
        <div class="f-r">
          <div class="name">
            <h2 class="clearfix">
              <span class="tit ellipsis">{{
                userDetail.profile ? userDetail.profile.nickname : ""
              }}</span>
              <p class="lv">
                <span class="u-lv u-icn2">
                  {{ userDetail.level }} <i class="lvright u-icn2"></i>
                </span>
              </p>
              <div class="icn-gender"></div>
            </h2>
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
          <div class="inf f-brk">
            {{ userDetail.profile ? userDetail.profile.signature : "" }}
          </div>
        </div>
      </div>
      <Records :id="$route.params.id" />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Records from "../../components/records/Records";
export default {
  name: "Member",
  components: {
    Records,
  },
  computed: {
    ...mapState(["userDetail"]),
  },
  created() {
    this.setUserRecord(this.$route.params.id);
  },
  methods: {
    setUserRecord(id) {
      const data = { id, type: 1 };
      this.$store.dispatch("setUserRecord", data);
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
.user-center {
  .page-wrap {
    padding: 40px;
    .m-proifo {
      margin-bottom: 40px;
      .f-pr {
        float: left;
        width: 188px;
        // margin-right: 40px;
        img {
          padding: 3px;
          background: #fff;
          border: 1px solid #d5d5d5;
        }
      }
      .f-r {
        float: right;
        width: 670px;
        .name {
          padding-bottom: 12px;
          margin-bottom: 10px;
          border-bottom: 1px solid @border-color-base;
          h2 {
            color: @black-color;
            .tit {
              display: block;
              float: left;
              margin-top: 3px;
              font-size: 22px;
              line-height: 30px;
            }
            .lv {
              float: left;
              margin: 8px 0 0 10px;
              .u-icn2 {
                display: inline-block;
                overflow: hidden;
                vertical-align: middle;
                background: url("../../assets/images/icon2.png") no-repeat 0
                  9999px;
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
            .icn-gender {
              float: left;
              margin: 9px 0 0 8px;
              .icon("../../assets/images/icon.png", 20px, 20px);
              background-position: -41px -57px;
            }
          }
        }

        .dny {
          margin-bottom: 20px;
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

        .inf {
          margin-bottom: 5px;
          line-height: 21px;
          color: @wy-text-prev-color;
        }
      }
    }

    .look-more {
      display: block;
      margin-top: 10px;
      text-align: right;
    }

    .sheets {
      .sheet-list {
        margin-top: 15px;
        .sheet-item {
          float: left;
          width: 140px;
          height: 204px;
          margin-right: 49.5px;
          &:nth-of-type(5n) {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>