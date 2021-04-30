<template>
  <div class="wy-sec">
    <div class="u-title wy-sec-wrap clearfix">
      <h3 class="wy-sec-tit"><span class="f-ff2">听歌排行</span></h3>
      <span class="sub s-fc3">累计听歌{{ userRecord.length }}首</span>
      <div class="more tab-type">
        <span @click="changeSingRecordWeek">最近一周</span>
        <a-divider type="vertical"></a-divider>
        <span @click="changeSingRecordAll">所有时间</span>
      </div>
    </div>
    <a-table
      class="wy-table"
      :columns="columns"
      :dataSource="dataSource"
      bordered
      :pagination="false"
    >
      <template slot="playIcon" slot-scope="item">
        <a-icon class="a-icon" type="play-circle" style="margin-left: 15px" />
      </template>
      <template slot="song" slot-scope="song">
        <routerLink class="name-a" :to="`/songInfo/${song.id}`">{{
          song.name
        }}</routerLink>
      </template>
      <template slot="singer" slot-scope="singer">
        <routerLink class="name-a" :to="`/singerInfo/${singer.id}`">{{
          singer.name
        }}</routerLink>
      </template>
      <template slot="icons" slot-scope="item">
        <span title="添加" class="icons-span"><a-icon type="plus" /></span>
        <span title="收藏" class="icons-span"
          ><a-icon type="folder-add"
        /></span>
        <span title="分享" class="icons-span"><a-icon type="share-alt" /></span>
      </template>
    </a-table>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Records",
  data() {
    const columns = [
      {
        title: "",
        key: "playIcon",
        scopedSlots: { customRender: "playIcon" },
        width: "80px",
      },
      {
        title: "标题",
        key: "song",
        dataIndex: "song",
        scopedSlots: { customRender: "song" },
      },
      {
        title: "时长",
        key: "time",
        dataIndex: "time",
        width: "120px",
      },
      {
        title: "歌手",
        key: "singer",
        dataIndex: "singer",
        width: "150px",
        scopedSlots: { customRender: "singer" },
      },
      {
        title: "播放次数",
        key: "count",
        dataIndex: "count",
        width: "100px",
      },
      {
        title: "",
        key: "icons",
        scopedSlots: { customRender: "icons" },
        width: "120px",
      },
    ];
    return {
      columns,
      dataSource: [],
    };
  },
  props: {
    id: String,
  },
  computed: {
    listenChange() {
      const { singRecord } = this;
      return { singRecord };
    },
    ...mapState(["singRecord", "userRecord"]),
  },
  watch: {
    listenChange() {
      this.userRecord.forEach((item, idx) => {
        this.dataSource.push({
          key: idx,
          playIcon: null,
          song: item.song,
          time: this.$transformTime(item.dt / 1000),
          singer: item.song.ar[0],
          count: item.score,
          icons: null,
        });
      });
    },
  },
  methods: {
    changeSingRecordWeek() {
      this.$store.commit("changeSingRecordWeek");
      this.$store.dispatch("setUserRecord", this.id, 1);
    },
    changeSingRecordAll() {
      this.$store.commit("changeSingRecordAll");
      const data = { id: this.id, type: 0 };
      this.$store.dispatch("setUserRecord", this.id, 0);
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
.u-title {
  h3 {
    float: left;
  }
  .sub {
    float: left;
    margin: 9px 0 0 20px;
  }
  .more {
    float: right;
    margin-top: 12px;
    span {
      cursor: pointer;
      &:hover,
      &.active {
        color: @black-color;
      }
    }
  }
}
</style>