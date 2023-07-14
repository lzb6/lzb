<template>
      <el-menu 
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        default-active="1"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose">

      <h3>{{ isCollapse ? '供货' : '供货管理系统' }}</h3>


        <router-link to="/home/index"  @mousedown="shouji1" @mouseup="shouji2">
           <el-menu-item index="1">
          <el-icon><house /></el-icon>
          <span>业务首页</span>
        </el-menu-item>
      </router-link>

          <el-sub-menu index="2">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>供应商管理</span>
          </template>
          <el-menu-item-group >
            <router-link to="/home/message"  @mousedown="shouji1" @mouseup="shouji2"><el-menu-item index="1-1">供应商信息</el-menu-item></router-link> 
            <router-link to="/home/test"  @mousedown="shouji1" @mouseup="shouji2"><el-menu-item index="1-2">供应商考评</el-menu-item></router-link>
          </el-menu-item-group>
        </el-sub-menu>


        <router-link to="/home/info"  @mousedown="shouji1" @mouseup="shouji2">
          <el-menu-item index="3">
          <el-icon><folder /></el-icon>
          <span>供应商报表</span>
        </el-menu-item>
       </router-link>

       <!-- v-if="admin" -->
       <router-link to="/home/check"  @mousedown="shouji1" @mouseup="shouji2" v-if="admin" >       
         <el-menu-item index="4">
          <el-icon><document /></el-icon>
          <span>异常监测</span>
        </el-menu-item>
        </router-link>
      </el-menu>
    
</template>


