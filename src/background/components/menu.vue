<template>
  <Menu ref="slider" v-once theme="dark" accordion :active-name="activeName" :open-names='openNames'>
    <Submenu name="analizy">
      <template slot="title">
        <Icon type="stats-bars" size="20"></Icon>
        统计分析
      </template>
      <MenuItem name="siteView">
        <router-link to="/home/siteView">访问量</router-link>
      </MenuItem>
      <MenuItem name="userFb">
        <router-link to="/home/userFb">用户分布</router-link>
      </MenuItem>
    </Submenu>
    <Submenu name="userManage">
      <template slot="title">
        <Icon type="person-stalker" size="20"></Icon>
        用户管理
      </template>
      <MenuItem name="user">
        <router-link to="/home/user">用户</router-link>
      </MenuItem>
    </Submenu>
    <Submenu name="goods">
      <template slot="title">
        <Icon type="ios-pie" size="20"></Icon>
        <span>商品管理</span>
      </template>
      <MenuItem name="goodsManage">
        <router-link to="/home/goodsManage">商品管理</router-link>
      </MenuItem>
      <MenuItem name="addGoods">
        <router-link to="/home/addGoods">添加商品</router-link>
      </MenuItem>
    </Submenu>
    <Submenu name="bannerManger">
      <template slot="title">
        <Icon type="navigate" size="20"></Icon>
        <span>广告管理</span>
      </template>
      <MenuItem name="banner">
        <router-link to="/home/banner">广告管理</router-link>
      </MenuItem>
      <MenuItem name="addBanner">
        <router-link to="/home/addBanner">添加广告</router-link>
      </MenuItem>
    </Submenu>
    <Submenu name="categoryManger">
      <template slot="title">
        <Icon type="pricetags" size="20"></Icon>
        <span>类目管理</span>
      </template>
      <MenuItem name="category">
        <router-link to="/home/category">商品分类</router-link>
      </MenuItem>
    </Submenu>
    <Submenu name="evaluateManger">
      <template slot="title">
        <Icon type="pricetags" size="20"></Icon>
        <span>评价管理</span>
      </template>
      <MenuItem name="evaluate">
        <router-link to="/home/evaluate">评价列表</router-link>
      </MenuItem>
    </Submenu>
</Menu>
</template>
<script>
  export default {
    data () {
      return {
        openNames: [],
        activeName: ''
      }
    },
    created () {
      let menus = {
        analizy: ['siteView', 'userFb'],
        userManage: ['custom', 'manager'],
        goods: ['goodsManage', 'addGoods'],
        bannerManger: ['banner', 'addBanner'],
        categoryManger: ['category'],
        evaluateManger: ['evaluate']
      }
      this.activeName = location.hash.split('/').pop()
      for (let key in menus) {
        if (~menus[key].indexOf(this.activeName)) {
          this.openNames = [key]
          break
        }
      }
    },
    watch: {
      activeName () {
        this.$nextTick(() => {
          this.$refs.slider.updateOpened()
          this.$refs.slider.updateActiveName()
        })
      }
    }
  }
</script>
<style scoped>
  .ivu-menu-item{
    padding:0 !important;
  }
  .ivu-menu-item a{
    display:block;
    color:#fff;
    padding:14px 24px;
  }
</style>