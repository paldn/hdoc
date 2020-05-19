import {
    get,
    post,
    put,
    _delete
  } from '@/services/plugins/axios'
  class LoginApi
  {
      async doLogin(username, password,sessionid,code,v_dx) {
        const result = await post(`/mxlogin.bsi?sessionid=${sessionid}&username=${username}&userp=${password}&code=${code}&v_dx=${v_dx}&encoding=utf-8`)
        return result
      }
      async doActive(params)
      {
        const result = await post(`/mxActive?serial_number=${params.serial_number}&company=${params.company}&active_code=${params.active_code}`)
        return result
      }
  }
  export default new LoginApi() 