<script>
import {
  Document,
  Menu as IconMenu,
  Folder,
  House,
} from '@element-plus/icons-vue'
import { dataType } from 'element-plus/es/components/table-v2/src/common'
import Cookie from 'js-cookie';
import { ElMessageBox, ElMessage} from 'element-plus'
import { h } from 'vue'



 export default {
      name: 'MyAside',
      components: {
        Document,
        Folder,
        House,
        dataType ,
        IconMenu,
        ElMessageBox,
        ElMessage
      },
      data(){
        return{
          dateTime:'',
          admin:parseInt(localStorage.getItem('admin')),
          timer:'',
          handle:''
        }
      },
      methods:{
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

          // 获取点击顺序和点击位置
   async shouji1(e){
     this.Date()
      console.log(e.target.innerHTML+':'+e.pageX+','+e.pageY)
      const {data:res}=await this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Button.left Pressed',x:e.pageX,y:e.pageY});
      
    },
    async shouji2(e){
     console.log(this.token)
     this.Date()
      console.log(e.target.innerHTML+':'+e.pageX+','+e.pageY)
      const {data:res}=await this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Button.left Released',x:e.pageX,y:e.pageY});
    },
    async judge(){
      const {data:res}=await this.$http.get('/api/check',{params:{}})
      console.log(res.data)
      if(res.data== -1){
        // Cookie.remove('token')
        // this.$router.push('/home')
        // localStorage.setItem('rf2',0)
        this.notice()
      }
      if(res.data== -2){
        ElMessage({
                message: h('p', { style: 'font-weight: bold;font-size:15px;'}, '您被认定为恶意用户，将被强制登出！'),
                type: 'warning',
            })
        Cookie.remove('token')
        localStorage.setItem('rf2',0)
        setTimeout(() =>
        this.$router.push('/home')
        , 2500)
        
      }
    },
    notice(){
      if(this.handle==1){
        ElMessage({
                message: h('p', { style: 'font-size: bold'}, '经检测，您的操作为恶意操作，请注意！'),
                type: 'warning',
            })
        this.handle=0;
      }

    },


           // 获取当前时间至毫秒
       Date() {
      const nowDate = new Date();
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
        hours: nowDate.getHours(),
        minutes: nowDate.getMinutes(),
        seconds: nowDate.getSeconds(),
        millisecond:nowDate.getUTCMilliseconds(),
      };

      const newmonth = date.month > 10 ? date.month : "0" + date.month;
      const newday = date.date > 10 ? date.date : "0" + date.date;
      const newminutes = date.minutes > 10 ? date.minutes : "0" + date.minutes;
      const newseconds = date.seconds > 10 ? date.seconds : "0" + date.seconds;
      //   const newminutes = date.minutes < 10 ? "0" + date.minutes : date.minutes;
      //   const newseconds = date.seconds < 10 ? "0" + date.seconds : date.seconds;
      const newmillisecond = date.millisecond;
      this.dateTime =
        date.year +
        "-" +
        newmonth +
        "-" +
        newday +
        " " +
        date.hours +
        ":" +
        newminutes +
        ":" +
        newseconds+
       "."+ 
       newmillisecond;
    },
      },
      computed: {
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  },
  //鼠标移动轨迹以及任意点击位置
  mounted(){
    this.handle=1
    // 判断是否踢出
    this.timer = setInterval(this.judge, 10000);

            // 鼠标移动
    document.addEventListener('mousemove', (e) => {
      this.Date();
       const {data:res}= this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Moved',x:e.pageX,y:e.pageY,user:''});
       console.log(res);
     }),
           // 点击
           document.addEventListener('mousedown', (e) => {
      if(e.button==0){
        this.Date();
        console.log(this.dateTime);
        const {data:res}= this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Button.left Pressed',x:e.pageX,y:e.pageY,user:''});
        console.log('左键:'+e.pageX+','+e.pageY);
        console.log(res);
      }else if(e.button==1){
         this.Date();
        console.log(this.dateTime);
        const {data:res}= this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Button.middle Pressed',x:e.pageX,y:e.pageY,user:''});
         console.log('中键:'+e.pageX+','+e.pageY)
          console.log(res);
      }else if(e.button==2){
         this.Date();
        console.log(this.dateTime);
        const {data:res}= this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Button.right Pressed',x:e.pageX,y:e.pageY,user:''});
         console.log('右键:'+e.pageX+','+e.pageY);
          console.log(res);
      }
     }),
     document.addEventListener('mouseup',(e) => {
        if(e.button==0){
        this.Date();
        console.log(this.dateTime);
        const {data:res}= this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Button.left Released',x:e.pageX,y:e.pageY,user:''});
        console.log('左键:'+e.pageX+','+e.pageY);
        console.log(res);
      }else if(e.button==1){
         this.Date();
        console.log(this.dateTime);
        const {data:res}= this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Button.middle Released',x:e.pageX,y:e.pageY,user:''});
        console.log(res);
         console.log('中键:'+e.pageX+','+e.pageY)
      }else if(e.button==2){
          this.Date();
        console.log(this.dateTime);
        const {data:res}= this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Button.right Released',x:e.pageX,y:e.pageY,user:''});
        console.log(res);
         console.log('右键:'+e.pageX+','+e.pageY)
      }
      }),
          //  键盘事件
    document.addEventListener('keydown',(e) =>{
       this.Date();
        if(e.shiftKey===true){
               const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Shift'+' '+e.key,user:''})
               console.log(res);
             } 
             if(e.ctrlKey===true){
               const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Ctrl'+' '+e.key,user:''})
               console.log(res);
            }
             if(e.altKey===true){
               const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Alk'+' '+e.key,user:''})
               console.log(res);
            }
             if(e.metaKey===true){
               const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Meta'+' '+e.key,user:''})
               console.log(res);
            }
            if(e.shiftKey===false&&e.ctrlKey===false&&e.altKey===false&&e.metaKey===false) {
              const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:e.key,user:''})
               console.log(res);
            }
    }),
    document.addEventListener('keyup',(e) =>{
               this.Date();
             if(e.shiftKey===true){
               const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Shift'+' '+e.key,user:''})
               console.log(res);
             } 
             if(e.ctrlKey===true){
               const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Ctrl'+' '+e.key,user:''})
               console.log(res);
            }
             if(e.altKey===true){
               const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Alk'+' '+e.key,user:''})
               console.log(res);
            }
             if(e.metaKey===true){
               const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Meta'+' '+e.key,user:''})
               console.log(res);
            }
            if(e.shiftKey===false&&e.ctrlKey===false&&e.altKey===false&&e.metaKey===false) {
              const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:e.key,user:''})
               console.log(res);
            }
    })

    },
    // 销毁定时器
    beforeDestroy() {
    clearInterval(this.timer);
  }
    }
</script>


<style lang="css" scoped>
body{
    background-color: rgba(255,255,255,0.8);
    height: 100%;
}

.el-menu{
  height: 100vh;
  border-right: none;
}
.el-menu h3{
  color:#fff;
  text-align: center;
  line-height: 48px;
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 400px;
}
.el-menu span{
  margin-left: 15px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>