<template>
    <div class="common-layout">
    <el-container>
      <el-aside width="auto"><my-aside></my-aside></el-aside>
      <el-container>
        <el-header><my-header></my-header></el-header>
        <el-main> <router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
  </template>

<script>
    import MyAside from './aside/MyAside.vue'
import MyHeader from './aside/MyHeader.vue';
    export default {
      name: 'MyHome',
      // 注册组件
      components: {
    MyAside,
    MyHeader
},
    }
    </script>

    <style scoped>
    .el-header{
      padding: 0;
    }

      </style>