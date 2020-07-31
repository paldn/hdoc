<template>
  <div style="height:100%;">
    <el-header style="border-bottom:1px solid #ccc;">
      <div class="header-inner">
        <div style="float:left; margin-left:10px; margin-top: 5px; height:19px; line-height:19px;">
          <div style="float:left;font-size:14px;margin-right:13px;">
              监测总数:
              <router-link to="/view-display/monitoring-view" style="color:#3c8dbc;">{{deviceCount}}</router-link>
              个设备的
              <router-link to="/view-display/monitoring-view" style="color:#eb5d5d;">{{monitorCount}}</router-link>
              个监测点。 
          </div>
          <div v-for="item in monitorStatus" :key="item.key" class="monit-status-node">
            <span title="item.label" :class="{'st-square':true,[item.color]:true}"></span>
            <el-button type="text" size="mini" @click="alarmStatus = item.status;">{{item.count}}</el-button>
          </div>
        </div>
        <div style="float:right;" class="dev-operation">
          <el-input placeholder="请输入内容" v-model="search" class="monit-search" v-show="showWhat == 'tree'">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
          <el-button size="small" v-show="showWhat == 'table'" @click="cancelTable">返回</el-button>
          <el-button size="small" class="trash">回收站</el-button>
          <el-button size="small">刷新</el-button>
          <el-button size="small">全屏</el-button>
        </div>
      </div>
    </el-header>
    <el-main class="flex-box">
      <!--监控管理树-->
      <div class="content" v-show="showWhat == 'tree'">
        <div class="title">
          <div>名称</div>
          <div>类型</div>
          <div>
            <el-select v-model="tree_datatime" class="sort_datatime">
              <el-option label="最新数据时间" value="0"></el-option>
              <el-option label="最近正确时间" value="1"></el-option>
            </el-select>
          </div>
          <div><span style="margin-left:15px;">操作</span></div>
        </div>
        <div class="body">
          <el-tree
            ref="dTree"
            node-key="id"
            :load="loadNode"
            :default-expanded-keys="expanded_keys"
            lazy
            :props="defaultProps"
            v-model="devices"
            :render-content="renderContent">
          </el-tree>
        </div>
      </div>
      <!--监控分类统计表格-->
      <div class="content" v-show="showWhat == 'table'">
        <el-table
          :data="alarmTable.data"
          :span-method="objectSpanMethod"
          border
          style="width: 100%; margin-top: 20px;font-size:12px;">
          <el-table-column
            prop="deviceName"
            label="设备名称">
          </el-table-column>
          <el-table-column
            prop="monitorName"
            label="监测点名称">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="monitorIndex"
            label="指标">
          </el-table-column>
          <el-table-column
            prop="val"
            label="值">
          </el-table-column>
          <el-table-column
            prop="warnThreshold"
            label="危险阈值"
            width="110">
          </el-table-column>
          <el-table-column
            prop="faultThreshold"
            label="故障阈值"
            width="110">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="最近更新时间">
          </el-table-column>
          <el-table-column
            prop="monitorId"
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handlePostion(scope.rows.monitorId)">
                <i class="iconfont icon-zhuandao"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next, jumper"
          :total="alarmTable.total"
          :background="true"
          :page-size="alarmTable.size"
          :currentPage="alarmTable.page"
        ></el-pagination>
      </div>
      </div>
    </el-main>
    <!--查询结果的弹出窗口-->
    <el-dialog
      title="查询结果"
      :visible.sync="searchDialogVisible"
      center 
      width="850">
      <el-table 
        :data="searchDevList"
        border
        height="400"
        style="width: 100%; margin-top: 20px;font-size:12px;">
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="IP">
        </el-table-column>
        <el-table-column
          prop="objtypelabel"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径">
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="searchDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="searchDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--抽屉式窗口，该模块是用来添加设备-->
    <el-drawer
      title=""
      :visible.sync="deviceAddVisible"
      size="80%"
      :before-close="handleCloseDeviceAddDrawer">
        <DeviceAdd v-if="deviceAddVisible" @handleClose="handleCloseAddEntityBox" :parentNode="targetNode"/>
    </el-drawer>
    <!--抽屉式窗口，该模块是用来编辑设备-->
    <el-drawer
      title=""
      :visible.sync="deviceEditVisible"
      size="80%"
      :before-close="handleCloseDeviceEditDrawer">
        <DeviceEdit v-if="deviceEditVisible" @handleClose="handleCloseEditEntityBox" :node="targetNode"/>
    </el-drawer>
  </div>
