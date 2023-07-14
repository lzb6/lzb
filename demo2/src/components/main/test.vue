<template>
      <el-card class="box-card">
      <el-row>
            <el-col :span="24">
               <div class="header-1"><h2>考评申请</h2></div>
            </el-col>
      </el-row>
       <el-row :gutter="20">
        <el-col :span="6">           
                <div class="main-1">
                    <p>经办人:
                       <i>{{this.username}}</i> 
                    </p>
                </div>
            </el-col>
            <el-col :span="6">           
                <div class="main-1">
                    <p>经办部门:
                       <i>{{this.department}}</i> 
                    </p>
                </div>
            </el-col>
            <el-col :span="6">           
                <div class="main-1">
                    <p>经办时间:
                       <i>{{this.time}}</i> 
                    </p>
                </div>
            </el-col>
            <el-col :span="6">           
                <div class="main-1">
                    <p>经办人联系方式:
                       <i> 19857413937</i> 
                    </p>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
               <div class="header-2"><h4>供应商考察基本信息</h4></div>
            </el-col>
      </el-row>
      <el-form :model="form" :rules="rules" label-width="120px" style="margin-top:12px;" ref="form">
             <el-form-item label="供应商ID:" prop="id">
               <el-input v-model="form.id" style="width: 30%" placeholder="请输入供应商ID"/>
            </el-form-item>
            <el-form-item label="供应商名称:" prop="company">
               <el-input v-model="form.company" style="width: 80%" placeholder="请输入供应商名称"/>
            </el-form-item>
            <el-form-item label="供应商编号:" prop="number">
               <el-input v-model="form.number" style="width: 80%" placeholder="请输入供应商编号"/>
            </el-form-item>
            <el-form-item label="考评主题:" prop="name">
            <el-input v-model="form.name"  style="width: 80%" placeholder="请输入考评主题"/>
            </el-form-item>
            <el-form-item label="考评类型:" prop="region1">
                <el-select v-model="form.region1" placeholder="请选择" style="width: 40%">
                    <el-option label="货物质量考评" value="shanghai" />
                    <el-option label="商家信用考评" value="beijing" />
                </el-select>
             </el-form-item>
             <el-form-item label="考评方式:" prop="region2">
                <el-select v-model="form.region2" placeholder="请选择" style="width: 40%">
                    <el-option label="现场考评" value="shanghai" />
                    <el-option label="线上考评" value="beijing" />
                </el-select>
             </el-form-item>
             <el-form-item label="考评起始时间:" prop="date">
                    <el-col :span="11">
                        <el-date-picker
                        v-model="form.date"
                        type="date"
                        label="请选择起始时间"
                        placeholder="请选择"
                        style="width: 100%"/>
                  </el-col>
                  <el-col class="text-center" :span="1" style="margin: 0 0.5rem">——</el-col>
                  <el-col :span="11">
                    <el-date-picker
                    v-model="form.date"
                    label="请选择结束时间"
                    placeholder="请选择"
                    style="width: 100%"/>
                </el-col>
             </el-form-item>
             <el-form-item label="是否通过:" prop="resource">
                <el-radio-group v-model="form.resource">
                    <el-radio label="是" />
                    <el-radio label="否" />
                </el-radio-group>
            </el-form-item>
             <el-form-item label="考评结语:" prop="desc">
               <el-input v-model="form.desc" type="textarea" style="width: 80%"/>
            </el-form-item>
            <el-form-item style="margin-left: 33%;">
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="handle">重置</el-button>
            </el-form-item>
      </el-form>
      <el-row>
            <el-col :span="24">
               <div class="header-3"><p>声明:本人承诺所有情况均属实</p></div>
            </el-col>
      </el-row>
    </el-card>

</template>

<script>
import { ElMessageBox, ElMessage} from 'element-plus'
export default {
    name:'test',
    components: {
        ElMessage,
        ElMessageBox
            },
    data(){
        return{
            form:{
                    name: '',
                    number:'',
                    region1: '',
                    region2: '',
                    date1: '',
                    date2: '',
                    desc:'',
                    resource:'',
                    company:'',
                    id:''
            },
            rules: {
                id: [
                    { required: true, message: '请输入供应商ID' }
                ],
                company: [
                    { required: true, message: '请输入供应商名称' }
                ],
                name: [
                    { required: true, message: '请输入供应商编号' }
                ],
                number: [
                    { required: true, message: '请输入公司编号' }
                ],
                region1: [
                    { required: true, message: '请选择考评类型'}
                ],
                region2: [
                    { required: true, message: '请选择考评方式'}
                ],
                date: [
                    { required: true, message: '请选择考评起始时间' }
                ],
                resource: [
                    { required: true, message: '请选择是否通过' }
                ],
                desc: [
                    { required: true, message: '请输入考评结语' }
                ],
            },
            username:localStorage.getItem('username'),
            department:localStorage.getItem('department'),
            time:''
        }
    },
    mounted(){
        this.Date()
    },
    methods:{
        handle(){
            this.$refs.form.resetFields()
        },
        async submit(){
            console.log(this.form.id)
            const {data:res}=await this.$http.get('/api/assessment/byid',{params:{id:parseInt(this.form.id)}})
            console.log(res)
            this.$refs.form.resetFields()
            ElMessage({
                            message: '已提交,请等待管理员审核',
                            type: 'success',
                        })
        },
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

 <style lang="css" scoped>

 .box-card{
    width: 100%;
 }
.header-1{
    width: 100%;
    height: 45px;
    text-align:center;
    background-color:rgb(214,240,255);
}
.header-1 h2{
    line-height: 45px;
}
.main-1 p{
    font-size: 16px;
    margin-left: 15px;
    margin-top: 10px;
}
.main-1 i{
    font-size: 18px;
    font-style: normal;
    font-weight: bold;
}

.header-2{
    width: 100%;
    height: 45px;
    background-color:rgb(214,240,255);
}
.header-2 h4{
    line-height: 45px;
    font-weight: bold;
    margin-left: 12px;
}

.header-3{
    width: 100%;
    height: 45px;
    text-align:center;
    background-color:rgb(214,240,255);
}
.header-3 p {
    font-size: 16px;
    line-height: 45px;
    font-weight: bold;
}
</style>