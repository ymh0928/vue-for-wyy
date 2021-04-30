import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { shuffle } from "./utils/utilFunc";
import { WyLyric } from "./utils/wyLyric";

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
    tooltipTitle: "",
    tooltipShow: false,
    cat: "全部",
    radioValue: "hot",
    sheets: {},
    currentPage: 1,
    sheetDetail: {},
    songDetail: {},
    songLyric: [],
    singerDetail: {},
    searchPanel: false,
    searchResult: {},
    isModalVisible: false,
    changeRegLog: "default",
    drawerVisible: false,
    userDetail: {},
    hasToken: false,
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
    playListBack(state) {
      state.playList = [];
    },
    readyStart(state) {
      state.ready = true;
    },
    readySuspend(state) {
      state.ready = false;
    },
    currentIdxBack(state) {
      state.currentIdx = -1;
    },
    songUrlBack(state) {
      state.songUrl = "";
    },
    currentSongIdBack(state) {
      state.currentSongId = 0;
    },
    currentSongBack(state) {
      state.currentSong = {};
    },
    currentTimeBack(state) {
      state.currentTime = 0;
    },
    currentPercentBack(state) {
      state.currentPercent = 0;
    },
    setTooltipTitle(state, newTooltipTitle) {
      state.tooltipTitle = newTooltipTitle;
    },
    setTooltipShow(state, newTooltipShow) {
      state.tooltipShow = newTooltipShow;
    },
    setSheets(state, res) {
      state.sheets = res;
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setRadioValue(state, value) {
      state.radioValue = value;
    },
    setCat(state, newCat) {
      state.cat = newCat;
    },
    currentChangeBack(state) {
      state.currentPage = 1;
    },
    setSheetDetail(state, playlist) {
      state.sheetDetail = playlist;
    },
    setSongDetail(state, newSongDetail) {
      state.songDetail = newSongDetail;
    },
    setSongLyric(state, newSongLyric) {
      state.songLyric = newSongLyric;
    },
    setSingerDetail(state, res) {
      state.singerDetail = res;
    },
    setPlayList(state, newPlayList) {
      state.playList = newPlayList;
    },
    setCurrentIdxFirst(state) {
      state.currentIdx = 0;
    },
    setSearchPanelTrue(state) {
      state.searchPanel = true;
    },
    setSearchResult(state, newSearchResult) {
      state.searchResult = newSearchResult;
    },
    setSearchPanelFalse(state) {
      state.searchPanel = false;
    },
    setIsModalVisibleFalse(state) {
      state.isModalVisible = false;
    },
    setIsModalVisibleTrue(state) {
      state.isModalVisible = true;
    },
    changeReg(state) {
      state.changeRegLog = "reg";
    },
    changeDefault(state) {
      state.changeRegLog = "default";
    },
    changeLog(state) {
      state.changeRegLog = "log";
    },
    drawerVisibleFalse(state) {
      state.drawerVisible = false;
    },
    drawerVisibleTrue(state) {
      state.drawerVisible = true;
    },
    setUserDetail(state, user) {
      state.userDetail = user;
    },
    setHasTokenTrue(state) {
      state.hasToken = true;
    },
  },
  actions: {
    async setPlayList(context, id) {
      const { data: res } = await axios.get(
        `playlist/detail?id=${id.toString()}`
      );
      context.commit("getTracks", res);
    },
    deleteTooltip(context) {
      setTimeout(() => {
        const newTooltipShow = false;
        context.commit("setTooltipShow", newTooltipShow);
      }, 1500);
    },
    async setSheets(context, page, order) {
      const { data: res } = await axios.get(
        `top/playlist?cat=${context.state.cat}&order=${order}&offset=${page}&limit=35`
      );
      context.commit("setSheets", res);
    },
    async setOrder(context, order) {
      context.commit("currentChangeBack");
      const { data: res } = await axios.get(
        `top/playlist?cat=${context.state.cat}&order=${order}&offset=${context.state.currentPage}&limit=35`
      );
      context.commit("setSheets", res);
    },
    async setSheetDetail(context, id) {
      const { data: res } = await axios.get(`playlist/detail?id=${id}`);
      context.commit("setSheetDetail", res.playlist);
    },
    async setSongDetail(context, id) {
      const { data: res } = await axios.get(`song/detail?ids=${id}`);
      context.commit("setSongDetail", res.songs[0]);
      const { data: result } = await axios.get(`lyric?id=${id}`);
      try {
        const res = {
          lyric: result.lrc.lyric,
          tlyric: result.tlyric.lyric,
        };
        const lyric = new WyLyric(res);
        const lyricLines = lyric.lines;
        context.commit("setSongLyric", lyricLines);
      } catch (error) {
        const res = {
          lyric: "",
          tlyric: "",
        };
        const lyric = new WyLyric(res);
        const lyricLines = lyric.lines;
        context.commit("setSongLyric", lyricLines);
      }
    },
    async setSingerDetail(context, id) {
      const { data: res } = await axios.get(`artists?id=${id}`);
      context.commit("setSingerDetail", res);
    },
    setSearchResult(context, value) {
      setTimeout(async () => {
        if (value.trim() !== "") {
          context.commit("setSearchPanelTrue");
          const { data: res } = await axios.get(
            `search/suggest?keywords=${value}`
          );
          context.commit("setSearchResult", res.result);
        } else {
          context.commit("setSearchPanelFalse");
        }
      }, 300);
    },
    async userLogin(context, values) {
      const { phone, password } = values;
      const { data: res } = await axios.get(
        `login/cellphone?phone=${phone}&password=${password}`
      );
      localStorage.setItem("wyUserId", res.account.id);
      const { data: user } = await axios.get(
        `user/detail?uid=${res.account.id}`
      );
      if (res.msg === "密码错误") {
        this.$message.warning(res.msg);
      } else {
        this.$message.success("登录成功");
        context.commit("setUserDetail", user);
        context.commit("setHasTokenTrue");
      }
    },
  },
  modules: {},
});
