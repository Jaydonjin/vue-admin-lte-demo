import * as types from '../mutation-types'

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
  user: {}
}

const mutations = {
  [types.SET_USER] (state, userInfo) {
    debugger
    state.user = userInfo
  }
}

export default {
  state,
  mutations
}
