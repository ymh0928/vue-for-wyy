import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playList: [],
  },
  mutations: {},
  actions: {
    setPlayList(id) {
      return new Promise(async (resolve, reject) => {
        const { data: res } = await this.$axios.get(
          `playlist/detail?id=${id.toString()}`
        );
        this.playList = res.playlist.tracks;
      });
    },
  },
  modules: {},
});
