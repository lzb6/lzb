<template>
    <el-row>
     <el-col :span="16" style="padding-right: 10px">

       <el-card  style="margin-top: 20px;">
         <el-table :data="tableData" style="width: 100%" stripe>
            <el-table-column prop="username" label="异常人员姓名"  />
            <el-table-column prop="position" label="所属职位" />
            <el-table-column prop="department" label="所属部门" />
            <el-table-column prop="telephone" label="联系方式" />
            <el-table-column prop="state" label="异常类型" >
              <template #default="scope">
                        <span>{{scope.row.state==-1?'恶意操作':'恶意用户'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="管理员解锁">
                <template #default="scope">
                    <el-button type="primary" size="default" @click="handleEdit(scope.$index, scope.row)">
                        解除锁定
                    </el-button>
                </template>
                </el-table-column>
         </el-table>
       </el-card>


       <el-card style="height: 280px;margin-top: 20px;">
                <!-- 折线图 -->
            <div ref="echarts1" style="height: 280px"></div>
       </el-card>

     </el-col>

    <el-col :span="8" style="padding-left: 10px">
        <el-card style="height: 260px;margin-top: 20px;">
            <div  ref="echarts2" style="height: 260px"></div>
         </el-card>

         <el-card style="height: 260px;margin-top: 20px;">
            <div  ref="echarts3" style="height: 240px"></div>
         </el-card>

    </el-col>
  </el-row>
</template>

<script>
import * as echarts from 'echarts'
import { ElMessageBox, ElMessage} from 'element-plus'
export default {
    name:'check',
    data(){
        return{
            tableData:[],
        }
    },
    components: {
        ElMessageBox,
        ElMessage
      },
    mounted(){
        this.handle()
        var echarts1 = echarts.init(this.$refs.echarts1)
          // 指定图表的配置项和数据
        var echarts1Option = {
        tooltip: {},
        legend: {
          data: ['恶意用户','异常操作']
        },
        xAxis: {
          data: ['10月上旬', '10月中旬','10月下旬','11月上旬','11月中旬', '11月下旬']
        },
        yAxis: {},
        series: [
          {
            name: '恶意用户',
            type: 'line',
            data: [8,7,10,6,8,6],
            smooth: true
          },
          {
            name: '异常操作',
            type: 'line',
            data: [5,4,6,8,3,7],
            smooth: true
          },
        ]}
        echarts1.setOption(echarts1Option);

        var echarts2 = echarts.init(this.$refs.echarts2)
        var echarts2Option = {
    legend: {
          data: []
        },
    xAxis: {
        data: ['jack', 'mark', 'loki', 'tom','bob','anti','helen']
            },
    yAxis: {
      name: '恶意行为次数'
    },
    series: [
    {
      name: '次数',
      type: 'bar',
      data: [60,50,50,45,40,35,35],
      barWidth: '30%'
    }
  ]}
        echarts2.setOption(echarts2Option);

        var echarts3 = echarts.init(this.$refs.echarts3)
        var echarts3Option = {
            series: [
                     {
                        type: 'pie',
                        data: [
                        {
                        value: 220,
                        name: '异常时间登录'
                        },
                        {
                        value: 180,
                        name: '大量下载文档'
                        },
                        {
                        value: 160,
                        name: '异常设备登录'
                        },
                        {
                        value: 150,
                        name: '恶意更改信息'
                        },
                        {
                        value: 40,
                        name: '其他'
                        }
                    ],
                    radius: '75%'
                    }
                ]
        }

        echarts3.setOption(echarts3Option);
    },
    methods:{
    async  handle(){
      const {data:res}=await this.$http.get('/api/administrator/check')
      console.log(res.data)
      this.tableData=res.data
      },
    handleEdit(index,row){
      console.log(index);
      console.log(row);
      ElMessage({
                        message: '已成功解锁账户',
                        type: 'success',
                    })
    }
    }
}
 </script>