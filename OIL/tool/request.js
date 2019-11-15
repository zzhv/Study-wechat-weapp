/*
对wx.request进行一点简单封装
*/
const apiHost = getApp().globalData.URL;
import {
  codes
} from "codes.js"
import ss from "show.js"

/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function xGet({
  url,
  data,
  success,
  fail
}) {
  wx.request({
    url: apiHost + url,
    method: 'GET',
    data: data,
    header: {
      Authorization: 'Bearer ' + wx.getStorageSync("token")
    },
    success: res => {
      //如果Token过期
      if (res.header.TokenExpired) {
        wx.clearStorageSync();
        // 转到登录页面
        wx.reLaunch({
          url: '/pages/account/login/index?TokenExpired=true'
        })
      } else if (res.statusCode === 200) {
        if (success && typeof success === "function") {
          //有message的统一弹
          ss.showNone(res.data.message);
          success(res);
        }
      }
    },
    fail: function(error) {
      if (fail && typeof fail === "function") {
        fail(error);
      } else {
        wx.showToast({
          title: '异常请求',
          duration: 1500,
          icon: 'none'
        })
      }
    }
  })
}

/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function xPost({
  url,
  data,
  success,
  fail
}) {
  wx.request({
    url: apiHost + url,
    method: 'POST',
    data: data,
    header: {
      Authorization: 'Bearer ' + wx.getStorageSync("token")
    },
    success: (res) => {
      //如果Token过期
      if (res.header.TokenExpired) {
        wx.clearStorageSync();
        // 转到登录页面
        wx.reLaunch({
          url: '/pages/account/login/index?tokenExpired=true'
        })
      } else if (res.statusCode === 200) {
        if (success && typeof success === "function") {
          success(res);
        }
      }
    },
    fail: function(error) {
      if (fail && typeof fail === "function") {
        fail(error);
      } else {
        console.log("ewrew" + error);
        wx.showToast({
          title: '异常请求',
          duration: 1500,
          icon: 'none'
        })
      }
    }
  })
}
module.exports.xGet = xGet;
module.exports.xPost = xPost;