<template>
  <div class="b-alarm-setting">
    <el-container>
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
            <el-button icon="el-icon-delete-solid" @click="handleDeleteGroup()">删除</el-button>
            <el-button icon="el-icon-remove-outline" @click="handleDisableGroup()">禁止</el-button>
            <el-button icon="el-icon-refresh" @click="handleRefresh()">刷新</el-button>
            <el-button icon="el-icon-bell" @click="handleAddAlarm()">添加告警</el-button>
          </el-row>
        </div>
      </el-header>
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
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-form ref="form" :model="groupform" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="groupform.name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="容器">
          <el-input v-model="groupform.ccuname" type="text" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import allmonitorapi from '@/services/models/allmonitor'
export default {
  name: 'AlarmSetting',
  data () {
    return {
      msg: '告警设置',
      centerDialogVisible:false,
      groupform:
      {
        model:'新增告警组',
        name:'',
        ccuname:''
      },
      alarmform:
      {

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
        for(let j=0;j<this.groups[i].alertgroup.length;j++)
        {
          options.push(
            {
              label:this.groups[i].ccuname+"-"+this.groups[i].alertgroup[j].label,
              value:this.groups[i].ccuid+"_"+this.groups[i].alertgroup[j].id
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
    async getAlarmGroup()
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
    async getAlarmByGroup()
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
    handleAddGroup()//新增告警组
    {

    },
    handleEditGroup()//编辑告警组
    {

    },
    handleDeleteGroup()//删除告警组
    {

    },
    handleDisableGroup()//禁用告警组
    {

    },
    handleRefresh()//刷新数据
    {

    },
    handleAddAlarm()//添加告警
    {

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

    },
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
