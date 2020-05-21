<template>
  <div class="lg-box">
    <div style="padding-top:30px;">
      <div class="lg-form">
        <div class="logo"><el-image :src="logo"/></div>
        <div class="content">
          <h3>监控易用户登录</h3>
          <div>
            <div>
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账户">
                  <el-input v-model="form.username" type="text"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                  <el-input v-model="form.verifyCode" class="verifycode" type="text"></el-input>
                  <el-image :src="base_url+'/bsVerifyCode.bsi?sessionid='+sessionid+'&str='+rand" class="verifyimg" @click="refreshCode"/>
                </el-form-item>
                <el-form-item label="记住我">
                  <el-checkbox v-model="isRember"></el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="doLogin" class="b-login">登录</el-button>
                  <el-button class="b-active" @click="dialogVisible = true">激活</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-image :src="code"/><br/>
              <p style="width:110px;margin-top:10px;line-height:16px;">扫码下监控易App即刻开启掌上运维</p>
            </div>
          </div>
          <h5 style="color:#999;padding-bottom:15px;font-size:12px;text-align:center;line-height:20px;">提示: 为了获得更好的体验建议使用IE 11、谷歌或火狐浏览器进行管理。</h5>
        </div>
      </div>
      <div class="mb-box">
        <div>
          <ul>
            <transition-group name="fadeIn">
              <li v-for="(item,index) in mbimg_list" :key="'img_'+index" v-show="index==count">
                <el-image :src="item"/>
              </li>
            </transition-group>
          </ul> 
          <ul>
              <li><a @click="gotoPrev"></a></li>
              <li><a @click="gotoNext"></a></li>
          </ul>
          <ol>
            <li v-for="(item,index) in mbimg_list" :key="'circle_'+index">
              <a :class="{active:index==count}" @click="switchTo(index)"></a>
            </li>
          </ol>
        </div> 
      </div>
    </div>
    <div>
      <span><i class="el-icon-phone" style="margin-right:2px;"></i>400-650-6396</span>
      <a href="https://www.jiankongyi.com/" target="_blank">官网首页</a>
      <a href="https://www.jiankongyi.com/price/" target="_blank">购买产品</a>
      <a href="https://www.jiankongyi.com/help/" target="_blank">帮助文档</a>
      <span >QQ交流群:372273401</span>
      <span>Copyright(C)2018北京美信时代科技有限公司</span>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="450px" class="mydialog">
      <div style="padding:0 40px;margin-bottom:30px;"><el-image :src="jh_title"/></div>
      <el-form ref="acform" :model="active_form" label-width="80px">
        <el-form-item label="序列号">
          <el-input type="text" v-model="active_form.serial_number"/>
        </el-form-item>
        <el-form-item label="注册公司">
          <el-input type="text" v-model="active_form.company"/>
        </el-form-item>
        <el-form-item label="激活码">
          <el-input type="text" v-model="active_form.active_code"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;border-top:1px solid #ccc;padding:10px;">
        <el-button type="primary" @click="handleActive" class="modalbtn ok">确 定</el-button>
        <el-button @click="dialogVisible = false" class="modalbtn cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import logo from '@/assets/images/login_logo.png'
import code from '@/assets/images/code.png'
import mbimg_1 from '@/assets/images/l_i1.png'
import mbimg_2 from '@/assets/images/l_i2.png'
import mbimg_3 from '@/assets/images/l_i3.png'
import mbimg_4 from '@/assets/images/l_i4.png'
import jh_title from '@/assets/images/jh_tit.png'


