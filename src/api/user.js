import axios from 'axios'
import queryString from 'query-string'
import store from '@/store'

export default {
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
          localStorage['isLogin'] = true
          store.commit('LOGIN', response.data.UserInfo)
          return Promise.resolve(true)
        } else {
          return Promise.resolve(false)
        }
      })
      .catch(() => {
        return Promise.resolve(false)
      })
  },
  logout () {
    sessionStorage.removeItem('isLogin')
    store.commit('LOGIN', {})
    location.href = 'https://account.newegg.org/logout?redirect_url=' + location.protocol + location.host + location.pathname
  },
  requireAuth (to, from, next) {
    const parsed = queryString.parse(location.search)
    if (sessionStorage['isLogin']) {
      // TODO(benjamn): reload information from session
      next()
    } else if (parsed['t']) {
      this.login(parsed['t']).then(success => {
        next()
      })
    } else {
      let url = 'https://account.newegg.org/login?redirect_url=' + location.href
      location.href = url
    }
  }
}
