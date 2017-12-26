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
        <Input placeholder="输入分类名称" v-model.trim="name" autofocus @on-enter="addCate"></Input>
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
            key: 'name'
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
        dialog: false,
        name: '',
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
        if (row.count) return this.$Message.warning('不能删除含有商品的分类')
        this.$http.post('./category/removeCate', {
          _id: row._id
        }).then(data => {
          if (data.code === 1) {
            this.$Message.success(data.msg)
            this.getCates()
          } else {
            this.$Message.success('删除失败')
          }
        })
      },
      addCate () {
        if (!this.name) return this.$Message.warning('分类名称不能为空')
        this.$http.post('./category/addCate', {
          name: this.name
        }).then(data => {
          this.dialog = false
          if (data.code === 1) {
            this.$Message.success(data.msg)
            this.name = ''
            this.getCates()
          } else {
            this.$Message.error('添加失败')
          }
        })
      },
      getCates () {
        this.$http.post('./category/getCates').then(data => {
          this.tableData = data.result
          this.count = data.count
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