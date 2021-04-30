<template>
  <div class="singer-detail wrap feature-wrap clearfix">
    <div class="dt-left">
      <div class="left-wrap">
        <div class="n-artist">
          <div class="names clearfix">
            <h2 class="ellipsis">
              {{ singerDetail.artist ? singerDetail.artist.name : "" }}
            </h2>
            <h3 class="ellipsis">
              {{
                singerDetail.artist ? singerDetail.artist.alias.join(";") : ""
              }}
            </h3>
          </div>
          <div class="cover-img">
            <img
              class="full-height"
              :src="singerDetail.artist ? singerDetail.artist.picUrl : ''"
              :alt="singerDetail.artist ? singerDetail.artist.name : ''"
            />
          </div>
          <button class="btn btn-like"></button>
        </div>
        <div class="top-50">
          <div class="btns clearfix">
            <a-button-group class="btn">
              <a-button class="play" type="primary" @click="onSongListPlay">
                <a-icon type="play-circle" />播放
              </a-button>
              <a-button class="add" type="primary">+</a-button>
            </a-button-group>
            <a-button class="btn like">
              <span>收藏</span
              >{{ singerDetail.hotSongs ? singerDetail.hotSongs.length : "" }}
            </a-button>
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
            <template slot="icons" slot-scope="item">
              <span title="添加" class="icons-span" @click="onPlusClick(item)"
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
    <div class="dt-right">
      <div class="right-wrap">
        <h3>相似歌手</h3>
        <ul class="clearfix">
          <li v-for="(item, index) in simiSinger" :key="item.id">
            <router-link :to="`/singerInfo/${item.id}`">
              <div class="pic">
                <img :src="item.picUrl" :alt="item.name" />
              </div>
              <p class="ellispis">{{ item.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { WyLyric } from "../../utils/wyLyric";
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
      const { singerDetail, simiSinger } = this;
      const { id } = this.$route.params;
      return { singerDetail, id, simiSinger };
    },
    ...mapState([
      "singerDetail",
      "ready",
      "playState",
      "playList",
      "currentSongId",
      "simiSinger",
    ]),
  },
  created() {
    this.setSingerDetail(this.$route.params.id);
    this.setSimiSinger(this.$route.params.id);
  },
  watch: {
    listenChange() {
      this.singerDetail.hotSongs?.forEach((item) => {
        this.dataSource.push({
          playIcon: "",
          song: item,
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
    setSimiSinger(id) {
      this.$store.dispatch("setSimiSinger", id);
    },
    onPlayClick(item) {
      if (this.currentSongId === item.song.id) {
        this.$message.warning("正在播放该歌曲！！！");
      } else {
        const newTooltipTitle = "播放歌曲";
        const newTooltipShow = true;
        this.$store.commit("setTooltipTitle", newTooltipTitle);
        this.$store.commit("setTooltipShow", newTooltipShow);
        this.$store.dispatch("deleteTooltip");
        if (!this.ready || !this.playState) {
          this.$store.commit("readyStart");
          this.$store.commit("setPlayStateTrue");
        }
        const playlist = this.playList.slice();
        if (playlist.indexOf(item.song) === -1) {
          playlist.push(item.song);
          this.$store.commit("setPlayList", playlist);
          this.songPlay(item.song, playlist);
        } else if (playlist.indexOf(item.song) > -1) {
          this.songPlay(item.song, playlist);
        }
      }
    },
    onPlusClick(item) {
      if (!this.ready) {
        this.$store.commit("readyStart");
      }
      this.$store.commit("playModeChangeLoop");
      const playlist = this.playList.slice();
      if (playlist.indexOf(item.song) === -1) {
        playlist.push(item.song);
        this.$store.commit("setPlayList", playlist);
        const newTooltipTitle = "添加歌曲";
        const newTooltipShow = true;
        this.$store.commit("setTooltipTitle", newTooltipTitle);
        this.$store.commit("setTooltipShow", newTooltipShow);
        this.$store.dispatch("deleteTooltip");
      } else {
        this.$message.warning("您的歌单中已经有这首歌啦");
      }
    },
    onSongListPlay() {
      const newTooltipTitle = "播放歌曲";
      const newTooltipShow = true;
      this.$store.commit("setTooltipTitle", newTooltipTitle);
      this.$store.commit("setTooltipShow", newTooltipShow);
      this.$store.dispatch("deleteTooltip");
      if (!this.ready) {
        this.$store.commit("readyStart");
        this.$store.commit("setPlayStateTrue");
        this.songListPlay();
      } else {
        this.songListPlay();
      }
    },
    async songListPlay() {
      this.$store.commit("playModeChangeLoop");
      this.$store.commit("setPlayList", this.singerDetail.hotSongs);
      this.$store.commit("setCurrentIdxFirst");
      this.$store.commit("setCurrentSongId", this.singerDetail.hotSongs[0].id);
      this.$store.commit("setCurrentSong", this.singerDetail.hotSongs[0]);
      const currentId = this.singerDetail.hotSongs[0].id;
      const url = await this.$axios.get(`song/url?id=${currentId}`);
      try {
        this.$store.commit("setSongUrl", url.data.data[0].url);
      } catch (error) {
        this.$message.warning("对不起，这首歌没有播放链接");
      }
      const resultLyric = await this.$axios.get(`lyric?id=${currentId}`);
      try {
        const res = {
          lyric: resultLyric.data.lrc.lyric,
          tlyric: resultLyric.data.tlyric.lyric,
        };
        const lyric = new WyLyric(res);
        const lyricLines = lyric.lines;
        this.$store.commit("setCurrentLyric", lyricLines);
        const handleLyric = () => {
          lyric.handler.subscribe(({ lineNum }) => {
            this.$store.commit("setCurrentLineNum", lineNum);
          });
        };
        handleLyric();
      } catch (error) {
        const res = {
          lyric: "",
          tlyric: "",
        };
        const lyric = new WyLyric(res);
        const lyricLines = lyric.lines;
        this.$store.commit("setCurrentLyric", lyricLines);
        const handleLyric = () => {
          lyric.handler.subscribe(({ lineNum }) => {
            this.$store.commit("setCurrentLineNum", lineNum);
          });
        };
        handleLyric();
      }
    },
    async songPlay(item, playlist) {
      const index = playlist.indexOf(item);
      this.$store.commit("setCurrentIdx", index);
      this.$store.commit("setCurrentSongId", playlist[index].id);
      this.$store.commit("setCurrentSong", playlist[index]);
      const currentId = playlist[index].id;
      const url = await this.$axios.get(`song/url?id=${currentId}`);
      try {
        this.$store.commit("setSongUrl", url.data.data[0].url);
      } catch (error) {
        this.$message.warning("对不起，这首歌没有播放链接");
      }
      const resultLyric = await this.$axios.get(`lyric?id=${currentId}`);
      try {
        const res = {
          lyric: resultLyric.data.lrc.lyric,
          tlyric: resultLyric.data.tlyric.lyric,
        };
        const lyric = new WyLyric(res);
        const lyricLines = lyric.lines;
        this.$store.commit("setCurrentLyric", lyricLines);
        const handleLyric = () => {
          lyric.handler.subscribe(({ lineNum }) => {
            this.$store.commit("setCurrentLineNum", lineNum);
          });
        };
        handleLyric();
      } catch (error) {
        const res = {
          lyric: "",
          tlyric: "",
        };
        const lyric = new WyLyric(res);
        const lyricLines = lyric.lines;
        this.$store.commit("setCurrentLyric", lyricLines);
        const handleLyric = () => {
          lyric.handler.subscribe(({ lineNum }) => {
            this.$store.commit("setCurrentLineNum", lineNum);
          });
        };
        handleLyric();
      }
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