</template>

<script>
import allmonitorapi from '@/services/models/allmonitor'
import DeviceAdd from './device-mana-childs/device-add'
import DeviceEdit from './device-mana-childs/device-edit'
export default {
  name: 'DeviceMana',
  components:{DeviceAdd,DeviceEdit},
  data () {
    return {
      search:"",
      searchDialogVisible:false,
      searchDevList:[],
      showWhat:"tree",//tree展现树，table展现分类表格
      deviceCount:0,
      monitorCount:0,
      monitorStatus:[
        {status:1,color:"st-square-green",count:0,key:"normal",label:"正常"},
        {status:2,color:"st-square-yellow",count:0,key:"danger",label:"危险"},
        {status:3,color:"st-square-red",count:0,key:"fault",label:"故障"},
        {status:0,color:"st-square-grey",count:0,key:"unkown",label:"未知"},
        {status:5,color:"st-square-ban",count:0,key:"prohibit",label:"禁止"}
      ],
      tree_datatime:'0',
      expanded_keys:[],
      devices:[],
      defaultProps: 
      {
        children: 'subtree',
        label: 'name'
      },
      alarmStatus:-1,
      alarmTable:
      {
        page:1,
        total:0,
        size:100,
        data:[]
      },
      targetNode:null,
      deviceAddVisible:false,
      deviceEditVisible:false
    }
  },
  watch:
  {
    alarmStatus(n,o)
    {
      if(n == -1)return
      this.showWhat = 'table'
      this.alarmTable.page = 1
      this.handleCurrentChange(1)
    }
  },
  methods:
  {
    handleCloseAddEntityBox()
    {
      this.deviceAddVisible = false
    },
    handleCloseDeviceAddDrawer(done)
    {
      done()
      //刷新数据



    },
    handleCloseEditEntityBox()
    {
      this.deviceEditVisible = false
    },
    handleCloseDeviceEditDrawer(done)
    {
      done()
      //刷新数据



    },

    handlePostion(monitorId)
    {
      console.log(monitorId)
    },
    async handleSearch()
    {
      if(!this.search)
      {
        this.$message.info("请输入搜索内容！")
        return
      }
      try
      {
        let params = 
        {
          opType:'getdev',
          bGetPath: 1,
          nodetype: 0,
          stringtype: 0,
          isall: 0,
          onlysub: 0,
          nameorip: this.search
        }
        const result = await allmonitorapi.getSearchDevice(params)
        this.searchDevList = result.data||[]
        this.searchDialogVisible = true
      }
      catch(e)
      {
        this.$message.error("搜索设备失败！")
      }
    },
    cancelTable()
    {
      this.alarmStatus = -1
      this.showWhat = 'tree'
    },
    async handleCurrentChange(page)
    {
      this.alarmTable.page = page
      try
      {
        let params = {}
        params.dotype = ''
        params.toford = ''
        params.page = this.alarmTable.page
        params.mon_status = this.alarmStatus
        let result = await allmonitorapi.getAllMonitors(params)
        result = result.substr(1)
        result = result.substr(0,result.length-2)
        result = JSON.parse(result)

        this.alarmTable.total = parseInt(result.sumpage)*this.alarmTable.size
        let statusMap = 
        {
          "1":"正常",
          "2":"危险",
          "3":"故障",
          "0":"未知",
          "5":"禁用"
        }
        let deviceMaps = {}
        let tableData = []
        if(result.data == "null")
        {
          result.data = []
        }
        for(let i=0;i<result.data.length;i++)
        {
          tableData.push(
            {
              deviceName:result.data[i].devname,
              monitorName:result.data[i].monitorname,
              status:statusMap[result.data[i].status+""],
              monitorIndex:result.data[i].VUZHIBAO[0].zhibiao,
              val:result.data[i].VUZHIBAO[0].value,
              warnThreshold:result.data[i].VUZHIBAO[0].warning,
              faultThreshold:result.data[i].VUZHIBAO[0].err,
              updateTime:result.data[i].time,
              monitorId:result.data[i].MONITOR_id
            }
          )
          if(!deviceMaps[result.data[i].devname])
          {
            deviceMaps[result.data[i].devname] = {data:[]}
          }
          deviceMaps[tableData[i].deviceName].data.push(tableData[i])
        }

        for(let k in deviceMaps)
        {
          deviceMaps[k].data[0].rows = deviceMaps[k].data.length
          for(let i=1;i<deviceMaps[k].data.length;i++)
          {
            deviceMaps[k].data[i].rows = 0
          }
        }

        this.alarmTable.data = tableData
      }
      catch(e)
      {
        console.error(e)
        this.$message.error("获取监控信息失败")
      }
    },
    loadNode(node, resolve)//加载子树
    { 
      if(node.level==0)
      {
          allmonitorapi.getManageTree().then(result=>
          {
              let treeData = []
              let expanded_keys = []
              result.data.splice(0,1).forEach(e => {
                  treeData.push(
                      {
                          id:e.id,
                          name:e.name,
                          icon:e.icon,
                          parentId:node.key,
                          extra:{...e},
                          subtree:[]
                      }
                  )
                  expanded_keys.push(e.id)
              })
              this.expanded_keys = expanded_keys
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
          allmonitorapi.getManageSubTree(node.key).then(result=>
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
                              extra:{...e},
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
    objectSpanMethod({ row, column, rowIndex, columnIndex }) 
    {
      if (columnIndex === 0) {
        console.log(row.rows)
        if(row.rows==0)
        {
          return {rowspan:0,colspan:0}
        }
        else
        {
          return {rowspan:row.rows,colspan:1}
        }

        
      }
    },
    async getAlarmCount()
    {
      try
      {
        let result = await allmonitorapi.getAlarmCount()
        result = result.substr(1)
        result = result.substr(0,result.length-2)
        result = JSON.parse(result)
        this.deviceCount = result.devsum
        this.monitorCount = result.monitorsub
        this.monitorStatus[0].count = result.good
        this.monitorStatus[1].count = result.worning
        this.monitorStatus[2].count = result.err
        this.monitorStatus[3].count = result.unknow
        this.monitorStatus[4].count = result.ban
      }
      catch(e)
      {
        this.$message.error("获取监控统计信息失败")
      }
    },
    handleSelectStatus(status)
    {

    },
    init()
    {
      
    },
    handleDetail(node)
    {
      console.log("节点详情")
      var ev = window.event || arguments.callee.caller.arguments[0]
      ev.stopPropagation();
    },
    handleEdit(node)
    {

      var ev = window.event || arguments.callee.caller.arguments[0]
      ev.stopPropagation();
      console.log("编辑节点")
    },
    handleMore(node,action)
    {
      console.log(action)
      console.log("更多操作")
      console.log(node)
    },
    handleTest(node)
    {
      var ev = window.event || arguments.callee.caller.arguments[0]
      ev.stopPropagation();
      console.log("测试")
    },
    handleAddDevice(node)
    {
      this.targetNode = node
      this.deviceAddVisible = true
      var ev = window.event || arguments.callee.caller.arguments[0]
      ev.stopPropagation();
      console.log("添加设备")
    },
    handleAddMonitor(node)
    {
      this.targetNode = node
      this.deviceEditVisible = true
      var ev = window.event || arguments.callee.caller.arguments[0]
      ev.stopPropagation();
      console.log("添加监测点")
    },
    handleAddGroup(node)
    {
      var ev = window.event || arguments.callee.caller.arguments[0]
      ev.stopPropagation();
      console.log("添加组")
    },
    handleBatchAdd(node,action)
    {
      console.log(action)
      console.log("批量添加")
      console.log(node)
    },
    renderContent(h, { node, data, store })
    {
      let status = ['#a6a6a6','#3db58d','#edb845','#eb5d5d','#000']
      let icon = (e=>
      {
        //状态0，1，2，3，4
        let status = ['grey','green','yellow','red','ban']
        let url = ''
        switch(e.mxtype)
        {
          case 2:
            url = e.icon+'-'+status[e.state]+'.svg'
            break;
          case 3:
            url = 'dir-'+status[e.state]+'.svg'
            break;
          case 4:
          case 5:
            url = 'vessel-'+status[e.state]+'.svg'
            break;
          case 6:
            url = 'company-'+status[e.state]+'.svg'
            break;
        }
        return url
      })(data.extra)
      let monit_style = 'margin:5px 0;display:block;width:10px;height:10px;'
      if(data.extra.mxtype==1)//如果是监控项
      {
        monit_style += "background:"+status[data.extra.state]+";"
      }
      icon = '/static/images/svg/devices/'+icon

      return (
        <div class="node" on-click={this.handleDetail.bind(this,data)}>
          <div>
            <span style="display:inline-block;vertical-align:middle;">
              {data.extra.mxtype==1?<i style={monit_style}></i>:<object data={icon} type="image/svg+xml"></object>}
            </span>
            <span style="margin-left:5px;vertical-align:middle;">{data.name}</span>
          </div>
          <div>{data.extra.objtypelabel}</div>
          <div>{data.extra.cfgdownloadtime}</div>
          <div>
            {data.extra.mxtype>=4?
              <el-select placeholder="更多" class="more" value="更多" on-change={(v)=>{this.handleMore(data,v)}}>
                <el-option label="排序" value="0" on-click={this.handleMore.bind(this,data,0)}></el-option>
                <el-option label="粘贴" value="1" on-click={this.handleMore.bind(this,data,1)}></el-option>
              </el-select>:null
            }
            {data.extra.mxtype==3?
              <el-select placeholder="更多" class="more" value="更多" on-change={(v)=>{this.handleMore(data,v)}}>
                <el-option label="添加告警" value="1"></el-option>
                <el-option label="复制" value="2"></el-option>
                <el-option label="剪切" value="3"></el-option>
                <el-option label="粘贴" value="3"></el-option>
                <el-option label="禁止" value="4"></el-option>
                <el-option label="属性" value="5"></el-option>
                <el-option label="排序" value="6"></el-option>
                <el-option label="导出设备" value="7"></el-option>
                <el-option label="导出监测点" value="8"></el-option>
              </el-select>:null
            }
            {data.extra.mxtype==2?
              <el-select placeholder="更多" class="more" value="更多" on-change={(v)=>{this.handleMore(data,v)}}>
                <el-option label="删除" value="0"></el-option>
                <el-option label="添加告警" value="1"></el-option>
                <el-option label="复制" value="2"></el-option>
                <el-option label="剪切" value="3"></el-option>
                <el-option label="粘贴" value="4"></el-option>
                <el-option label="临时禁止" value="5"></el-option>
                <el-option label="禁止" value="6"></el-option>
                <el-option label="属性" value="7"></el-option>
                <el-option label="排序" value="8"></el-option>
                <el-option label="Ping" value="9"></el-option>
              </el-select>:null
            }
            {data.extra.mxtype==1?
              <el-select placeholder="更多" class="more" value="更多" on-change={(v)=>{this.handleMore(data,v)}}>
                <el-option label="删除" value="0"></el-option>
                <el-option label="临时禁止" value="1"></el-option>
                <el-option label="禁止" value="2"></el-option>
                <el-option label="强制测试" value="3"></el-option>
              </el-select>:null
            }
            {(data.extra.mxtype<=2&&data.extra.mxtype>=1)?<div style="margin-left:5px;"><el-button type="text" class="test" on-click={this.handleTest.bind(this,data)}>测试</el-button></div>:null}
            <div style="margin-left:5px;"><el-button type="text" class="edit" on-click={this.handleEdit.bind(this,data)}>编辑</el-button></div>
            {(data.extra.mxtype<6&&data.extra.mxtype>=3)?<div style="margin-left:5px;"><el-button type="text" class="group_add" on-click={this.handleAddGroup.bind(this,data)}>添加组</el-button></div>:null}
            {data.extra.mxtype==2?<div style="margin-left:5px;"><el-button type="text" class="monitor_add" on-click={this.handleAddMonitor.bind(this,data)}>添加监测点</el-button></div>:null}
            {(data.extra.mxtype<6&&data.extra.mxtype>=3)?<div style="margin-left:5px;"><el-button type="text" class="dev_add" on-click={this.handleAddDevice.bind(this,data)}>添加设备</el-button></div>:null}
            {(data.extra.mxtype<6&&data.extra.mxtype>=4)?
            <el-select placeholder="批量添加" class="batch_add" value="批量添加" on-change={(v)=>{this.handleBatchAdd(data,v)}}>
              <el-option label="批量添加设备" value="0"></el-option>
              <el-option label="下载设备模板" value="1"></el-option>
              <el-option label="批量添加监控点" value="2"></el-option>
              <el-option label="下载监控点模板" value="3"></el-option>
            </el-select>:null
            }
          </div>
        </div>
      )
    }
  },
  mounted()
  {
    this.getAlarmCount()
    window._vm = this
  }
}
</script>
<style lang="scss">
.flex-box{height:calc(100% - 60px);width:100%;}
.sort_datatime
{
  width:120px;
  .el-input__inner{height:24px !important;border:none;line-height:24px !important;background:rgba(0,0,0,0);font-size:12px !important;color:#000 !important;font-weight:bold !important;}
  .el-select__caret{line-height:24px !important;font-size:12px !important;color:#000 !important;font-weight:bold !important;}
  .el-input__inner::-webkit-input-placeholder{color:#000 !important;font-weight:bold !important;}
  .el-input__inner::-moz-placeholder{color:#000 !important;font-weight:bold !important;}
  .el-input__inner::-ms-input-placeholder{color:#000 !important;font-weight:bold !important;}
  .el-input__inner::placeholder{color:#000 !important;font-weight:bold !important;}
}

.header-inner
{
  height: 34px;
  padding: 15px 20px 10px 20px;
  background-color: #edeef3 !important;
  font-size:12px;
  .monit-search
  {
    width:350px;
    > input
    {
      height:34px !important;
      line-height:34px !important;
      font-size:12px !important;
      color:#333 !important;
      font-weight:bold !important;
      border-color:#ccc;
    }
    > input:hover
    {
      border-color:#ccc;
    }
  }
  button{font-size:12px;margin:5px 0 5px 10px;border-radius:4px;}
  .trash{background:#414852;border:1px solid #414852;color:#eee;}
}



.el-tree-node__content {height:33px;border-top:1px solid #ddd;}
.node
{
  width:100%;
  font-size:12px !important;
  padding:3px 0;
  
  display:flex;
  > div{float:left;height:24px;}
  > div:nth-of-type(1){flex:1;}
  > div:nth-of-type(2){width:280px;line-height:24px;}
  > div:nth-of-type(3){width:180px;line-height:24px;}
  > div:nth-of-type(4)
  {
    width:360px;
    
    color:#111 !important;
    > div{float:right;}
    .batch_add{width:95px;padding:0 !important;}
    .dev_add{padding:0 !important;}
    .group_add{padding:0 !important;}
    .monitor_add{padding:0 !important;}
    .edit{padding:0 !important;}
    .test{padding:0 !important;}
    .more{width:70px;padding:0 !important;}
    .el-input__inner{height:24px !important;border:none;line-height:24px !important;background:rgba(0,0,0,0);font-size:12px !important;}
    .el-select__caret{line-height:24px !important;font-size:12px !important;color:#000;}
    .el-button{font-size:12px !important;line-height:24px !important;}
    .el-button:hover{text-decoration: underline;}
    .el-input__inner::-webkit-input-placeholder{color:#000;}
    .el-input__inner::-moz-placeholder{color:#000;}
    .el-input__inner::-ms-input-placeholder{color:#000;}
    .el-input__inner::placeholder{color:#000;}
  }
}

.el-drawer__header{display: none;}
.el-drawer__body{height:calc(100% - 77px);}

.fixed{overflow: hidden;}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.monit-status-node
{
  float:left;
  margin:0 15px;
  > button{padding:0;}
}
.st-square {cursor:pointer;margin-right: 6px;width: 9px;height: 9px;display: inline-block;}
.st-square.green, .st-square-green {background-color: #3db58d;}
.st-square.yellow, .st-square-yellow {background-color: #edb845;}
.st-square.red, .st-square-red {background-color: #eb5d5d;}
.st-square.grey, .st-square-grey {background-color: #a6a6a6;}
.st-square.ban, .st-square-ban {background-color: black;}
.dev-operation
{
  > *
  {
    float:left
  }
}


.content
{
  background:#fff;
  border-radius:4px;
  margin:10px 20px;
  padding-bottom:20px;
}

.title
{
  padding:0 20px;
  display:flex;
  > div{float:left;height:36px;line-height:36px;font-size:14px;color:#111;font-weight:bold;}
  div:nth-of-type(1){flex:1;}
  div:nth-of-type(2){width:280px;}
  div:nth-of-type(3){width:180px;}
  div:nth-of-type(4){width:360px;}
  select{border:none;background:none;padding:0;margin:0;}
  option{background:#f1f1f1;border:1px solid #ccc;}
  option:focus{outline:none;border:1px solid #ccc;}
}
.body
{
  padding:0 20px;
}


.pagination {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
}
</style>
