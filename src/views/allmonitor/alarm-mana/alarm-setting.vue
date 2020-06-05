<template>
  <div class="b-alarm-setting">
    <el-container>
      <!--告警分组功能-->
      <el-header style="border-bottom:1px solid #ccc;">
        <div class="b-group">
          <el-select v-model="group" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="b-operate">
          <el-row style="margin:7px 0;">
            <el-button icon="el-icon-circle-plus-outline" size="small" round @click="handleAddGroup()">新增</el-button>
            <el-button icon="el-icon-edit-outline" size="small" round @click="handleEditGroup()">编辑</el-button>
            <el-button icon="el-icon-delete-solid" size="small" round @click="handleDeleteAlarmGroup()">删除</el-button>
            <el-button icon="el-icon-remove-outline" size="small" round @click="handleOnOrOffAlarmGroup()" v-if="group==''||group.split('_')[2]=='0'">禁止</el-button>
            <el-button icon="el-icon-circle-check" size="small" round @click="handleOnOrOffAlarmGroup()" v-else>允许</el-button>
            <el-button icon="el-icon-refresh" size="small" round @click="handleRefresh()">刷新</el-button>
            <el-button icon="el-icon-bell" size="small" round @click="handleAddAlarm()">添加告警</el-button>
          </el-row>
        </div>
      </el-header>
      <!--告警列表-->
      <el-main style="padding:10px 20px;">
        <el-table
          :data="alarms"
          style="width: 100%;font-size:12px;" 
          center>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-row>
                <el-button icon="el-icon-edit-outline" circle @click="handleEditAlarm(props.row)" class="scale"></el-button>
                <el-button icon="el-icon-circle-close" circle @click="handleDeleteAlarm(props.row)" class="scale"></el-button>
                <el-button icon="el-icon-refresh" circle @click="handleUpdateAlarm(props.row)" class="scale"></el-button>
                <el-button icon="el-icon-remove-outline" circle @click="handleDisableAlarm(props.row)" v-if="props.row.state==0" class="scale"></el-button>
                <el-button icon="el-icon-circle-check" circle @click="handleDisableAlarm(props.row)" v-else class="scale"></el-button>
                <el-button icon="el-icon-video-play" circle @click="handleTestAlarm(props.row)" class="scale"></el-button>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="label"></el-table-column>
          <el-table-column label="状态" prop="state">
            <template slot-scope="prop">
              <span v-if="prop.row.state==0">正常</span>
              <span v-else>禁止</span>
            </template>
          </el-table-column>
          <el-table-column label="动作数量" prop="operationcount"></el-table-column>
          <el-table-column label="发送方式" prop="sendtype"></el-table-column>
        </el-table>
      </el-main>
      <el-footer>
      </el-footer>
    </el-container>
    <!--告警分组编辑窗口-->
    <el-dialog
      :title="groupform.model=='add'?'新增告警组':'编辑告警组'"
      :visible.sync="groupDialogVisible"
      width="30%"
      class="groupdialog"
      center>
      <el-form ref="groupform" :model="groupform" label-width="80px" >
        <el-form-item label="名称">
          <el-input v-model="groupform.name" type="text"></el-input>
          <el-input v-model="groupform.GroupId" type="hidden"></el-input>
        </el-form-item>
        <el-form-item label="容器">
          <el-select v-model="groupform.ccu" placeholder="请选择" :disabled="groupform.model=='edit'" style="width:100%;">
            <el-option
              v-for="item in groups"
              :key="item.ccuid"
              :label="item.ccuname"
              :value="item.ccuid">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="groupDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUoAGroup">确 定</el-button>
      </span>
    </el-dialog>

    <!--监控项测试窗口-->
    <el-dialog
      title="测试监控项"
      :visible.sync="testDialogVisible"
      width="820px"
      class="testdialog"
      @close="handleResetTest"
      center>
        <div class="monitorbox" v-if="testDialogVisible">
          <div>
            <div><label>选择告警设备</label></div>
            <div>
              <el-tree
                ref="dTree"
                show-checkbox
                node-key="id"
                :check-strictly="false"
                :load="loadNode"
                lazy
                :props="deviceProps"
                class="tree-box">
              </el-tree>
            </div>
          </div>
          <div>
            <div><label>选择监测点</label></div>
            <el-radio-group v-model="testTarget">
              <div v-for="(item,index) in monitorList" :key="item.id" style="margin:10px;">
                <el-radio :label="index">{{item.name}}</el-radio>
              </div>
            </el-radio-group>
          </div>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="testDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleTest">确 定</el-button>
      </span>
    </el-dialog>


    <!--抽屉式窗口，该模块是用来添加和编辑告警-->
    <el-drawer
      :title="alarmId==''?'添加告警':'编辑告警'"
      :visible.sync="alarmDialogVisible"
      size="75%"
      :before-close="handleCloseDrawer">
        <AlarmDialog :container="group" :alarmId="alarmId" :refleshAlarm="getAlarmByGroup.bind(this)" ref="alarmDialog"/>
    </el-drawer>
  </div>
