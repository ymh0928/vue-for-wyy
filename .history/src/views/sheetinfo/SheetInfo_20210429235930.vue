<template>
  <div class="sheet-info wrap feature-wrap">
    <div class="g-wrap6">
      <div class="m-info clearfix">
        <div class="cover">
          <img :src="sheetDetail.coverImgUrl" :alt="sheetDetail.name" />
          <div class="mask"></div>
        </div>
        <div class="cnt">
          <div class="cntc">
            <div class="hd clearfix">
              <i class="f-pr"></i>
              <div class="tit">
                <h2 class="f-ff2 f-brk">{{ sheetDetail.name }}</h2>
              </div>
            </div>
            <div class="user f-cb">
              <a class="face">
                <img
                  :src="
                    sheetDetail.creator ? sheetDetail.creator.avatarUrl : ''
                  "
                  :alt="sheetDetail.creator ? sheetDetail.creator.nickname : ''"
                />
              </a>
              <span class="name">
                <a
                  :href="'//music.163.com/artist?id=' + sheetDetail.userId"
                  class="s-fc7"
                  >{{
                    sheetDetail.creator ? sheetDetail.creator.nickname : ""
                  }}</a
                >
              </span>
              <span class="time s-fc4">{{ time }}</span>
            </div>
            <div class="btns">
              <a-button-group class="btn">
                <a-button class="play" type="primary"
                  ><a-icon type="play-circle" />播放</a-button
                >
                <a-button class="play" type="primary">+</a-button>
              </a-button-group>
              <a-button class="btn like">
                <span>收藏</span>({{ sheetDetail.subscribedCount }})
              </a-button>
              <a-button class="btn share">
                <span>分享</span>({{ sheetDetail.shareCount }}})
              </a-button>
            </div>
            <div class="tags clearfix">
              <span>标签</span>
              <div class="tag-wrap">
                <a-tag v-for="(item, index) in sheetDetail.tags" :key="index">{{
                  item
                }}</a-tag>
              </div>
            </div>
            <div v-if="sheetDetail.description">
              <div
                v-if="sheetDetail.description.length < 99"
                class="intr f-brk"
              >
                <p>
                  <b>介绍：</b>
                  {{ sheetDetail.description }}
                </p>
              </div>
              <div v-if="sheetDetail.description.length >= 99">
                <div v-if="show">
                  <div class="intr f-brk">
                    <p>
                      <b>介绍：</b>
                      {{
                        sheetDetail.description ? sheetDetail.description : ""
                      }}
                    </p>
                  </div>
                  <div class="expand" @click="show = !show">
                    <span>收起</span>
                  </div>
                </div>
                <div v-if="!show">
                  <div class="intr f-brk">
                    <p>
                      <b>介绍：</b>
                      {{
                        sheetDetail.description
                          ? sheetDetail.description.slice(0, 99) + "..."
                          : ""
                      }}
                    </p>
                  </div>
                  <div class="expand" @click="show = !show">
                    <span>展开</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wy-sec">
        <div class="u-title wy-sec-wrap clearfix">
          <h3 class="wy-sec-tit">
            <span class="f-ff2">歌曲列表</span>
          </h3>
          <span class="sub s-fc3"
            >{{ sheetDetail.tracks ? sheetDetail.tracks.length : "" }}首歌</span
          >
          <div class="more s-fc3">
            播放：
            <strong class="s-fc6">{{ sheetDetail.playCount }}</strong>
            次
          </div>
        </div>
        <a-table
          class="wy-table"
          :columns="columns"
          :dataSource="dataSource"
          bordered
          :pagination="false"
        >
          <template slot="playIcon" slot-scope="item">
            <a-icon
              class="a-icon"
              type="play-circle"
              style="margin-left: 15px"
              @click="onPlayClick(item)"
            />
          </template>
          <template slot="song" slot-scope="song">
            <routerLink class="name-a" :to="`/songInfo/${song.id}`">{{
              song.name
            }}</routerLink>
          </template>
          <template slot="singer" slot-scope="singer">
            <routerLink class="name-a" :to="`/singerInfo/${singer.id}`">{{
              singer.name
            }}</routerLink>
          </template>
          <template slot="icons" slot-scope="item">
            <span title="添加" class="icons-span"><a-icon type="plus" /></span>
            <span title="收藏" class="icons-span"
              ><a-icon type="folder-add"
            /></span>
            <span title="分享" class="icons-span"
              ><a-icon type="share-alt"
            /></span>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SheetInfo",
  data() {
    const columns = [
      {
        title: "",
        key: "playIcon",
        scopedSlots: { customRender: "playIcon" },
        width: "80px",
      },
      {
        title: "标题",
        key: "song",
        dataIndex: "song",
        scopedSlots: { customRender: "song" },
      },
      {
        title: "时长",
        key: "time",
        dataIndex: "time",
        width: "120px",
      },
      {
        title: "歌手",
        key: "singer",
        dataIndex: "singer",
        width: "150px",
        scopedSlots: { customRender: "singer" },
      },
      {
        title: "专辑",
        key: "album",
        dataIndex: "album",
      },
      {
        title: "",
        key: "icons",
        scopedSlots: { customRender: "icons" },
        width: "120px",
      },
    ];

    return {
      columns,
      dataSource: [],
      show: false,
    };
  },
  computed: {
    listenChange() {
      const { sheetDetail } = this;
      return { sheetDetail };
    },
    time() {
      return this.$timestampToTime(this.sheetDetail.createTime);
    },
    ...mapState(["sheetDetail"]),
  },
  created() {
    this.setSheetDetail(this.$route.params.id);
  },
  watch: {
    listenChange() {
      this.sheetDetail.tracks?.forEach((item, idx) => {
        this.dataSource.push({
          key: idx,
          playIcon: null,
          song: item,
          time: this.$transformTime(item.dt / 1000),
          singer: item.ar[0],
          album: item.al.name,
          icons: null,
        });
      });
    },
  },
  methods: {
    setSheetDetail(id) {
      this.$store.dispatch("setSheetDetail", id);
    },
    onPlayClick(item) {
      console.log(item.song);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
.sheet-info {
  .g-wrap6 {
    padding: 47px 30px 40px 39px;
    .m-info {
      .cover {
        float: left;
        position: relative;
        display: inline;
        width: 200px;
        height: 200px;
        margin-right: -220px;
        img {
          height: 100%;
        }
        .mask {
          position: absolute;
          width: 208px;
          height: 208px;
          top: -4px;
          left: -4px;
          overflow: hidden;
          background: url("../../assets/images/coverall.png") 0 -1285px;
        }
      }

      .cnt {
        float: right;
        width: 100%;
        .cntc {
          margin-left: 230px;
          .hd {
            position: relative;
            margin: 0 0 12px;
            line-height: 24px;

            .f-pr {
              position: relative;
              zoom: 1;
              float: left;
              .icon("../../assets/images/icon.png", 54px, 24px);
              background-position: 0 -243px;
            }

            .tit {
              margin-left: 64px;
              position: relative;
              .f-ff2 {
                line-height: 24px;
                font-size: 20px;
                font-weight: normal;
              }
            }
          }

          .user {
            margin: 0 0 20px;
            line-height: 35px;
            .face {
              img {
                float: left;
                width: 35px;
                height: 35px;
              }
            }
            .name {
              float: left;
              margin-left: 10px;
              .s-fc7 {
                color: @link-color;
              }
            }
            .time {
              margin-left: 15px;
              color: @wy-text-prev-color;
            }
          }

          .btns {
            margin-bottom: 25px;
            margin-right: -10px;
            .btn {
              margin-right: 10px;
            }
          }
          .tags {
            margin: 25px 0 5px;
            line-height: 22px;
            span {
              float: left;
            }
            .tag-wrap {
              float: left;
              margin-left: 15px;
            }
          }

          .intr {
            margin-top: 10px;
            line-height: 18px;
            color: #666;
            &.f-hide {
              display: none;
            }
          }

          .expand {
            text-align: right;
            span {
              color: @link-color;
              cursor: pointer;
            }
          }
        }
      }
    }

    .u-title {
      h3 {
        float: left;
      }
      .sub {
        float: left;
        margin: 9px 0 0 20px;
      }
      .more {
        float: right;
        margin-top: 5px;
        strong {
          color: @red-color;
        }
      }
    }
  }
}
.a-icon:hover {
  cursor: pointer;
}
.icons-span {
  margin-left: 10px;
}
.icons-span:hover {
  cursor: pointer;
}
.name-a {
  color: #1890ff;
}
.name-a:hover {
  text-decoration: none;
}
</style>