<template>
  <div>
    <div class="clearfix">
      <Button type="primary" class="addUser" @click="dialog=true">添加分类</Button>
    </div>
    <Table border :loading="loading" :columns="columns" :data="tableData"></Table>
    <Page :total="count" :current.sync="page" size="small" :page-size="pageSize"></Page>
    <Modal
        v-model="dialog"
        title="添加分类"
        @on-ok="addCate"
        @on-cancel="dialog=false">
        <Input placeholder="输入分类名称" v-model.trim="catename" autofocus @on-enter="addCate"></Input>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        columns: [
          {
            title: '分类',
            key: 'catename'
          },
          {
            title: '商品数量',
            key: 'count'
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
        catename: '',
        page: 1,
        pageSize: 10,
        count: 0
      }
    },
    mounted () {
      this.getCates()
    },
    methods: {
      remove (index, row) {
        this.$http.post('./category/removeCate', {
          _id: row._id
        }).then(data => {
          if (data.result.code === 1) {
            this.$Message.success(data.result.msg)
            this.getCates()
          } else {
            this.$Message.success('删除失败')
          }
        })
      },
      addCate () {
        if (!this.catename) return this.$Message.warning('分类名称不能为空')
        this.$http.post('./category/addCate', {
          catename: this.catename
        }).then(data => {
          this.dialog = false
          if (data.result.code === 1) {
            this.$Message.success(data.result.msg)
            this.catename = ''
            this.getCates()
          } else {
            this.$Message.error('添加失败')
          }
        })
      },
      getCates () {
        // this.loading = true
        this.$http.post('./category/getCates').then(data => {
          // this.loading = false
          this.tableData = data.result.result
          this.count = data.result.count
        })
      }
    },
    watch: {
      page () {
        this.getCates()
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