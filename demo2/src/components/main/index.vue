<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">  
        <el-card class="box-card">
            <div class="user">
                    <img src="../../assets/user.png" alt="">
                    <div class="userinfo">
                        <p class="name">{{this.username}}</p>
                        <p class="access">{{this.position}}</p>
                    </div>
            </div>
             <div class="login-info">
                    <p>登录时间：<span>{{this.time}}</span></p>
                    <p>登录地点：<span>中国-浙江省-杭州市</span></p>
             </div>
        </el-card>

        <el-card  style="margin-top: 20px;">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="company" label="公司"  />
            <el-table-column prop="supply" label="供货量（吨）" width="100px"/>
            <el-table-column prop="telephone" label="电话" />
        </el-table>
        </el-card>
    </el-col>


    <el-col :span="16" style="padding-left: 10px">
        <div class="num">
            <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
                <el-icon class="icon" :style="{ background: item.color }">
                    <component :is="item.icon"></component>
                </el-icon>

                <div class="detail">
                        <p class="price">￥{{ item.value }}</p>
                        <p class="desc">{{ item.name }}</p>
                </div>
            </el-card>
        </div>

        <el-card style="height: 280px">
                <!-- 折线图 -->
                <div ref="echarts1" style="height: 280px"></div>
            </el-card>
            <div class="graph">
                <el-card style="height: 260px">
                    <div  ref="echarts2" style="height: 260px"></div>
                </el-card>
                <el-card style="height: 260px">
                    <div  ref="echarts3" style="height: 240px"></div>
                </el-card>
            </div>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name:'index',
    data(){
        return{
            tableData: [
                    {
                        company: '天美有限公司',
                        supply: '220',
                        telephone: '19857413937',
                    },
                    {
                        company: '美好装饰有限公司',
                        supply: '180',
                        telephone: '18773445933',
                    },
                    {
                        company: '嘉信食品有限公司',
                        supply: '160',
                        telephone: '19873422109',
                    },
                    {
                        company: '用友家具有限公司',
                        supply: '155',
                        telephone: '17857421341',
                    },
                 ],
            countData: [
                {
                name: "今日支付订单",
                value: 1234,
                icon: "SuccessFilled",
                color: "#2ec7c9",
                },
                {
                name: "今日收藏订单",
                value: 210,
                icon: "StarFilled",
                color: "#ffb980",
                },
                {
                name: "今日未支付订单",
                value: 1234,
                icon: "GoodsFilled",
                color: "#5ab1ef",
                },
                {
                name: "本月支付订单",
                value: 1234,
                icon: "SuccessFilled",
                color: "#2ec7c9",
                },
                {
                name: "本月收藏订单",
                value: 210,
                icon: "StarFilled",
                color: "#ffb980",
                },
                {
                name: "本月未支付订单",
                value: 1234,
                icon: "GoodsFilled",
                color: "#5ab1ef",
                },
            ],
            username:localStorage.getItem('username'),
            position:localStorage.getItem('position'),
            time:''
        }
   
    },
    mounted(){
        this.Date()
        var echarts1 = echarts.init(this.$refs.echarts1)
            // 指定图表的配置项和数据
         var echarts1Option = {
        tooltip: {},
        legend: {
          data: ['天美有限公司','美好装饰有限公司','嘉信食品有限公司','用友家具有限公司']
        },
        xAxis: {
          data: ['202101', '202102', '202103', '202104', '202201', '202202']
        },
        yAxis: {},
        series: [
          {
            name: '天美有限公司',
            type: 'line',
            data: [40, 60, 50, 30, 20, 20],
            smooth: true
          },
          {
            name: '美好装饰有限公司',
            type: 'line',
            data: [30, 20, 25, 35, 40, 30],
            smooth: true
          },
          {
            name: '嘉信食品有限公司',
            type: 'line',
            data: [20, 25, 35, 35, 25,20],
            smooth: true
          },
          {
            name: '用友家具有限公司',
            type: 'line',
            data: [25, 35, 20, 30, 25,20],
            smooth: true
          },
        ]}
        echarts1.setOption(echarts1Option);

        var echarts2 = echarts.init(this.$refs.echarts2)
        var echarts2Option = {
    legend: {
          data: ['支付订单','收藏订单','未支付订单']
        },
    xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五']
            },
    yAxis: {},
    series: [
    {
      name: '支付订单',
      type: 'bar',
      data: [40, 60, 50, 30, 20],
      barWidth: '30%'
    },
    {  
      name: '收藏订单',
      type: 'bar',
      data: [30, 20, 25, 35, 40],
      barGap: '20%',
      barCategoryGap: '40%',
      barWidth: '30%'

    },
    {
      name: '未支付订单',
      type: 'bar',
      data: [20, 25, 35, 35, 25],
      barGap: '20%',
      barCategoryGap: '40%',
      barWidth: '25%'
    }  
  ]
                    }
        echarts2.setOption(echarts2Option);

        var echarts3 = echarts.init(this.$refs.echarts3)
        var echarts3Option = {
            series: [
                     {
                        type: 'pie',
                        data: [
                        {
                        value: 220,
                        name: '天美'
                        },
                        {
                        value: 180,
                        name: '美好装饰'
                        },
                        {
                        value: 160,
                        name: '嘉信'
                        },
                        {
                        value: 150,
                        name: '用友'
                        }
                    ],
                    radius: '75%'
                    }
                ]
        }

        echarts3.setOption(echarts3Option);
    },
    methods:{
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
    
          const newmonth = date.month >= 10 ? date.month : "0" + date.month;
          const newday = date.date > 10 ? date.date : "0" + date.date;
        //   const newminutes = date.minutes > 10 ? date.minutes : "0" + date.minutes;
        //   const newseconds = date.seconds > 10 ? date.seconds : "0" + date.seconds;
          //   const newminutes = date.minutes < 10 ? "0" + date.minutes : date.minutes;
          //   const newseconds = date.seconds < 10 ? "0" + date.seconds : date.seconds;
        //   const newmillisecond = date.millisecond;
          this.time =
            date.year +
            "-" +
            newmonth +
            "-" +
            newday
        },
    }
}
</script>


<style scoped>
.user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
}
.user img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
.user .userinfo .name {
                        font-size: 32px;
                         margin-bottom: 10px;
                         }
 .user .userinfo .access {
            color: #999999;
        }
.login-info p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;
        margin: 0;
        padding:0;
    }
 .login-info  span {
            color: #666666;
            margin-left: 20px;
        }
 .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    }
 .num .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }
.num .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
            }
.num .detail .price{
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 40px;
            height: 30px;
}
.num .detail .desc{
    font-size: 14px;
     color: #999;
    text-align: center;
}
.num .el-card{
    width: 32%;
    margin-bottom: 20px;
}
.graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
.graph .el-card {
        width: 48%;
    }
</style>