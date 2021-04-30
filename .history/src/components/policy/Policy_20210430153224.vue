<template>
  <a-drawer
    title="服务条款及数据使用政策"
    placement="right"
    :closable="false"
    @close="onClose"
  >
    <div style="padding: 10px">
      <h3>前言</h3>
      <p>
        本站提醒您在注册前仔细阅读以下条款。倘若您对任何条款表示异议，
        可以选择不加入。但一旦注册成功，无论是在本站上发布任何内容，或者是直接或间接通过任何方式使用、操作本站数据或服务的行为，都将被视作已无条件接受本声明所涉全部内容。
      </p>
      <h3>使用规则</h3>
      <p>
        每个用户在本站注册成功后，拥有一个帐号和密码。该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。
      </p>
      <p>
        用户须对在本站的注册信息的真实性、合法性、有效性承担全部责任，用户不得冒充他人；不得利用他人的名义发布任何信息；不得恶意使用注册帐号导致其他用户误认；
        否则慕道网有权立即停止提供服务，收回其帐号并由用户独自承担由此而产生的一切法律责任。
      </p>
    </div>
  </a-drawer>
</template>
<script>
export default {
  name: "Policy",
  methods: {
    onClose() {},
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/layout.less";
@import "../../assets/css/varibles.less";
@import "../../assets/css/mixins.less";
</style>