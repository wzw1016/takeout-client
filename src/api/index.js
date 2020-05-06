import ajax from './ajax'

const BASE = '/api'

/* 1、根据经纬度获取位置详情 */
export const reqAddressByGeohash = ({latitude, longitude}) => ajax(BASE + `/position/${latitude},${longitude}`)

/* 2、获取食品分类列表 */
export const reqFoodCategoryList = () => ajax.get(BASE + '/index_category')

/* 3、根据经纬度获取商铺列表 */
export const reqShopListByGeohash = ({latitude, longitude}) => ajax(BASE + '/shops', {
  params: {
    latitude,
    longitude
  }
})

/* 4、根据经纬度和关键字搜索商铺列表 */
export const reqSearchShopListByGeohashAndKeyword = ({latitude, longitude}, keyword) => ajax.get('/search_shops', {
  params: {
    geohash: `${latitude},${longitude}`,
    keyword
  }
})

/* 5、获取一次性验证码 */
// export const reqCaptcha = () => ajax('/captcha')

/* 6、用户名密码登陆 */
export const regLogin = ({name, pwd, captcha}) => ajax({
  method: "POST",
  url: '/login_pwd',
  data: {
    name,
    pwd,
    captcha
  }
})

/* 7、发送短信验证码 */
export const reqsendCode = (phone) => ajax(BASE + '/sendcode', {params: {phone}})

// 8、手机号验证码登陆
export const phoneLogin = ({phone, code}) => ajax.post('/login_sms', {
  phone,
  code
})

/* 9、根据会话获取用户信息 */
export const reqUserInfo = () => ajax.get('/userinfo')
