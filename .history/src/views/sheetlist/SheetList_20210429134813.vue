<template>
  <div class="sheet wrap feature-wrap">
    <div class="list-r">
      <div class="top">
        <div class="cat">
          <span></span>
        </div>
        <a-radio-group buttonStyle="solid" value="">
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
    ...mapState(["sheets"]),
  },
  async mounted() {
    this.setSheets();
  },
  methods: {
    setSheets() {
      this.$store.dispatch("setSheets");
    },
  },
};
</script>

<style lang="less" scoped>
</style>