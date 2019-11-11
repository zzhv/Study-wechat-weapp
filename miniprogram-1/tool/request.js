//var apiHost = "https://localhost:44337/api/";
var apiHost = "http://192.168.1.2/api/";
var tokenKey = "token";
// 登录地址, 根据这个地址来设置token
var logInUrl = "/Account/NormalLogin";
var exceptionAddrArr = [
  'Account/NormalLogin',
];

/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function xGet(url, success, fail, data) {
  // CreateHeader(url, function(header) {
  wx.request({
    url: apiHost + url,
    method: 'GET',
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
          url: '/pages/account/login?TokenExpired=true'
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
        wx.showToast({
          title: '网络异常',
          duration: 1500,
          icon: 'none'
        })
      }
    }
  })
  // });
}

/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function postRequest(url, data, success, fail) {
  CreateHeader(url, function(header) {
    wx.request({
      url: apiHost + url,
      method: 'POST',
      data: data,
      header: header,
      success: function(res) {
        console.log(1);
        if (res.statusCode === 401) {
          wx.showToast({
            title: '身份失效，请重新登录',
            duration: 1000,
            icon: 'none'
          })
        }
        if (success && typeof success === "function") {
          success(res);
        }
      },
      fail: function(error) {
        if (fail && typeof fail === "function") {
          fail(error);
        } else {
          console.log("ewrew"+error);
          wx.showToast({
            title: error,
            duration: 1500,
            icon: 'none'
          })
        }
      }
    })
  });
}

/** 
 * @param url:String    请求地址(根据请求地址判断是否添加token)
 * @param complete:Function 回调函数
 */
function CreateHeader(url, complete) {
  var header = {
    'content-type': 'application/json'
  }
  if (exceptionAddrArr.indexOf(url) == -1) { //排除请求的地址不需要token的地址
    wx.getStorage({
      key: tokenKey,
      success: function(res) {
        header.Authorization = 'Bearer ' + res.data;
      },
      fail: function(error) {
        console.log(error);
      },
      complete: function() {
        complete && typeof complete === 'Function' ? complete(header) : null;
      }
    });
  } else {
    complete && typeof complete === 'Function' ? complete(header) : null;
  }
}

module.exports.xGet = xGet;
module.exports.postRequest = postRequest;