<template>
  <el-container class="b-box">
    <el-header class="b-head">
        <div style="margin:0 20px;height:32px;">
            <div :class="{divbg:true,active:step==0}" style="width:160px;" @click="step=0">
                <div style="text-align:center; width:160px;">
                    <span style="font-size:18px;">1.</span>
                    <span style="">&nbsp;选定告警目标</span>
                </div>
            </div>
            <div :class="{divbg:true,active:step==1}" style="width:160;" @click="step=1">
                <div :class="{arrow:true,active:step==0}" style="">
                </div>
                <div style="text-align:center; width:130px;">
                    <span style="font-size:18px;">2.</span>
                    <span style="">&nbsp;选择发送策略</span>
                </div>
            </div>
            <div :class="{divbg:true,active:step==2}" style="width:190;" @click="step=2">
                <div :class="{arrow:true,active:step==1}" style="">
                </div>
                <div style="text-align:center; width:160px;">
                    <span style="font-size:18px;">3.</span>
                    <span style="">&nbsp;选择发送方式</span>
                </div>
            </div>
            <div class="divbg" style="background-color: transparent;">
            	<div :class="{arrow:true,active:step==2}" style="margin-left: -13px;margin-top: 1px;"></div>
            </div>
        </div>
    </el-header>
    <el-main class="b-body">
        <div>
            <el-form ref="alarmTarget" v-model="alarmTarget" label-width="120px" v-show="step==0">
                <el-form-item label="告警名称">
                    <el-input v-model="alarmTarget.Label"/>
                </el-form-item>
                <el-form-item label="告警范围">
                    <div class="tree-box">
                        <el-tree
                            ref="dTree"
                            show-checkbox
                            node-key="id"
                            :check-strictly="false"
                            :load="loadNode"
                            lazy
                            :props="deviceProps"
                            v-model="alarmTarget.DevList">
                        </el-tree>
                    </div>
                </el-form-item>
                <el-form-item label="告警描述">
                    <el-input type="textarea" rows="8" v-model="alarmTarget.Remark"></el-input>
                </el-form-item>
            </el-form>

            <el-form ref="sendTactics" v-model="sendTactics" label-width="120px" style="margin-top:20px;" v-show="step==1">
                <el-form-item style="margin:0;">
                    <el-checkbox-group v-model="sendTactics.ActionStat">
                        <el-checkbox label="2">危险</el-checkbox>
                        <el-checkbox label="3">故障</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item style="margin:0;">
                    <el-radio-group v-model="sendTactics.ActionCondition">
                        <div style="margin-bottom:15px;">
                            <el-radio :label="2">
                                当事件连续发生<input type="text" class="small-input" v-model="sendTactics.ActionParam1"/>次时，
                                发送告警，再每<input type="text" class="small-input" v-model="sendTactics.ActionParam2"/>次发送一次告警
                            </el-radio>
                        </div>
                        <div>
                            <el-radio :label="4">
                                在<input type="text" class="small-input" v-model="sendTactics.ActionParam3"/>分钟内，有
                                <input type="text" class="small-input" v-model="sendTactics.ActionParam4"/>次同样状态事件发送告警
                            </el-radio>
                        </div>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="margin:0;">
                    <div>
                        <el-checkbox v-model="sendTactics.ActionStopCondition">
                            事件连续发生<input type="text" class="small-input" v-model="sendTactics.ActionStopNum"/>次后，停止发送告警
                        </el-checkbox>
                    </div>
                    <div>
                        <el-checkbox v-model="sendTactics.sendbeOk">
                            当发过告警监测点恢复正常时发送一次告警
                        </el-checkbox>
                    </div>
                </el-form-item>
            </el-form>
            <el-form ref="sendMode" v-model="sendMode" label-width="120px" v-show="step==2">
                <div style="margin-top:20px;">
                    <el-form-item label="发送方式">
                        <el-checkbox v-model="sendMode.modes.HasEmail">邮件</el-checkbox>
                        <el-checkbox v-model="sendMode.modes.HasSms">短信</el-checkbox>
                        <el-checkbox v-model="sendMode.modes.HasSound">声音</el-checkbox>
                        <el-checkbox v-model="sendMode.modes.HasScript">脚本</el-checkbox>
                        <el-checkbox v-model="sendMode.modes.HasWechat">微信</el-checkbox>
                        <el-checkbox v-model="sendMode.modes.HasAPP">App</el-checkbox>  
                    </el-form-item>
                </div>
                <div style="margin-top:30px;" v-show="sendMode.modes.HasEmail">
                    <h3 style="margin-bottom:20px;">邮件告警</h3>
                    <el-form-item label="发件人">
                        <el-select placeholder="请选择" v-model="sendMode.email.SendSever">
                            <el-option
                                v-for="item in email_Sender"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收件人">
                        <el-select placeholder="请选择" multiple v-model="sendMode.email.EmailList">
                            <el-option
                                v-for="item in email_Receiver"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="临时收件人">
                        <el-input type="text" v-model="sendMode.email.Email"/>
                    </el-form-item>
                    <el-form-item label="邮件告警模板">
                        <el-select placeholder="请选择" v-model="sendMode.email.EmailTpl">
                            <el-option
                                v-for="item in emailTemplates"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="故障恢复模板">
                        <el-select placeholder="请选择" v-model="sendMode.email.EmailRecoveryTpl">
                            <el-option
                                v-for="item in emailTemplates"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div style="margin-top:30px;" v-show="sendMode.modes.HasSms">
                    <h3 style="margin-bottom:20px;">短信告警</h3>
                    <el-form-item label="发送方式">
                        <el-select placeholder="请选择" v-model="sendMode.sms.SmsSendType">
                            <el-option
                                v-for="item in sms_Sender"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="短信接收人">
                        <el-select placeholder="请选择" multiple v-model="sendMode.sms.SmsList">
                            <el-option
                                v-for="item in sms_Receiver"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="临时接收人">
                        <el-input type="text" v-model="sendMode.sms.Sms"/>
                    </el-form-item>
                    <el-form-item label="短信告警模板">
                        <el-select placeholder="请选择" v-model="sendMode.sms.SmsTpl">
                            <el-option
                                v-for="item in smsTemplates"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="故障恢复模板">
                        <el-select placeholder="请选择" v-model="sendMode.sms.SmsRecoveryTpl">
                            <el-option
                                v-for="item in smsTemplates"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div style="margin-top:30px;" v-show="sendMode.modes.HasSound">
                    <h3 style="margin-bottom:20px;">声音告警</h3>
                    <el-form-item label="播放主机">
                        <el-input type="text" v-model="sendMode.sound.SoundIp"/>
                    </el-form-item>
                    <el-form-item label="Agent端口">
                        <el-input type="text" v-model="sendMode.sound.SoundPort"/>
                    </el-form-item>
                    <el-form-item label="声音文件">
                        <el-input type="text" v-model="sendMode.sound.SoundName"/>
                    </el-form-item>
                    <el-form-item label="说明">
                        <span>
                            播放主机：装有代理程序（Agent服务）的主机
                            声音文件：所填主机里声音文件的绝对路径。
                        </span>
                    </el-form-item>
                </div>
                <div style="margin-top:30px;" v-show="sendMode.modes.HasScript">
                    <h3 style="margin-bottom:20px;">脚本告警</h3>
                    <el-form-item label="选择脚本位置">
                        <el-select placeholder="请选择" v-model="sendMode.script.isRemote">
                            <el-option label="本地" value="0"></el-option>
                            <el-option label="远程" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择脚本类型">
                        <el-select placeholder="请选择" v-model="sendMode.script.isDll">
                            <el-option label="脚本/EXE" value="0"></el-option>
                            <el-option label="DLL" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="脚本/EXE名称">
                        <el-input type="text" v-model="sendMode.script.ScriptName"/>
                    </el-form-item>
                    <el-form-item label="附加参数">
                        <el-input type="textarea" rows="8" v-model="sendMode.script.ArguName"/>
                        <el-button type="text" class="el-icon-info" style="margin-left:5px;" @click="scriptTemplatesVisible=!scriptTemplatesVisible">参数说明</el-button>
                    </el-form-item>
                    <el-form-item label="参数说明" class="correct" v-show="scriptTemplatesVisible">
                        <el-table style="width:450px;" :data="scriptTemplates" stripe align="center">
                            <el-table-column label="变量" prop="Var"></el-table-column>
                            <el-table-column label="描述" prop="Des"></el-table-column>
                        </el-table>
                    </el-form-item>
                </div>
                <div style="margin-top:30px;" v-show="sendMode.modes.HasWechat">
                    <h3 style="margin-bottom:20px;">微信告警</h3>
                    <el-form-item label="收件人">
                        <el-input type="textarea" rows="13" v-model="sendMode.wechat.WXOther"/>
                        <el-image :src="wechat_img" style="margin-left:30px;"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="dialogVisible=true">获取我的ID</el-button>
                        <el-button type="primary" @click="handleRefresh()">刷新</el-button>
                    </el-form-item>
                    <el-form-item label="微信告警模板">
                        <el-select placeholder="请选择" v-model="sendMode.wechat.WXEmailTpl">
                            <el-option
                                v-for="item in emailTemplates"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="故障恢复模板">
                        <el-select placeholder="请选择" v-model="sendMode.wechat.WXEmailRecoveryTpl">
                            <el-option
                                v-for="item in emailTemplates"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div style="margin-top:30px;" v-show="sendMode.modes.HasAPP">
                    <h3 style="margin-bottom:20px;">App告警</h3>
                    <el-form-item label="告警接收人">
                        <el-select placeholder="请选择" multiple v-model="sendMode.app.AppUserList">
                            <el-option
                                v-for="item in app_Receiver"
                                :key="item.userid"
                                :label="item.username"
                                :value="item.userid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="APP告警模板">
                        <el-select placeholder="请选择" v-model="sendMode.app.appTpl">
                            <el-option
                                v-for="item in smsTemplates"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="故障恢复模板">
                        <el-select placeholder="请选择" v-model="sendMode.app.appRecoveryTpl">
                            <el-option
                                v-for="item in smsTemplates"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
            <div style="margin:60px 0 0 120px;padding-bottom:60px;">
                <el-button type="primary" v-show="step>0" @click="prevStep()">上一步</el-button>
                <el-button type="primary" v-show="step<2" @click="nextStep()">下一步</el-button>
                <el-button type="primary" v-show="step==2" @click="handleSubmit()">确 定</el-button>
                <el-button @click="handleCancel()">取 消</el-button>
            </div>
            <el-dialog
                title="微信增加收件人说明"
                :visible.sync="dialogVisible"
                :modal="modal"
                width="30%" center class="instructions">
                <p>1.扫描二维码,并关注美信公众号</p><br/>
                <el-image :src="wechat_img" style="width:100px;"/>
                <p>2.按照下图描述，输入“我的ID”。获取id成功后，把id输入到收件人中即可。</p><br/>
                <el-image :src="instructions_img" style="width:426px;"/>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    <el-main>
  </el-container>
