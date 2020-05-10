import ajax from './ajax'

const BASE = '/api'

/* 1、根据经纬度获取位置详情 */
export const reqAddressByGeohash = ({latitude, longitude}) => ajax(BASE + `/position/${latitude},${longitude}`)

/* 2、获取食品分类列表 */
export const reqFoodCategoryList = () => ajax.get(BASE + '/index_category', {
  headers: {
    needToken: true
  }
})

/* 3、根据经纬度获取商铺列表 */
export const reqShopListByGeohash = ({latitude, longitude}) => ajax(BASE + '/shops', {
  params: {
    latitude,
    longitude
  },
  headers: {
    needToken: true
  }
})

/* 4、根据经纬度和关键字搜索商铺列表 */
export const reqSearchShopListByGeohashAndKeyword = ({latitude, longitude}, keyword) => ajax.get(BASE + '/search_shops', {
  params: {
    geohash: `${latitude},${longitude}`,
    keyword
  }
})

/* 5、获取一次性验证码 */
// export const reqCaptcha = () => ajax(BASE + '/captcha')

/* 6、用户名密码登陆 */
export const reqLogin = ({name, pwd, captcha}) => ajax({
  method: "POST",
  url: BASE + '/login_pwd',
  data: {
    name,
    pwd,
    captcha
  }
})

/* 7、发送短信验证码 */
export const reqSendCode = (phone) => ajax(BASE + '/sendcode', {params: {phone}})

// 8、手机号验证码登陆
export const reqPhoneLogin = ({phone, code}) => ajax.post(BASE + '/login_sms', {
  phone,
  code
})

/* 9、自动登录 */
export const reqAutoLogin = () => ajax.get(BASE + '/auto_login', {
  headers: {
    needToken: true
  }
})

/* 
  mock
*/
export const reqShopGoods = () => ajax('/shop_goods')
export const reqShopRatings = () => ajax('/shop_ratings')
export const reqShopInfo = () => ajax('/shop_info')
