// 工具函数库
import config from './config'

// 封装的get请求(wx请求的方法)
export function get (url, data) {
  return request(url, 'GET', data)
}
export function post (url, data) {
  return request(url, 'POST', data)
}
function request (url, method, data) {
  console.log(data)
  console.log(method)
  return new Promise((reslove, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: function (res) {
        console.log(res)
        if (res.data.code === 0) {
          reslove(res.data.data)
        } else {
          // if (res.data.data.msg) {
          //   // reject(res.data.data.msg)
          //   // showModel('失败', res.data.data.msg)
          // } else {
          reject('添加失败')
          // }
          // console.log(res.data.data.msg)
        }
      }
    })
  })
}

// 微信成功提示
export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success',
    duration: 2000
  })
}

export function showModel (title, content) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false
  })
}

export function login () {
  return new Promise((resolve, reject) => {
    wx.login({ success: resolve, fail: reject })
  })
}
export function getSetting () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({ success: resolve, fail: reject})
  })
}
export function getUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({ success: resolve, fail: reject })
  })
}
