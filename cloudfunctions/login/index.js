// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event) => {
  const { nickName, avatarUrl } = event
  const { OPENID } = cloud.getWXContext()

  /*初始化集合 */
  const db = cloud.database()

  /*指定集合 */
  const userInfo =db.collection('userinfo')

  /*查询当前用户是否注册过 */
  const { data } = await userInfo.where({
    _openId: OPENID
  }).get()

  if(data.length === 0) {
    /*新增数据 */
    //数据库内没有当前用户信息（注册）
    const { _id } = await userInfo.add({
      data: {
        nickName,
        avatarUrl,
        countDays: 0,
        Todo: 0,
        _openId: OPENID
      }
    })

    const user = await userInfo.doc(_id).get()
  
    return {
      data: user.data
    }
  } else {
    // 数据库存在当前用户信息，直接返回（登录）
    return {
      data: data[0]
    }
  }
}