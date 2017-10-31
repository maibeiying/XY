<template>
  <div>
    <v-header></v-header>
    <div class="content">
      <v-menu></v-menu>
      <div class="children-view">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
  import vMenu from '../components/menu.vue'
  import vHeader from '../components/header.vue'
  export default {
    components: {
      vMenu,
      vHeader
    }
  }
</script>
<style scoped>
  .content{
    display:flex;
    min-height:calc(100vh - 90px);
  }
  .children-view{
    padding:20px;
    flex:1;
  }
</style>