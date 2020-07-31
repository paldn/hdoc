<template>
  <div class="device_test">
    <div>
      <div class="device_title">
        <div :style="'background:url(/static/images/svg/devices/'+node.icon+'-green.svg) left center no-repeat;'"></div>
        <span>{{node.name}}</span>
        <span>-测试监测点</span>
      </div>
    </div>
    <div>
      <!--测试设备监控点-->
      <div class="content test-result">
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
  </div>
</template>

<script>
import allmonitorapi from '@/services/models/allmonitor'
export default {
  name: 'DeviceTest',
  props:{node:Object},
  data () {
    return {
      deviceId:"",
      monit_points:[],
      monit_point_list:[],
      test_monit_result:[],
      progress:20
    }
  },
  watch:
  {
    deviceId()
    {
      if(!this.deviceId)return

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
              isChecked:monit_points[i].isSelect==1
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
      this.monit_points = []
      this.monit_point_list = []
    }
  },
  mounted()
  {
    this.deviceId = this.node.id
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.device_test
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


</style>
<style lang="scss">
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