import * as types from '../mutation-types'
import { user } from '@/api'

const state = {
  info: {}
}

const mutations = {
  [types.LOGIN] (state, userInfo) {
    state.user = userInfo
  },
  [types.LOGIN_SUCCESS] (state, info) {
    state.info = info
  },
  [types.LOGIN_FAIL] (state) {
    state.info = {}
  },
  [types.LOGOUT] (state) {
    state.info = {}
  }
}
const actions = {
  login ({commit, state}, userInfo) {
    commit(types.LOGIN_SUCCESS, userInfo)
  },
  logout ({commit, state}) {
    commit(types.LOGOUT)
    user.logout()
  }
}

export default {
  state,
  mutations,
  actions
}
