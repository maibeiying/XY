<template>
  <div id="app" class="app-view">
    <cheader v-show="view!='login'"></cheader>
    <div class="app-content">
      <div class="nav-menu" v-show="view!='login'">
        <el-menu
          :default-active=active
          background-color="#324157"
          unique-opened
          text-color="#fff"
          router>
          <el-submenu index="data">
            <template slot="title">
              <i class="iconfont icon-data_statis"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="siteView">访问量</el-menu-item>
            <el-menu-item index="userFb">用户分布</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-yonghuguanli"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="custom">客户</el-menu-item>
            <el-menu-item index="manager">管理员</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-shangpinguanli"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="goodsManage">商品管理</el-menu-item>
            <el-menu-item index="addGoods">添加商品</el-menu-item>
          </el-submenu>
          <el-submenu index="banner">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>广告管理</span>
            </template>
            <el-menu-item index="banner">广告管理</el-menu-item>
            <el-menu-item index="addBanner">添加广告</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="app-routes">
        <el-breadcrumb separator-class="el-icon-arrow-right" v-show="view!='login'">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view />
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import cheader from './components/header'
export default {
  name: 'app',
  components: {
    cheader
  },
  data () {
    return {
      view: 'login',
      active: 'siteView'
    }
  },
  mounted () {
    console.log(location.hash)
  },
  methods: {

  },
  watch: {
    $route (to, from) {
      this.view = to.name
    }
  }
}
</script>
<style>
  .app-view{
    display:flex;
    flex-direction: column;
    height:100vh;
  }
  .app-content{
    flex:1;
    display:flex;
  }
  .nav-menu{
    display:flex;
    width:20vw;
    min-width:200px;
    max-width:260px;
  }
  .nav-menu .iconfont{
    margin-right:10px;
    font-size:20px;
  }
  .app-routes{
    flex:1;
    padding:20px;
  }
  .el-menu{
    flex:1;
    border:0;
    background:#324157;
  }
  .el-submenu__title,
  .el-menu-item{
    color:#fff;
  }
  .el-submenu .el-menu .el-menu-item{
    background:#1f2d3d !important;
  }
  .el-submenu__title:hover,
  .el-menu-item:hover,
  .el-submenu .el-menu .el-menu-item:hover{
    background:#465669 !important;
  }
</style>
