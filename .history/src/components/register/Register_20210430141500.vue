<template>
  <div class="wrap">
    <a-form :form="form" @submit="onSubmit" width="530px">
      <label>昵称</label>
      <a-form-item>
        <a-input
          v-decorator="[
            'nickname',
            { rules: [{ required: true, message: '请输入昵称' }] },
          ]"
          placeholder="请输入昵称"
        >
          <a-icon slot="prefix" type="heart" />
        </a-input>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  name: "Register",
};
</script>
<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
</style>