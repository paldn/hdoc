<template>
  <div class="lab">
    <div 
      class="stage"
      ref="stage"
      @mousedown="handleMouseDown($event)"
      @mouseover="handleMouseOver($event)" 
      @mousemove="handleMouseMove($event)"
      @keydown="handleKeyDown($event)" 
      @keyup="handleKeyUp($event)"
    ></div>
    <div class="model-container">
      <div>
        <div>
          <el-button type="primary" icon="el-icon-caret-left" @mousedown="handlePrev()"></el-button>
        </div>
        <div>
          <div :style="'width:'+resourceConfig.slice(1).length*240+'px;'+'left:'+offsetleft+'px;'" >
            <div 
              v-for="(item,index) in resourceConfig.slice(1)" 
              :key="item.id" 
              @mousedown="handleSelect($event,index)">
              <img  :src="item.head_url" width="240"/>
            </div>
          </div>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-caret-right" @mousedown="handleNext()"></el-button>
        </div>
      </div>
    </div>
    <i class="help iconfont icon-bangzhu1" @click="dialogVisible=true"></i>
    <div class="progress" v-show="percentage!=100">
      <div><el-progress type="circle" :percentage="percentage"></el-progress></div>
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
      mapArray:[],//地图数据，记录当前地图被占用数据
      side:40,//网格纵横格数
      camera:null,//相机
      clock:null,
      mixers:[],
      scene:null,//场景
      renderer:null,//渲染器
      plane:null,//面板
      mouse:null,//鼠标
      raycaster:null,//事件管理
      ufo:null,//飞碟
      timer:null,//计时器
      select_index:-1,//选择的建筑索引
      select_mode:null,//选择的模型
      objects:[],//已添加的对象
      controls:null//舞台控制器
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
    handlePrev()
    {
      this.offsetleft += 5
    },
    handleNext()
    {
      this.offsetleft -= 5
    },
    handleSelect(event,index)
    {
      this.select_index = index
      event.preventDefault() 
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

          //处理加载模型为黑色问题
          /*
          gltf.scene.traverse(child => {
            if (child.isMesh) {
              child.material.emissive = child.material.color
              child.material.emissiveMap = child.material.map
            }
          })
          */
          _config.entity = gltf

          this.loaded ++//已加载的模型+1
          if(_config.id==10000)return
          let loaded = ResourceConfig[0].entity==null?this.loaded:(this.loaded-1)
          let _i = parseInt(loaded/4)
          let _j = loaded%4
          gltf.scene.translateX(_j*25*10-500)
          gltf.scene.translateZ(_i*25*10-500)
          if(_config.id == 10019)
          {
            //gltf.scene.position.x = 400
            //gltf.scene.position.z = 400
            window.gltf = gltf
          }
          
          
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
    addUFO()
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
      let width = this.$refs.stage.offsetWidth
      let height = this.$refs.stage.offsetHeight
      let offsetLeft = this.$refs.stage.parentNode.offsetLeft
      let offsetTop = this.$refs.stage.parentNode.offsetTop

      this.mouse.set( ( (event.clientX-offsetLeft) / width ) * 2 - 1, - ( (event.clientY-offsetTop) / height ) * 2 + 1 );

      this.raycaster.setFromCamera( this.mouse, this.camera );

      var intersects = this.raycaster.intersectObjects( this.objects );

      if ( intersects.length > 0 && this.select_mode!=null) 
      {

        var intersect = intersects[ 0 ];
        this.select_mode.position.copy( intersect.point ).add( intersect.face.normal );
        this.select_mode.position.divideScalar( 25 ).floor().multiplyScalar( 25 ).addScalar( 25 );
      }
			this.render();
    },
    handleMouseOver(event)
    {
      event.preventDefault();
      if(!this.$refs.stage)return
      let width = this.$refs.stage.offsetWidth
      let height = this.$refs.stage.offsetHeight
      let offsetLeft = this.$refs.stage.parentNode.offsetLeft
      let offsetTop = this.$refs.stage.parentNode.offsetTop

      this.mouse.set( ( (event.clientX-offsetLeft) / width ) * 2 - 1, - ( (event.clientY-offsetTop) / height ) * 2 + 1 );

      this.raycaster.setFromCamera( this.mouse, this.camera );

      var intersects = this.raycaster.intersectObjects( this.objects );

      if ( intersects.length > 0 && this.select_mode==null && this.select_index != -1) 
      {
        var intersect = intersects[ 0 ];
        this.select_mode = this.resourceConfig[this.select_index+1].entity.scene;
        this.resourceConfig[this.select_index+1].entity.scene = this.select_mode.clone();
        this.select_mode.position.copy( intersect.point ).add( intersect.face.normal );
        this.select_mode.position.divideScalar( 25 ).floor().multiplyScalar( 25 ).addScalar( 25 );
        this.scene.add(this.select_mode);
      }
			this.render();
    },
    handleMouseDown(event)
    {
      event.preventDefault();
      if(!this.$refs.stage)return
      let width = this.$refs.stage.offsetWidth
      let height = this.$refs.stage.offsetHeight

      let offsetLeft = this.$refs.stage.parentNode.offsetLeft
      let offsetTop = this.$refs.stage.parentNode.offsetTop

      this.mouse.set( ( (event.clientX-offsetLeft) / width ) * 2 - 1, - ( (event.clientY-offsetTop) / height ) * 2 + 1 );

      this.raycaster.setFromCamera( this.mouse, this.camera );

      var intersects = this.raycaster.intersectObjects( this.objects );

      if ( intersects.length > 0 ) {

        var intersect = intersects[ 0 ];



        this.render();
      }
    },
    handleKeyDown( event ) 
    {

      switch ( event.keyCode ) {

      }

    },
    handleKeyUp( event ) 
    {

      switch ( event.keyCode ) {

      }

    },
    init()
    {
      for(let i=0;i<this.side;i++)
      {
        let _arr = []
        for(let j=0;j<this.side;j++)
        {
          _arr.push(0)
        }
        this.mapArray.push(_arr)
      }

      this.clock = new THREE.Clock();


      let width = this.$refs.stage.offsetWidth
      let height = this.$refs.stage.offsetHeight

      this.camera = new THREE.PerspectiveCamera( 45, width / height, 1, 10000 );
      this.camera.position.set( 500, 800, 1300 );
      this.camera.lookAt( 0, 0, 0 );

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color( 0xf0f0f0 );

      // grid

      var gridHelper = new THREE.GridHelper( 1000, this.side );
      this.scene.add( gridHelper );

      //

      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();

      var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
      geometry.rotateX( - Math.PI / 2 );

      this.plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
      this.scene.add( this.plane );

      this.objects.push( this.plane );

      // lights

      var ambientLight = new THREE.AmbientLight( 0x606060 );
      this.scene.add( ambientLight );

      var directionalLight = new THREE.DirectionalLight( 0xffffff );
      directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
      this.scene.add( directionalLight );

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

    this.renderer.forceContextLoss();
    this.renderer = null;

    for(let i=0;i<this.resourceConfig.length;i++)
    {
      this.resourceConfig[i].entity = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.d-info
{
  .el-dialog__header{border-bottom:1px solid #ccc;}
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
  width:100%;
  height:120px;
  position: absolute;
  background:#f8f8f8;
  box-shadow: 0 0 3px #ccc;
  position: absolute;
  left:0;
  bottom:0;

  > div
  {
    position:relative;
    height:240px;
    padding:0 40px;

    > div:nth-of-type(1)
    {
      width:40px;
      height:120px;
      position:absolute;
      left:0;
      top:120px;
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
      width:100%;
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
      position:absolute;
      right:0;
      top:120px;
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
