import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { shuffle } from "./utils/utilFunc";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playList: [],
    currentIdx: -1,
    currentSongId: 0,
    currentSong: {},
    ready: false,
    playState: false,
    songUrl: "",
    currentTime: 0,
    currentPercent: 0,
    volume: 60,
    showVolume: false,
    playMode: "loop",
    currentLyric: [],
    currentLineNum: -1,
    showPanel: false,
  },
  mutations: {
    getTracks(state, res) {
      state.currentIdx = 0;
      state.ready = true;
      state.playState = true;
      state.playList = res.playlist.tracks;
      state.currentSongId = res.playlist.tracks[0].id;
      state.currentSong = res.playlist.tracks[0];
    },
    setSongUrl(state, newSongUrl) {
      state.songUrl = newSongUrl;
    },
    pause(state) {
      state.playState = false;
    },
    play(state) {
      state.playState = true;
    },
    setCurrentTime(state, newCurrentTime) {
      state.currentTime = newCurrentTime;
    },
    setCurrentPercent(state, newCurrentPercent) {
      state.currentPercent = newCurrentPercent;
    },
    setVolume(state, newVolume) {
      state.volume = newVolume;
    },
    setShowVolume(state) {
      state.showVolume = !state.showVolume;
    },
    setCurrentIdx(state, newCurrentIdx) {
      state.currentIdx = newCurrentIdx;
    },
    setCurrentSongId(state, newCurrentSongId) {
      state.currentSongId = newCurrentSongId;
    },
    setCurrentSong(state, newCurrentSong) {
      state.currentSong = newCurrentSong;
    },
    setPlayStateTrue(state) {
      state.playState = true;
    },
    playModeChangeRandom(state) {
      state.playMode = "random";
    },
    playModeChangeSingleLoop(state) {
      state.playMode = "singleLoop";
    },
    playModeChangeLoop(state) {
      state.playMode = "loop";
    },
    setPlayListChangeRandom(state) {
      state.playList = shuffle(state.playList);
    },
    setCurrentLyric(state, newCurrentLyric) {
      state.currentLyric = newCurrentLyric;
    },
    setCurrentLineNum(state, newCurrentLineNum) {
      state.currentLineNum = newCurrentLineNum;
    },
    closePanel(state) {
      state.showPanel = false;
    },
    togglePanelShow(state) {
      state.showPanel = !state.showPanel;
    },
    currentLyricBack(state) {
      state.currentLyric = [];
    },
    currentLineNumBack(state) {
      state.currentLineNum = -1;
    },
    setPlayListByDelete(state, newPlayList) {
      state.playList = newPlayList;
    },
  },
  actions: {
    setPlayList(context, id) {
      return new Promise(async () => {
        const { data: res } = await axios.get(
          `playlist/detail?id=${id.toString()}`
        );
        context.commit("getTracks", res);
      });
    },
  },
  modules: {},
});
