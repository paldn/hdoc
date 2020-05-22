import * as types from './mutation-types'

export default {
  setUserAndState({ commit }, user) {
    // 设置为已登录状态
    commit(types.SET_LOGIN, true)
    // 设置用户状态
    commit(types.SET_USER, user)
  },
  setCompany({commit},company){
    commit(types.SET_COMPANY,company)
  },
  loginOut({ commit }) {
    commit(types.REMOVE_LOGIN, false)
  }
}