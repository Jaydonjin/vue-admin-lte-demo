import axios from 'axios'
// import { message } from './message'

const settings = {
  baseURL: '',
  headers: {
    'Content-Type': 'application/json'
  }
}
// const counter = {
//   requestCount: 0
// }
// const shouldCloseloading = () => {
//   if (--counter.requestCount <= 0) {
//     message.loading(false)
//   }
// }

const request = (method, url, data, options = {}) => {
  options = Object.assign({}, settings, options, {
    url,
    method,
    data
  })
  if (options.method === 'get' && data) {
    options.params = data
  }
  settings.requestCount++
  return axios.request(options)
  // return axios.request(options)
  //   .then(response => {
  //     shouldCloseloading()
  //     return response
  //   })
  //   .catch(err => {
  //     shouldCloseloading()
  //     if (err.response.status === 401) {
  //       // logging
  //       return false
  //     }
  //     // let errorMessage = err.response.data.message
  //     // m
  //   })
}

export const ajax = {
  init ({baseURL}) {
    settings.baseURL = baseURL
  },
  get (url, param, options) {
    return request('get', url, param, options)
  },

  delete (url, param, options) {
    return request('delete', url, param, options)
  },
  post (url, data, options) {
    return request('post', url, data, options)
  },
  put (url, data, options) {
    return request('put', url, data, options)
  }
}
