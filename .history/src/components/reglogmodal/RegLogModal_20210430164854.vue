<template>
  <a-modal
    :visible="isModalVisible"
    cantered
    closable
    destroyOnClose
    keyboard
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
                @click="changeLog"
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
    <div v-else>
      <Login />
    </div>
  </a-modal>
</template>
<script>
import { mapState } from "vuex";
import Register from "../register/Register";
import Login from "../login/Login";
export default {
  name: "RegLogModal",
  components: {
    Register,
    Login,
  },
  computed: {
    ...mapState(["isModalVisible", "changeRegLog"]),
  },
  methods: {
    handleCancel() {
      this.$store.commit("setIsModalVisibleFalse");
    },
    changeReg() {
      this.$store.commit("changeReg");
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