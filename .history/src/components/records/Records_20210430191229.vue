<template>
  <div class="wy-sec">
    <div class="u-title wy-sec-wrap clearfix">
      <h3 class="wy-sec-tit"><span class="f-ff2">听歌排行</span></h3>
      <span class="sub s-fc3">累计听歌</span>
      <div class="more tab-type">
        <span>最近一周</span>
        <a-divider type="vertical"></a-divider>
        <span>所有时间</span>
      </div>
    </div>
  </div>
</template>
<script>
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
        title: "专辑",
        key: "album",
        dataIndex: "album",
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
    id: Number,
  },
  computed: {
    listenChange() {
      const { singRecord } = this;
      return { singRecord };
    },
    // time() {
    //   return this.$timestampToTime(this.sheetDetail.createTime);
    // },
    ...mapState(["userDetail"]),
  },
  watch: {
    listenChange() {
      this.$store.dispatch("setUserRecord");
    },
  },
};
</script>
<style lang="less" scoped>
</style>