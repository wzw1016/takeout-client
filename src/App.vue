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
    },
    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>