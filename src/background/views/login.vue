<template>
  <div class="login-view">
    <div class="row">
      <Input v-model.trim="username" placeholder="请输入账号"></Input>
    </div>
    <div class="row">
      <Input v-model.trim="userpwd" placeholder="请输入密码"></Input>
    </div>
    <div class="row">
      <Button type="primary" long @click="getLogin">登录</Button>
    </div>
    <div class="row">
      <div class="register">
        <span @click="isShow=true">注册</span>
      </div>
    </div>
    <Modal
      title="注册"
      v-model="isShow"
      @on-ok="ok"
      :styles="{top: '20px'}">
      <div class="row">
        <Input v-model.trim="registerName" placeholder="请输入账号"></Input>
      </div>
      <div class="row">
        <Input v-model.trim="registerPwd" placeholder="请输入密码"></Input>
      </div>
      <div class="row js">
        <label>角色 :</label>
        <Select v-model="uty" class="f-r">
          <Option value="0">超级管理员</Option>
          <Option value="1">普通管理员</Option>
        </Select>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        username: 'admin',
        userpwd: '123456',
        registerName: '',
        registerPwd: '',
        uty: '0',
        isShow: false
      }
    },
    mounted () {

    },
    methods: {
      async getLogin () {
        let data = await this.login()
        if (data.code === 1) return this.$router.push('home')
        this.$Message.error(data.msg)
      },
      login () {
        return this.$http.post('./user/login', {
          username: this.username,
          userpwd: this.userpwd,
          device: ''
        }).then(data => {
          return data
        })
      },
      ok () {
        this.$http.post('./user/addUser', {
          username: this.registerName,
          userpwd: this.registerPwd,
          uty: this.uty
        }).then(data => {
          if (data.code === -1) return this.$Message.error(data.msg)
          this.$Message.success(data.msg)
          this.$router.push('home')
        })
      }
    }
  }
</script>
<style scoped>
  .login-view{
    max-width:1200px;
    margin:0 auto;
  }
  .row{
    margin-bottom:20px;
  }
  .register{
    text-align:center;
    & span{
      cursor:pointer;
    }
  }
  .js{
    display:flex;
    align-items:center;
    & .f-r{
      width:100px;
      flex:1;
      margin-left:20px;
    }
  }
</style>