import axios from 'axios'
import {message} from './message'
import {session} from './storage'

const defaults = {
  baseURL: '',
  headers: {
    'Content-Type': 'application/json'
  },
  noLoading: false,
  noErrorTip: false
}
const counter = {
  requestCount: 0
}
const shouldCloseloading = () => {
  if (--counter.requestCount <= 0) {
    message.loading(false)
  }
}

const request = (method, url, data, options = {}) => {
  let token = session.get('token')
  let headers = {'Authorization': 'Bearer ' + token}
  let newDefaults = Object.assign({}, defaults)
  newDefaults.headers = Object.assign(newDefaults.headers, headers)
  if (options.headers) {
    newDefaults.headers = Object.assign({}, newDefaults.headers, options.headers)
    delete options.headers
  }
  options = Object.assign({}, newDefaults, options, {
    url,
    method,
    data
  })
  if (options.method === 'get' && data) {
    options.params = data
  }
  counter.requestCount++
  if (!options.noLoading) {
    message.loading()
  }
  return axios.request(options)
    .then(response => {
      shouldCloseloading()
      return response
    })
    .catch(err => {
      shouldCloseloading()
      let errorMsg = err.message
      if (err.response) {
        if (err.response.status === 401) {
          // TODO(benjamin): process 401, redirect login router
          return false
        }
        errorMsg = err.response.data.message
      }
      if (!options.noErrorTip) {
        message.error(errorMsg)
      }
      return Promise.reject(err)
    })
}

export const ajax = {
  init ({baseURL}) {
    defaults.baseURL = baseURL
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
