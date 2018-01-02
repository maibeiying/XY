<template>
  <div class="goods-manage">
    <div class="search-bar row">
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
          <Option :value="1">1</Option>
          <Option :value="2">2</Option>
          <Option :value="3">3</Option>
          <Option :value="4">4</Option>
          <Option :value="5">5</Option>
        </Select>
      </div>
      <div class="btns">
        <Button type="primary" class="search-btn" @click="queryEvaluates">搜索</Button>
        <Button type="primary" class="search-btn" @click="dialog=true">添加评价</Button>
      </div>
    </div>
    <p class="title">
      <label>商品名称 : </label>啊手动阀
    </p>
    <Table border :loading="loading" :columns="columns" :data="tableData"></Table>
    <Page :total="count" :current.sync="page" size="small" :page-size="pageSize"></Page>
    <Modal
      v-model="dialog"
      title="添加评价"
      @on-ok="addEvaluate"
      @on-cancel="dialog=false">
      <div class="row">
        <label>商品名称 :</label>
        <Select v-model="goodsId" class="f-r">
          <Option :value="item._id" v-for="item in goodsList">{{item.name}}</Option>
        </Select>
      </div>
      <div class="row">
        <label>商品评分 :</label>
        <Rate v-model="rate" class="f-r"></Rate>
      </div>
      <div class="row">
        <label>评价用户 :</label>
        <Select v-model="userId" class="f-r">
          <Option :value="item._id" v-for="item in userList">{{item.username}}</Option>
        </Select>
      </div>
      <div class="row">
        <label>评价描述 :</label>
        <Input v-model="desc" class="f-r" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入评价内容"></Input>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tableData: [],
        loading: false,
        page: 1,
        pageSize: 10,
        count: 0,
        dialog: false,
        goodsName: '',
        goodsId: '',
        goodsList: [],
        userId: '',
        userList: [],
        desc: '',
        rate: 0,
        time: 'all',
        grade: 'all',
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
      this.goodsId = location.href.replace(/.*id=(.*)/, '$1')
      this.queryEvaluates()
      this.queryUsers()
    },
    methods: {
      queryEvaluates () {
        this.$http.post('./evaluate/queryEvaluates', {
          goodsId: this.goodsId,
          grade: this.grade,
          time: this.time
        }).then(data => {
          if (data.code === -1) return this.$Message.error(data.msg)
        })
      },
      queryUsers () {
        this.$http.post('./user/queryUsers', {
          uty: 3
        }).then(data => {
          if (data.code === -1) return this.$Message.error(data.msg)
          this.userList = data.result
          this.userId = this.userList[0] && this.userList[0]._id
        })
      },
      addEvaluate () {
        this.$http.post('./evaluate/addEvaluate', {
          goodsId: ''
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
    align-items:center;
    margin-bottom:20px;
    & label{
      margin-right:10px;
    }
  }
  .f-r{
    flex:1;
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
    &:last-child{
      margin:0;
    };
  }
  .search-btn{
    min-width:100px;
  }
  .title{
    font-size:14px;
    color:#333;
    margin-bottom:15px;
    & label{
      color:#666;
    }
  }
</style>