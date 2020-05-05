<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name || '定位中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categoriesArr.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categories, index) in categoriesArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="category in categories" :key="category.id">
              <div class="food_container">
                <img :src="'http://fuss10.elemecdn.com' + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img v-else src="./images/msite_back.svg" alt="loading">
    </nav>
    <!--首页附近商家-->
    <shopList />
  </section>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
  import {chunk} from 'lodash'

  import shopList from '../../components/shopList/shopList.vue'
  export default {
    name: 'Msite',
    mounted () {
      this.$store.dispatch('getShopListByGeohash')
      this.$store.dispatch('getFoodCategoriesList')
    },
    watch: {
      categoriesArr () {
        this.$nextTick(() => {
          this.swiper()
        })
      }
    },
    computed: {
      ...mapState(['address', 'categories']),
      /* categoriesArr () {
        const outerArr = []
        let innerArr = []
        const {categories} = this

        categories.forEach(category => {
          if (innerArr.length === 0) {
            outerArr.push(innerArr)
          }

          innerArr.push(category)

          if (innerArr.length === 8) {
            innerArr = []
          }
        })

        return outerArr
      }, */
      categoriesArr () {
        return chunk(this.categories, 8)
      }
    },
    methods: {
      swiper () {
        new Swiper('.swiper-container', {
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          },
        })
      },
    },
    components: {
      shopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      &::after
        height 0
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>
