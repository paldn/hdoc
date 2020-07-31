<template>
  <div class="device_add">
    <div>
      <div class="device_title">
        <div v-if="parentNode.extra.mxtype == 6" style="background:url(/static/images/svg/devices/company-green.svg) left center no-repeat;"></div>
        <div v-else-if="parentNode.extra.mxtype == 5" style="background:url(/static/images/svg/devices/vessel-green.svg) left center no-repeat;"></div>
        <div v-else-if="parentNode.extra.mxtype == 4" style="background:url(/static/images/svg/devices/vessel-green.svg) left center no-repeat;"></div>
        <div v-else style="background:url(/static/images/svg/devices/dir-green.svg) left center no-repeat;"></div>
        <span>{{parentNode.name}}</span>
        <span>-添加设备</span>
        <span v-show="selectEntityTypeKey!=''">-{{selectEntityTypeName}}</span>
      </div>
    </div>
    <div>
      <!--设备模板-->
      <div class="content entity-templates" v-show="optMode == 'showEntityTemplates'">
        <el-tabs v-model="entityActive" @tab-click="handleTabClick">
          <el-tab-pane v-for="item in entityTemplates" :name="item.Id" :key="item.Id">
            <div slot="label" 
              :class="{tabtitle:true,[item.Id+'-background']:true,active:entityActive==item.Id}" 
              @mouseover="handleTabOver(item.Id)">
              <span>{{item.Label}}</span>
            </div>
            <div>
              <el-collapse style="padding:10px 20px;">
                <el-collapse-item v-for="citem in item.EntityGroups" :key="citem.Id">
                  <template slot="title">
                    <span style="color: #48946b;">
                      {{citem.Label}}
                    </span>
                    <i class="header-icon el-icon-info" style="margin-left:5px;color:#666;" @click="showUsedTemplates($event,citem)"></i>
                  </template>
                  <div>
                    <div v-for="ccitem in citem.Entities" 
                      :key="ccitem.Id" 
                      class="device-model"
                      @click="addEntityNow(citem.Id,ccitem.Id,ccitem.Label)">
                        <div>
                          <div>
                            <img :src="'/static'+ccitem.Icon"/>
                          </div>
                          <div>
                            <p>{{ccitem.Label}}</p>
                          </div>
                        </div>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--添加设备表单-->
      <div class="content template-form" v-show="optMode == 'showAddDeviceForm'">
        <div v-show="step==1">
          <div><h3>基本设置</h3></div>
          <div>
            <div>
            <el-form ref="form" v-model="form" label-width="240px" style="width:800px;">
              <el-form-item v-for="item in form" :label="item.label" :key="item.name">
                  <el-input v-if="item.ctltype=='textbox'" v-model="item.value"/>
                  <el-select v-if="item.ctltype=='combobox'" v-model="item.value" style="width:100%;">
                    <el-option v-for="citem in item.dropcontent" 
                      :key="citem.id" 
                      :label="item.name" 
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <el-input v-if="item.ctltype=='gis'" placeholder="请选择位置" v-model="item.value" :disabled="true">
                    <el-button slot="append" icon="el-icon-location" @click="showBaiduMap(item)"></el-button>
                  </el-input>
              </el-form-item>
            </el-form>
            </div>
          </div>
          <div>
            <el-button type="info" @click="handleCancel">取消</el-button>
            <el-button type="info" @click="handleNextStep">下一步</el-button>
          </div>
        </div>
        <div v-show="step==2">
          <div><h3>添加监测点</h3></div>
          <div>
            <div>
              <div v-for="item in monit_points" :key="item.plugInName">
                <el-checkbox :label="item.name" v-model="item.isChecked"></el-checkbox>
              </div>
            </div>
          </div>
          <div>
            <el-button type="info" @click="handleCancel">取消</el-button>
            <el-button type="info" @click="handleAddMonitPoint">添加</el-button>
          </div>
        </div>
      </div>
      <!--测试设备监控点-->
      <div class="content test-result" v-show="optMode == 'showTestMonitor'">
        <div>
          <div><h3>测试结果</h3></div>
          <div>
            <div>
              <el-table
                :data="test_monit_result"
                border
                style="width: 100%; margin-top: 5px;font-size:12px;">
                <el-table-column
                  prop="monitorname"
                  label="监控点">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态">
                </el-table-column>
                <el-table-column
                  prop="result"
                  label="测试结果">
                </el-table-column>
              </el-table>
            </div>
            <div>
              <el-progress :text-inside="true" :stroke-width="26" :percentage="progress" color="#00c0ef"></el-progress>
            </div>
          </div>
          <div>
            <el-button type="info" @click="handleExit()">完成</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="适用设备型号"
      :visible.sync="dialogVisible"
      center 
      :modal="false"
      width="40%">
      <div>
        <el-table
          :data="usedList"
          border
          style="width: 100%;font-size:12px;">
          <el-table-column
            prop="name"
            label="设备名称">
          </el-table-column>
          <el-table-column
            prop="etype"
            label="适用型号">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="text">取 消</el-button>
        <el-button type="info" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择地图位置"
      :visible.sync="baiduMapVisible"
      center 
      :modal="false"
      width="40%">
      <div>
        <baidu-map
          :center="baiduMapConf.center" 
          style="height:480px;" 
          :zoom="baiduMapConf.zoom"
          :scroll-wheel-zoom="true"
          @ready="handleReady"
           @click="handlePosition">
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <bm-map-type :map-types="['BMAP_NORMAL_MAP','BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
          <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
        </baidu-map>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="baiduMapVisible = false">确 定</el-button>
        <el-button @click="baiduMapVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import allmonitorapi from '@/services/models/allmonitor'
