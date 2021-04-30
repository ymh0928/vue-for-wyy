<template>
  <div class="center wrap feature-wrap">
    <div class="page-wrap">
      <div class="m-proifo clearfix">
        <div class="f-pr">
          <img
            :src="userDetail.profile?userDetail.profile.avatarUrl"
            :alt="userDetail.profile?userDetail.profile.nickname"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Member",
  computed: {
    ...mapState(["userDetail"]),
  },
};
</script>
<style lang="less" scoped>
</style>