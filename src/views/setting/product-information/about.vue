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
  </div>
</template>

<script>
import settingapi from '@/services/models/setting'
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
    renderContent(h, { node, data, store })
    {
      console.log(node)
      return (
        <span><image src={node.icon}/><span>{node.label}</span></span>
      )
    }
  },
  mounted()
  {
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
