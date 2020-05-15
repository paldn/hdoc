import * as types from './mutation-types'

export default {
  setAuthorAndState({ commit }, author) {
    // 设置为已登录状态
    commit(types.SET_LOGIN, true)
    // 设置用户状态
    commit(types.SET_AUTHOR, author)
  },

  loginOut({ commit }) {
    commit(types.REMOVE_LOGIN, false)
  }
}