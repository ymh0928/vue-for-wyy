<template>
  <div>
    <Carousel />
    <div class="main">
        <div class="wrap">
            <div class="left">
                <div class="sec">
                    <div class="up">
                        <div class="navs">
                            <h2>
                                <i></i>
                                <a>热门推荐</a></a>
                            </h2>
                            <nav>
                                <a v-for="(item, index) in tags" :key="item.id">
                                    {{item.name}}
                                </a>
                            </nav>
                        </div>
                        <a>
                            更多
                            <a-icon type="arrow-right" />
                        </a>
                    </div>
                    <div class="down">
                        <div class="down-wrap">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Carousel from "../../components/carousel/Carousel";
export default {
  name: "Main",
  components: {
    Carousel,
  },
  data() {
    return {
      tags: [],
    };
  },
  async created() {
    const { data: res } = await this.$axios.get("playlist/hot");
    this.tags = res.tags.slice(0, 5);
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
.main {
  .wrap {
    display: flex;
    justify-content: space-between;
    background-color: @white-color;
    border-left: 1px solid @border-color-base;
    border-right: 1px solid @border-color-base;
    .left {
      width: 726px;
      padding: 20px 20px 40px;
      .sec {
        .up {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 0 10px 10px 10px;
          border-bottom: 2px solid @red-color;
          margin-bottom: 15px;
          .navs {
            display: flex;
            align-items: flex-end;
            h2 {
              font-size: @font-size-lgs;
              a:hover {
                text-decoration: inherit;
              }
              i {
                display: inline-block;
                width: 15px;
                height: 15px;
                background-color: @white-color;
                border: 3px solid @red-color;
                border-radius: 50%;
                margin-right: 10px;
              }
            }
            nav {
              a {
                display: inline-block;
                padding: 0 12px;
                border-right: 1px solid @border-color-base;
                //margin-left: 15px;
                &:last-child {
                  border-right: none;
                }
              }
            }
          }
        }

        .down {
          .down-wrap {
            display: flex;
            flex-wrap: wrap;
            .sheet-item {
              width: 140px;
              height: 204px;
              margin-right: 42px;
              &:nth-of-type(4n) {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
    .right {
      width: 250px;
      border-left: 1px solid @border-color-base;
      .settled-singer {
        padding: 15px;
        background-color: @white-color;
        .tit {
          font-size: @font-size-sm;
          overflow: hidden;
          padding-bottom: 8px;
          border-bottom: 1px solid @border-color-base;
          b {
            float: left;
          }
          span {
            float: right;
          }
        }

        .list {
          overflow: hidden;
          .card {
            margin-top: 14px;
            width: 210px;
            height: 62px;
            background: #fafafa;
            cursor: pointer;
            .pic {
              float: left;
              width: 62px;
              height: 62px;
            }
            .txt {
              float: left;
              border: 1px solid #e9e9e9;
              padding-left: 14px;
              width: 147px;
              height: 62px;
              b {
                display: block;
                margin-top: 8px;
              }
              span {
                display: block;
                margin-top: 8px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
