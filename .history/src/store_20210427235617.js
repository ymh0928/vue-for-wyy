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
    getSongUrl(state, url) {
      state.songUrl = url;
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
