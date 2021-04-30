import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
    setSongUrl(state, url) {
      state.songUrl = url;
    },
    pause(state) {
      state.playState = false;
    },
    play(state) {
      state.playState = true;
    },
    setCurrentTime(state, currentTime) {
      state.currentTime = currentTime;
    },
    setCurrentPercent(state, currentPercent) {
      state.currentPercent = currentPercent;
    },
    setCurrentTimeChanged(state, currentTime) {
      state.currentTime = currentTime;
    },
    setCurrentPercentChanged(state, currentPercent) {
      state.currentPercent = currentPercent;
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
