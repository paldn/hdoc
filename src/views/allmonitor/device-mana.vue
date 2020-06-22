<template>
  <div>
    <el-tree
      ref="dTree"
      show-checkbox
      node-key="id"
      :check-strictly="false"
      :load="loadNode"
      lazy
      :props="deviceProps"
      v-model="devices"
      :render-content="renderContent">
    </el-tree>
  </div>
</template>

<script>
import allmonitorapi from '@/services/models/allmonitor'
export default {
  name: 'DeviceMana',
  data () {
    return {
      devices:[],
      defaultProps: 
      {
        children: 'subtree',
        label: 'name'
      }
    }
  },
  methods:
  {
    loadNode(node, resolve)//加载子树
    { 
      if(node.level==0)
      {
          allmonitorapi.getManageTree().then(result=>
          {
              let treeData = []
              result.data.splice(0,1).forEach(e => {
                  treeData.push(
                      {
                          id:e.id,
                          name:e.name,
                          icon:e.icon,
                          parentId:node.key,
                          subtree:[]
                      }
                  )
              })
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
    init()
    {
      /*
      var icon = 'dir-'+jsonStaus[cObj.state].icon+'.svg';
      if (cObj.mxtype==2)
        icon = cObj.icon + '-'+jsonStaus[cObj.state].icon+'.svg';
      if (cObj.mxtype==4 || cObj.mxtype==5)
        icon = 'vessel' + '-'+jsonStaus[cObj.state].icon+'.svg';
      if (cObj.mxtype==6)
        icon = 'company' + '-'+jsonStaus[cObj.state].icon+'.svg';
      icon = 'svg/devices/' + icon;
      */
    },
    renderContent(h, { node, data, store })
    {
      console.log(node)
      console.log(node)
      return (
        <span><image src={node.icon}/><span>{data.name}</span></span>
      )
    }
  },
  mounted()
  {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
