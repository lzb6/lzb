<template>
    <div class="login-container">
      <!-- contenteditable="true" -->
      <div class="text effect06" >供货管理系统</div>
      <div class="login-box">
        <!-- 头像区域 -->
        <div class="text-center avatar-box">
          <img src="../assets/user.png" class="img-thumbnail avatar" alt="" />
        </div>
  
        <!-- 表单区域 -->
        <div class="form-login p-4">
          <!-- 登录名称 -->
          <div class="form-group form-inline">
            <label for="username">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 工号:</label>
            <input
              type="text"
              class="form-control ml-2"
              id="userId"
              placeholder="请输入工号"
              autocomplete="off"
              v-model.trim="userId"
            />
          </div>
          <!-- 登录密码 -->
          <div class="form-group form-inline">
            <label for="password">登录密码:</label>
            <input
              type="password"
              class="form-control ml-2"
              id="password"
              placeholder="请输入登录密码"
              v-model.trim="password"
              @keyup.enter="login"
            />
          </div>
          <p v-if="tips">温馨提示 : 您的账号或密码不对</p>
          <!-- 登录和重置按钮 -->
          <div class="form-group form-inline d-flex justify-content-end">
            <button type="button" class="btn btn-primary" @click="login">
              登录
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>


<script>
    import { h } from 'vue'
   import Cookie from 'js-cookie' 
   import { ElMessageBox, ElMessage} from 'element-plus'
    export default {
      name: 'MyLogin',
      components: {
        ElMessageBox,
        ElMessage
      },
      data() {
        return {
          userId: '',
          password: '',
          tips:'',
          dateTime:'',
          ip : localStorage.getItem('Ip'),
          rf:0,
          timer:''
    
        }
      },
      methods: {
          handle(){
            ElMessage({
                message: h('p', { style: 'font-weight: bold;font-size:15px;'}, '您被认定为恶意用户，将被强制登出！'),
                type: 'warning',
            })
          },
           // 点击登录,enter登录
            async login(){
              const {data:res}=await this.$http.get('/api/user/login',{params:{id:this.userId,password:this.password}})
              console.log(res);
              if(res.code===200){
                    // console.log(typeof(this.dateTime))
                    console.log(this.ip);
                    this.tips=''
                    this.$router.push('/home')
                    localStorage.setItem('admin', res.data.user.administrator)
                    localStorage.setItem('username', res.data.user.username)
                    localStorage.setItem('position', res.data.user.position)
                    localStorage.setItem('department', res.data.user.department)
                    localStorage.setItem('Id', this.userId)
                    Cookie.set('token',res.data.token)
                    localStorage.setItem('input',0)
                    localStorage.setItem('rf',this.rf)
                    localStorage.setItem('rf2',1)
                    }
              if(res.data==3){
                ElMessage({
                  showClose: true,
                message: '您的账户已被锁定，请联系管理员！',
                type: 'error',
            })
              }
              if(res.data==1||res.data==2){
                    this.tips=1
                    Cookie.remove('token')
                  }
            },
            // login1(){
            //   localStorage.setItem('token', this.userId)
            //   this.$router.push('/home')
            // },
            // 收集内容
            //    shouji1(e) {            
            //     console.log(e.type+';'+'id:'+e.key);
            //     this.Date();
            //     console.log(e.shiftKey);
            //     console.log(this.dateTime);
            //    if(e.shiftKey===true){
            //        const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Shift'+' '+e.key,user:''})
            //        console.log(res);
            //      } 
            //      if(e.ctrlKey===true){
            //        const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Ctrl'+' '+e.key,user:''})
            //        console.log(res);
            //     }
            //      if(e.altKey===true){
            //        const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Alk'+' '+e.key,user:''})
            //        console.log(res);
            //     }
            //      if(e.metaKey===true){
            //        const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Meta'+' '+e.key,user:''})
            //        console.log(res);
            //     }
            //     if(e.shiftKey===false&&e.ctrlKey===false&&e.altKey===false&&e.metaKey===false) {
            //       const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:e.key,user:''})
            //        console.log(res);
            //     }
            // },
            //  shouji2(e) {
            //     console.log(e.type+';'+'id:'+e.key);
            //     //  console.log(e.ctrlKey);
            //      this.Date();
            //         if(e.shiftKey===true){
            //        const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Shift'+' '+e.key,user:''})
            //        console.log(res);
            //      } 
            //      if(e.ctrlKey===true){
            //        const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Ctrl'+' '+e.key,user:''})
            //        console.log(res);
            //     }
            //      if(e.altKey===true){
            //        const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Alk'+' '+e.key,user:''})
            //        console.log(res);
            //     }
            //      if(e.metaKey===true){
            //        const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Meta'+' '+e.key,user:''})
            //        console.log(res);
            //     }
            //     if(e.shiftKey===false&&e.ctrlKey===false&&e.altKey===false&&e.metaKey===false) {
            //       const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:e.key,user:''})
            //        console.log(res);
            //     }
            // },
              // shouji3(e) {            
              //   console.log(e.type+';'+'id:'+e.key);
              //   this.Date();
              //   if(e.shiftKey===true){
              //      const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Shift'+' '+e.key,user:''})
              //      console.log(res);
              //    } 
              //    if(e.ctrlKey===true){
              //      const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Ctrl'+' '+e.key,user:''})
              //      console.log(res);
              //   }
              //    if(e.altKey===true){
              //      const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Alk'+' '+e.key,user:''})
              //      console.log(res);
              //   }
              //    if(e.metaKey===true){
              //      const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Meta'+' '+e.key,user:''})
              //      console.log(res);
              //   }
              //   if(e.shiftKey===false&&e.ctrlKey===false&&e.altKey===false&&e.metaKey===false) {
              //     const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:e.key,user:''})
              //      console.log(res);
              //   }
              //        },
            // shouji4(e) {
            //        this.Date();
            //       if(e.shiftKey===true){
            //        const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Shift'+' '+e.key,user:''})
            //        console.log(res);
            //      } 
            //      if(e.ctrlKey===true){
            //        const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Ctrl'+' '+e.key,user:''})
            //        console.log(res);
            //     }
            //      if(e.altKey===true){
            //        const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Alk'+' '+e.key,user:''})
            //        console.log(res);
            //     }
            //      if(e.metaKey===true){
            //        const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Meta'+' '+e.key,user:''})
            //        console.log(res);
            //     }
            //     if(e.shiftKey===false&&e.ctrlKey===false&&e.altKey===false&&e.metaKey===false) {
            //       const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:e.key,user:''})
            //        console.log(res);
            //     }
            // },
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
         // 刷新
        refresh() {
          if(localStorage.getItem('rf2')==0){
          window.location.reload();
          localStorage.setItem('rf2',1);
        }
        },
                },
    
            // 任意位置的点击,判断设备 
        mounted () {
          // this.handle()
        //   document.addEventListener('mousemove', (e) => {
        //   // console.log(e)
        //   this.Date();
        //    const {data:res}= this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Moved',x:e.pageX,y:e.pageY,user:'null'});
        //  }),
        console.log(navigator.userAgent);
        localStorage.setItem('msg',navigator.userAgent)
          
         this.timer= setTimeout(this.refresh, 1000)
        //  document.addEventListener('mousedown', (e) => {
        //   if(e.button==0){
        //     this.Date();
        //     console.log(this.dateTime);
        //     const {data:res}= this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Button.left Pressed',x:e.pageX,y:e.pageY,user:'null'});
        //     console.log('左键:'+e.pageX+','+e.pageY);
        //     console.log(res);
        //   }else if(e.button==1){
        //      this.Date();
        //     console.log(this.dateTime);
        //     const {data:res}= this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Button.middle Pressed',x:e.pageX,y:e.pageY,user:'null'});
        //      console.log('中键:'+e.pageX+','+e.pageY)
        //       console.log(res);
        //   }else if(e.button==2){
        //      this.Date();
        //     console.log(this.dateTime);
        //     const {data:res}= this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Button.right Pressed',x:e.pageX,y:e.pageY,user:'null'});
        //      console.log('右键:'+e.pageX+','+e.pageY);
        //       console.log(res);
        //   }
        //   // console.log('x:'+e.button);
        //   // console.log('y:'+e.pageY);
        //   console.log(navigator.userAgent);
        //  }),
        //  document.addEventListener('mouseup',(e) => {
          //   if(e.button==0){
          //   this.Date();
          //   console.log(this.dateTime);
          //   const {data:res}= this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Button.left Released',x:e.pageX,y:e.pageY,user:'null'});
          //   console.log('左键:'+e.pageX+','+e.pageY);
          //   console.log(res);
          // }else if(e.button==1){
          //    this.Date();
          //   console.log(this.dateTime);
          //   const {data:res}= this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Button.middle Released',x:e.pageX,y:e.pageY,user:'null'});
          //   console.log(res);
          //    console.log('中键:'+e.pageX+','+e.pageY)
          // }else if(e.button==2){
          //     this.Date();
          //   console.log(this.dateTime);
          //   const {data:res}= this.$http.post('/check/mouse',{time:this.dateTime,state:'Mouse Button.right Released',x:e.pageX,y:e.pageY,user:'null'});
          //   console.log(res);
          //    console.log('右键:'+e.pageX+','+e.pageY)
          // }
          // }),
        //   document.addEventListener('keydown',(e) =>{
        //            this.Date();
        //          if(e.shiftKey===true){
        //            const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Shift'+' '+e.key,user:''})
        //            console.log(res);
        //          } 
        //          if(e.ctrlKey===true){
        //            const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Ctrl'+' '+e.key,user:''})
        //            console.log(res);
        //         }
        //          if(e.altKey===true){
        //            const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Alk'+' '+e.key,user:''})
        //            console.log(res);
        //         }
        //          if(e.metaKey===true){
        //            const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:'Meta'+' '+e.key,user:''})
        //            console.log(res);
        //         }
        //         if(e.shiftKey===false&&e.ctrlKey===false&&e.altKey===false&&e.metaKey===false) {
        //           const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'press',keyValue:e.key,user:''})
        //            console.log(res);
        //         }
          
        // }),
        //  document.addEventListener('keyup',(e) =>{
        //       this.Date();
        //             if(e.shiftKey===true){
        //            const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Shift'+' '+e.key,user:''})
        //            console.log(res);
        //          } 
        //          if(e.ctrlKey===true){
        //            const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Ctrl'+' '+e.key,user:''})
        //            console.log(res);
        //         }
        //          if(e.altKey===true){
        //            const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Alk'+' '+e.key,user:''})
        //            console.log(res);
        //         }
        //          if(e.metaKey===true){
        //            const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:'Meta'+' '+e.key,user:''})
        //            console.log(res);
        //         }
        //         if(e.shiftKey===false&&e.ctrlKey===false&&e.altKey===false&&e.metaKey===false) {
        //           const {data:res}= this.$http.post('/check/keyboard',{time:this.dateTime,state:'release',keyValue:e.key,user:''})
        //            console.log(res);
        //         }
        // })
        },
        // 清除定时器
     beforeDestroy() {
    clearInterval(this.timer);
  }
    }
    </script>