</template>

<script>
import allmonitorapi from '@/services/models/allmonitor'
import AlarmDialog from './alarm-dialog/alarm-dialog'
export default {
  name: 'AlarmSetting',
  components:{AlarmDialog},
  data () {
    return {
      msg: '告警设置',
      testDialogVisible:false,
      groupDialogVisible:false,
      alarmDialogVisible:false,
      groupform:
      {
        model:'add',//add or edit
        name:'',
        GroupId:'',
        ccu:''
      },
      group:'',
      groups:[],
      options:[],
      alarms:[],
      alarmId:'',//要编辑的告警ID
      deviceProps:
      {
          label:'name',
          children:'subtree'
      },
      devId:'',
      testAlarm:null,
      testTarget:'',
      monitorList:[]
    }
  },
  watch:
  {
    group()
    {
      this.getAlarmByGroup()
    },
    groups()
    {
      let options = []
      for(let i=0;i<this.groups.length;i++)
      {
        if(!this.groups[i].alertgroup)continue
        for(let j=0;j<this.groups[i].alertgroup.length;j++)
        {
          options.push(
            {
              label:this.groups[i].ccuname+"-"+this.groups[i].alertgroup[j].label,
              value:this.groups[i].ccuid+"_"+this.groups[i].alertgroup[j].id+"_"+this.groups[i].alertgroup[j].state
            }
          )
        }
      }
      this.options = options

      if(this.options.length!=0)
      {
        this.group = this.options[0].value
      }
    }
  },
  methods:
  {
    loadNode(node, resolve)//加载子树
    { 
      let params = {}
      if(node.level!=0)
      {
        node.loaded = false
        node.isLeaf = false
      }
      window._node = node
      if(!node.data||node.data.mxtype != 2)
      {
        let types = []
        params.id = node.key||''
        for(let i=0;i<this.testAlarm.DevTypeList.length;i++)
        {
          types.push('type['+i+']='+this.testAlarm.DevTypeList[i])
        }
        params.extra = types.join("&")

        allmonitorapi.getTestDeviceTree(params).then(result=>
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
                            mxtype:e.mxtype,
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
      else
      {
        node.loaded = true
        node.isLeaf = true
        node.loading = false
        this.DevId = node.key
        this.testTarget = ''
        allmonitorapi.getMonitorByDevice({id:node.key}).then(result=>
        {
          if(result.data&&result.data.length>0)
          {
            this.monitorList = result.data[0].monitor
          }
        })
      }
        

    },
    handleCloseDrawer(done)
    { 
      this.$refs.alarmDialog.step = 0
      this.$refs.alarmDialog.alarmId = ''
      this.$refs.alarmDialog.$refs.alarmTarget.resetFields()
      this.$refs.alarmDialog.$refs.sendTactics.resetFields()
      this.$refs.alarmDialog.$refs.sendMode.resetFields()

      this.$refs.alarmDialog.sendTactics.ActionParam1 = 2
      this.$refs.alarmDialog.sendTactics.ActionParam1 = 3
      this.$refs.alarmDialog.sendTactics.ActionParam1 = 60
      this.$refs.alarmDialog.sendTactics.ActionParam1 = 3
      this.$refs.alarmDialog.sendTactics.ActionStopNum = 0

      this.alarmId = ''
      done()
    },
    async getDeviceTree()
    {
      const result = await allmonitorapi.getDeviceTree()
      this.devTree = result.data||[]
    },
    async getAlarmGroup()//获取告警组
    {
      try
      {
        const result = await allmonitorapi.getAlarmGroup()
        this.groups = result.data||[]
      }
      catch(e)
      {
        this.$message.error("获取告警分组失败")
        console.error(e)
      }
    },
    async getAlarmByGroup(flag)//通过选中的告警组获取告警信息
    {
      if(flag)
      {
        this.alarmDialogVisible = false
      }
      if(!this.group)return
      try
      {
        let params = {}
        params.ccu = this.group.split("_")[0]
        params.GroupId = this.group.split("_")[1]
        const result = await allmonitorapi.getAlarmByGroup(params)
        this.alarms = result.data||[]
      }
      catch(e)
      {
        this.$message.error("获取告警信息失败")
        console.log(e)
      }
    },
    async handleUoAGroup()//编辑和添加告警组
    {
      
      if(!this.groupform.name)
      {
        this.$alert("告警组名称不能为空")
        return
      }
      if(!this.groupform.ccu)
      {
        this.$alert("请选择告警组容器")
        return
      }
      
      try
      {
        let params = {...this.groupform}
        delete params.model
        if(this.groupform.model=='add')//判断是不是新增告警组
        {
          delete params.GroupId
          const result = await allmonitorapi.createAlarmGroup(params)
          if(result.status == 'success')
          {
            this.$message.success("新增告警组成功！")
            this.$refs.groupform.resetFields()
            this.groupDialogVisible = false
            this.getAlarmGroup()//刷新告警组
          }
          else
          {
            this.$message.error("新增告警组失败！")
          }
        }
        else//否则就是更新告警组
        {
          const result = await allmonitorapi.updateAlarmGroup(params)
          if(result.status == 'success')
          {
            this.$message.success("更新告警组成功！")
            this.$refs.groupform.resetFields()
            this.groupDialogVisible = false
            this.getAlarmGroup()//刷新告警组
          }
          else
          {
            this.$message.error("更新告警组失败！")
          }
        }
      }
      catch(e)
      {
        console.error(e)
      }
    },
    handleDeleteAlarmGroup()//删除告警组
    {
      if(!this.group)
      {
        this.$alert("请选择告警组")
        return
      }
      this.$confirm('确认删除告警组?', '提示', 
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let params = {}
        params.ccu = this.group.split("_")[0]
        params.GroupId = this.group.split("_")[1]
        const result = await allmonitorapi.deleteAlarmGroup(params)
        if(result.status == 'success')
        {
          this.$message.success("删除告警组成功！")
          this.getAlarmGroup()//刷新告警组
        }
        else
        {
          this.$message.error("删除告警组失败！")
        }
      }).catch(() => {
        this.$message({type: 'info',message: '已取消删除'})        
      })
    },
    handleAddGroup()//新增告警组
    {
      this.groupform.model = 'add'
      this.groupDialogVisible = true
    },
    handleEditGroup()//编辑告警组
    {
      if(!this.group)
      {
        this.$alert("请选择告警组")
        return
      }
      this.groupform.model = 'edit'
      this.groupform.ccu = this.group.split("_")[0]
      this.groupform.GroupId = this.group.split("_")[1]
      this.groupform.name = ((ccu,gid)=>
      {
        for(let i=0;i<this.groups.length;i++)
        {
          if(!this.groups[i].alertgroup||this.groups[i].ccuid!=ccu)continue
          for(let j=0;j<this.groups[i].alertgroup.length;j++)
          {
            if(this.groups[i].alertgroup[j].id==gid)
            {
              return this.groups[i].alertgroup[j].label
            }
          }
        }
      })(this.groupform.ccu,this.groupform.GroupId)
      this.groupDialogVisible = true
    },
    async handleOnOrOffAlarmGroup()//禁用或启用告警组
    {
      if(!this.group)
      {
        this.$alert("请选择告警组")
        return
      }
      let params = {}
      params.ccu = this.group.split("_")[0]
      params.GroupId = this.group.split("_")[1]
      params.Disabled = this.group.split("_")[2]=="0"?"1":"0"

      const result = await allmonitorapi.changeAlarmGroupStatus(params)
      if(result.status == 'success')
      {
        this.$message.success((params.Disabled==1?"启用":"禁用")+"告警组成功！")
        this.getAlarmGroup()//刷新告警组
      }
      else
      {
        this.$message.error((params.Disabled==1?"启用":"禁用")+"告警组失败！")
      }
    },
    handleRefresh()//刷新数据
    {
      
    },
    handleAddAlarm()//添加告警
    {
      this.alarmDialogVisible = true
    },
    handleEditAlarm(row)//编辑告警
    {
      this.alarmId = row.id
      this.alarmDialogVisible = true
    },
    async handleDeleteAlarm(row)//删除告警
    {
      let params = {}
      params.GroupId = this.group.split("_")[1]
      params.ccu = this.group.split("_")[0]
      params.alarmId = row.id

      try
      {
        const result = await allmonitorapi.removeAlarm(params)
        if(result.status == "success")
        {
          this.$message.success("删除成功")
          this.getAlarmByGroup()
        }
        else
        {
          this.$message.error("删除失败")
        }
      }
      catch(e)
      {
        console.error(e)
      }

    },
    handleUpdateAlarm()
    {
      this.getAlarmByGroup()
    },
    async handleDisableAlarm(row)//禁用告警
    {
      let params = {}
      params.GroupId = this.group.split("_")[1]
      params.ccu = this.group.split("_")[0]
      params.alarmId = row.id
      params.Disabled = row.state==0?1:0
      try
      {
        const result = await allmonitorapi.activeOrDisableAlarm(params)
        if(result.status == "success")
        {
          this.$message.success((params.Disabled==0?"启用":"禁止")+"成功")
          this.getAlarmByGroup()
        }
        else
        {
          this.$message.error((params.Disabled==0?"启用":"禁止")+"失败")
        }
      }
      catch(e)
      {
        console.error(e)
      }

    },
    async handleTestAlarm(row)//测试告警
    {
      let params = {}
      params.GroupId = this.group.split("_")[1]
      params.ccu = this.group.split("_")[0]
      
      params.AlarmId = row.id

      try
      {
        const result = await allmonitorapi.getAlarmDetail(params)
        this.testAlarm = eval("("+result+")")
        this.alarmId = row.id
        this.testDialogVisible = true
      }
      catch(e)
      {
        console.error(e)
      }
    },
    async handleTest()
    {
      if(!this.testTarget)
      {
        this.$alert("必须选择监控项","操作错误")
        return false
      }
      let params = {}
      params.GroupId = this.group.split("_")[1]
      params.ccu = this.group.split("_")[0]
      params.alarmId = this.alarmId
      params.Pluginname = this.monitorList[parseInt(this.testTarget)].pluginname
      params.DevId = this.DevId
      try
      {
        const result = await allmonitorapi.testAlarmMonitor(params)
        if(result.status == "success")
        {
          this.$message.success("已发送，请验证")
          this.testDialogVisible = false
        }
        else
        {
          this.$message.error("发送失败，请与管理员联系")
          this.testDialogVisible = false
        }
      }
      catch(e)
      {
        console.error(e)
      }
    },
    handleResetTest()
    {
      this.alarmTarget = null
      this.testTarget = ''
      this.DevId = ''
      this.monitorList = []
    }
  },
  computed:
  {
    
  },
  created()
  {
    this.getAlarmGroup()
  },
  mounted()
  {
    window._vm = this
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.groupdialog
{
    .el-dialog__body{padding:25px 45px 30px 45px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;}
    .el-dialog__footer{padding-top:20px;}
    .el-form-item{margin:0;}
}
.el-drawer__header{color:#333;font-size:16px;font-weight:bold;text-Indent:20px;}
.el-drawer__body{height:calc(100% - 77px);}

.testdialog
{
  .el-dialog__body{padding:25px 45px 30px 45px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;}
  .el-dialog__footer{padding-top:20px;}
}
</style>
<style lang="scss" scoped>
.b-group
{
  float:left;
  margin:10px 0;
}
.b-operate
{
  float:right;
  margin:10px 0;
  padding-right:60px;
}
.scale
{
  font-size:18px;
  padding:0 !important;
  border:none !important;
}

.monitorbox
{
  height:337px;
  > div
  {
    height:100%;
    border-radius:4px;
    border:1px solid #cccc;
    float:left;
    > div:nth-of-type(1)
    {
      width:100%;
      padding:12px 0;
      font-size:12px;
      background:#f2f2f2;
      color:#666;
      > label{margin-left:6px;}
    }
    > div:nth-of-type(2)
    {
      height:300px;
      border-top:1px solid #ccc;
      width:100%;
      overflow:auto;
    }
  }
  > div:nth-of-type(1)
  {
    width:400px;
  }
  > div:nth-of-type(2)
  {
    width:300px;
    margin-left:25px;
  }
}
.tree-box{padding-top:10px;}
</style>
