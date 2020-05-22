import * as types from './mutation-types'

export default {
  [types.REMOVE_LOGIN](state) {
    state.company = null
    state.login = false
    state.user = null
  },

  [types.SET_LOGIN](state) {
    state.login = true
  },

  [types.SET_USER](state, user) {
    state.user = user
  },
  [types.SET_COMPANY](state, company)
  {
    state.company = company
  }
}
