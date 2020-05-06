import Vue from 'vue'
import {extend, ValidationProvider, ValidationObserver, localize} from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN.json'
import {required} from 'vee-validate/dist/rules'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

localize('zh_CN', zh_CN)

;(function () {
  extend('required', {
    ...required
  })
  extend('phoneNumber', {
    validate: value => /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value),
    message: filed => '请输入正确的' + filed
  })
  extend('SMSVerficationCode', {
    validate: value => /^\d{6}$/.test(value),
    message: filed => '请输入正确的' + filed
  })
  extend('account', {
    validate: value => /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)
                    || /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)
                    || /^[a-z][a-z0-9]+$/i.test(value),
    message: filed => '请输入正确的' + filed
  })
  extend('password', {
    validate: value => /^\w+$/.test(value),
    message: filed => '请输入正确的' + filed
  })
  extend('captcha', {
    validate: value => /^[a-zA-Z0-9]+$/.test(value),
    message: filed => '请输入正确的' + filed
  })
})()
