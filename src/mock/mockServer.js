import Mock from 'mockjs'

import data from './data.json'

Mock.mock('/shop_goods', {"code": 0, "data": data.goods})
Mock.mock('/shop_ratings', {"code": 0, "data": data.ratings})
Mock.mock('/shop_info', {"code": 0, "data": data.info})