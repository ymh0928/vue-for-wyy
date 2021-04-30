import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playList: [],
  },
  mutations: {},
  actions: {
    setPlayList(context, id) {
      return new Promise(async (resolve, reject) => {
        context.commit("getTracks");
        const { data: res } = await this.$axios.get(
          `playlist/detail?id=${id.toString()}`
        );
        this.state.playList = res.playlist.tracks;
        resolve(this.state.playList);
      });
    },
  },
  modules: {},
});
