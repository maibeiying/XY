<template>
  <div class="upload">
    <div class="upload-list" v-for="item in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      multiple
      type="drag"
      action="./upload/upload"
      v-show="uploadList.length < maxUploadLen"
      style="display: inline-block;width:58px;">
      <div class="camera">
        <Icon type="camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
      <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
  export default {
    props: ['defaultList', 'maxUploadLen'],
    data () {
      return {
        imgUrl: '',
        visible: false,
        uploadList: [],
        tempDefaultList: this.defaultList
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
    },
    methods: {
      handleView (item) {
        this.imgUrl = item.url
        this.visible = true
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      },
      handleSuccess (res, file) {
        file.url = file.response.url
        file.name = file.response.name
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        })
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        })
      }
    },
    watch: {
      uploadList () {
        this.tempDefaultList = this.uploadList
      }
    }
  }
</script>
<style scoped>
  .upload-list{
    display: inline-block;
    max-width: 200px;
    max-height: 200px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .upload-list img{
    width: 100%;
    height: 100%;
  }
  .upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .upload-list:hover .upload-list-cover{
    display: flex;
    align-items:center;
    justify-content: center;
  }
  .upload-list-cover i{
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
    margin: 0 20px;
  }
  .camera{
    width: 58px;
    height:58px;
    display:flex;
    align-items:center;
    justify-content: center;
  }
</style>
