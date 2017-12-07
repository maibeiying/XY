<template>
  <div class="goods-manage">
    <div class="search-bar row">
      <div class="col flex">
        <label>商品名称 :</label>
        <Input v-model.trim="name" placeholder="名称"></Input>
      </div>
      <div class="col flex">
        <label>商品价格 :</label>
        <Select v-model="cateId" class="f-r">
          <Option :value="key" v-for="(val, key) in categorys">{{val}}</Option>
        </Select>
      </div>
      <div class="col flex">
        <label>商品分类 :</label>
        <Select v-model="cateId" class="f-r">
          <Option :value="key" v-for="(val, key) in categorys">{{val}}</Option>
        </Select>
      </div>
      <div class="col flex">
        <label>是否显示 :</label>
        <Select v-model="isShow" class="f-r">
          <Option value="0">全部</Option>
          <Option :value="true">是</Option>
          <Option :value="false">否</Option>
        </Select>
      </div>
      <div class="col">
        <Button type="primary" class="search-btn">搜索</Button>
      </div>
    </div>
    <Table border :loading="loading" :columns="columns" :data="tableData"></Table>
    <Page :total="count" :current.sync="page" size="small" :page-size="pageSize"></Page>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        categorys: {},
        cateId: '0',
        isShow: '0',
        columns: [
          {
            title: '主图',
            key: 'mainImg'
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '价格',
            key: 'pirce'
          },
          {
            title: '描述',
            key: 'pirce'
          },
          {
            title: '所属分类',
            key: 'pirce'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index, params.row)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        tableData: [],
        loading: false,
        name: '',
        pirce: ''
      }
    },
    mounted () {
      this.getCates()
      this.queryGoods()
    },
    methods: {
      getCates () {
        this.categorys = {'0': '不限'}
        this.$http.post('./category/getCates').then(data => {
          for (let cate of data.result) {
            this.$set(this.categorys, cate._id, cate.name)
          }
        })
      },
      queryGoods () {
        this.$http.post('./goods/queryGoods', {
          name: this.name,
          price: this.price,
          cateId: this.cateId,
          isShow: this.isShow
        }).then(data => {
          console.log(data)
        })
      }
    }
  }
</script>
<style scoped>
  .search-bar{
    margin-bottom:20px;
  }
  .row{
    display:flex;
  }
  .col{
    flex:1;
  }
  .flex{
    display:flex;
    margin-right:20px;
    align-items: center;
    & label{
      min-width:60px;
    }
  }
  .search-btn{
    min-width:100px;
  }
</style>