import Config from '@/config'
import myUtils from '@/plugins/myUtils'
import loginapi from '@/services/models/login'
export default {
  name: 'Login',
  data () {
    return {
      base_url:Config.baseUrl,
      logo:logo,
      code:code,
      jh_title:jh_title,
      mbimg_list:[mbimg_1,mbimg_2,mbimg_3,mbimg_4],
      isRember:false,
      rand:'',
      sessionid:'',
      count:0,
      timer:null,
      form:
      {
        username:'',
        password:'',
        verifyCode:''
      },
      dialogVisible:false,
      active_form:
      {
        serial_number:'',
        company:'',
        active_code:''
      }
    }
  },
  methods:
  {
    gotoPrev()
    {
      let c = this.count - 1
      this.count = c<0?(c+this.mbimg_list.length):c
    },
    gotoNext()
    {
      this.count = (this.count+1)%this.mbimg_list.length
    },
    switchTo(index)
    {
      this.count = index
    },
    async handleActive()
    {

    },
    _Init()
    {
      Promise.all([loginapi.doRandom(),loginapi.getServerType(),loginapi.getBSInitinfo()]).then(arr=>
      {
        let [_rand_,_serverType_,_bsInfo_] = arr

        this.company = _bsInfo_.activedcomapny
        this.serial_number = _bsInfo_.serialcode

        console.log(_rand_)
        console.log(_serverType_)
        console.log(_bsInfo_)
      })
    },
    doLogin()
    {
      
      let sixnum = myUtils.randomRange(6)
      let sessionid = this.sessionid
      let username = encodeURIComponent(this.form.username)
      let userp = myUtils.encrypt(this.form.password,sixnum)
      let code = encodeURIComponent(this.form.verifyCode)
      let v_dx = sixnum + ";userp"

      Promise.all([loginapi.doLogin(username, userp,sessionid,code,v_dx),loginapi.getRight(),loginapi.getLoginUser]).then(arr=>
      {
        let [_login_,_user_,_right_] = arr
        console.log(_login_)
        console.log(_user_)
        console.log(_right_)

      })
    },
    async refreshCode()
    {
      if(this.sessionid)
      {
        this.rand = Math.random()
      }
      else
      {
        this.sessionid = myUtils.createRandomString()
      }
    }
  },
  created()
  {
    this.refreshCode()
    this._Init()
  },
  mounted()
  {
    this.timer = setInterval(()=>
    {
      this.count = (this.count+1)%this.mbimg_list.length
    },5000)
  },
  beforeDestroy()
  {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.lg-form .el-input{width:230px;}
.verifycode{width:120px !important;}
.verifyimg{margin-left:5px;overflow: visible;}
.el-form-item{margin-bottom:0;padding:5px;}
.b-login{background:#15a06c;border-color:#15a06c;width:100px;height:40px;border-radius:6px;}
.b-active{color:#ff6600;border:none;width:100px;height:40px;}
.b-active:hover,.b-active:focus{background:none;}

.fadeIn-enter,.fadeIn-leave-to{
    opacity: 0;
}
.fadeIn-enter-to,.fadeIn-leave{
    opacity: 1;
}
.fadeIn-enter-active,.fadeIn-leave-active{
    transition: all 1s;
}
.lg-box
{
  width:100%;
  height:100%;
  background:url(../../assets/images/login_bg.png) center no-repeat;

  > div:nth-of-type(1)
  {
    max-width: 1200px;
    width: 100%;
    height: 95%;
    max-height: 704px;
    margin: 0 auto;

    .lg-form
    {
      width: 500px;
      float: left;
      margin-top: 100px;
      margin-left: 200px;
      margin-right: 50px;

      .logo
      {
        width: 640px;
        margin: auto;
        margin-top: 0px;
        padding-bottom: 15px;
        img{vertical-align: middle;border:0;}
      }
      .content
      {
        width: 500px;
        padding-bottom: 0px;
        box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 1);
        border-radius: 6px;
        background-color: #ffffff;
        margin: auto;
        margin-top: 0px;

        > h3
        {
          width: 500px;
          text-align: center;
          font-size: 18px;
          color: #15a06c;
          padding-top: 30px;
        }
        > div{overflow:hidden;}
        > div > div:nth-of-type(1)
        {
          float:left;
          width: 350px;
          margin-top: 25px;
        }
        > div > div:nth-of-type(2)
        {
          float: right;
          width: 149px;
          padding-top: 30px;
          font-size: 12px;
          color: #333333;
        }
      }
    }
    .mb-box
    {
      margin-top: 50px;
      width: 400px;
      float: left;

      > div
      {
        width:255px;
        height:506px;
        background:url(../../assets/images/l_bg.png) center no-repeat;
        position:relative;
        > ul:nth-of-type(1)
        {
          position:absolute;
          left:22px;
          top:65px;
          width:214px;
          height:380px;
          overflow:hidden;
          > li
          {
            float:left;
          }
        }
        > ul:nth-of-type(2)
        {
          position:absolute;
          width:357px;
          top:200px;
          > li:nth-of-type(1)
          {
            width:317px;
            > a
            {
              display: block;
              width: 50px;
              height: 50px;
              overflow: hidden;
              cursor: pointer;
              position: absolute;
              left:-30px;
              background:url(../../assets/images/l_l.png) center no-repeat;
            }
          }
          > li:nth-of-type(2)
          {
            width:317px;
            > a
            {
              display: block;
              width: 50px;
              height: 50px;
              overflow: hidden;
              cursor: pointer;
              position: absolute;
              left:237px;
              background:url(../../assets/images/l_r.png) center no-repeat;
            }
          }
        }
        > ol
        {
          position: absolute;
          top:470px;
          width:100%;
          text-align:center;

          > li
          {
            display: inline-block;
            margin:3px 8px;
            > a
            {
              display: inline-block;
              height: 8px;
              width: 8px;
              background: #333333;
              border-radius: 4px;
              cursor:pointer;
            }
            > a.active
            {
              background:#ffffff;
            }
          }

        }
      }
    }
  }
  > div:nth-of-type(2)
  {
    width:1200px;
    height:19px;
    position:fixed;
    bottom:20px;
    left:50%;
    margin-left:-600px;
    text-align:center;
    font-size:14px;
    > *{margin:0 5px;color:#c1c1c1 !important;}
    > a:hover
    {
      outline: none;
      text-decoration: none;
      color: inherit;
      opacity: .6;
    }
  }
  .modalbtn
  {
    display: inline-block;
    line-height: 38px;
    height: 38px;
    min-width: 100px;
    width: auto;
    text-align: center;
    background-color: transparent;
    border: solid 1px #ececec !important;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    padding: 0 6px;
    color: #333;
  }
  .ok
  {
    background-color: #414852 !important;
    color: #fff;
  }
  .cancel
  {
    border-color:transparent;
  }
}
</style>
<style lang="scss">

.mydialog
{
  > div > div:nth-of-type(1){display:none !important}
}
</style>
