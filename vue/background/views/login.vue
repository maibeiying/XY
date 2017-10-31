<template>
  <div class="login-view">
    <div class="row">
      <Input v-model="username" placeholder="请输入账号"></Input>
    </div>
    <div class="row">
      <Input v-model="userpwd" placeholder="请输入密码"></Input>
    </div>
    <div class="row">
      <Button type="primary" long @click="getLogin">登录</Button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        username: 'admin',
        userpwd: '123'
      }
    },
    mounted () {

    },
    methods: {
      async getLogin () {
        let data = await this.login()
        if (data.result.code === 1) return this.$router.push('home')
        this.$message({
          showClose: true,
          message: data.result.msg,
          type: 'error'
        })
      },
      login () {
        return this.$http.post('./user/login', {
          username: this.username,
          userpwd: this.userpwd,
          device: ''
        }).then(data => {
          return data
        })
      }
    }
  }
</script>
<style scoped>
  .login-view{
    width:1200px;
    margin:0 auto;
  }
  .row{
    margin-bottom:20px;
  }
</style>