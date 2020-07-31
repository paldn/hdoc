<template>
  <div class="about">
    <h1>{{ msg }}</h1>
    <el-tree
      :data="data"
      show-checkbox
      node-key="label"
      :render-content="renderContent"
      :props="defaultProps">
        <span class="custom-tree-node" slot-scope="{ node }">
            <span>
                <i :class="node.icon"></i>{{ node.label }}
            </span>              
        </span>
    </el-tree>
    <input type="file" @change="readXlsx($event)"/>
    <el-button type="primary" @click="exportExcel">导出excel</el-button>
    <div>
      <el-table :data="tableData" border row-key="id">
        <el-table-column
          align="center"
          v-for="(item, index) in col"
          :key="`col_${index}`"
          :prop="dropCol[index].prop"
          :label="item.label"
        ></el-table-column>
      </el-table>
    </div>
    <div>
      {{jsonStr}}
    </div>
  </div>
</template>

<script>
import settingapi from '@/services/models/setting'
import Sortable from "sortablejs";
import XLSX from 'xlsx'

function readXLSX (file) {
  let nameSplit = file.name.split('.')
  let format = nameSplit[nameSplit.length - 1]
  if (!['xlsx', 'csv'].includes(format)) {
    return false
  }
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = function (evt) {
      let data = evt.target.result // 读到的数据
      var workbook = XLSX.read(data, { type: 'binary' })
      resolve(workbook)
    }
  })
}
export default {
  name: 'About',
  data () {
    return {
      msg: '关于',
      jsonStr:'',
      col: [
        {
          label: "描述",
          prop: "desc"
        },
        {
          label: "组",
          prop: "group"
        },
        {
          label: "地址",
          prop: "addr"
        }
      ],
      dropCol: [
        {
          label: "描述",
          prop: "desc"
        },
        {
          label: "组",
          prop: "group"
        },
        {
          label: "地址",
          prop: "addr"
        }
      ],
      tableData:[],
      data:[],
      defaultProps: 
      {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods:
  {
    //行拖拽
    rowDrop() {
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      const _this = this;
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          console.log(newIndex,oldIndex)
          let temp = {..._this.tableData[newIndex]}
          _this.tableData[newIndex] = _this.tableData[oldIndex]
          _this.tableData[oldIndex] = temp

          /*
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
          _this.tableData = _this.tableData.filter(({ adId }) => adId !== 0)

          _this.tableData.forEach((item, index) => {
          _this.sortString += item.adId + ':' + (index + 1) + ','
          })
          _this.sortString = _this.sortString.substr(0, _this.sortString.length - 1)
          */
        }
      });
    },
    //列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector(".el-table__header-wrapper tr");
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        filter: ".cannotDrag",
        onEnd: evt => {
          const oldItem = this.dropCol[evt.oldIndex];
          this.dropCol.splice(evt.oldIndex, 1);
          this.dropCol.splice(evt.newIndex, 0, oldItem);
        }
      });
    },
    renderContent(h, { node, data, store })
    {
      console.log(node)
      return (
        <span><image src={node.icon}/><span>{node.label}</span></span>
      )
    },
    async exportExcel(){
        // 创建工作簿
        const wb = new this.ExcelJS.Workbook();
        // 添加工作表,也就是我们Excel的页签
        const ws1 = wb.addWorksheet("状态量");
        // 加入第一行表头
        const page1Row1 = ws1.addRow([
            '组',
            '地址',
            '描述'
        ]);
        // 设置列宽
        ws1.columns = [
            { key: 'group', width: 20 },
            { key: 'addr', width: 20 },
            { key: 'desc', width: 40 },
        ]
        // 插入表格数据
        this.tableData.forEach((item)=>{
            let {group,addr,desc} = item;
            ws1.addRow([desc,addr,group]);
        })
        // 给表头加粗并且设置字体颜色
        page1Row1.font = { bold: true, color: { argb: "333333" } };
        // 写入 buffer
        const buf = await wb.xlsx.writeBuffer();
        // 导出Excel,并且命名为"导出的表格.xlsx"
        saveAs(new Blob([buf]), "导出的表格.xlsx");
    },
    readXlsx(e)
    {
      let fileName = e.target.files[0]
      let reader = new FileReader();
      reader.readAsBinaryString(fileName)
      //onload在文件被读取时自动触发
      reader.onload = (e)=> {
          let workbook = XLSX.read(e.target.result, {type: 'binary'})
          console.log(workbook);
          let startData = workbook.Sheets
          let sheetList = workbook.SheetNames
          
          /*
          for(let i=2;i<=469;i++)
          {
            let obj = {}
            obj.group = startData["状态量"]["A"+i].v
            obj.addr = startData["状态量"]["B"+i].v
            obj.desc = startData["状态量"]["C"+i].v
            this.tableData.push(obj)
          }
          */
      }
    }
  },
  mounted()
  {
    // 阻止默认行为
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
    this.rowDrop();
    this.columnDrop();

    this.axios({method: 'post',url:"/jkyweb/myself/tree.sy",data:{},params:{}}).then(res=>
    {
      this.data.push(res.data)
      console.log(this.data)
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.about{width:100%;height:100%;}
</style>
