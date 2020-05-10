<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script style='text/ecmascript-6'>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  export default {
    name: 'App',
    mounted () {
      this.$store.dispatch('getAddressByGeohash')
      
      // 将token在请求头Authorization中携带，实现自动登录
      this.$store.dispatch('autoLogin')
    },
    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>