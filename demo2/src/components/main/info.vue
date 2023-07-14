<template>
        <div class="common-tabel">
            <el-table :data="tableData.filter(data => !search || data.fileName.toLowerCase().includes(search.toLowerCase()))" style="width: 100%" stripe  height="95%">
                <el-table-column prop="fileName" label="文件名称" width="300px"/>
                <el-table-column prop="author" label="文件作者" width="150px"/>
                <el-table-column prop="postTime" label="上传时间" />
                <el-table-column prop="extensionName" label="文件概要"/> 
                <el-table-column  width="180px">
                    <template #header>
                        <el-input v-model="search" size="small" placeholder="输入关键字搜索" />
                    </template>
                <template #default="scope">
                    <el-button type="primary" size="small" @click='download(scope.$index)'>
                        下载
                    </el-button>
                    <el-button type="danger" size="small" @click.prevent="deleteRow(scope.$index,tableData)">
                        删除
                    </el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="handlePage">
                </el-pagination>
            </div>
        </div>
</template>

<script>
import { ElMessageBox, ElMessage} from 'element-plus'
import Cookie from 'js-cookie' 
import axios from "axios";
export default {
    name:'info',
    components: {
        ElMessageBox,
        ElMessage
                },
    data(){
        return{
            tableData:[],
            total:'',
            search:'',
            val:'',
            value:'',
            total2:'',
            src:"http://120.26.39.150:8089/api/download/byid?file_id="
        }
    },
    mounted(){
        this.handle()
    },
    methods:{
       async handle(){
        this.val=1
        const {data:res}=await this.$http.get('/api/documents',{params:{page:1}})
        console.log(res)
         this.tableData=res.data.documents
         this.total=res.data.count
        },
        async deleteRow(index,rows){
            rows.splice(index, 1)
            this.total2 = this.total
            this.total = this.total2-1
            this.value=(this.val-1)*10+index+1
            ElMessage({
                        message: '已删除',
                        type: 'success',
                    })
        },

        async handlePage(val){
            console.log(val)
            const {data:res}=await this.$http.get('/api/documents',{params:{page:val}})
            console.log(res.data);
            this.val=val
            this.tableData=res.data.documents

        },

       download(index){
                  this.value=(this.val-1)*10+index+1
                  axios({
                        url:'http://120.26.39.150:8089/api/download/byid',// 请求地址
                        method: 'post',
                        headers:{token:Cookie.get('token'),message:localStorage.getItem('msg'),ip:localStorage.getItem('Ip')},
                        params:{file_id:parseInt(this.value)},// 参数
                        responseType: 'blob'// 表明返回服务器返回的数据类型
                    }).then(res => {
                    console.log(res)
                    let blob =new Blob([res.data],{type:"application/vnd.ms-txt"});
                    let url =window.URL.createObjectURL(blob);
                    window.location.href=url;
                    }).catch(err=>{
                    console.log(err);
                    });
                     },
    }
}
</script>

<style scoped>

.common-tabel {
        position: relative;
        height: calc(100% - 62px);
    }
 .pager {
        position: absolute;
        bottom: 0;
        right: 20px;
        }
</style>