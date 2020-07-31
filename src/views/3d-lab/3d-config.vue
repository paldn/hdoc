<template>
  <div class="lab">
    <div 
      class="stage"
      ref="stage"
      @mousedown="handleMouseDown($event)"
      @mouseover="handleMouseOver($event)" 
      @mousemove="handleMouseMove($event)"
      @mouseup="handleMouseUp($event)"
      @keydown="handleKeyDown($event)" 
      @keyup="handleKeyUp($event)"
      tabindex="1"
    ></div>
    <div class="model-container">
      <div>
        <div>
          <el-button type="primary" icon="el-icon-caret-left" @click="handlePrev"></el-button>
        </div>
        <div ref="mbox">
          <div :style="'width:'+resourceConfig.slice(1).length*240+'px;'+'left:'+(-1*(page-1)*100)+'%;'" >
            <div 
              v-for="(item,index) in resourceConfig.slice(1)" 
              :key="item.id" 
              :title="item.nameCn"
              @mousedown="handleSelect($event,index)">
              <img  :src="item.head_url" width="240"/>
            </div>
          </div>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-caret-right" @click="handleNext"></el-button>
        </div>
      </div>
    </div>
    <i class="help iconfont icon-bangzhu1" @click="dialogVisible=true"></i>
    <div class="progress" v-show="percentage!=100">
      <div><el-progress type="circle" :percentage="percentage"></el-progress></div>
    </div>
    <div class="mousepress" v-show="mousepress!=0" :style="'left:'+arrow.x+'px;top:'+arrow.y+'px;'">
      <el-progress type="circle" ref="loadding" :percentage="mousepress" status="success"></el-progress>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%" center class="d-info">
      <p style="line-height:30px;">
        3D实验室是进行WEB三维项目开发测试
        的模块，仅在开发过程中启用。项目在
        发布打包之前请注释取消此模块。如果
        你对三维知识不甚了解，不要轻易修改
        此处源码。</p>
      <p style="line-height:30px;text-align:right;">
        <br/>————————&nbsp;&nbsp;陆红进&nbsp;&nbsp;
      </p>
    </el-dialog>
  </div>
</template>

