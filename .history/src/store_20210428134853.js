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
    volume: 0,
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
    setCurrentTimeChanged(state, newCurrentTime) {
      state.currentTime = newCurrentTime;
    },
    setCurrentPercentChanged(state, newCurrentPercent) {
      state.currentPercent = newCurrentPercent;
    },
    setVolume(state, newVolume) {
      state.volume = newVolume;
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
