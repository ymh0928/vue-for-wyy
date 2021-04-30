<template>
  <div class="play-panel" :class="{ show: showPanel && playList.length }">
    <div class="hd">
      <div class="hdc">
        <h4>
          播放列表（<span>{{ playList.length }}</span
          >）
        </h4>
        <div class="add-all"><i class="icon" title="收藏全部"></i>收藏全部</div>
        <span class="line"></span>
        <div class="clear-all">
          <a-popconfirm
            placement="topRight"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirm"
          >
            <template slot="title">
              <p>{{ text }}</p>
            </template>
            <i
              class="icon trush"
              title="清空"
              v-if="playList.length"
              @click.stop="onClearSong"
            ></i
            >清空
          </a-popconfirm>
        </div>
        <p class="playing-name">{{ currentSong.name }}</p>
        <i class="icon close" @click="$store.commit('closePanel')"></i>
      </div>
    </div>
    <div class="bd">
      <img
        src="//music.163.com/api/img/blur/109951163826278397"
        class="imgbg"
      />
      <div class="msk"></div>
      <div id="scrollRef" class="list-wrap">
        <ul v-if="playList.length">
          <li
            v-for="(song, index) in playList"
            :key="song.id"
            :class="{ current: currentIdx === index }"
            @click="onSingerClick(song)"
          >
            <i class="col arrow"></i>
            <div class="col name ellipsis">{{ song.name }}</div>
            <div class="col icons">
              <i class="ico like" title="收藏"></i>
              <i class="ico share" title="分享"></i>
              <i
                class="ico trush"
                title="删除"
                @click.stop="onDeleteSong(song)"
              ></i>
            </div>
            <div class="singers clearfix ellipsis">
              <div class="singer-item">{{ song.ar[0].name }}</div>
            </div>
            <div class="col duration">
              {{ $transformTime(song.dt / 1000) }}
            </div>
            <div class="col link"></div>
          </li>
        </ul>
      </div>
      <div ref="lyricRef" class="list-lyric">
        <ul v-if="playList.length">
          <li
            v-for="(lyric, index) in currentLyric"
            :key="index"
            :class="{ current: currentLineNum === index }"
          >
            {{ lyric.txt }} <br />
            {{ lyric.txtCn }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { WyLyric } from "../../utils/wyLyric";
export default {
  name: "Panel",
  props: {
    playList: Array,
    currentSong: Object,
    playState: Boolean,
    currentLyric: Array,
    currentLineNum: Number,
    currentTime: Number,
    currentIdx: Number,
    showPanel: Boolean,
  },
  data() {
    return {
      buttonWidth: 70,
      text: "确认清空歌单吗？",
    };
  },
  computed: {
    listenChange() {
      const {
        playList,
        playState,
        currentIdx,
        currentLyric,
        currentLineNum,
        currentTime,
      } = this;
      return {
        playList,
        playState,
        currentIdx,
        currentLyric,
        currentLineNum,
        currentTime,
      };
    },
  },
  watch: {
    listenChange() {
      if (this.playList.length) {
        if (this.playState && this.currentLyric.length) {
          const play = () => {
            this.$store.commit(
              "setCurrentLineNum",
              findCurNum(Math.floor(this.currentTime) * 1000)
            );
          };
          const findCurNum = (time) => {
            const index = this.currentLyric.findIndex(
              (item) => time <= item.time
            );
            return index === -1 ? this.currentLyric.length - 1 : index - 1;
          };
          play();
        }
      }
      if (
        this.currentLyric.length &&
        this.currentLineNum &&
        this.currentLineNum !== -1
      ) {
        const lyricTop = this.$refs.lyricRef.children[0].children[
          this.currentLineNum
        ].offsetTop;
        this.$refs.lyricRef.scrollTo(0, lyricTop - 96);
      }
    },
  },
  methods: {
    async onSingerClick(song) {
      if (!this.playState) {
        this.$store.commit("play");
      }
      this.$store.commit("currentLyricBack");
      this.$store.commit("currentLineNumBack");
      const currentId = song.id;
      const url = await this.$axios.get(`song/url?id=${currentId}`);
      try {
        this.$store.commit("setSongUrl", url.data.data[0].url);
      } catch (error) {
        this.$message.warning("对不起，这首歌没有播放链接");
      }
      const index = this.playList.indexOf(song);
      this.$store.commit("setCurrentIdx", index);
      this.$store.commit("setCurrentSongId", this.playList[index].id);
      this.$store.commit("setCurrentSong", this.playList[index]);
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
    onDeleteSong(song) {
      this.$store.commit("currentLyricBack");
      this.$store.commit("currentLineNumBack");
      const playlist = this.playList.slice();
      const index = playlist.indexOf(song);
      playlist.splice(index, 1);
      this.$store.commit("setPlayListByDelete", playlist);
      if (this.currentIdx > index) {
        this.$store.commit("setCurrentIdx", this.currentIdx - 1);
      } else if (this.currentIdx === index) {
        this.$store.commit("setCurrentIdx", index);
        this.$store.commit("setCurrentSongId", playlist[index]?.id);
        this.$store.commit("setCurrentSong", playlist[index]);
        if (this.currentIdx === playlist.length) {
          this.$store.commit("setCurrentIdx", index - 1);
          this.$store.commit("setCurrentSongId", playlist[index - 1]?.id);
          this.$store.commit("setCurrentSong", playlist[index - 1]);
        }
      }
      this.$message.success("删除歌曲成功！！！");
      if (!playlist.length) {
        const audioRef = document.querySelector("#audioRef");
        audioRef.pause();
        this.$store.commit("playListBack");
        this.$store.commit("readySuspend");
        this.$store.commit("pause");
        this.$store.commit("currentIdxBack");
        this.$store.commit("songUrlBack");
        this.$store.commit("currentSongIdBack");
        this.$store.commit("currentSongBack");
        this.$store.commit("currentTimeBack");
        this.$store.commit("currentPercentBack");
        this.$store.commit("currentLyricBack");
        this.$store.commit("currentLineNumBack");
        this.$message.success("清空歌单成功！！！");
      }
      this.$store.commit("closePanel");
    },
    onClearSong() {
      const audioRef = document.querySelector("#audioRef");
      audioRef.pause();
      this.$store.commit("playListBack");
      this.$store.commit("readySuspend");
      this.$store.commit("pause");
      this.$store.commit("currentIdxBack");
      this.$store.commit("songUrlBack");
      this.$store.commit("currentSongIdBack");
      this.$store.commit("currentSongBack");
      this.$store.commit("currentTimeBack");
      this.$store.commit("currentPercentBack");
      this.$store.commit("currentLyricBack");
      this.$store.commit("currentLineNumBack");
      this.$message.success("清空歌单成功！！！");
      this.$store.commit("closePanel");
    },
  },
};
</script>









<style lang="less" scoped>
@import "../../assets/css/layout";
@import "../../assets/css/varibles";
@import "../../assets/css/mixins";
.play-panel {
  display: none;
  position: absolute;
  left: 0;
  bottom: 70px;
  width: 100%;
  height: 300px;
  background-color: @play-bg-color;
  overflow: hidden;
  &.show {
    display: block;
  }
  .hd {
    background: url(../../assets/images/playlist_bg.png) no-repeat;
    .hdc {
      position: relative;
      height: 40px;
      h4 {
        position: absolute;
        left: 25px;
        top: 0;
        height: 39px;
        line-height: 39px;
        font-size: @font-size-base;
        color: @wy-text-color;
      }
      .add-all,
      .clear-all {
        position: absolute;
        left: 398px;
        top: 12px;
        height: 15px;
        line-height: 15px;
        cursor: pointer;
        color: @wy-text-prev-color;
        font-size: @font-size-sm;
        &:hover {
          color: @wy-text-color;
          .icon {
            background-position: -88px -189px;
          }
        }
        .icon {
          .icon("../../assets/images/playbar.png", 25px, 25px);
          background-position: -88px -163px;
          vertical-align: middle;
          /*&:hover{
            background-position: -88px -189px;
          }*/
        }
      }
      .line {
        position: absolute;
        top: 15px;
        left: 482px;
        height: 15px;
        border-left: 1px solid #000;
        border-right: 1px solid #2c2c2c;
      }
      .clear-all {
        left: 490px;
        top: 15px;
        &:hover {
          .trush {
            background-position: -51px -20px;
          }
        }
        .trush {
          width: 13px;
          height: 16px;
          background-image: url("../../assets/images/playlist.png");
          background-position: -51px 0;
        }
      }
      .playing-name {
        position: absolute;
        left: 595px;
        top: 0;
        width: 346px;
        text-align: center;
        height: 39px;
        line-height: 39px;
        color: @white-color;
        font-size: @font-size-base;
      }
      .close {
        position: absolute;
        top: 6px;
        right: 8px;
        .icon("../../assets/images/playlist.png", 30px, 30px);
        background-position: -195px 9px;
        &:hover {
          background-position: -195px -20px;
        }
      }
    }
  }
  .bd {
    position: relative;
    .icon("../../assets/images/playlist_bg.png", 976px, 260px);
    background-position: -1014px 0;
    background-repeat: repeat-y;

    .imgbg {
      position: absolute;
      left: 2px;
      top: 0;
      width: 980px;
      height: auto;
      opacity: 0.2;
    }
    .msk {
      position: absolute;
      left: 2px;
      top: 0;
      z-index: 2;
      width: 558px;
      height: 260px;
      background-color: #121212;
      opacity: 0.5;
    }
    .list-wrap {
      position: absolute;
      left: 2px;
      top: 0;
      z-index: 3;
      height: 260px;
      width: 553px;
      color: @wy-text-prev-color;
      overflow: auto;
      ul {
        li {
          overflow: hidden;
          padding: 10px 0;
          .col {
            float: left;
          }

          .arrow {
            .icon("../../assets/images/playlist.png", 10px, 13px);
            background-position: -182px 0;
            margin: 6px 10px 0 10px;
            visibility: hidden;
          }
          .name {
            width: 280px;
          }
          .singers {
            width: 70px;
            margin: 0 10px;
            float: left;
            height: 20px;
            .singer-item {
              float: left;
            }
          }
          .duration {
            margin: 0 10px;
          }
          .link {
            .icon("../../assets/images/playlist.png", 14px, 16px);
            background-position: -80px 0;
            margin-top: 4px;
            &:hover {
              background-position: -80px -20px;
            }
          }
          .icons {
            margin-top: 4px;
            visibility: hidden;
            overflow: hidden;
            .ico {
              float: left;
              margin: 0 3px;
              .icon("../../assets/images/playlist.png", 16px, 16px);
              &.like {
                background-position: -24px 0;
                &:hover {
                  background-position: -24px -20px;
                }
              }
              &.share {
                background-position: 0 0;
                &:hover {
                  background-position: 0 -20px;
                }
              }
              &.trush {
                background-position: -51px 0;
                &:hover {
                  background-position: -51px -20px;
                }
              }
            }
          }

          &:hover {
            color: @white-color;
            background-color: @black-color;
            .icons {
              visibility: visible;
            }
          }
        }
        .current {
          background-color: @black-color;
          .arrow {
            visibility: visible;
          }
        }
      }
    }
    .list-lyric {
      position: absolute;
      right: 2px;
      top: 0;
      // z-index: 3;
      margin: 21px 0 20px 0;
      height: 219px;
      width: 414px;
      overflow: auto;
      ul {
        li {
          color: @prev-color;
          word-wrap: break-word;
          text-align: center;
          line-height: 32px;
          //height: 32px;
          transition: color 0.3s;
          font-size: @font-size-sm;
          &.current {
            color: @white-color;
          }
        }
      }
    }
  }
}
/* 滚动条整体样式 */
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 8px;
}
/* 滚动条里的轨道 */
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}
/* 滚动条里的小方块 */
::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.25);
  transition: color 0.2s ease;
}
</style>