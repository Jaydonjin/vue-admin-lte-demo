import * as types from '../mutation-types'
import { user } from '@/api'

const state = {
  main: {
    name: 'Alexander Pierce',
    position: 'Web Developer',
    state: {
      color: '#3c763d',
      name: 'Online'
    },
    createdAt: new Date()
  },
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
  }
}
const actions = {
  login ({commit, state}, token) {
    user.login(token)
      .then((info) => commit(types.LOGIN_SUCCESS, {info}))
      .catch(() => commit(types.LOGIN_FAIL))
  }
}

export default {
  state,
  mutations,
  actions
}
