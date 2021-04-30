<template>
  <div class="wrap">
    <a-form :form="form" @submit.prevent="onSubmit" style="width: 482px">
      <label>手机号</label>
      <a-form-item>
        <a-input
          v-decorator="[
            'phone',
            {
              rules: [
                { required: true, message: '请输入手机号' },
                { validator: handlePhone },
              ],
            },
          ]"
          placeholder="请输入手机号"
        >
          <a-icon slot="prefix" type="phone" />
        </a-input>
      </a-form-item>
      <label>密码</label>
      <a-form-item>
        <a-input-password
          v-decorator="[
            'password',
            { rules: [{ required: true, message: '请输入密码' }] },
          ]"
          placeholder="请输入密码"
        >
          <a-icon slot="prefix" type="lock" />
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          Remember me
        </a-checkbox>
        <a style="float: right; color: #1890ff" @click="changeReg"
          >没有账号？免费注册</a
        >
      </a-form-item>
      <a-form-item>
        <a-button type="primary" htmlType="submit" style="width: 100%"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  name: "Login",
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "form" });
  },
  methods: {
    handlePhone(rule, value, cb) {
      if (/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
        cb();
      }
      cb("不是规范的手机格式!");
    },
    changeReg() {
      this.$store.commit("changeReg");
    },
    onSubmit() {
      const values = this.form.getFieldsValue();
      this.$store.dispatch("userLogin", values);
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
.wrap {
  width: 300px;
  margin: 0 auto;
  padding: 30px 0 43px;
}
</style>