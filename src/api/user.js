import axios from 'axios'
import queryString from 'query-string'
import store from '@/store'
import { session } from '@/common'

export const user = {
  login (token) {
    let url = 'http://apis.newegg.org/framework/v1/keystone/sso-auth-data'
    let params = {
      Token: token
    }
    let config = {
      headers: {
        'Accept': 'Application/json',
        'Authorization': 'Bearer qSjliHMTSkxcXCx89yG1xKyLmL1ySRWlmTf8M9Us'
      }
    }
    return axios.post(url, params, config)
      .then(response => {
        if (response.status === 200) {
          return Promise.resolve({success: true, userInfo: response.data.UserInfo})
        } else {
          return Promise.resolve({success: false, userInfo: undefined})
        }
      })
      .catch(() => {
        return Promise.resolve({success: false, userInfo: undefined})
      })
  },
  logout () {
    session.delete('isLogin')
    store.commit('LOGIN', {})
    location.href = 'https://account.newegg.org/logout?redirect_url=' + location.protocol + location.host + location.pathname
  },
  authorize (to, from) {
    const parsed = queryString.parse(location.search)
    let token = parsed['t']
    if (token) {
      return this.login(token)
    } else {
      let url = 'https://account.newegg.org/login?redirect_url=' + location.href
      location.href = url
    }
  }
}
