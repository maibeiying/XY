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
      <Select v-model="cateId" class="f-r">
        <Option :value="key" v-for="(val, key) in categorys">{{val}}</Option>
      </Select>
    </div>
    <div class="row">
      <label>上传主图 :</label>
      <div class="upload-wrap">
        <upload :defaultList="ztList" maxUploadLen="1" :uploadFiles.sync="ztUploadFiles"></upload>
      </div>
    </div>
    <div class="row">
      <label>商品图片 :</label>
      <div class="upload-wrap">
        <upload :defaultList="tlList" maxUploadLen="6" :uploadFiles.sync="tLUploadFiles"></upload>
      </div>
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
  import upload from '../components/upload.vue'
  export default {
    components: {
      upload
    },
    data () {
      return {
        name: '',
        price: '',
        cateId: '',
        categorys: {},
        desc: '',
        isshow: false,
        ztList: [], // 主图
        tlList: [], // 商品图片
        ztUploadFiles: [],
        tLUploadFiles: []
      }
    },
    created () {

    },
    mounted () {
      this.getCates()
    },
    methods: {
      getCates () {
        this.$http.post('./category/getCates').then(data => {
          this.categorys = {}
          for (let cate of data.result) {
            if (!this.cateId) this.cateId = cate._id
            this.categorys[cate._id] = cate.name
          }
        })
      }
    }
  }
</script>
<style scoped>
  .row{
    display:flex;
    margin-bottom:20px;
    /*max-width:40vw;*/
    align-items: center;
    & .f-r{
      flex:1;
      margin-left:20px;
      max-width:40vw;
    }
    & .upload-wrap{
      margin-left:20px;
    }
    & .switch{
      margin-left:20px;
    }
  }
</style>