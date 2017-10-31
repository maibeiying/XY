<template>
  <div>
    <div class="clearfix">
      <Button type="primary" class="addUser" @click="dialog=true">添加管理员</Button>
    </div>
    <Table border :loading="loading" :columns="columns" :data="tableData"></Table>
    <Page :total="count" :current.sync="page" size="small" :page-size="pageSize"></Page>
    <Modal
        v-model="dialog"
        title="添加用户"
        @on-ok="addUser"
        @on-cancel="dialog=false">
        <Input placeholder="输入名称" v-model.trim="username" autofocus @on-enter="addUser"></Input>
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
        dialog: false,
        username: '',
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
          if (data.result.code === 1) {
            this.$Message.success(data.result.msg)
            this.getUsers()
          } else {
            this.$Message.error('删除失败')
          }
        })
      },
      addUser () {
        if (!this.username) return this.$Message.warning('名称不能为空')
        this.$http.post('./user/addUser', {
          username: this.username
        }).then(data => {
          this.dialog = false
          if (data.result.code === 1) {
            this.$Message.success(data.result.msg)
            this.username = ''
            this.getUsers()
          } else {
            this.$Message.error('添加失败')
          }
        })
      },
      getUsers () {
        // this.loading = true
        this.$http.get('./user/getUsers', {
          params: {
            uty: 1,
            page: this.page,
            pageSize: this.pageSize
          }
        }).then(data => {
          // this.loading = false
          this.tableData = data.result.result
          this.count = data.result.count
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
  .addUser{
    float:right;
    margin-bottom:20px;
  }
  .flex{
    display:flex;
    align-items:center;
  }
</style>