<script>
import * as THREE from 'three'
import OrbitControls from "three/examples/js/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import ResourceConfig from './config/resource-config'
export default {
  name: 'DConfig',
  data () {
    return {
      msg: 'DConfig',
      dialogVisible:false,
      offsetleft:0,
      resourceConfig:ResourceConfig,
      loaded:0,//已加载资源数量
      percentage:0,//加载进度
      side:100,//网格纵横格数
      gap:10,//网格间距
      camera:null,//相机
      clock:null,
      mixers:[],
      scene:null,//场景
      renderer:null,//渲染器
      ambientLight:null,
      directionalLight:null,
      intersect:null,
      plane:null,//面板
      arrow:{x:0,y:0},
      mouse:null,//鼠标
      raycaster:null,//事件管理
      gridHelper:null,//网格助手
      boxHelper:null,//选择框助手
      ufo:null,//飞碟
      tickInterval:0,
      timer:null,//计时器
      mousepress:0,

      operatingMode://将要添加或移动的模型
      {
        id:0,//建筑ID
        name:'',//建筑名称
        rotate:0,//0,1,2,3(旋转的角度)
        position:{x:0,y:0,z:0},//模型的坐标
        _config_index:-1,//选择的建筑索引
        scene:null,//模型实体
        extra:{},//拓展数据
        isNew:false//是否是新添加的模型
      },
      objects:[],//已添加的模型对象
      maxId:0,
      buildingArray:[],
      controls:null,//舞台控制器
      page:1//模型的页码
    }
  },
  watch:
  {
    
    loaded()//监听加载进度
    {
      this.percentage = parseInt(1000*this.loaded/ResourceConfig.length)/10
      if(this.loaded == ResourceConfig.length)
      {
        this.addUFO()
      }
    }
  },
  methods:
  {
    getBound(evt)
    {
      let {width,height,left,top} = evt.target.getBoundingClientRect()
      return {width,height,offsetLeft:left,offsetTop:top}
    },
    handlePrev()
    {
      if(this.page > 1)
      {
        this.page --
      }
    },
    handleNext()
    {
      this.page ++
    },
    handleSelect(event,index)
    {
      if(this.operatingMode.scene)return false//如果已经在操作，禁止再次选择
      if(!this.resourceConfig[index+1].entity.scene)
      {
        this.$alert("模型尚未准备好，请稍后再试！","操作提示")
        return false
      }
      this.operatingMode.isNew = true
      this.operatingMode._config_index = index+1
      this.operatingMode.scene = this.resourceConfig[this.operatingMode._config_index].entity.scene
      this.$refs.stage.focus()
      event.preventDefault() 
    },
    freeModelMem(model)//释放模型内存
    {
      let freeGroup = group=>
      {
        //console.log(group);
        if (!group) return;
        // 删除掉所有的模型组内的mesh
        group.traverse(function (item) {
            if (item instanceof THREE.Mesh) {
                item.geometry.dispose(); // 删除几何体
                item.material.dispose(); // 删除材质
            }
        })
      }
      if(model instanceof THREE.Scene)
      {
        let children = model.children
        for(let i=0;i<children.length;i++)
        {
          freeGroup(children[i])
        }
      }
      else
      {
        freeGroup(model)
      }
    },
    preload()//预加载模型
    {
      let load = _config=>
      {
        //创建GLTF加载器
        var dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( '../examples/js/libs/draco/gltf/' );
        var loader = new GLTFLoader();
        loader.setDRACOLoader( dracoLoader );
        loader.load(_config.model_url, gltf => 
        {
          //缩放
          gltf.scene.scale.set(_config.scale, _config.scale, _config.scale)

          _config.entity = gltf

          this.loaded ++//已加载的模型+1
          if(_config.id == 10000)return
          gltf.scene.visible = false
          gltf.scene.isBuilding = true
          gltf.scene.name = _config.nameCn
          
          this.objects.push(gltf.scene)
          this.scene.add(gltf.scene)

        }, xhr => {
          // called while loading is progressing
          console.log(`${( xhr.loaded / xhr.total * 100 )}% loaded`);
        }, error => {
          // called when loading has errors
          console.error('An error happened', error);
        })
      }

      for(let i=0;i<ResourceConfig.length;i++)
      {
        load(ResourceConfig[i])
      }
    },
    addUFO()//添加飞碟
    {
      this.ufo = ResourceConfig[0]
      this.ufo.entity.scene.translateX(0)
      this.ufo.entity.scene.translateY(300)
      this.ufo.entity.scene.translateZ(0)
      this.ufo.mixers = []
      this.scene.add(this.ufo.entity.scene)
      // 调用动画
      var mixer = new THREE.AnimationMixer( this.ufo.entity.scene ); 
      mixer.clipAction( this.ufo.entity.animations[ 2 ] ).setDuration( 1 ).play();
      this.ufo.mixers.push( mixer );

      var animate = ()=>
      {
        requestAnimationFrame(animate);
        this.tickInterval ++
        this.tickInterval = this.tickInterval%5

        if(this.tickInterval !=0)return
        var delta = this.clock.getDelta();
        for ( var i = 0; i < this.ufo.mixers.length; i ++ ) { // 重复播放动画
            this.ufo.mixers[ i ].update( delta );
        }
        this.render();
      };
      animate();
    },
    handleWindowResize()
    {
      if(!this.$refs.stage)return
      let width = this.$refs.stage.offsetWidth
      let height = this.$refs.stage.offsetHeight
      this.camera.aspect = width / height;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize( width, height );
    },
    handleMouseMove(event)
    {
      event.preventDefault();
      if(!this.$refs.stage)return
      let {width,height,offsetLeft,offsetTop} = this.getBound(event)

      this.mouse.set( ( (event.clientX-offsetLeft) / width ) * 2 - 1, - ( (event.clientY-offsetTop) / height ) * 2 + 1 );

      this.raycaster.setFromCamera( this.mouse, this.camera );

      var intersects = this.raycaster.intersectObjects( this.objects );

      if ( intersects.length > 0 && this.operatingMode.scene!=null) 
      {
        var intersect = intersects[ 0 ];
        this.operatingMode.scene.position.copy( intersect.point ).add( intersect.face.normal );
        this.operatingMode.scene.position.divideScalar( this.gap ).floor().multiplyScalar( this.gap ).addScalar( this.gap );
        if(!this.operatingMode.scene.visible)
        {
          this.operatingMode.scene.visible = true
        }
        if(this.boxHelper.visible)
        {
          this.boxHelper.setFromObject( this.operatingMode.scene );
        }
      }
			this.render();
    },
    handleMouseOver(event)
    {
      event.preventDefault();
      if(!this.$refs.stage)return
      let {width,height,offsetLeft,offsetTop} = this.getBound(event)

      this.mouse.set( ( (event.clientX-offsetLeft) / width ) * 2 - 1, - ( (event.clientY-offsetTop) / height ) * 2 + 1 );

      this.raycaster.setFromCamera( this.mouse, this.camera );

      var intersects = this.raycaster.intersectObjects( this.objects );

      if ( intersects.length > 0&&this.operatingMode._config_index!=-1) 
      {
        var intersect = intersects[ 0 ];
        this.operatingMode.scene.position.copy( intersect.point ).add( intersect.face.normal );
        this.operatingMode.scene.position.divideScalar( this.gap ).floor().multiplyScalar( this.gap ).addScalar( this.gap );
        if(!this.operatingMode.scene.visible)
        {
          this.operatingMode.scene.visible = true
        }
      }
			this.render();
    },
    handleMouseDown(event)
    {
      event.preventDefault();
      if(!this.$refs.stage)return
      
      let {width,height,offsetLeft,offsetTop} = this.getBound(event)
      this.mouse.set( ( (event.clientX-offsetLeft) / width ) * 2 - 1, - ( (event.clientY-offsetTop) / height ) * 2 + 1 );

      this.raycaster.setFromCamera( this.mouse, this.camera );

      //判断鼠标按下的位置是不是界限之内并且获取3D世界的坐标位置
      var intersects = this.raycaster.intersectObjects( [this.plane]);
      if(intersects.length==0)return//如果按下的位置出界了直接返回

      //编辑和新增this.operatingMode._config_index都不会为-1,这就说明正在延时选中建筑
      if(this.operatingMode._config_index == -1)
      {
        //查找是否有建筑被选中
        let objects = []
        for(let i=0;i<this.objects.length;i++)
        {
          //移除隐藏建筑和非显示状态的建筑
          if(!this.objects[i].isBuilding||!this.objects[i].visible)continue
          objects.push(this.objects[i])
        }
        intersects = this.raycaster.intersectObjects( objects , true);

        //按下的位置没有任何建筑
        if(intersects.length==0)return

        this.intersect = intersects[0]

        this.arrow.x = event.clientX - offsetLeft
        this.arrow.y = event.clientY - offsetTop
        this.timer = setInterval(()=>
        {
          this.mousepress += 20
          this.$refs.loadding.$forceUpdate()
          if(this.mousepress == 100)
          {
            this.mousepress = 0
            clearInterval(this.timer)
            this.timer = null

            let findBuilding = obj3d=>
            {
              if(obj3d.isBuilding)return obj3d
              if(obj3d.parent)
              {
                return findBuilding(obj3d.parent)
              }
            }
            let building = findBuilding(this.intersect.object)
            let buildingDetail = null
            for(let i=0;i<this.buildingArray.length;i++)
            {
              if(this.buildingArray[i].scene === building)
              {
                buildingDetail = this.buildingArray[i]
                break
              }
            }
            if(buildingDetail)
            {
              this.operatingMode = buildingDetail
              this.boxHelper.setFromObject( this.operatingMode.scene );
              this.boxHelper.material.color.set( 0x00cc00 );
              this.boxHelper.visible = true
            }
            this.intersect = null;
          }
        },100)
      }
      else
      {
        if(this.operatingMode.isNew)//新增
        {
          var intersect = intersects[0]
          this.operatingMode.scene.position.copy( intersect.point ).add( intersect.face.normal );
          this.operatingMode.scene.position.divideScalar( this.gap ).floor().multiplyScalar( this.gap ).addScalar( this.gap );
          
          this.operatingMode.id = this.maxId
          this.operatingMode.name = ''
          this.operatingMode.position = {...intersect.point}
          this.operatingMode.isNew = false
          this.buildingArray.push(this.operatingMode)
          this.resourceConfig[this.operatingMode._config_index].entity.scene = this.operatingMode.scene.clone()
          this.resourceConfig[this.operatingMode._config_index].entity.scene.visible = false

          /* 重置旋转方向 */
          this.resourceConfig[this.operatingMode._config_index].entity.scene.rotation.x = 0;
          this.resourceConfig[this.operatingMode._config_index].entity.scene.rotation.y = 0;
          this.resourceConfig[this.operatingMode._config_index].entity.scene.rotation.z = 0;
          this.resourceConfig[this.operatingMode._config_index].entity.scene.rotation._x = 0;
          this.resourceConfig[this.operatingMode._config_index].entity.scene.rotation._y = 0;
          this.resourceConfig[this.operatingMode._config_index].entity.scene.rotation._z = 0;

          this.resourceConfig[this.operatingMode._config_index].entity.scene.isBuilding = true
          this.scene.add(this.resourceConfig[this.operatingMode._config_index].entity.scene)
          this.objects.push(this.resourceConfig[this.operatingMode._config_index].entity.scene)
          this.operatingMode = 
          {
            id:0,
            name:'',
            rotate:0,
            position:{x:0,y:0,z:0},
            _config_index:-1,
            scene:null,
            extra:{},
            isNew:false
          }
          this.maxId ++
          this.render();
        }
        else//编辑
        {
          if(this.boxHelper.visible)
          {
            this.boxHelper.visible = false
            this.operatingMode = 
            {
              id:0,
              name:'',
              rotate:0,
              position:{x:0,y:0,z:0},
              _config_index:-1,
              scene:null,
              extra:{},
              isNew:false
            }
            this.intersect = null;
            this.render();
          }
        }
      }
    },
    handleMouseUp(event)
    {
      if(this.timer)
      {
        clearInterval(this.timer)
        this.timer = null
        this.mousepress = 0
        this.intersect = null
      }
    },
    handleKeyDown( event ) 
    {
      //r 82 t 84 del 46
      switch ( event.keyCode ) {
        case 82:
          if(this.operatingMode._config_index!=-1)
          {
            this.operatingMode.rotate ++
            this.operatingMode.rotate = this.operatingMode.rotate%4
            this.operatingMode.scene.rotateY(Math.PI/2)
            if(this.boxHelper.visible)
            {
              this.boxHelper.setFromObject( this.operatingMode.scene );
            }
          }
          break;
        case 84:
          if(this.operatingMode._config_index!=-1)
          {
            this.operatingMode.rotate --
            this.operatingMode.rotate = this.operatingMode.rotate<0?(this.operatingMode.rotate+4):this.operatingMode.rotate
            this.operatingMode.scene.rotateY(-1*Math.PI/2)
            if(this.boxHelper.visible)
            {
              this.boxHelper.setFromObject( this.operatingMode.scene );
            }
            
          }
          break;
        case 46:
          if(this.operatingMode._config_index!=-1)
          {
            let flag = false
            for(let i=0;i<this.buildingArray.length;i++)
            {
              if(this.operatingMode.scene === this.buildingArray[i].scene)
              {
                this.buildingArray.splice(i,1)
                flag = true
                break
              }
            }
            if(flag)//如果这个建筑模型已在建筑列表中就释放
            {
              this.objects.splice(this.objects.indexOf(this.operatingMode.scene),1)
              this.freeModelMem(this.operatingMode.scene)
              this.scene.remove(this.operatingMode.scene)
              this.boxHelper.visible = false

              this.operatingMode = 
              {
                id:0,
                name:'',
                rotate:0,
                position:{x:0,y:0,z:0},
                _config_index:-1,
                scene:null,
                extra:{},
                isNew:false
              }
            }
            this.render()
          }
          break;
      }

    },
    handleKeyUp( event ) 
    {

      

    },
    init()
    {
      this.clock = new THREE.Clock();


      let width = this.$refs.stage.offsetWidth
      let height = this.$refs.stage.offsetHeight

      this.camera = new THREE.PerspectiveCamera( 45, width / height, 1, 10000 );
      this.camera.position.set( 500, 800, 1300 );
      this.camera.lookAt( 0, 0, 0 );

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color( 0xf0f0f0 );

      // grid

      this.gridHelper = new THREE.GridHelper( 1000, this.side );
      this.scene.add( this.gridHelper );

      // box
      this.boxHelper = new THREE.BoxHelper();
      this.boxHelper.material.color.set( 0x00cc00 );
      this.boxHelper.visible = false
      this.scene.add(this.boxHelper)
      //

      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();

      var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
      geometry.rotateX( - Math.PI / 2 );

      this.plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
      this.scene.add( this.plane );

      this.objects.push( this.plane );

      // lights

      this.ambientLight = new THREE.AmbientLight( 0x606060 );
      this.scene.add( this.ambientLight );

      this.directionalLight = new THREE.DirectionalLight( 0xffffff );
      this.directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
      this.scene.add( this.directionalLight );

      this.renderer = new THREE.WebGLRenderer( { antialias: true } );
      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.renderer.setSize( width, height );
      this.$refs.stage.appendChild( this.renderer.domElement );

      //创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
      this.controls = new OrbitControls(this.camera,this.renderer.domElement);
      //监听鼠标事件，触发渲染函数，更新canvas画布渲染效果
      this.controls.addEventListener('change', this.render.bind(this));
      //
      window.addEventListener( 'resize', this.handleWindowResize.bind(this), false );
    },
    render()
    {
      this.renderer.render(this.scene,this.camera)
    }
  },
  created()
  {
    window._vm = this
    window._config = ResourceConfig
  },
  mounted()
  {
    this.init()
    this.render()
    this.preload()
  },
  beforeDestroy()
  {
    window.removeEventListener('resize',this.handleWindowResize.bind(this),false)
    
    for(let i=0;i<this.objects.length;i++)
    {
      if(this.objects[i] instanceof THREE.Scene||this.objects[i] instanceof THREE.Group)
      {
        this.freeModelMem(this.objects[i])
      }
      else if(this.objects[i] instanceof THREE.Mesh)
      {
        this.objects[i].geometry.dispose()
      }
    }
    this.controls.dispose()
    this.renderer.dispose()
    this.scene.dispose()
    this.renderer.forceContextLoss();
    this.renderer = null;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.d-info
{
  .el-dialog__header{border-bottom:1px solid #ccc;}
}
.mousepress
{
  position:absolute;
  width:64px;
  height:64px;
  margin:-32px 0 0 -32px;
  background:none;
  pointer-events: none;
  > div
  {
    background:none;
  }
  .el-progress-circle{width:64px !important;height:64px !important;}
  .el-progress__text{display:none !important;}
}
</style>
<style lang="scss" scoped>
.el-dialog__footer{border-top:1px solid #ccc;}
.dialog-footer{line-height:20px;}
.lab
{
  width:100%;
  height:100%;
  position:relative;
  cursor:url(/static/cursor/hand.png),default !important;
}
.help
{
  position:absolute;
  display:block;
  right:30px;
  top:30px;
  font-size:30px !important;
  cursor:pointer;
}
.stage
{
  width:100%;
  height:100%;
}
.progress
{
  position: absolute;
  width:100%;
  height:100%;
  left:0;
  top:0;
  background:#f1f1f1;
  > div
  {
    position:relative;
    width:100%;
    height:100%;
    > div
    {
      position:absolute;
      left:50%;
      top:50%;
      margin:-63px 0 0 -63px;
    }
  }
}
.model-container
{
  width:calc(100% - 200px);
  height:120px;
  position: absolute;
  background:#f8f8f8;
  box-shadow: 0 0 3px #ccc;
  position: fixed;
  left:200px;
  bottom:0;
  pointer-events:auto;
  > div
  {
    position:relative;
    height:240px;

    width:100%;
    > div{float:left;}

    > div:nth-of-type(1)
    {
      width:40px;
      height:120px;
      > button
      {
        width:100%;
        height:120px;
        background:none;
        border:none;
        padding:0;
        color:#666;
        font-size:40px;
        text-align:left;
      }
    }
    > div:nth-of-type(2)
    {
      width:calc(100% - 80px);
      height:240px;
      margin-top:-120px;
      overflow-x: hidden;
      position: relative;
      > div
      {
        position:absolute;
        height:240px;
        > div
        {
          float:left;
          width:240px;
          height:240px;
        }
      }
    }
    > div:nth-of-type(3)
    {
      width:40px;
      height:120px;
      > button
      {
        width:100%;
        height:120px;
        background:none;
        border:none;
        color:#666;
        font-size:40px;
        padding:0;
      }
    }
  }
}

</style>