<style lang="css" scoped>
    .login-container {
      background: url('https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg') no-repeat;
      background-size: 100% 130%;
      background-color: #35495e;
      height: 100%;
    }
    .effect06 {
       position: absolute;
       left: 50%;
       top: 15%;
       -webkit-text-fill-color: transparent;
       -webkit-text-stroke: 2px #d6d6d6;
        background-size: cover;
        color: gold;
        font-size: 25px;
       transform: translate(-50%, -30%);
       cursor: default;
    }
    .login-box {
        width: 400px;
        height: 250px;
        background-color:rgb(240, 240, 240);
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
        /* ps */
         border: 5px solid;
        border-image: linear-gradient(45deg, brown, black) 1;
        /* clip-path: inset(0px round 5px); */
        animation: div6Ani 5s infinite linear;
        filter: hue-rotate(360deg);
        }
        @keyframes div6Ani {
        0% {
            filter: hue-rotate(0deg);
        }
        100% {
            filter: hue-rorate(360deg);
        }
    }
        .form-login {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          box-sizing: border-box;
        }
    
    .form-control {
      flex: 1;
    }
    
    .avatar-box {
      position: absolute;
      width: 100%;
      top: -65px;
      left: 0;
    }
    .avatar {
        width: 140px;
        height: 140px;
        border-radius: 50% !important;
        box-shadow: 0 0 6px #efefef;
      }
      p {
        font-size: 6px;
        color: red;
      }
    </style>