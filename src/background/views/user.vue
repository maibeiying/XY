<template>
  <div>
    <div class="search-bar row">
      <div class="col flex">
        <label>角色 :</label>
        <Select v-model="uty" class="selector">
          <Option value="all">不限</Option>
          <Option value="0">超级管理员</Option>
          <Option value="1">普通管理员</Option>
          <Option value="2">客户</Option>
          <Option value="3">随机客户</Option>
        </Select>
      </div>
      <div class="col">
        <Button type="primary" class="search-btn" @click="getUsers">搜索</Button>
        <Button type="primary" class="search-btn" @click="dialog=true">生成用户</Button>
      </div>
    </div>
    <Table border :loading="loading" :columns="columns" :data="tableData"></Table>
    <Page :total="count" :current.sync="page" size="small" :page-size="pageSize"></Page>
    <Modal
        v-model="dialog"
        title="生成用户"
        @on-ok="addRanUsers"
        @on-cancel="dialog=false">
        <Input placeholder="输入用户个数" v-model="userNumber" autofocus @on-enter="addRanUsers"></Input>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        columns: [
          {
            title: '账号',
            key: 'username'
          },
          {
            title: '密码',
            key: 'userpwd'
          },
          {
            title: '角色',
            key: 'uty',
            render: (h, params) => {
              let uty = params.row.uty * 1
              let name = null
              if (uty === 0) name = '超级管理员'
              if (uty === 1) name = '普通管理员'
              if (uty === 2) name = '客户'
              if (uty === 3) name = '随机客户'
              return name
            }
          },
          {
            title: '登录时间',
            key: 'logindate'
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
        ],
        tableData: [],
        loading: false,
        dialog: false,
        userNumber: 10,
        uty: 'all',
        page: 1,
        pageSize: 10,
        count: 0
      }
    },
    mounted () {
      this.getUsers()
    },
    methods: {
      remove (index, row) {
        this.$http.post('./user/removeUser', {
          _id: row._id
        }).then(data => {
          if (data.code === 1) {
            this.$Message.success(data.msg)
            this.getUsers()
          } else {
            this.$Message.error('删除失败')
          }
        })
      },
      addRanUsers () {
        if (!this.userNumber || isNaN(this.userNumber * 1)) return this.$Message.warning('请输入合法数字')
        this.$http.post('./user/addRanUsers', {
          userNumber: this.userNumber,
          uty: '3'
        }).then(data => {
          this.dialog = false
          if (data.code === -1) return this.$Message.error(data.msg)
          this.$Message.success(data.msg)
          this.userNumber = 0
          this.getUsers()
        })
      },
      getUsers () {
        this.loading = true
        this.$http.get('./user/getUsers', {
          params: {
            uty: this.uty,
            page: this.page,
            pageSize: this.pageSize
          }
        }).then(data => {
          this.loading = false
          this.tableData = data.result
          this.count = data.count
          for (let row of this.tableData) {
            let date = new Date(row.logindate)
            row.logindate = `${date.getFullYear()}-${this.double(date.getMonth() + 1)}-${this.double(date.getDate())}
             ${this.double(date.getHours())}:${this.double(date.getMinutes())}`
          }
        })
      },
      double (number) {
        if (number * 1 < 10) return `0${number}`
        return number
      }
    },
    watch: {
      page () {
        this.getUsers()
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
    margin-right:20px;
  }
  .selector{
    width:100px;
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