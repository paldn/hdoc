<template>
  <div class="lab">
    <div 
      class="stage"
      ref="stage"
      @mousedown="handleMouseDown($event)" 
      @mousemove="handleMouseMove($event)" 
      @keydown="handleKeyDown($event)" 
      @keyup="handleKeyUp($event)"
    ></div>
    <i class="help iconfont icon-bangzhu1" @click="dialogVisible=true"></i>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <p style="line-height:30px;">
        3D实验室是进行WEB三维项目开发测试
        的模块，仅在开发过程中启用。项目在
        发布打包之前请注释取消此模块。如果
        你对三维知识不甚了解，不要轻易修改
        此处源码。</p>
      <p style="line-height:30px;text-align:right;">
        <br/>————————&nbsp;&nbsp;陆红进&nbsp;&nbsp;
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as THREE from '@/plugins/three.module.js'

export default {
  name: 'DConfig',
  data () {
    return {
      msg: '3D配置',
      dialogVisible:false,
      mapArray:[],
      side:40,
      camera:null,//相机
      scene:null,//场景
      renderer:null,//渲染器
      plane:null,//面板
      mouse:null,//鼠标
      raycaster:null,
      isShiftDown:false,//是否按下shift键
      rollOverMesh:null,
      rollOverMaterial:null,
      cubeGeo:null,
      cubeMaterial:null,
      objects:[]
    }
  },
  methods:
  {
    handleWindowResize()
    {
      let width = this.$refs.stage.parentNode.offsetWidth
      let height = this.$refs.stage.parentNode.offsetHeight
      this.camera.aspect = width / height;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize( width, height );
    },
    handleMouseMove(event)
    {
      event.preventDefault();

      let width = this.$refs.stage.parentNode.offsetWidth
      let height = this.$refs.stage.parentNode.offsetHeight
      let offsetLeft = this.$refs.stage.parentNode.offsetLeft
      let offsetTop = this.$refs.stage.parentNode.offsetTop

      this.mouse.set( ( (event.clientX-offsetLeft) / width ) * 2 - 1, - ( (event.clientY-offsetTop) / height ) * 2 + 1 );

      this.raycaster.setFromCamera( this.mouse, this.camera );

      var intersects = this.raycaster.intersectObjects( this.objects );

      if ( intersects.length > 0 ) {

        var intersect = intersects[ 0 ];

        this.rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
        this.rollOverMesh.position.divideScalar( 25 ).floor().multiplyScalar( 25 ).addScalar( 25 );

      }
			this.render();
    },
    handleMouseDown(event)
    {
      event.preventDefault();

      let width = this.$refs.stage.parentNode.offsetWidth
      let height = this.$refs.stage.parentNode.offsetHeight

      let offsetLeft = this.$refs.stage.parentNode.offsetLeft
      let offsetTop = this.$refs.stage.parentNode.offsetTop

      this.mouse.set( ( (event.clientX-offsetLeft) / width ) * 2 - 1, - ( (event.clientY-offsetTop) / height ) * 2 + 1 );

      this.raycaster.setFromCamera( this.mouse, this.camera );

      var intersects = this.raycaster.intersectObjects( this.objects );

      if ( intersects.length > 0 ) {

        var intersect = intersects[ 0 ];

        // delete cube

        if ( this.isShiftDown ) {

          if ( intersect.object !== this.plane ) {

            this.scene.remove( intersect.object );

            this.objects.splice( this.objects.indexOf( intersect.object ), 1 );

          }

          // create cube

        } else {

          var voxel = new THREE.Mesh( this.cubeGeo, this.cubeMaterial );
          voxel.position.copy( intersect.point ).add( intersect.face.normal );
          voxel.position.divideScalar( 25 ).floor().multiplyScalar( 25 ).addScalar( 25 );
          this.scene.add( voxel );

          this.objects.push( voxel );
          console.log(JSON.stringify(voxel.position))
        }

        this.render();

      }
    },
    handleKeyDown( event ) 
    {

      switch ( event.keyCode ) {

        case 16: this.isShiftDown = true; break;

      }

    },
    handleKeyUp( event ) 
    {

      switch ( event.keyCode ) {

        case 16: this.isShiftDown = false; break;

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


      let width = this.$refs.stage.offsetWidth
      let height = this.$refs.stage.offsetHeight

      this.camera = new THREE.PerspectiveCamera( 45, width / height, 1, 10000 );
      this.camera.position.set( 500, 800, 1300 );
      this.camera.lookAt( 0, 0, 0 );

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color( 0xf0f0f0 );

      // roll-over helpers

      var rollOverGeo = new THREE.BoxBufferGeometry( 50, 50, 50 );
      this.rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0x11ee11, opacity: 0.5, transparent: true } );
      this.rollOverMesh = new THREE.Mesh( rollOverGeo, this.rollOverMaterial );
      this.scene.add( this.rollOverMesh );

      // cubes

      this.cubeGeo = new THREE.BoxBufferGeometry( 50, 50, 50 );
      this.cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xfeb74c, map: new THREE.TextureLoader().load( '/static/textures/square-outline-textured.png' ) } );

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

  },
  mounted()
  {
    this.init()
    this.render()
  },
  beforeDestroy()
  {
    window.removeEventListener('resize',this.handleWindowResize.bind(this),false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
