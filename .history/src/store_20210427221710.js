import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playList: [],
    currentIdx: Number,
  },
  mutations: {},
  actions: {
    setPlayList(context, id) {
      return new Promise(async (resolve) => {
        context.commit("getTracks");
        const { data: res } = await axios.get(
          `playlist/detail?id=${id.toString()}`
        );
        this.state.playList = res.playlist.tracks;
        resolve(this.state.playList);
      });
    },
  },
  modules: {},
});