</template>

<script>
import allmonitorapi from '@/services/models/allmonitor'
import wechat_img from '@/assets/images/wechat.jpg'
import instructions_img from '@/assets/images/instructions.png'
import { mapGetters } from 'vuex'
export default {
  name: 'AlarmDialog',
  props:{container:String,alarmId:String,refleshAlarm:Function},
  data () {
    return {
      msg: '告警窗口',
      dialogVisible:false,//微信收件人ID获取提示窗口
      modal:false,//是否启用微信收件人ID获取提示窗口遮罩效果
      wechat_img:wechat_img,//微信公众号二维码图片
      instructions_img:instructions_img,//微信收件人ID获取的使用截图
      step:0,//告警信息编辑的步骤
      alarmTarget://告警目标表单
      {
          Label:'',//告警名称
          DevList:[],//告警范围
          Remark:''//告警描述
      },
      sendTactics://告警发送策略表单
      {
          ActionStat:[],
          ActionCondition:'',
          ActionParam1:2,
          ActionParam2:3,
          ActionParam3:60,
          ActionParam4:3,
          ActionStopCondition:false,
          ActionStopNum:0,
          sendbeOk:false
      },
      sendMode:
      {
          modes:
          {
              HasEmail:false,
              HasSms:false,
              HasSound:false,
              HasScript:false,
              HasWechat:false,
              HasAPP:false
          },
          email:
          {
              SendSever:'',
              EmailList:[],
              Email:'',
              EmailTpl:'',
              EmailRecoveryTpl:''
          },
          sms:
          {
              SmsSendType:'',
              SmsList:[],
              Sms:'',
              SmsTpl:'',
              SmsRecoveryTpl:''
          },
          sound:
          {
              SoundIp:'',
              SoundPort:'',
              SoundName:''
          },
          script:
          {
              isRemote:'',
              isDll:'',
              ScriptName:'',
              ArguName:''
          },
          wechat:
          {
              WXOther:'',
              WXEmailTpl:'',
              WXEmailRecoveryTpl:''
          },
          app:
          {
              AppUserList:[],
              appTpl:'',
              appRecoveryTpl:''
          }
      },
      deviceProps:
      {
          label:'name',
          children:'subtree'
      },
      scriptTemplatesVisible:false,
      scriptTemplates:[],//脚本模板示例
      deviceTypes:[],//设备类型
      email_SenderAndReceiver:[],//邮件收发人
      wechat_Receiver:[],//微信接收人
      emailTemplates:[],//邮件报警模板
      app_Receiver:[],//App告警接收人
      emailOps:[],//邮件告警模板
      smsTemplates:[],//短信告警模板
      sms_SenderAndReceiver:[]//短信收发人
    }
  },
  watch:
  {
      alarmId()
      {
        if(this.alarmId)
        {
            this.initAlarmDetail()
        }
      }
  },
  methods:
  {
      loadNode(node, resolve)//加载子树
      { 
        if(node.level==0)
        {
            allmonitorapi.getDeviceTree().then(result=>
            {
                let treeData = []
                result.data.forEach(e => {
                    treeData.push(
                        {
                            id:e.id,
                            name:e.name,
                            icon:e.icon,
                            parentId:node.key,
                            subtree:[]
                        }
                    )
                })
                resolve(treeData)
            }).catch(res=>
            {
                resolve([])
            })
        }
        else
        {
            node.loaded = false
            node.isLeaf = false
            allmonitorapi.getDeviceChildTree(node.key).then(result=>
            {
                let treeData = []
                if(result.data[0].subtree)
                {
                    result.data[0].subtree.forEach(e => {
                        treeData.push(
                            {
                                id:e.id,
                                name:e.name,
                                icon:e.icon,
                                parentId:node.key,
                                subtree:[]
                            }
                        )
                    })
                }
                if(node.data)
                {
                    node.data.subtree = [...treeData]
                }
                
                setTimeout(()=>
                {
                    resolve(treeData)
                },100)
            }).then(res=>
            {
                resolve([])
            })
        }

      },
      prevStep()
      {
          this.step --
      },
      nextStep()
      {
          this.step ++
      },
      getSimplifyTreeCheckValue()
      {
        let nodes = this.$refs.dTree.getCheckedNodes()
        let nodeMap = {}
        for(let i=0;i<nodes.length;i++)
        {
            nodeMap[nodes[i].id] = nodes[i]
        }
        for(let i=0;i<nodes.length;i++)
        {
            for(let j=0;j<nodes[i].subtree.length;j++)
            {
                delete nodeMap[nodes[i].subtree[j].id]
            }
        }
        return Object.keys(nodeMap).join(",")
      },
      async handleSubmit()
      {
        let params = {}
        //保留的参数
        params.caltime = 10
        params.maxnum = 10
        params.outtime = 5
        params.netouttime = 180
        params.flowintvtime = 15
        params.noticeatime = 30

        params.Label = this.alarmTarget.Label//告警名称
        params.DevList = this.getSimplifyTreeCheckValue()//告警项
        params.Remark = this.alarmTarget.Remark//告警描述
        
        //告警状态，多选
        params.ActionStat = this.sendTactics.ActionStat.join(",")
        //告警控制
        params.ActionCondition = this.sendTactics.ActionCondition
        if(params.ActionCondition == 2)
        {
            params.ActionParam = this.sendTactics.ActionParam1+";"+this.sendTactics.ActionParam2
        }
        else
        {
            params.ActionParam = this.sendTactics.ActionParam3+";"+this.sendTactics.ActionParam4
        }

        params.ActionStopCondition = this.alarmTarget.ActionStopCondition?1:0
        if(params.ActionStopCondition==1)
        {
            params.ActionStopNum = this.alarmTarget.ActionStopNum
        }
        params.sendbeOk = this.alarmTarget.sendbeOk?1:0

        let count = 0
        if(this.sendMode.modes.HasEmail)
        {
            count ++
            params["action["+count+"][ActionType]"] = 0
            params["action["+count+"][EmailList]"] = this.sendMode.email.EmailList.join(",")
            params["action["+count+"][Email]"] = this.sendMode.email.Email
            params["action["+count+"][EmailTpl]"] = this.sendMode.email.EmailTpl
            params["action["+count+"][EmailRecoveryTpl]"] = this.sendMode.email.EmailRecoveryTpl
            params["action["+count+"][SendSever]"] = this.sendMode.email.SendSever
        }

        if(this.sendMode.modes.HasSms)
        {
            count ++
            params["action["+count+"][ActionType]"] = 1
            params["action["+count+"][SmsList]"] = this.sendMode.sms.SmsList.join(",")
            params["action["+count+"][Sms]"] = this.sendMode.sms.Sms
            params["action["+count+"][SmsTpl]"] = this.sendMode.sms.SmsTpl
            params["action["+count+"][SmsRecoveryTpl]"] = this.sendMode.sms.SmsRecoveryTpl
            params["action["+count+"][SmsSendType]"] = this.sendMode.sms.SmsSendType
        }

        if(this.sendMode.modes.HasSound)
        {
            count ++
            params["action["+count+"][ActionType]"] = 2
            params["action["+count+"][SoundIp]"] = this.sendMode.sound.SoundIp
            params["action["+count+"][SoundName]"] = this.sendMode.sound.SoundName
            params["action["+count+"][SoundPort]"] = this.sendMode.sound.SoundPort
            params["action["+count+"][PlayExe]"] = ""
            params["action["+count+"][SoundUser]"] = this.sendMode.sound.SoundPort
            params["action["+count+"][SoundPwd]"] = ""
        }

        if(this.sendMode.modes.HasScript)
        {
            count ++
            params["action["+count+"][ActionType]"] = 3
            params["action["+count+"][ScriptName]"] = ""
            params["action["+count+"][RemoteIp]"] = ""
            params["action["+count+"][nPort]"] = ""
            params["action["+count+"][isRemote]"] = this.sendMode.script.isRemote
            params["action["+count+"][isDll]"] = this.sendMode.script.isDll
            params["action["+count+"][DllName]"] = ""
            params["action["+count+"][DllFucntion]"] = ""
            params["action["+count+"][ArguName]"] = this.sendMode.script.ArguName
            params["action["+count+"][ScriptName]"] = this.sendMode.script.ScriptName
        }

        if(this.sendMode.modes.HasWechat)
        {
            count ++
            params["action["+count+"][ActionType]"] = 6
            params["action["+count+"][WXUserList]"] = ""
            params["action["+count+"][WXOther]"] = this.sendMode.wechat.WXOther
            params["action["+count+"][WXEmailTpl]"] = this.sendMode.wechat.WXEmailTpl
            params["action["+count+"][WXEmailRecoveryTpl]"] = this.sendMode.wechat.WXEmailRecoveryTpl
        }

        if(this.sendMode.modes.HasAPP)
        {
            count ++
            params["action["+count+"][ActionType]"] = 7
            params["action["+count+"][UserIdList]"] = this.sendMode.app.AppUserList.join(",")
            params["action["+count+"][AppTpl]"] = this.sendMode.app.appTpl
            params["action["+count+"][AppRecoveryTpl]"] = this.sendMode.app.appRecoveryTpl
        }

        params.ActionCount = count

        params.GroupId = this.container.split('_')[1]

        params.ccu = this.container.split('_')[0]

        let long_params = ''
        for(var k in params)
        {
            long_params += k+'='+params[k]+'&'
        }

        if(this.alarmId)//如果没有接收到告警ID视为新增告警，否则就是编辑旧有告警信息
        {
            params.AlertId = this.alarmId
            long_params += 'AlertId='+params.AlertId
            try
            {
                const result = await allmonitorapi.modifyOldAlarm(long_params)
                if(result.status=="success")
                {
                    this.$message.success("告警信息修改成功")
                    this.refleshAlarm(true)
                }
                else
                {
                    this.$message.error("告警信息修改失败")
                }
            }
            catch(e)
            {
                console.error(e)
            }
        }
        else
        {
            try
            {
                const result = await allmonitorapi.submitNewAlarm(long_params)
                if(result.status=="success")
                {
                    this.$message.success("新增告警成功")
                    this.refleshAlarm(true)
                }
                else
                {
                    this.$message.error("新增告警失败")
                }
            }
            catch(e)
            {
                console.error(e)
            }
        }

      },
      handleCancel()
      {
        this.step = 0
        this.alarmId = ''
        this.$refs.alarmTarget.resetFields()
        this.$refs.sendTactics.resetFields()
        this.$refs.sendMode.resetFields()
        this.refleshAlarm(true)
      },
      handleRefresh()
      {
        Promise.all(
        [
            allmonitorapi.getWeChatAlarmReceiver(),
            allmonitorapi.getEmailSenderAndReceiver()
        ]).then(arr=>
        {
            this.wechat_Receiver = arr[0].data||[]
            this.email_SenderAndReceiver = arr[1].data||[]
        })
      },
      init()
      {
        Promise.all(
        [
            allmonitorapi.getScriptTemplate(1),
            allmonitorapi.getDeviceTypes(),
            allmonitorapi.getWeChatAlarmReceiver(),
            allmonitorapi.getEmailSenderAndReceiver(),
            allmonitorapi.getEmailAlarmTemplate(),
            allmonitorapi.getEmailOpTemplate({emailType:1,opType:1}),
            allmonitorapi.getMsgAlarmTemplate(),
            allmonitorapi.getMsgAlarmModeAndReceiver(),
            allmonitorapi.getAppAlarmReceiver()
        ]).then(arr=>
        {
            this.scriptTemplates = arr[0].VarDes||[]
            this.deviceTypes = arr[1].data||[]
            this.wechat_Receiver = arr[2].data||[]
            this.email_SenderAndReceiver = arr[3].data||[]
            this.emailTemplates = arr[4].data||[]
            this.emailOps = arr[5].List||[]
            this.smsTemplates = arr[6].data||[]
            this.sms_SenderAndReceiver = arr[7].data||[]
            this.app_Receiver = arr[8].data||[]
        })
      },
      async initAlarmDetail()//初始化告警信息
      {
          let params = {}
          params.GroupId = this.container.split("_")[1]
          params.ccu = this.container.split("_")[0]
          params.AlarmId = this.alarmId
          try
          {
              let result = await allmonitorapi.getAlarmDetail(params)
              result = eval("("+result+")")
              this.alarmTarget.Label = result.Label
              this.alarmTarget.DevList = result.DevList.split(",")
              this.$refs.dTree.setCheckedKeys(this.alarmTarget.DevList)
              this.alarmTarget.Remark = result.Remark

              this.sendTactics.ActionStat = result.ActionStat.split(",")
              this.sendTactics.ActionCondition = result.ActionCondition
              if(this.sendTactics.ActionCondition==2)
              {
                  this.sendTactics.ActionParam1 = result.ActionParam.split(";")[0]
                  this.sendTactics.ActionParam2 = result.ActionParam.split(";")[1]
              }
              else
              {
                  this.sendTactics.ActionParam3 = result.ActionParam.split(";")[0]
                  this.sendTactics.ActionParam4 = result.ActionParam.split(";")[1]
              }

              this.sendTactics.ActionStopCondition = result.ActionStopNum!=-1
              this.sendTactics.sendbeOk = result.sendbeOk!=0  
              this.sendTactics.ActionStopNum = result.ActionStopNum==-1?0:result.ActionStopNum

              for(let i=0;i<result.action.length;i++)
              {
                  if(result.action[i].ActionType==0)
                  {
                      this.sendMode.modes.HasEmail = true
                      this.sendMode.email.EmailList = (arr=>
                      {
                          let narr = []
                          for(let i=0;i<arr.length;i++)
                          {
                              narr.push(parseInt(arr[i]))
                          }
                          return narr
                      })(result.action[i].EmailList.split(","))
                      this.sendMode.email.Email = result.action[i].Email
                      this.sendMode.email.EmailTpl = result.action[i].EmailTpl
                      this.sendMode.email.EmailRecoveryTpl = result.action[i].EmailRecoveryTpl
                      this.sendMode.email.SendSever = result.action[i].SendSever
                  }
                  else if(result.action[i].ActionType==1)
                  {
                      this.sendMode.modes.HasSms = true
                      this.sendMode.sms.SmsList = result.action[i].SmsList.split(",")
                      this.sendMode.sms.Sms = result.action[i].Sms
                      this.sendMode.sms.SmsSendType = result.action[i].SmsSendType.toString()
                      this.sendMode.sms.SmsTpl = result.action[i].SmsTpl
                      this.sendMode.sms.SmsRecoveryTpl = result.action[i].SmsRecoveryTpl
                  }
                  else if(result.action[i].ActionType==2)
                  {
                      this.sendMode.modes.HasSound = true
                      this.sendMode.sound.SoundIp = result.action[i].SoundIp
                      this.sendMode.sound.SoundPort = result.action[i].SoundUser
                      this.sendMode.sound.SoundName = result.action[i].SoundName
                  }
                  else if(result.action[i].ActionType==3)
                  {
                      this.sendMode.modes.HasScript = true
                      this.sendMode.script.ScriptName = result.action[i].ScriptName
                      this.sendMode.script.isRemote = result.action[i].isRemote.toString()
                      this.sendMode.script.isDll = result.action[i].isDll.toString()
                      this.sendMode.script.ArguName = result.action[i].ArguName
                  }
                  else if(result.action[i].ActionType==6)
                  {
                      this.sendMode.modes.HasWechat = true
                      this.sendMode.wechat.WXOther = result.action[i].WXOther
                      this.sendMode.wechat.WXEmailTpl = result.action[i].WXEmailTpl
                      this.sendMode.wechat.WXEmailRecoveryTpl = result.action[i].WXEmailRecoveryTpl
                  }
                  else if(result.action[i].ActionType==7)
                  {
                      this.sendMode.modes.HasAPP = true
                      this.sendMode.app.AppUserList = result.action[i].RecvUserIds.split(",")
                      this.sendMode.app.appTpl = result.action[i].AppTpl
                      this.sendMode.app.appRecoveryTpl = result.action[i].AppRecoveryTpl
                  }
              }
              console.log(result)
          }
          catch(e)
          {
              console.error(e)
          }
      }
  },
  computed:
  {
      ...mapGetters(["company","user"]),
      email_Sender()//邮件发送者
      {
          let arr = []
          for(let i=0;i<this.email_SenderAndReceiver.length;i++)
          {
              if(this.email_SenderAndReceiver[i].type !=1)continue
              arr.push(this.email_SenderAndReceiver[i])
          }
          return arr
      },
      email_Receiver()//邮件接收者
      {
          let arr = []
          for(let i=0;i<this.email_SenderAndReceiver.length;i++)
          {
              if(this.email_SenderAndReceiver[i].type ==1)continue
              arr.push(this.email_SenderAndReceiver[i])
          }
          return arr
      },
      sms_Sender()//短信发送者
      {
          let arr = []
          for(let i=0;i<this.sms_SenderAndReceiver.length;i++)
          {
              if(this.sms_SenderAndReceiver[i].type !=1)continue
              arr.push(this.sms_SenderAndReceiver[i])
          }
          return arr
      },
      sms_Receiver()//短信接收者
      {
          let arr = []
          for(let i=0;i<this.sms_SenderAndReceiver.length;i++)
          {
              if(this.sms_SenderAndReceiver[i].type ==1)continue
              arr.push(this.sms_SenderAndReceiver[i])
          }
          return arr
      }
  },
  created()
  {
    this.init()
  },
  mounted()
  {
    if(this.alarmId)
    {
        this.initAlarmDetail()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.correct
{
    .el-form-item__label{line-height:65px !important;}
}
.instructions
{
    .el-dialog__body{border-top:1px solid #ccc;border-bottom:1px solid #ccc;}
    .el-dialog__footer{padding-top:20px;}
}
</style>
<style lang="scss" scoped>
.step-bar
{
    width:630px;
}

.divbg {
    float: left;
    padding: 0px;
    background-color: #555E6D;
    font-size: 13px;
    line-height:30px;
    text-decoration: none;
    color: #FFFFFF;
    cursor: pointer;
}
.divbg .arrow {
    float: left;
    -ms-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    margin-left: -10px;
    background-color: #555E6D;
    width: 22px;
    height: 22px;
    box-shadow: 2px -2px 0px 0px #6E7277;
    top: 4px;
    position: relative;
}
.divbg.active {
    background-color: #414852;
    font-weight: bold;
    cursor: default;
}
.divbg .active {
    background-color: #414852;
    font-weight: bold;
    cursor: default;
}

.b-box
{
    position: relative;
    padding-top:62px;
    height:100%;

    .b-head
    {
        position:absolute;
        width:100%;
        height:62px !important;
        left:0;
        top:0;
    }
    .b-body
    {
        width:100%;
        height:100%;
        > div
        {
            margin-left:60px;
        }
    }
    .el-input{width:350px;}
    .el-select{width:350px;}
    .el-textarea{width:350px;}
    .small-input
    {    
        width: 20px;
        border: none;
        border-bottom: 1px solid #aaa;
        margin: 0 5px;
        text-align:center;
    }
    .tree-box{height:250px;width:350px;padding-top:10px;border: 1px solid #dcdfe6;border-radius:4px;}
    .el-table{width:350px !important;}
    h3
    {
        font-size:16px;font-weight:bold;color:#333;
    }
}

</style>
