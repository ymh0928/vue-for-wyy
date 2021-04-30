<template>
  <a-modal
    :visible=""
    @cancel="hanldeCancel"
    cantered
    closable
    :footer="null"
    width="530px"
    height="394.98px"
  >
    <div class="cnzt">
      <div class="select-log">
        <div class="mid-wrap">
          <div class="pic">
            <img src="./images/platform.png" alt="wyy" />
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
              >注册</a-button
            >
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script>
export default {
  name: "RegLogModal",
  methods: {
    handleCancel() {
      this.$store.commit("setIsModalVisibleFalse");
    },
  },
};
</script>
<style lang="less" scoped>
</style>