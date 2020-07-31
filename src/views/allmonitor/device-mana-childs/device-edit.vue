<template>
  <div class="device_edit">
    <div>
      <div class="device_title">
        <div :style="'background:url(/static/images/svg/devices/'+node.icon+'-green.svg) left center no-repeat;'"></div>
        <span>{{node.name}}</span>
        <span>-配置监测点</span>
      </div>
    </div>
    <div>
      <!--添加设备表单-->
      <div class="content template-form">
        <div>
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
    </div>
  </div>
</template>

<script>
import allmonitorapi from '@/services/models/allmonitor'
export default {
  name: 'DeviceEdit',
  props:{node:Object},
  data () {
    return {
      deviceId:"",
      monit_points:[],
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
    }
  },
  methods:
  {
    handleCancel()
    {
      this.$emit("handleClose")
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
          this.$emit("handleClose")
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
.device_edit
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