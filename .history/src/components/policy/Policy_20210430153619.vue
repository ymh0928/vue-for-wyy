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
      <p>
        用户承诺不得以任何方式利用本站直接或间接从事违反中国法律、以及社会公德的行为，本站有权对违规内容予以删除。违规内容包括：
      </p>
      <ul>
        <li>反对宪法所确定的基本原则的；</li>
        <li>危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</li>
        <li>损害国家荣誉和利益的；</li>
        <li>煽动民族仇恨、民族歧视，破坏民族团结的；</li>
        <li>破坏国家宗教政策，宣扬邪教和封建迷信的；</li>
        <li>散布谣言，扰乱社会秩序，破坏社会稳定的；</li>
        <li>散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</li>
        <li>侮辱或者诽谤他人，侵害他人合法权益的；</li>
        <li>含有法律、行政法规禁止的其他内容的信息。</li>
      </ul>
      <h3>个人隐私</h3>
      <p>
        本站致力于保障每一个用户的隐私，除法律或有法律赋予权限的政府部门要求或事先得到用户明确授权等原因外，本站保证不对外公开或向第三方透露用户个人隐私信息，
        或用户在使用服务时存储的非公开内容。
      </p>
      <p>关于注册信息及个人资料信息的特别声明</p>
      <ul>
        <li>
          <strong>真实姓名</strong>
          ：本站不强制用户提供真实姓名，但在用户申请成为认证用户时，有义务提供真实姓名及相关证明。
        </li>
        <li>
          <strong>密码</strong
          >：本站用户密码（无论注册还是修改时）一律经过加密，不以明文存储。
          本站将尽最大努力保证用户密码安全，但不能对此担保。为了您的财产不蒙受损失，请尽可能不要为您在本站的账户设置与银行卡，支付宝等付款方式同样的密码。
          对您因为密码泄漏造成的经济损失，本站不承担任何责任。
        </li>
        <li>
          <strong>手机号</strong
          >：本站用户的手机号仅被用来激活注册，找回密码或接受本站重要通知。除非用户自身公开，本站保证不对外泄露。
        </li>
        <li>
          除此之外的可选信息，如性别、生日、居住地等，只被用来提供、完善和开发对您的个性化服务。
        </li>
      </ul>
      <h3>知识产权</h3>
      <p>您在本站发表的任何原创文章，其著作权都属于您本人；</p>
      <p>
        您在本站所发表的译文，在不侵犯原作者著作权的前提下，其著作权由您享有；
      </p>
      <p>您在本站转载的文章，其著作权由原作者享有，请您务必标注原作者信息。</p>
      <p>
        您在本站录入的数据，包括知识点和百科等，将供本站全体用户分享使用，本站承诺不会将该类数据直接用作商业用途，但保留控制、操作及处理该类数据的一切权利。
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