<template>
  <div class="goods-manage">
    <div class="search-bar row">
      <div class="col flex">
        <label>商品名称 :</label>
        <Input v-model.trim="name" placeholder="名称"></Input>
      </div>
      <div class="col flex">
        <label>评价时间 :</label>
        <Select v-model="time" class="f-r">
          <Option value="all">不限</Option>
          <Option value="day">近一天</Option>
          <Option value="week">近一周</Option>
          <Option value="month">近一月</Option>
          <Option value="year">近一年</Option>
        </Select>
      </div>
      <div class="col flex">
        <label>评价分数 :</label>
        <Select v-model="grade" class="f-r">
          <Option value="all">不限</Option>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
        </Select>
      </div>
      <div class="btns">
        <Button type="primary" class="search-btn" @click="queryGoods">搜索</Button>
        <Button type="primary" class="search-btn" @click="addEvaluate">添加评价</Button>
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
        cateId: ' ',
        isShow: ' ',
        tableData: [],
        loading: false,
        name: '',
        price: ' ',
        page: 1,
        pageSize: 10,
        count: 0,
        imgUrl: '',
        columns: [
          {
            title: '商品名称',
            key: 'goodsName'
          },
          {
            title: '评价人',
            key: 'user'
          },
          {
            title: '评价时间',
            key: 'time'
          },
          {
            title: '评价分数',
            key: 'grade'
          },
          {
            title: '评价内容',
            key: 'desc'
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
                    color: '#ff9900'
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
        ]
      }
    },
    mounted () {
      this.getCates()
      this.queryGoods()
    },
    methods: {
      getCates () {
        this.categorys = {' ': '不限'}
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
      update (index, row) {
        this.$router.push({path: 'addGoods', query: {id: row._id}})
      },
      remove (index, row) {
        this.$http.post('./goods/removeGoods', {
          _id: row._id
        }).then(data => {
          if (data.code === -1) return this.$Message.error(data.msg)
          this.$Message.success(data.msg)
          this.queryGoods()
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
  .btns button{
    margin-right:20px;
  }
  .search-btn{
    min-width:100px;
  }
</style>