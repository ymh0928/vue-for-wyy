<template>
  <div class="center wrap feature-wrap">
    <div class="page-wrap">
      <div class="m-proifo clearfix">
        <div class="f-pr">
          <img
            :src="userDetail.profile ? userDetail.profile.avatarUrl : ''"
            :alt="userDetail.profile ? userDetail.profile.nickname : ''"
          />
        </div>
        <div class="f-r">
          <div class="name">
            <h2 class="clearfix">
              <span class="tit ellipsis">{{
                userDetail.profile.nickname
              }}</span>
              <p class="lv">
                <span class="u-lv u-icn2">
                  {{ userDetail.level }} <i class="lvright u-icn2"></i>
                </span>
              </p>
              <div class="icn-gender"></div>
            </h2>
          </div>
          <ul class="dny clearfix">
            <li class="fst">
              <strong class="ellipsis">{{
                userDetail.profile.eventCount
              }}</strong>
              <span>动态</span>
            </li>
            <li>
              <strong class="ellipsis">{{ userDetail.profile.follows }}</strong>
              <span>关注</span>
            </li>
            <li class="lst">
              <strong class="ellipsis">{{
                userDetail.profile.followeds
              }}</strong>
              <span>粉丝</span>
            </li>
          </ul>
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