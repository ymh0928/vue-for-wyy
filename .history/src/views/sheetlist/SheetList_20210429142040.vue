<template>
  <div class="sheet wrap feature-wrap">
    <div class="list-r">
      <div class="top">
        <div class="cat">
          <span></span>
        </div>
        <a-radio-group
          buttonStyle="solid"
          :value="radioValue"
          @change="changeOrder"
        >
          <a-radio-button value="hot">热门</a-radio-button>
          <a-radio-button value="new">最新</a-radio-button>
        </a-radio-group>
      </div>
      <div class="list">
        <SingleSheet
          class="sheet-item"
          v-for="(item, index) in sheets.playlists"
          :key="index"
          :sheet="item"
        />
      </div>
      <a-pagination
        class="pagination"
        current=""
        :pageSize="35"
        :total="sheets.total"
        :showSizeChanger="false"
        @change="changePage"
        hideOnSinglePage
      />
    </div>
  </div>
</template>

<script>
import SingleSheet from "../../components/singlesheet/SingleSheet";
import { mapState } from "vuex";
export default {
  name: "SheetList",
  components: {
    SingleSheet,
  },
  computed: {
    ...mapState(["sheets", "radioValue", "cat", "currentPage"]),
  },
  async mounted() {
    this.setSheets(this.currentPage, this.radioValue);
  },
  methods: {
    setSheets(page, order) {
      this.$store.dispatch("setSheets", page, order);
    },
    changePage(page) {
      this.$store.commit("setCurrentPage", page);
      this.setSheets(page, this.radioValue);
    },
    changeOrder(e) {
      this.$store.commit("setRadioValue", e.target.value);

      this.$store.dispatch("setOrder", e.target.value);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
.sheet {
  .list-r {
    padding: 40px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid @red-color;
      padding-bottom: 10px;
      span {
        font-size: 24px;
        color: @black-color;
      }
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      padding: 30px 0;
      .sheet-item {
        width: 140px;
        height: 204px;
        margin-right: 49.4px;
        &:nth-of-type(5n) {
          margin-right: 0;
        }
      }
    }
    .pagination {
      text-align: center;
    }
  }
}
</style>