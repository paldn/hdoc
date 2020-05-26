<template>
  <el-container>
    <el-header>
        <h3>添加告警</h3>
    </el-header>
    <el-main>
        <el-steps :active="step" finish-status="success">
            <el-step title="选择告警目标"></el-step>
            <el-step title="选择发送策略"></el-step>
            <el-step title="选择发送方式"></el-step>
        </el-steps>
        <el-form ref="alarmTarget" v-model="alarmform" label-width="80px" >
            <el-form-item label="告警名称">
                <el-input v-model="alarmTarget.name"></el-input>
            </el-form-item>
            <el-form-item label="告警名称">
                <el-tree
                :data="devTree"
                show-checkbox
                node-key="id"
                :props="defaultProps">
                </el-tree>
            </el-form-item>
            <el-form-item label="告警描述">
                <el-input v-model="alarmTarget.desc"></el-input>
            </el-form-item>
        </el-form>

        <el-form ref="sendTactics" v-model="sendTactics">
            <el-form-item>
                <el-checkbox-group>
                <el-checkbox label="1">危险</el-checkbox>
                <el-checkbox label="2">故障</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <div>
                <el-radio v-model="sendTactics.mode" label="0">
                    当事件连续发生<input type="text"/>次时，
                    发送告警，再每<input type="text"/>次发送一次告警
                </el-radio>
                </div>
                <div>
                <el-radio v-model="sendTactics.mode" label="1">
                    在<input type="text"/>分钟内，有
                    <input type="text"/>次同样状态事件发送告警
                </el-radio>
                </div>
            </el-form-item>
            <el-form-item>
                <el-checkbox-group v-model="sendTactics.extra">
                <el-checkbox label="1">
                    事件连续发生<input type="text"/>次后，停止发送告警
                </el-checkbox>
                <el-checkbox label="2">
                    当发过告警监测点恢复正常时发送一次告警
                </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <el-form ref="sendMethods" v-model="sendMethods" label-width="80px" >
            <h3>邮件告警</h3>
            <el-form-item label="发件人">
                <el-select placeholder="请选择">
                <el-option
                    v-for="item in persons"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收件人">
                <el-select placeholder="请选择" multiple>
                <el-option
                    v-for="item in persons"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="临时收件人">
                <el-input type="text"/>
            </el-form-item>
            <el-form-item label="邮件告警模板">
                <el-select placeholder="请选择">
                <el-option label="邮件告警模板" value="0"></el-option>
            </el-form-item>
            <el-form-item label="故障恢复模板">
                <el-select placeholder="请选择">
                <el-option label="邮件恢复模板" value="0"></el-option>
            </el-form-item>


            <h3>短信告警</h3>
            <el-form-item label="发送方式">
                <el-select placeholder="请选择">
                <el-option label="123" value="0"></el-option>
            </el-form-item>
            <el-form-item label="短信接收人">
                <el-select placeholder="请选择" multiple>
                    <el-option label="123" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="临时接收人">
                <el-input type="text"/>
            </el-form-item>
            <el-form-item label="短信告警模板">
                <el-select placeholder="请选择">
                <el-option label="短信告警模板" value="0"></el-option>
            </el-form-item>
            <el-form-item label="故障恢复模板">
                <el-select placeholder="请选择">
                <el-option label="短恢复模板" value="0"></el-option>
            </el-form-item>

            <h3>声音告警</h3>
            <el-form-item label="播放主机">
                <el-input type="text"/>
            </el-form-item>
            <el-form-item label="Agent端口">
                <el-input type="text"/>
            </el-form-item>
            <el-form-item label="声音文件">
                <el-input type="text"/>
            </el-form-item>
            <el-form-item label="说明">
                <span>
                    播放主机：装有代理程序（Agent服务）的主机
                    声音文件：所填主机里声音文件的绝对路径。
                </span>
            </el-form-item>

            <h3>脚本告警</h3>
            <el-form-item label="选择脚本位置">
                <el-select placeholder="请选择">
                <el-option label="本地" value="0"></el-option>
            </el-form-item>
            <el-form-item label="选择脚本类型">
                <el-select placeholder="请选择">
                <el-option label="脚本/EXE" value="0"></el-option>
            </el-form-item>
            <el-form-item label="脚本/EXE名称">
                <el-input type="text"/>
            </el-form-item>
            <el-form-item label="附加参数">
                <el-input type="text"/>
            </el-form-item>
            <el-form-item label="参数说明">
                <el-table style="width:100%;" :data="param_details">
                    <el-table-column label="变量" prop="name"></el-table-column>
                    <el-table-column label="描述" prop="desc"></el-table-column>
                </el-table>
            </el-form-item>

            <h3>微信告警</h3>
            <el-form-item label="收件人">
                <el-input type="textarea"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">获取我的ID</el-button>
                <el-button type="primary">刷新</el-button>
            </el-form-item>
            <el-form-item label="微信告警模板">
                <el-select placeholder="请选择">
                <el-option label="邮件告警模板" value="0"></el-option>
            </el-form-item>
            <el-form-item label="故障恢复模板">
                <el-select placeholder="请选择">
                <el-option label="邮件恢复模板" value="0"></el-option>
            </el-form-item>

            <h3>App告警</h3>
            <el-form-item label="告警接收人">
                <el-select placeholder="请选择" multiple>
                    <el-option label="123" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="APP告警模板">
                <el-select placeholder="请选择">
                <el-option label="短信告警模板" value="0"></el-option>
            </el-form-item>
            <el-form-item label="故障恢复模板">
                <el-select placeholder="请选择">
                <el-option label="短恢复模板" value="0"></el-option>
            </el-form-item>

            <h3>自动派单</h3>
            <el-form-item label="连接器">
                <el-select placeholder="请选择">
                    <el-option label="123" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工单告警模板">
                <el-select placeholder="请选择">
                <el-option label="邮件告警模板" value="0"></el-option>
            </el-form-item>
            <el-form-item label="故障恢复模板">
                <el-select placeholder="请选择">
                <el-option label="邮件恢复模板" value="0"></el-option>
            </el-form-item>
        </el-form>

    <el-main>
    <el-footer>
        <el-button type="primary">上一步</el-button>
        <el-button type="primary">下一步</el-button>
        <el-button type="primary">确 定</el-button>
        <el-button>取 消</el-button>
    </el-footer>
  </el-container>
