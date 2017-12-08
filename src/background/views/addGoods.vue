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
        <Option :value="key" v-for="(val, key) in categorys" :key="key">{{val}}</Option>
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
      <i-switch size="large" v-model="isShow" class="switch">
        <span slot="open">显示</span>
        <span slot="close">隐藏</span>
      </i-switch>
    </div>
    <div class="row">
      <Button type="primary" @click="sure" size="large">确定</Button>
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
        isShow: true,
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
            this.$set(this.categorys, cate._id, cate.name)
          }
        })
      },
      sure () {
        if (!this.name || !this.price || !this.desc || !this.ztUploadFiles.length || !this.tLUploadFiles.length) return this.$Message.error('请完整填写商品信息')
        this.$http.post('./goods/addGoods', {
          name: this.name,
          price: this.price,
          desc: this.desc,
          cateId: this.cateId,
          cateName: this.categorys[this.cateId],
          isShow: this.isShow,
          mainImg: this.ztUploadFiles.map(item => item.url).toString(),
          prevImg: this.tLUploadFiles.map(item => item.url).toString()
        }).then(data => {
          if (data.code === -1) return this.$Message.error(data.msg)
          this.$Message.success(data.msg)
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
    & button{
      width: 200px;
    }
  }
  .alignCenter{
    text-align: center;
    justify-content: center;
  }
</style>