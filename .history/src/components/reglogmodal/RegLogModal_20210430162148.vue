<template>
  <a-modal
    :visible="isModalVisible"
    cantered
    closable
    destroyOnClose
    :footer="null"
    width="530px"
    @cancel="handleCancel"
  >
    <div v-if="changeRegLog === 'default'">
      <div class="cnzt">
        <div class="select-log">
          <div class="mid-wrap">
            <div class="pic">
              <img src="../../assets/images/platform.png" alt="wyy" />
            </div>
            <div class="methods">
              <a-button
                type="primary"
                style="
                  display: block;
                  margin-top: 10px;
                  width: 100%;
                  height: 40px;
                "
                >手机号登录</a-button
              >
              <a-button
                style="
                  display: block;
                  margin-top: 10px;
                  width: 100%;
                  height: 40px;
                "
                @click="changeReg"
                >注册</a-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="changeRegLog === 'reg'">
      <Register />
    </div>
  </a-modal>
</template>
<script>
import { mapState } from "vuex";
import Register from "../register/Register";
export default {
  name: "RegLogModal",
  components: {
    Register,
  },
  computed: {
    ...mapState(["isModalVisible", "changeRegLog"]),
  },
  methods: {
    handleCancel() {
      this.$store.commit("setIsModalVisibleFalse");
    },
    changeReg() {
      this.$store.commit("changeReg", "reg");
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
.cnzt {
  position: relative;
}
.select-log {
  padding: 40px 0 39px;
}
.mid-wrap {
  width: 60%;
  margin: 0 auto;
}
.pic {
  margin-bottom: 20px;
}
.methods {
  width: 316.8px;
  height: 90px;
}
</style>