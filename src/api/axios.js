import axios from 'axios'
import { baseUrl } from './config'

// es6 class暂无提供私有属性、私有方法，在此先用Symbol实现
const _request = Symbol('_request')
const _interceptors = Symbol('_interceptors')
const _getConfig = Symbol('_getConfig')

/**
 * descriptions
 * @param url         请求路径
 * @param data        请求参数
 * @param method      请求类型
 * @param isError     错误是否返回
 * */

class HttpRequest {
  [_request] (url, data, method, isError) { // 请求封装
    const http = axios.create() // 创建一个可配置的axios实例
    let options = {
      url,
      data,
      method
    }
    options = Object.assign(this[_getConfig](), options)
    this[_interceptors](http, isError)
    return http(options)
  }

  [_interceptors] (http, isError) { // axios拦截器
    // 请求拦截
    http.interceptors.request.use(config => {
      // 设置请求头
      config.headers = {
        'Authorization': localStorage.getItem('Authorization')
      }
      return config
    }, err => {
      console.log(err)
    })
    // 响应拦截
    http.interceptors.response.use(res => {
      const { data } = res
      if (data.ack === 0) { // 与后端约定好的请求失败情况
        if (isError) {
          return data
        } else {
          window.VM.$message.warning(data.msg)
        }
      } else {
        return isError ? data : data.data
      }
    }, err => {
      console.log(err)
    })
  }

  [_getConfig] () { // 获取axios实例的基本配置信息
    return {
      baseUrl
    }
  }
  post (url, data = {}, isError = false) {
    return this[_request](url, data, 'post', isError)
  }

  get (url, data = {}, isError = false) {
    // 封装get参数
    let dataStr = '?'
    Object.keys(data)
      .forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
    if (dataStr !== '') {
      dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
      url = url + dataStr
    }
    return this[_request](url, {}, 'get', isError)
  }

  delete (url, data = {}, isError = false) {
    return this[_request](url, data, 'delete', isError)
  }

  put (url, data = {}, isError = false) {
    return this[_request](url, data, 'put', isError)
  }
}

export default HttpRequest 