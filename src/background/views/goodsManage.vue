<template>
  <div class="goods-manage">
    <Row class="search-bar">
      <Col span="6">
        <label>商品名称:</label>
      </Col>
      <Col span="6">
        <label>商品价格:</label>
      </Col>
      <Col span="6">
        <label>商品分类:</label>
        <Select v-model="cateId" class="f-r">
          <Option :value="key" v-for="(val, key) in categorys">{{val}}</Option>
        </Select>
      </Col>
      <Col span="6">
        <label>是否显示:</label>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    data () {},
    mounted () {
      this.getCates()
    },
    methods: {
      getCates () {
        // this.$http.post('./cate')
      }
    }
  }
</script>