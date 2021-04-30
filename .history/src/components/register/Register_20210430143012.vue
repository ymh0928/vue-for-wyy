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
      <label >手机号</label>
      <a-form-item>
          <a-input v-decorator="['phone',{rules:[{required:true,message:"请输入手机号"},{validator:handlePhone}]}]" placeholder="请输入手机号">
              <a-icon slot="prefix" type="phone" />
          </a-input>
      </a-form-item>
      <label>验证码</label>
      <a-row>
          <a-col :xl="16">
              <a-form-item>
                  <a-input  
                    v-decorator="['captcha',{rules:[{required:true,message:"请输入验证码"}]}]" placeholder="请输入验证码"
                  />
              </a-form-item>
          </a-col>
          <a-col :xl="8">
              <a-form-item>
                  <a-button type="primary">
                      获取
                  </a-button>
              </a-form-item>
          </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
export default {
  name: "Register",
  methods: {
    handlePhone(rule, value, cb) {
      if (/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
        cb();
      }
      cb("不是规范的手机格式!");
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
</style>