<template>
  <div class="addGoods">
    <div class="row">
      <label>商品名称 :</label>
      <Input v-model="name" placeholder="请输入商品名称" class="f-r"></Input>
    </div>
    <div class="row">
      <label>商品价格 :</label>
      <Input v-model="price" placeholder="请输入商品名称" class="f-r"></Input>
    </div>
    <div class="row">
      <label>商品分类 :</label>
      <Select v-model="category" class="f-r">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </div>
    <div class="row">
      <label for="">商品描述 :</label>
      <Input v-model="desc" type="textarea" placeholder="请输入商品描述" class="f-r"></Input>
    </div>
    <div class="row">
      <label for="">是否显示 :</label>
      <i-switch size="large" v-model="isshow" class="switch">
        <span slot="open">显示</span>
        <span slot="close">隐藏</span>
      </i-switch>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        name: '',
        price: '',
        category: [],
        desc: '',
        isshow: false
      }
    }
  }
</script>
<style scoped>
  .row{
    display:flex;
    margin-bottom:20px;
    max-width:40vw;
    align-items: center;
    & .f-r{
      flex:1;
      margin-left:20px;
    }
    & .switch{
      margin-left:20px;
    }
  }
</style>