export default {
  name: 'DeviceAdd',
  props:{parentNode:Object},
  data () {
    return {
      dialogVisible:false,
      baiduMapVisible:false,
      baiduMapConf:
      {
        center:{lng:0,lat:0},
        zoom:13,
        model:null
      },
      entityTemplates:[],
      entityActive:"",
      deviceId:"",
      monit_points:[],
      monit_point_list:[],
      test_monit_result:[],
      selectEntityTypeKey:"",
      selectEntityTypeName:"",
      usedList:[],
      step:1,
      form:{},
      /*
        showEntityTemplates 显示设备模板，
        showAddDeviceForm 显示添加设备的表单，
        showTestMonitor 显示测试设备模块
       */
      optMode:"showEntityTemplates",
      progress:20
    }
  },
  watch:
  {
    deviceId()
    {
      if(!this.deviceId)return

      this.step = 2

      let params = 
      {
        opType:9,
        devId:this.deviceId
      }

      let flag = true

      allmonitorapi.opMonitPoint(params).then(res=>
      {
        if(res.status != "success")
        {
          flag = false
        }
      })

      if(!flag)
      {
        this.$message.error("重新读取属性失败")
        return false
      }

      params.opType = 1
      allmonitorapi.opMonitPoint(params).then(res=>
      {
        let monit_points = res.data||[]
        for(let i=0;i<monit_points.length;i++)
        {
          this.monit_points.push(
            {
              ...monit_points[i],
              isChecked:false
            }
          )
        }
      })
    },
    monit_point_list()
    {
      if(this.monit_point_list.length==0)return
      this.test_monit_points()
    }
  },
  methods:
  {
    handleExit()
    {
      this.$emit("handleClose")
    },
    async test_monit_points()
    {
      let clock = ''
      try
      {
        const result = await allmonitorapi.beginTestMonitor({deviceId:this.deviceId,force:0})
        clock = result.id
      }
      catch(e)
      {
        this.$message.error("请求失败")
      }

      if(clock)
      {

        let test_monit = ()=>
        {
          let remain = 1
          let data = null
          try
          {
            allmonitorapi.getTestMonitorResult({clock}).then(res=>
            {
              if(res.remain==1)
              {
                setTimeout(test_monit,1000)
              }
              else
              {
                data = res.data||[]
                data = data[0]==null?[]:data
                this.test_monit_result = data
                this.progress = 100
              }
            })
          }
          catch(e)
          {
            this.$message.error("请求失败")
          }

        }
        test_monit()
      }
    },
    showBaiduMap(item)
    {
      this.baiduMapConf.model = item
      this.baiduMapVisible = true
    },
    handleReady({BMap,map})
    {
      this.baiduMapConf.center.lng = 116.403963
      this.baiduMapConf.center.lat = 39.915119
    },
    handlePosition(e)
    {
      this.baiduMapConf.center.lng = e.point.lng
      this.baiduMapConf.center.lat = e.point.lat

      this.baiduMapConf.model.value = e.point.lng+","+e.point.lat
    },
    async handleAddMonitPoint()
    {
      let params = 
      {
        opType:2,
        total:0,
        devId:this.deviceId
      }

      for(let i=0;i<this.monit_points.length;i++)
      {
        if(!this.monit_points[i].isChecked)continue
        params["Label"+(i+1)] = this.monit_points[i].name
        params["pluginName"+(i+1)] = this.monit_points[i].plugInName
        params.total ++
      }
      if(params.total==0)
      {
        this.$message.error("至少选择一个监测点")
        return false
      }
      try
      {
        const result = await allmonitorapi.opMonitPoint(params)
        if(result.status=="success")
        {
          this.optMode = "showTestMonitor"
          this.monit_point_list = result.list||[]
        }
        else
        {
          this.$message.error("添加监测点失败")
        }
      }
      catch(e)
      {
        this.$message.error("请求失败")
      }
    },
    handleCancel()
    {
      this.form = {};
      this.selectEntityTypeKey = "";
      this.selectEntityTypeName = "";
      this.step = 1
      this.monit_points = []
      this.monit_point_list = []
    },
    //下一步
    async handleNextStep()
    {
      for(let i in this.$refs.form.$children)
      {
        if(!this.$refs.form.$children[i].$children[1].value)
        {
          this.$message.info(this.$refs.form.$children[i].label+"不能为空")
          this.$refs.form.$children[i].$children[1].focus()
          return false
        }
      }

      let params = 
      {
        deviceType:this.selectEntityTypeKey,
        parentId:this.parentNode.id,
        form:{}
      }
      for(let k in this.form)
      {
        params.form[k] = this.form[k].value
      }
      try
      {
        const result = await allmonitorapi.addEntity(params)
        if(result.status == "success")
        {
          this.deviceId = result.devid
        }
        else
        {
          this.$message.error("添加设备失败")
        }
      }
      catch(e)
      {
        console.error(e)
        this.$message.error("请求失败")
      }


    },
    async addEntityNow(pid,id,label)
    {
      try
      {
        let params = {}
        params.parentId = pid
        params.deviceType = id
        const result = await allmonitorapi.getEntityInputProperty(params)

        let form = {}
        for(let i=0;i<result.data.length;i++)
        {
          form[result.data[i].name] = {...result.data[i]}
        }
        this.form = form
        this.optMode = "showAddDeviceForm"
        this.selectEntityTypeKey = id
        this.selectEntityTypeName = label
      }
      catch(e)
      {
        this.$message.error("请求失败")
      }
    },
    async showUsedTemplates(evt,item)
    {
      evt.stopPropagation();
      try
      {
        let params = {}
        params.etype = (()=>
        {
          let etype = []
          for(let i=0;i<item.Entities.length;i++)
          {
            etype.push({etype:item.Entities[i].Id})
          }
          return etype
        })()
        const result = await allmonitorapi.getUsedTemplates(params)
        if(result.status == "success")
        {
          this.usedList = result.data.etype
          this.dialogVisible = true
        }
        else
        {
          this.$message.error(`${result.errmsg}`)
        }
      }
      catch(e)
      {
        console.error(e)
        this.$message.error("请求失败")
      }
    },
    handleTabOver(activeName)
    {
      this.entityActive = activeName
    },
    handleTabClick(tab,event)
    {
      console.log(tab,event)
    },
    async getEntityTemplates()
    {
      try
      {
        let params = {}
        params.gtid = ''
        const result = await allmonitorapi.getEntityTemplates(params)
        if(result.status == "success")
        {
          this.entityTemplates = result.data
          if(this.entityTemplates.length>0)
          {
            this.entityActive = this.entityTemplates[0].Id
          }
          this.$message.success("获取模板成功")
        }
        else
        {
          this.$message.error("获取模板失败")
        }
      }
      catch(e)
      {
        this.$message.error("请求失败")
      }
    }
  },
  mounted()
  {
    this.getEntityTemplates()
    window._vm = this
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.device_add
{
  width:100%;
  height:100%;


  > div:nth-of-type(1)
  {
    height:60px;
    padding:0 20px;
    
  }
  > div:nth-of-type(2)
  {
    height:calc(100% - 60px);
  }
}
.device_title
{
  color:#111;
  font-weight: bold;
  font-size:16px;
  > *{float:left;line-height:60px;}
  > div{padding:30px 0px 30px 30px;}
}


.content{padding-left:15px;height:100%;}

.tabtitle{padding-left:30px;}
.Server-background{background:url("/static/images/svg/devices/server-grey.svg") 5px center no-repeat;color:#333;}
.Server-background.active{background:url("/static/images/svg/devices/server-ban.svg") 5px center no-repeat;color:#000;}
.Application-background{background:url("/static/images/svg/devices/middleware-grey.svg") 5px center no-repeat;color:#333;}
.Application-background.active{background:url("/static/images/svg/devices/middleware-ban.svg") 5px center no-repeat;color:#000;}
.Network-background{background:url("/static/images/svg/devices/router-hub-grey.svg") 5px center no-repeat;color:#333;}
.Network-background.active{background:url("/static/images/svg/devices/router-hub-ban.svg") 5px center no-repeat;color:#000;}
.Storage-background{background:url("/static/images/svg/devices/storage-grey.svg") 5px center no-repeat;color:#333;}
.Storage-background.active{background:url("/static/images/svg/devices/storage-ban.svg") 5px center no-repeat;color:#000;}
.VirtualMachine-background{background:url("/static/images/svg/devices/vcenter-grey.svg") 5px center no-repeat;color:#333;}
.VirtualMachine-background.active{background:url("/static/images/svg/devices/vcenter-ban.svg") 5px center no-repeat;color:#000;}
.IOT-background{background:url("/static/images/svg/devices/iot-grey.svg") 5px center no-repeat;color:#333;}
.IOT-background.active{background:url("/static/images/svg/devices/iot-ban.svg") 5px center no-repeat;color:#000;}
.Others-background{background:url("/static/images/svg/devices/client-grey.svg") 5px center no-repeat;color:#333;}
.Others-background.active{background:url("/static/images/svg/devices/client-ban.svg") 5px center no-repeat;color:#000;}


.device-model
{
    width: 210px;
    height: 50px;
    padding:15px;
    position: relative;
    float: left;
    background-color: #fff;
    
    border: solid 1px #ddd;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius:4px;
    cursor: pointer;
    > div
    {
      height:50px;
      display:table-row;
      > div
      {
        display: table-cell;
        padding:5px;
        vertical-align: middle;
        font-size:13px;
        > img{vertical-align: middle;max-height:40px;}
        > p{line-height: 1em;}
      }
      
    }
}

.device-model:hover{background:#eee;}


</style>
<style lang="scss">
.entity-templates
{
  > div
  {
    height:100%;
    > div:nth-of-type(2)
    {
      height:calc(100% - 55px);
      overflow: auto;
    }
  }
}
.template-form
{
  width:100%;
  height:calc(100vh - 60px);
  > div
  {
    width:100%;
    height:100%;
    padding:67px 17px 71px 0;
    box-sizing: border-box;
    position: relative;
    > div:nth-of-type(1)
    {
      width:100%;
      height:40px;
      margin:20px 20px 0 20px;
      box-sizing: border-box;
      padding:6px 14px 0 14px;
      border-bottom:1px solid #ccc;
      position:absolute;
      left:0;
      top:0;
      h3{margin:0;font-weight:700;font-size:15px;}
    }
    > div:nth-of-type(2)
    {
      width:100%;
      height:100%;
      overflow:auto;
      > div
      {
        padding:50px 0;
      }
    }
    > div:nth-of-type(3)
    {
      width:100%;
      height:54px;
      padding:8px 0;
      position:absolute;
      left:0;
      bottom:0;
      border-top:1px solid #ccc;
      > button{margin:10px 0 0 20px;}
      > button:nth-of-type(1){margin-left:240px;background:none;color:#333;}
      > button:nth-of-type(2){color:#eee;background:#414852;}
      > button:hover{color:#eee;background:#8d94a9;}
    }
  }
}

.test-result
{
  width:100%;
  height:calc(100vh - 60px);
  > div
  {
    width:100%;
    height:100%;
    padding:67px 17px 71px 0;
    box-sizing: border-box;
    position: relative;
    > div:nth-of-type(1)
    {
      width:100%;
      height:40px;
      margin:20px 20px 0 20px;
      box-sizing: border-box;
      padding:6px 14px 0 14px;
      border-bottom:1px solid #ccc;
      position:absolute;
      left:0;
      top:0;
      h3{margin:0;font-weight:700;font-size:15px;}
    }
    > div:nth-of-type(2)
    {
      width:100%;
      overflow:auto;
      > div
      {
        padding:20px;
        width:100%;
        box-sizing: border-box;
      }
    }
    > div:nth-of-type(3)
    {
      width:100%;
      height:54px;
      padding:8px 0;
      border-top:1px solid #ccc;
      text-align: center;
      > button{margin-top:10px;color:#eee;background:#414852;}
      > button:hover{color:#eee;background:#8d94a9;}
    }
  }
}


</style>