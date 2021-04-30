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
                                <router-link v-for="(item, index) in tags" :key="item.id" :to="`/sheet?cat=${item.name}`" @click.native="changeCat(item)">
                                    {{item.name}}
                                </router-link>
                            </nav>
                        </div>
                        <a>
                            更多
                            <a-icon type="arrow-right" />
                        </a>
                    </div>
                    <div class="down">
                        <div class="down-wrap">
                            <single-sheet 
                                class="sheet-item"
                                v-for="(item, index) in songSheetList" :key="index"
                                :sheet="item"   
                            ></single-sheet>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <MemberCard/>
                <div class="settled-singer">
                    <div class="tit"><b>入驻歌手</b></div>
                    <div class="list">
                        <div class="card" v-for="(item, index) in singers" :key="item.id">
                          <router-link :to="`/singerInfo/${item.id}`" @click="setSingerDetail(item.id)">
                             <div class="pic">
                                <img :src="item.picUrl" :alt="item.name">
                            </div>
                            <div class="txt">
                                <b class="ellipsis">{{item.name}}</b>
                                <span>专辑数：{{item.albumSize}}</span>
                            </div>
                          </router-link>     
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
import SingleSheet from "../../components/singlesheet/SingleSheet";
import MemberCard from "../../components/membercard/MemberCard";
import { mapState } from "vuex";
export default {
  name: "Main",
  components: {
    Carousel,
    SingleSheet,
    MemberCard,
  },
  data() {
    return {
      tags: [],
      singers: [],
      songSheetList: [],
    };
  },
  computed: {
    ...mapState(["cat"]),
  },
  async created() {
    const { data: res } = await this.$axios.get("playlist/hot");
    this.tags = res.tags.slice(0, 5);
    const { data: res2 } = await this.$axios.get("artist/list");
    this.singers = res2.artists.slice(0, 9);
    const { data: res3 } = await this.$axios.get("personalized?limit=16");
    this.songSheetList = res3.result;
  },
  methods: {
    changeCat(item) {
      this.$store.commit("setCat", item.name);
    },
    setSingerDetail(id) {
      console.log("aaa");
      this.$store.dispatch("setSingerDetail", id);
      this.$store.dispatch("setSimiSinger", id);
    },
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
