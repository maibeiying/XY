<template>
  <div class="goods-manage">
    <div class="search-bar row">
      <div class="col flex">
        <label>商品名称 :</label>
        <Input v-model.trim="name" placeholder="名称"></Input>
      </div>
      <div class="col flex">
        <label>商品价格 :</label>
        <Select v-model="pirce" class="f-r">
          <Option value="0">不限</Option>
          <Option value="0,25">0 - 25</Option>
          <Option value="25,50">25 - 50</Option>
          <Option value="50,100">50 - 100</Option>
          <Option value="100+">100以上</Option>
        </Select>
      </div>
      <div class="col flex">
        <label>商品分类 :</label>
        <Select v-model="cateId" class="f-r">
          <Option :value="key" v-for="(val, key) in categorys" :key="key">{{val}}</Option>
        </Select>
      </div>
      <div class="col flex">
        <label>是否显示 :</label>
        <Select v-model="isShow" class="f-r">
          <Option :value="-1">全部</Option>
          <Option :value="1">是</Option>
          <Option :value="0">否</Option>
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
        isShow: -1,
        columns: [
          {
            title: '主图',
            key: 'mainImg',
            render (h, params) {
              return h('Img', {
                attrs: {
                  src: params.row.mainImg
                }
              }, '')
            }
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
            key: 'desc'
          },
          {
            title: '所属分类',
            key: 'cateName'
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
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.update(params.index, params.row)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: 'red'
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
        pirce: '0',
        page: 1,
        pageSize: 10,
        count: 0
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
          isShow: this.isShow,
          page: this.page,
          pageSize: this.pageSize
        }).then(data => {
          if (data.code === -1) return this.$Message.error(data.msg)
          this.count = data.count
          this.tableData = data.result
        })
      },
      update () {},
      remove () {}
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
    max-width:200px;
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