</template>

<script>
import allmonitorapi from '@/services/models/allmonitor'
export default {
  name: 'AlarmDialog',
  data () {
    return {
      msg: '告警窗口',
      step:0,
      alarmTarget:
      {

      },
      sendTactics:
      {

      },
      sendMethods:
      {

      },
      devTree:[],
      persons:[],
      param_details:
      [
            {
                "name":"%FullPathGroup%",
                "desc":"监测点所在设备所在组的全路径名称"
            },
            {
                "name":"%Group%",
                "desc":"监测点所在设备所在组的名称"
            },
            {
                "name":"%Device%",
                "desc":"监测点所在设备的名称"
            },
            {
                "name":"%Monitor%",
                "desc":"监测点名称"
            },
            {
                "name":"%MonitorLevel%",
                "desc":"监测点级别"
            },
            {
                "name":"%IP%",
                "desc":"监测设备IP地址"
            },
            {
                "name":"%CriticalCondition%",
                "desc":"监测点故障阀值"
            },
            {
                "name":"%WarningCondition%",
                "desc":"监测点危险阀值"
            },
            {
                "name":"%Status%",
                "desc":"监测点状态:危险,正常,错误"
            },
            {
                "name":"%Date%",
                "desc":"监测点时间"
            },
            {
                "name":"%Time%",
                "desc":"监测点时间简单表示，只显示小时和分钟"
            },
            {
                "name":"%StatusDescription%",
                "desc":"监测状态描述"
            },
            {
                "name":"%MonitorAlertDescription%",
                "desc":"告警描述"
            },
            {
                "name":"%CriticalHandling%",
                "desc":"故障处理方法"
            },
            {
                "name":"%Cause%",
                "desc":"失败原因"
            }
        ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
