<template>
    <div class="header-container">
        <div class="l-content">
            <el-button style="margin-right: 20px" @click="handleMenu"  size="mini"><el-icon><Menu/></el-icon></el-button>
            <!-- 面包屑 -->
            <!-- <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb> -->
        </div>
        <div class="r-content">
            <el-dropdown>
        <span class="el-dropdown-link">
             <img class="user" src="../../assets/user.png" alt="">
        </span>
        <template #dropdown>
          <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="onLogout()">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
        </div>
    </div>




</template>



<script>
import { ArrowDown} from '@element-plus/icons-vue'
import Cookie from 'js-cookie'
export default {
      name: 'MyHeader',
      components: {
        ArrowDown,
        
      },
      methods:{        
        handleMenu() {
            this.$store.commit('collapseMenu')
        },
        async  onLogout() {
            const {data:res}= await this.$http.get('/api/user/logout')
            // if(res.code===200){
              console.log(res);
            localStorage.setItem('rf2',0)
            Cookie.remove('token')
            localStorage.removeItem('Id')
            localStorage.removeItem('Ip')
            localStorage.removeItem('admin')
            this.$router.push('/login')
      // }
    },
      }
      }
</script>


<style lang="css" scoped>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    }

.header-container  .text {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }
    .r-content .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        
    
</style>