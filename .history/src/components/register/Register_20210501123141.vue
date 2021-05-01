<template>
  <div class="wrap">
    <a-form :form="form" @submit.prevent="onSubmit" style="width: 482px">
      <label>昵称</label>
      <a-form-item hasFeedback>
        <a-input
          v-decorator="[
            'nickname',
            {
              rules: [
                { required: true, message: '请输入昵称', whitespace: true },
              ],
              validateFirst: true,
              validateTrigger: 'blur',
            },
          ]"
          placeholder="请输入昵称"
        >
          <a-icon slot="prefix" type="heart" />
        </a-input>
      </a-form-item>
      <label>密码</label>
      <a-form-item hasFeedback>
        <a-input-password
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: '请输入密码', whitespace: true },
              ],
              validateFirst: true,
              validateTrigger: 'blur',
            },
          ]"
          placeholder="请输入密码"
        >
          <a-icon slot="prefix" type="lock" />
        </a-input-password>
      </a-form-item>
      <label>手机号</label>
      <a-form-item hasFeedback>
        <a-input
          v-decorator="[
            'phone',
            {
              rules: [
                { required: true, message: '请输入手机号', whitespace: true },
                { validator: handlePhone },
              ],
              validateFirst: true,
              validateTrigger: 'blur',
            },
          ]"
          placeholder="请输入手机号"
        >
          <a-icon slot="prefix" type="phone" />
        </a-input>
      </a-form-item>
      <label>验证码</label>
      <a-row>
        <a-col :xl="16">
          <a-form-item hasFeedback>
            <a-input
              v-decorator="[
                'captcha',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码',
                      whitespace: true,
                    },
                  ],
                },
              ]"
              placeholder="请输入验证码"
            >
              <a-icon slot="prefix" type="safety-certificate" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="8">
          <a-form-item>
            <a-button type="primary" style="width: 50%"> 获取 </a-button>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'agree',
            {
              valuePropName: 'checked',
              rules: [{ validator: handleAgree }],
            },
          ]"
        >
          我同意
        </a-checkbox>
        <a style="margin-left: -8px"
          ><b><u @click="drawerVisibleTrue">服务条款及数据使用政策</u></b></a
        >
        <a style="float: right; color: #1890ff" @click="changeLog"
          >已有账号，我要登录</a
        >
      </a-form-item>
      <a-form-item>
        <a-button type="primary" htmlType="submit" style="width: 100%"
          >下一步</a-button
        >
      </a-form-item>
    </a-form>
    <Policy />
  </div>
</template>
<script>
import Policy from "../policy/Policy";
export default {
  name: "Register",
  components: {
    Policy,
  },
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
    handleAgree(rule, checked, cb) {
      if (checked) {
        cb();
      }
      cb("必须选中才能注册");
    },
    drawerVisibleTrue() {
      this.$store.commit("drawerVisibleTrue");
    },
    changeLog() {
      this.$store.commit("changeLog");
    },
    async onSubmit() {
      const phoneValue = this.form.getFieldValue("phone");
      const { data: res } = await this.$axios.get(
        `cellphone/existence/check?phone=${phoneValue}`
      );
      if (res.exist === 1) {
        this.$message.warning("该手机号已被注册！！！");
      }
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