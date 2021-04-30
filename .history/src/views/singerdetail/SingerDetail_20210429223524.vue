<template>
  <div class="singer-detail wrap feature-wrap clearfix">
    <div class="dt-left">
      <div class="left-wrap">
        <div class="n-artist">
          <div class="names clearfix">
            <h2 class="ellipsis">{{ singerDetail.artist.name }}</h2>
            <h3 class="ellipsis">{{ singerDetail.artist.alias.join(";") }}</h3>
          </div>
          <div class="cover-img">
            <img
              class="full-height"
              :src="singerDetail.artist.picUrl"
              :alt="singerDetail.artist.name"
            />
          </div>
          <button class="btn btn-like"></button>
        </div>
        <div class="top-50">
          <div class="btns clearfix">
            <a-button-group class="btn">
              <a-button class="play" type="primary">
                <a-icon type="play-circle" />播放
              </a-button>
              <a-button class="add" type="primary">+</a-button>
            </a-button-group>
            <a-button class="btn like">
              <span>收藏</span>{{ singerDetail.hotSongs.length }}
            </a-button>
          </div>
          <a-table
            class="wy-table"
            :columns="columns"
            :dataSource="dataSource"
            bordered
            :pagination="false"
          >
            <template slot="playIcon" slot-scope="playIcon">
              <a-icon
                class="a-icon"
                type="play-circle"
                style="margin-left: 15px"
              />
            </template>
            <template slot="song" slot-scope="song">
              <routerLink class="name-a" :to="`/songInfo/${song.id}`">{{
                song.name
              }}</routerLink>
            </template>
            <template slot="icons" slot-scope="icons">
              <span title="添加" class="icons-span"
                ><a-icon type="plus"
              /></span>
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
  </div>
</template>
<script>
export default {
  name: "SingerDetail",
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
        key: "songname",
        dataIndex: "songname",
        scopedSlots: { customRender: "song" },
      },
      {
        title: "时长",
        key: "time",
        dataIndex: "time",
        width: "120px",
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
    };
  },
  computed: {
    listenChange() {
      const { singerDetail } = this;
      return { singerDetail };
    },
    ...mapState(["singerDetail"]),
  },
  created() {
    this.setSingerDetail(this.$route.params.id);
  },
  watch: {
    listenChange() {
      this.singerDetail.hotSongs?.forEach((item, idx) => {
        this.dataSource.push({
          key: idx,
          playIcon: "",
          songname: item,
          time: this.$transformTime(item.dt / 1000),
          album: item.al.name,
          icons: "",
        });
      });
    },
  },
  methods: {
    setSingerDetail(id) {
      this.$store.dispatch("setSingerDetail", id);
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
.singer-detail {
  .dt-left {
    float: left;
    max-width: 710px;
    .left-wrap {
      padding: 47px 30px 40px 39px;
      .n-artist {
        position: relative;
        .names {
          h2 {
            float: left;
            max-width: 75%;
            height: 34px;
            line-height: 24px;
            font-size: 24px;
            color: #333;
          }
          h3 {
            float: left;
            max-width: 23%;
            padding-left: 10px;
            font-size: 14px;
            line-height: 32px;
            color: #999;
            font-weight: normal;
          }
        }
        .cover-img {
          width: 640px;
        }

        .btn {
          position: absolute;
          bottom: 18px;
          right: 20px;
          .icon("../images/iconall.png", 76px, 32px);
          border: none;
        }
        .btn-like {
          background-position: 0 -502px;
        }
        .btn-liked {
          background-position: 0 -735px;
          &:hover {
            background-position: 0 -781px;
          }
        }
      }

      .top-50 {
        .btns {
          margin: 20px 0;
          .btn {
            float: left;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .dt-right {
    float: right;
    width: 268px;
    .right-wrap {
      padding: 20px 40px 40px 30px;
      h3 {
        height: 23px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        color: #333;
      }
      ul {
        li {
          width: 50px;
          float: left;
          font-size: @font-size-sm;
          margin-right: 24px;
          cursor: pointer;
          &:nth-of-type(3n) {
            margin-right: 0;
          }
          .pic {
            width: 100%;
            height: 50px;
          }
          p {
            margin-top: 8px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>