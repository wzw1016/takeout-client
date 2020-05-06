<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">超级外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: MessageLogin}" @click="MessageLogin = true">短信登录</a>
          <a href="javascript:;" :class="{on: !MessageLogin}" @click="MessageLogin = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <ValidationObserver v-slot="{handleSubmit}">
          <form>
            <div v-if="MessageLogin" :class="{on: MessageLogin}">
              <section class="login_message">
                <ValidationProvider vid="phoneNumber" name="手机号码" :rules="{required: true, phoneNumber: true}" v-slot="{errors}">
                  <input type="tel" maxlength="11" placeholder="手机号" v-model="phoneNumber">
                  <span class="error">{{errors[0]}}</span>
                </ValidationProvider>
                <button
                  class="get_verification"
                  :disabled="!isRightPhoneNumber || countdown > 0"
                  :class="{right_phone_number: isRightPhoneNumber}"
                  @click.prevent="sendCode"
                >
                  {{countdown > 0 ? `短信已发送(${countdown}s)` : '获取验证码'}}
                </button>
              </section>
              <section class="login_verification">
                <ValidationProvider vid="SMSVerificationCode" name="短信验证码" rules="required|SMSVerificationCode" v-slot="{errors}">
                  <input type="tel" maxlength="6" placeholder="短信验证码" v-model="SMSVerificationCode">
                  <span class="error">{{errors[0]}}</span>
                </ValidationProvider>
              </section>
              <section class="login_hint">
                温馨提示：未注册超级外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div v-else :class="{on: !MessageLogin}">
              <section>
                <section class="login_message">
                  <ValidationProvider vid="account" name="手机/邮箱/用户名" rules="required|account" v-slot="{errors}">
                    <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="account">
                    <span class="error">{{errors[0]}}</span>
                  </ValidationProvider>
                </section>
                <section class="login_verification">
                  <ValidationProvider vid="password" name="密码" rules="required|password" v-slot="{errors}">
                    <input :type="showPwd ? 'text' : 'password'" maxlength="12" placeholder="密码" v-model="password">
                    <span class="error">{{errors[0]}}</span>
                  </ValidationProvider>
                  <div class="switch_button" :class="showPwd ? 'on' : 'off'" @click="showPwd = !showPwd">
                    <div class="switch_circle" :class="{right: showPwd}"></div>
                    <span class="switch_text">{{showPwd ? 'abc' : ''}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <ValidationProvider vid="captch" name="验证码" rules="required|captcha" v-slot="{errors}">
                    <input type="text" maxlength="4" placeholder="验证码" v-model="captcha">
                    <span class="error">{{errors[0]}}</span>
                  </ValidationProvider>
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="updateCaptcha" ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit" @click.prevent="handleSubmit(login)">登录</button>
          </form>
        </ValidationObserver>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Login',
    data () {
      return {
        MessageLogin: false, // true - 短信登录，false - 密码登录
        countdown: 0,
        showPwd: false,
        phoneNumber: '',
        SMSVerificationCode: '',
        account: '',
        password: '',
        captcha: ''
      }
    },
    computed: {
      isRightPhoneNumber () {
        // return /^1\d{10}$/.test(this.phoneNumber)
        return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phoneNumber)
      }
    },
    methods: {
      sendCode () {
        this.countdown = 30
        const intervalId = setInterval(() => {
          this.countdown--
          if (this.countdown === 0) {
            clearTimeout(intervalId)
          }
        }, 1000)
      },
      login () {
        alert('login')
      },
      updateCaptcha () {
        this.$refs.captcha.src = "http://localhost:4000/captcha?time=" + Date.now()
      }
    }
  }
</script>

<style lang="stylus" type="stylesheet/stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>