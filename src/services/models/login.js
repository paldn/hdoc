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
      async doActive(params)//地址是瞎写的，暂时不打算做这块
      {
        const result = await post(`/mxActive.bsi?serial_number=${params.serial_number}&company=${params.company}&active_code=${params.active_code}`)
        return result
      }
      async doRandom()
      {
        const result = await get(`/random.bsi?_t=${new Date().getTime()}`)
        return result
      }
      async getServerType()
      {
        const result = await get(`/GetServerType.bsi?_t=${new Date().getTime()}`)
        return result
      }
      async getBSInitinfo()
      {
        const result = await post(`/BSGetInitInfo.bsi`)
        return result
      }
      async getRight()
      {
        const result = await get(`/GetRight.bsi?encoding=utf-8&_t=${new Date().getTime()}`)
        return result
      }
      async getLoginUser()
      {
        const result = await get(`/getloginusername.bsi?encoding=utf-8`)
        return result
      }
  }
  export default new LoginApi() 