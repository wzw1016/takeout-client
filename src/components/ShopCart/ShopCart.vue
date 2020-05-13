<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShopCartListShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: cartFoods.length > 0}">
              <i class="iconfont icon-shopping_cart" :class="{highlight: cartFoods.length > 0}"></i>
            </div>
            <div class="num" v-if="cartFoods.length > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: cartFoods.length}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥4元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>

      <transition name="move">
        <div class="shopcart-list" v-show="ShopCartListComputedisShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCartFoods">清空</span>
          </div>
          <div class="list-content" ref="cartFoodList">
            <ul>
              <li class="food" v-for="cartFood in cartFoods" :key="cartFood.name">
                <span class="name">{{cartFood.name}}</span>
                <div class="price"><span>￥{{cartFood.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="cartFood" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="ShopCartListComputedisShow" @click="isShowShopCartList = false"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapGetters} from 'vuex'
  // eslint-disable-next-line no-unused-vars
  import BScroll from '@better-scroll/core'

  export default {
    name: 'ShopCart',
    data () {
      return {
        isShowShopCartList: false
      }
    },
    computed: {
      ...mapState({
        cartFoods: state => state.shop.cartFoods,
        info: state => state.shop.info,
        goods: state => state.shop.goods
      }),
      ...mapGetters(['totalCount', 'totalPrice']),

      payClass () {
        const {totalPrice} = this
        const {minPrice} = this.info
        return totalPrice >= minPrice ? 'enough' : 'not-enough'
      },
      payText () {
        const {info, totalCount, totalPrice} = this
        const {minPrice} = info
        return totalCount === 0 ? `满${minPrice}元起送` : totalPrice <= minPrice ? `还差${minPrice - totalPrice}起送` : '去结算'
      },

      ShopCartListComputedisShow: {
        get () {
          if (this.totalCount === 0) {
            return false
          }
          return this.isShowShopCartList
        },
        /* set (newValue) {
          if (newValue) {
            // eslint-disable-next-line no-debugger
            debugger
            this.$nextTick(() => {
              if (!this.cartFoodListScroll) {
                this.cartFoodListScroll = new BScroll(this.$refs.cartFoodList, {
                  click: true
                })
              } else {
                this.cartFoodListScroll.refresh()
              }
            })  
          }
        } */
      }
    },
    watch: {

      totalCount (newValue) {
        if (newValue === 0) {
          this.isShowShopCartList = false
        }
      },

      ShopCartListComputedisShow (newValue) {
        if (newValue) {
          this.$nextTick(() => {
            if (!this.cartFoodListScroll) {
              this.cartFoodListScroll = new BScroll(this.$refs.cartFoodList, {
                click: true,
                momentum: false,
              })
            } else {
              this.cartFoodListScroll.refresh()
            }
          })  
        }
      }
    },

    methods: {
      // 切换购物车列表显示
      toggleShopCartListShow () {
        if (this.totalCount > 0) {
          this.isShowShopCartList = !this.isShowShopCartList
        }
      },

      // 清空购物车
      clearCartFoods () {
        this.$store.dispatch('resetFoodCarts')
      }
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition transform .3s
      &.move-enter, &.move-leave-to
        transform translateY(0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.3s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>
