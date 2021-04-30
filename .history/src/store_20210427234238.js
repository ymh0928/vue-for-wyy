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
    getTracks(state) {
      state.currentIdx = 0;
      state.ready = true;
      state.playState = true;
    },
    getSongUrl(state, url) {
      state.songUrl = url;
    },
  },
  actions: {
    setPlayList(context, id) {
      return new Promise(async () => {
        context.commit("getTracks");
        const { data: res } = await axios.get(
          `playlist/detail?id=${id.toString()}`
        );
        this.state.playList = res.playlist.tracks;
        this.state.currentSongId = res.playlist.tracks[0].id;
        this.state.currentSong = res.playlist.tracks[0];
      });
    },
  },
  modules: {},
});
