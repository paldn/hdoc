import {
    get,
    post,
    put,
    _delete
  } from '@/services/plugins/axios'
  class LoginApi
  {
      async doLogin(username, password) {
        const token = await post(`auth/login?username=${username}&password=${password}`)
        return token
      }
  }
  export default new LoginApi() 