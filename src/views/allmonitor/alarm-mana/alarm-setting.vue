<template>
  <div class="b-alarm-setting">
    <el-container>
      <!--告警分组功能-->
      <el-header>
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
          <el-row>
            <el-button icon="el-icon-circle-plus-outline" @click="handleAddGroup()">新增</el-button>
            <el-button icon="el-icon-edit-outline" @click="handleEditGroup()">编辑</el-button>
            <el-button icon="el-icon-delete-solid" @click="handleDeleteAlarmGroup()">删除</el-button>
            <el-button icon="el-icon-remove-outline" @click="handleOnOrOffAlarmGroup()" v-if="group==''||group.split('_')[2]=='0'">禁止</el-button>
            <el-button icon="el-icon-circle-check" @click="handleOnOrOffAlarmGroup()" v-else>允许</el-button>
            <el-button icon="el-icon-refresh" @click="handleRefresh()">刷新</el-button>
            <el-button icon="el-icon-bell" @click="handleAddAlarm()">添加告警</el-button>
          </el-row>
        </div>
      </el-header>
      <!--告警列表-->
      <el-main>
        <el-table
          :data="alarms"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-row>
                <el-button icon="el-icon-edit-outline" @click="handleEditAlarm(props.row)"></el-button>
                <el-button icon="el-icon-circle-close" @click="handleDeleteAlarm(props.row)"></el-button>
                <el-button icon="el-icon-refresh" @click="handleUpdateAlarm(props.row)"></el-button>
                <el-button icon="el-icon-remove-outline" @click="handleDisableAlarm(props.row)"></el-button>
                <el-button icon="el-icon-video-play" @click="handleTestAlarm(props.row)"></el-button>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="状态" prop="state">
            <template slot-scope="prop">
              <span v-if="prop.row.state==0">正常</span>
              <span v-else>异常</span>
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
      center>
      <el-form ref="groupform" :model="groupform" label-width="80px" >
        <el-form-item label="名称">
          <el-input v-model="groupform.name" type="text"></el-input>
          <el-input v-model="groupform.GroupId" type="hidden"></el-input>
        </el-form-item>
        <el-form-item label="容器">
          <el-select v-model="groupform.ccu" placeholder="请选择" :disabled="groupform.model=='edit'">
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

    <!--抽屉式窗口，该模块是用来添加和编辑告警-->
    <el-drawer
      title="我是外面的 Drawer"
      :visible.sync="alarmDialogVisible"
      size="100%">
        <AlarmDialog />
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
      alarms:[]
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
    async getAlarmByGroup()//通过选中的告警组获取告警信息
    {
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
        params.name = this.group.split("_")[1]
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
        this.$message.success((params.Disabled==0?"启用":"禁用")+"告警组成功！")
        this.getAlarmGroup()//刷新告警组
      }
      else
      {
        this.$message.error((params.Disabled==0?"启用":"禁用")+"告警组失败！")
      }
    },
    handleRefresh()//刷新数据
    {

    },
    handleAddAlarm()//添加告警
    {
      this.alarmDialog = true
    },
    handleEditAlarm(row)//编辑告警
    {

    },
    handleDeleteAlarm(row)//删除告警
    {

    },
    handleUpdateAlarm(row)//更新告警
    {

    },
    handleDisableAlarm(row)//禁用告警
    {

    },
    handleTestAlarm(row)//测试告警
    {

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
<style lang="scss" scoped>
.b-group
{
  float:left;
}
.b-operate
{
  float:right;
}

</style>
