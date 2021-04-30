<template>
  <div
    ref="playerRef"
    class="m-player"
    @mouseover="flag && showPlayer"
    @mouseleave="hidePlayer"
  >
    <div class="lock">
      <div
        ref="lockRef"
        class="left"
        @mouseover="flag && showPlayer"
        @mouseleave="hidePlayer"
      >
        <i @click="lockPlayer"></i>
      </div>
    </div>
    <div class="hand"></div>
    <div class="container">
      <div class="wrap">
        <div class="btns">
          <i class="prev" @click="onPrev"></i>
          <i class="toggle" v-if="!playList.length || currentIdx == -1"></i>
          <i
            class="toggle playing"
            v-else-if="playList.length && currentIdx !== -1 && playState"
            @click="$store.commit('pause')"
          ></i>
          <i
            class="toggle"
            v-else-if="playList.length && currentIdx !== -1 && !playState"
            @click="$store.commit('play')"
          ></i>
          <i class="next" @click="onNext"></i>
        </div>
        <div class="head">
          <img
            :src="
              playList.length && currentIdx !== -1
                ? playList[currentIdx].al.picUrl
                : '//s4.music.126.net/style/web2/img/default/default_album.jpg'
            "
          />
          <router-link
            v-if="currentSongId !== 0"
            :to="`/songInfo/${currentSongId}`"
          >
            <i class="mask"></i>
          </router-link>
          <i v-else class="mask"></i>
        </div>
        <div class="play">
          <div class="words clearfix">
            <p class="ellipsis margin-bottom-none">
              <router-link :to="`/songInfo/${currentSongId}`">
                {{
                  playList.length && currentIdx !== -1
                    ? playList[currentIdx].name
                    : ""
                }}
              </router-link>
            </p>
            <ul class="songs clearfix margin-bottom-none">
              <li>
                <router-link
                  :to="`/singerInfo/${
                    currentIdx !== -1 ? playList[currentIdx].ar[0].id : ''
                  }`"
                  @click.native="
                    setSingerDetail(
                      currentIdx !== -1 ? playList[currentIdx].ar[0].id : ''
                    )
                  "
                >
                  {{
                    playList.length && currentIdx !== -1
                      ? playList[currentIdx].ar[0].name
                      : ""
                  }}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="bar">
            <div class="slider-wrap">
              <a-slider
                style="margin: 0; padding: 0"
                :tooltipVisible="false"
                :defaultValue="0"
                :value="currentPercent"
                :disabled="playList.length ? false : true"
                @change="onPercentChange"
                @afterChange="onPercentAfterChange"
              />
            </div>
            <span class="time">
              <em>{{
                playList.length ? this.$transformTime(currentTime) + " / " : ""
              }}</em>
              {{
                playList.length && currentIdx !== -1
                  ? this.$transformTime(playList[currentIdx].dt / 1000)
                  : ""
              }}
            </span>
          </div>
        </div>
        <div class="oper">
          <i class="like" title="收藏"></i>
          <i class="share" title="分享"></i>
        </div>
        <div class="ctrl">
          <i class="volume" title="音量" @click="setShowVolume"></i>
          <i class="loop" v-if="!playList.length || !ready"></i>
          <i
            class="loop"
            v-if="playMode === 'loop' && playList.length && ready"
            @click="playModeChangeRandom"
          ></i>
          <i
            class="random"
            v-if="playMode === 'random' && playList.length && ready"
            @click="playModeChangeSingleLoop"
          ></i>
          <i
            class="singleLoop"
            v-if="playMode === 'singleLoop' && playList.length && ready"
            @click="playModeChangeLoop"
          ></i>
          <a-tooltip
            :visible="tooltipShow"
            placement="top"
            overlayClassName="tip-bg"
            class="open"
            @click="$store.commit('togglePanelShow')"
          >
            <p>
              <span></span>
            </p>
            <template slot="title">{{ tooltipTitle }}</template>
          </a-tooltip>
          <div class="control-vol" v-if="showVolume">
            <a-slider
              style="margin: 0; padding: 0"
              vertical
              :defaultValue="volume"
              @change="onVolumeChange"
            />
          </div>
          <div v-if="!showVolume"></div>
        </div>
        <Panel
          :playList="playList"
          :currentSong="currentSong"
          :playState="playState"
          :currentLyric="currentLyric"
          :currentLineNum="currentLineNum"
          :currentTime="currentTime"
          :currentIdx="currentIdx"
          :showPanel="showPanel"
          :tooltipTitle="tooltipTitle"
          :tooltipShow="tooltipShow"
        />
      </div>
    </div>
    <audio
      id="audioRef"
      v-if="playList.length && ready"
      ref="audioRef"
      :src="songUrl"
      @canplay="onCanplay"
      @timeupdate="onTimeupdate"
      @ended="onEnded"
    ></audio>
    <audio v-else></audio>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Panel from "../panel/Panel";
import { WyLyric } from "../../utils/wyLyric";

export default {
  name: "Player",
  components: {
    Panel,
  },

  data() {
    return {
      flag: true,
    };
  },

  computed: {
    listenChange() {
      const { playList, ready, playState, currentIdx, playMode } = this;
      return {
        playList,
        ready,
        playState,
        currentIdx,
        playMode,
      };
    },
    ...mapState([
      "playList",
      "currentIdx",
      "playState",
      "currentPercent",
      "currentTime",
      "playMode",
      "showVolume",
      "volume",
      "currentSong",
      "currentLyric",
      "currentLineNum",
      "ready",
      "currentSongId",
      "songUrl",
      "showPanel",
      "tooltipTitle",
      "tooltipShow",
    ]),
  },

  watch: {
    async listenChange() {
      if (this.playList.length && this.currentIdx !== -1) {
        if (this.ready) {
          if (this.playMode === "random") {
            const idArr = [];
            this.playList.forEach((item) => {
              idArr.push(item.id);
            });
            const currentindex = idArr.indexOf(this.currentSongId);
            this.$store.commit("setCurrentIdx", currentindex);
            const currentId = this.playList.map((item) => item.id)[
              currentindex
            ];
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
          } else {
            const currentId = this.playList.map((item) => item.id)[
              this.currentIdx
            ];
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
          }
          if (this.playState) {
            this.$refs.audioRef.play();
          } else {
            this.$refs.audioRef.pause();
          }
        }
      }
    },
  },

  methods: {
    onCanplay() {
      this.$refs.audioRef.play();
    },
    onTimeupdate() {
      const duration = this.playList[this.currentIdx]?.dt / 1000;
      const currentPercent =
        (this.$refs.audioRef?.currentTime / duration) * 100;
      this.$store.commit("setCurrentTime", this.$refs.audioRef?.currentTime);
      this.$store.commit("setCurrentPercent", currentPercent);
    },
    onPercentChange(newValue) {
      this.$refs.audioRef.pause();
      const duration = this.playList[this.currentIdx].dt / 1000;
      const newPercent = newValue;
      const newCurrent = (duration * newValue) / 100;
      this.$refs.audioRef.currentTime = newCurrent;
      this.$store.commit("setCurrentTime", newCurrent);
      this.$store.commit("setCurrentPercent", newPercent);
    },
    onPercentAfterChange() {
      this.$refs.audioRef.play();
    },
    onVolumeChange(newValue) {
      if (this.$refs.audioRef) {
        this.$refs.audioRef.volume = newValue / 100;
        this.$store.commit("setVolume", newValue);
      }
      this.$store.commit("setVolume", newValue);
    },
    setShowVolume() {
      this.$store.commit("setShowVolume");
    },
    loop() {
      this.$refs.audioRef.play();
    },
    async onPrevNext(index) {
      this.$store.commit("setCurrentIdx", index);
      this.$store.commit("setCurrentSongId", this.playList[index].id);
      this.$store.commit("setCurrentSong", this.playList[index]);
      if (!this.playState) {
        this.$store.commit("setPlayStateTrue");
      }
      this.$store.commit("currentLyricBack");
      this.$store.commit("currentLineNumBack");
      const currentId = this.playList.map((item) => item.id)[index];
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
    onPrev() {
      if (!this.ready) return;
      if (this.playList.length === 1) {
        this.loop();
      } else {
        if (this.currentIdx <= 0) {
          this.onPrevNext(this.playList.length - 1);
          const scrollRef = document.querySelector("#scrollRef");
          scrollRef.scrollTo(0, 174);
        } else {
          this.onPrevNext(this.currentIdx - 1);
          const scrollRef = document.querySelector("#scrollRef");
          scrollRef.scrollTop -= 42;
        }
      }
    },
    onNext() {
      if (!this.ready) return;
      if (this.playList.length === 1) {
        this.loop();
      } else {
        if (this.currentIdx >= this.playList.length - 1) {
          this.onPrevNext(0);
          const scrollRef = document.querySelector("#scrollRef");
          scrollRef.scrollTo(0, 0);
        } else {
          this.onPrevNext(this.currentIdx + 1);
          const scrollRef = document.querySelector("#scrollRef");
          scrollRef.scrollTop += 42;
        }
      }
    },
    playModeChangeRandom() {
      this.$store.commit("playModeChangeRandom");
      this.$store.commit("setPlayListChangeRandom");
    },
    playModeChangeSingleLoop() {
      this.$store.commit("playModeChangeSingleLoop");
    },
    playModeChangeLoop() {
      this.$store.commit("playModeChangeLoop");
    },
    onEnded() {
      if (this.playMode === "singleLoop") {
        this.loop();
      } else {
        this.onNext();
      }
    },
    setSingerDetail(id) {
      this.$store.dispatch("setSingerDetail", id);
      this.$store.dispatch("setSimiSinger", id);
    },
    showPlayer() {
      this.$refs.playerRef.style = "bottom:0px;transition:bottom 1s;";
    },
    hidePlayer() {
      this.$refs.playerRef.style = "bottom:-71px;transition:bottom 1s;";
    },
    lockPlayer() {
      this.flag = false;
      this.$refs.playerRef.style = "bottom:0px";
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";

.m-player {
  position: fixed;
  zoom: 1;
  left: 0;
  bottom: -71px;
  width: 100%;
  .hand {
    width: 100%;
    height: 15px;
    cursor: pointer;
    opacity: 0.3;
  }
  .lock {
    position: relative;
    z-index: 1;
    .left {
      position: absolute;
      top: -5px;
      right: 15px;
      .icon("../../assets/images/playbar.png", 52px, 67px);
      background-position: 0 -380px;
      i {
        margin: 6px 0 0 17px;
        .icon("../../assets/images/playbar.png", 18px, 18px);
        background-position: -80px -380px;
        &:hover {
          background-position: -80px -400px;
        }
        &.locked {
          background-position: -100px -380px;
          &:hover {
            background-position: -100px -400px;
          }
        }
      }
    }
  }
  .container {
    background-color: @play-bg-color;
    .wrap {
      position: relative;
      display: flex;
      padding: 8px 0;
      .btns {
        width: 137px;
        padding-top: 6px;
        i {
          margin-right: 8px;
          border-radius: 50%;
          .icon("../../assets/images/playbar.png", 28px, 28px);
          cursor: pointer;
          &.prev {
            background-position: 0 -130px;
            &:hover {
              background-position: -30px -130px;
            }
          }
          &.toggle {
            width: 36px;
            height: 36px;
            background-position: -40px -204px;
            &.playing {
              background-position: 0 -165px;
            }
          }
          &.next {
            background-position: -80px -130px;
            &:hover {
              background-position: -110px -130px;
            }
          }
        }
      }
      .head {
        position: relative;
        margin: 6px 15px 0 0;
        img {
          width: 34px;
          height: 34px;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          .icon("../../assets/images/playbar.png", 34px, 34px);
          background-position: 0 -80px;
        }
      }
      .play {
        width: 608px;
        .words {
          color: @white-color;
          min-height: 18px;
          text-shadow: 0 1px 0 @box-shadow-base;
          &.hide {
            visibility: hidden;
          }
          p {
            float: left;
            max-width: 300px;
            margin-right: 10px;
            cursor: pointer;
          }
          .songs {
            float: left;
            li {
              float: left;
            }
          }
        }
        .bar {
          color: @white-color;
          .slider-wrap {
            display: inline-block;
            width: 490px;
            margin-right: 10px;
            vertical-align: bottom;
            padding: 8px 0;
          }
        }
      }
      .oper {
        width: 60px;
        i {
          margin: 11px 2px 0 0;
          .icon("../../assets/images/playbar.png", 25px, 25px);
          &.like {
            background-position: -88px -163px;
            &:hover {
              background-position: -88px -189px;
            }
          }
          &.share {
            background-position: -114px -163px;
            &:hover {
              background-position: -114px -189px;
            }
          }
        }
      }
      .ctrl {
        position: relative;
        width: 113px;
        padding-left: 13px;
        i {
          margin: 11px 2px 0 0;
          .icon("../../assets/images/playbar.png", 25px, 25px);
          &.volume {
            background-position: -2px -248px;
            &:hover {
              background-position: -31px -248px;
            }
          }
          &.random {
            background-position: -66px -248px;
            &:hover {
              background-position: -93px -248px;
            }
          }
          &.loop {
            background-position: -3px -344px;
            &:hover {
              background-position: -33px -344px;
            }
          }
          &.singleLoop {
            background-position: -66px -344px;
            &:hover {
              background-position: -93px -344px;
            }
          }
        }
        .open {
          display: inline-block;
          cursor: pointer;
          span {
            display: block;
            text-align: center;
            color: @text-color;
            text-shadow: 0 1px 0 @box-shadow-base;
            .icon("../../assets/images/playbar.png", 24px, 24px);
            background-position: -42px -68px;
            &:hover {
              background-position: -42px -98px;
            }
          }
        }
        .control-vol {
          position: absolute;
          top: -128px;
          left: 9px;
          padding: 14px;
          height: 120px;
          background-color: @play-bg-color;
          z-index: 1;
          width: 32px;
        }
      }
    }
  }
}
</style>

