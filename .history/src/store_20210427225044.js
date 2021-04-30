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
  },
  mutations: {
    getTracks() {
      Vue.set(state.currentIdx, 1);
      Vue.set(state.ready, true);
      Vue.set(state.platState, true);
    },
  },
  actions: {
    setPlayList(context, id) {
      return new Promise(async (resolve) => {
        context.commit("getTracks");
        const { data: res } = await axios.get(
          `playlist/detail?id=${id.toString()}`
        );
        this.state.playList = res.playlist.tracks;
        this.state.currentSongId = res.playlist.tracks[0].id;
        this.state.currentSong = res.playlist.tracks[0];
        resolve(this.state.playList);
      });
    },
  },
  modules: {},
});
