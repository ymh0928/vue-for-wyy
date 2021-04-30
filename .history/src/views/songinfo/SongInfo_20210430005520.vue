<template>
  <div class="song-info wrap feature-wrap">
    <div class="g-wrap6">
      <div class="m-info clearfix">
        <div class="cover">
          <img
            :src="songDetail.al ? songDetail.al.picUrl : ''"
            :alt="songDetail.name"
          />
          <div class="mask"></div>
        </div>
        <div class="cnt">
          <div class="cntc">
            <div class="hd clearfix">
              <i class="f-pr"></i>
              <div class="tit">
                <h2 class="f-ff2 f-brk">{{ songDetail.name }}</h2>
              </div>
            </div>
            <div class="user f-cb">
              <div class="singers clearfix">
                <span>歌手：</span>
                <ul>
                  <li>
                    <a>{{ songDetail.ar ? songDetail.ar[0].name : "" }}</a>
                  </li>
                </ul>
              </div>
              <div class="al">
                <span>所属专辑：</span>
                <span class="al-name">{{
                  songDetail.al ? songDetail.al.name : ""
                }}</span>
              </div>
            </div>
            <div class="btns">
              <a-button-group class="btn">
                <a-button class="play" type="primary" @click="onPlayClick"
                  ><a-icon type="play-circle" />播放</a-button
                >
                <a-button class="add" type="primary">+</a-button>
              </a-button-group>
              <a-button class="btn like"><span>收藏</span></a-button>
              <a-button class="btn share"><span>分享</span></a-button>
            </div>
            <div class="lyric-info f-brk">
              <div class="lyric-content" :class="{ expand: toggle }">
                <div
                  class="lyric-line"
                  v-for="(item, index) in songLyric"
                  :key="index"
                >
                  <p>{{ item.txt }}</p>
                  <p>{{ item.txtCn }}</p>
                </div>
              </div>
              <div class="toggle-expand" @click="toggleLyric">
                <span>{{ toggle ? "收起" : "展开" }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { WyLyric } from "../../utils/wyLyric";
export default {
  name: "songInfo",
  data() {
    return {
      toggle: false,
    };
  },
  computed: {
    ...mapState(["songDetail", "songLyric", "ready", "playState", "playList"]),
  },
  created() {
    this.setSongDetail(this.$route.params.id);
  },
  methods: {
    setSongDetail(id) {
      this.$store.dispatch("setSongDetail", id);
    },
    toggleLyric() {
      this.toggle = !this.toggle;
    },
    async onPlayClick() {
      if (!this.ready || !this.playState) {
        this.$store.commit("readyStart");
        this.$store.commit("setPlayStateTrue");
      }
      this.$store.commit("playModeChangeLoop");
      const playlist = this.playList.slice();
      const nameArr = [];
      playlist.forEach((item) => {
        nameArr.push(item.name);
      });
      if (nameArr.indexOf(this.songDetail.name) === -1) {
        playlist.push(this.songDetail);
        this.$store.commit("setPlayList", playlist);
        this.playClick(playlist, this.songDetail, this.songDetail.id);
      } else {
        this.playClick(nameArr, this.songDetail.name, this.songDetail.id);
      }
    },
    async playClick(playlist, songdetail, currentsongid) {
      const index = playlist.indexOf(songdetail);
      this.$store.commit("setCurrentIdx", index);
      this.$store.commit("setCurrentSongId", currentsongid);
      this.$store.commit("setCurrentSong", playlist[index]);
      const url = await this.$axios.get(`song/url?id=${this.$route.params.id}`);
      try {
        this.$store.commit("setSongUrl", url.data.data[0].url);
      } catch (error) {
        this.$message.warning("对不起，这首歌没有播放链接");
      }
      const resultLyric = await this.$axios.get(
        `lyric?id=${this.$route.params.id}`
      );
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
.song-info {
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
            margin: 0 0 12px;
            .singers {
              span {
                float: left;
              }
              ul {
                float: left;
                li {
                  float: left;
                  .s-fc7 {
                    color: @link-color;
                  }
                }
              }
            }
            .al {
              .al-name {
                color: @wy-text-prev-color;
              }
            }
          }

          .btns {
            margin-bottom: 25px;
            margin-right: -10px;
            .btn {
              margin-right: 10px;
            }
          }
        }
      }
    }
    .lyric-info {
      // width: 144px;
      line-height: 23px;
      .lyric-content {
        height: 327px;
        overflow: hidden;
        &.expand {
          height: auto;
        }
        .lyric-line p {
          margin-bottom: 0;
        }
      }
      .toggle-expand {
        cursor: pointer;
        span {
          color: @link-color;
        }
      }
    }
  }
}
</style>