<template>
    <div class="manage">
        <el-dialog
        v-model="dialogVisible"
        :title=" modalType?'编辑供应商':'新增供应商'"
        width="30%"
        :before-close="handleClose">
                <!--新增内容 -->
        <el-form :model="form"  :rules="rules" label-width="120px" ref="form">
            <el-form-item label="公司名称" prop="name">
                    <el-input placeholder="请输入公司名称" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="公司编号" prop="number">
                    <el-input placeholder="请输入公司编号" v-model="form.number"></el-input>
            </el-form-item>
            <el-form-item label="是否评定" prop="assessment" >
                    <el-select v-model="form.assessment" placeholder="请选择">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="公司类型" prop="type" >
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option label="潜在供应商" :value="-1"></el-option>
                        <el-option label="重点型供应商" :value="0"></el-option>
                        <el-option label="伙伴型供应商" :value="1"></el-option>
                    </el-select>
            </el-form-item>

        </el-form>

         <template #footer>
        <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button  type="primary" @click="submit">确定</el-button>
        </span>
        </template>
        </el-dialog>

        <div class="manage-header">
            <el-button @click="handleAdd" type="primary" size="large">
                + 新增
            </el-button>
        </div>

        <div class="common-tabel">
            <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%" stripe  height="95%">
                <el-table-column prop="name" label="公司名称"/>
                <el-table-column prop="number" label="公司编号" />
                <el-table-column prop="type" label="公司类型" />
                <el-table-column prop="assessment" label="合格评定"> 
                    <template #default="scope">
                        <span>{{scope.row.assessment==1?'已评':'未评'}}</span>
                    </template>
                </el-table-column>
                <el-table-column  width="180">
                    <template #header>
                        <el-input v-model="search" size="small" placeholder="输入关键字搜索" />
                    </template>
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">
                        编辑
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
    </div>
</template>

<script>
import { ref} from 'vue'
import { ElMessageBox, ElMessage} from 'element-plus'
export default {
    name:'message',
    components: {
        ElMessageBox,
        ElMessage
            },
    data(){
        return{
            dialogVisible:ref(false),
            form:{
                name:'',
                number:'',
                type:'',
                assessment:''
            },
            Cleanform:{
                name:'',
                number:'',
                type:'',
                assessment:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入公司名称' }
                ],
                number: [
                    { required: true, message: '请输入公司编号' }
                ],
                assessment: [
                    { required: true, message: '请选择是否评定'}
                ],
                type: [
                    { required: true, message: '请选择公司类型' }
                ],
            },
            tableData:[],
            modalType: 0, // 0表示新增的弹窗， 1表示编辑            
            total:'',
            search:'',
            val:'',
            value:'',
            total2:''
        }
    },
    mounted(){
            this.handle()
    },
    methods:{
        submit(){
            this.$refs.form.validate((valid) => {
                // console.log(valid)
                if(valid){
                    // 清空表单的数据
                    
                    this.form = JSON.parse(JSON.stringify(this.Cleanform))
                    this.$refs.form.resetFields()
                    // 关闭弹窗
                    this.dialogVisible = false
                    ElMessage({
                            message: '已提交,请等待管理员审核',
                            type: 'success',
                        })
                }
            })
        },
        handleClose() {
            this.form = JSON.parse(JSON.stringify(this.Cleanform))
            this.$refs.form.resetFields()
            this.dialogVisible = false,
            ElMessage({
                message: '已取消',
                type: 'warning',
            })
        },
        cancel() {
            this.handleClose()
        },
       async deleteRow(index,rows){
            this.total2 = this.total
            this.total = this.total2-1
            this.value=(this.val-1)*10+index+1
            const {data:res}=await this.$http.get('/api/supplier/byid',{params:{id:parseInt(this.value)}})
            rows.splice(index, 1)
            console.log(res.data)
            ElMessage({
                        message: '已删除',
                        type: 'success',
                    })
        },
        async handleEdit(index, row){
            // console.log(index)
            // console.log(this.val)
            this.value=(this.val-1)*10+index+1
            console.log(this.value)
            const {data:res}=await this.$http.get('/api/supplier/byid',{params:{id:parseInt(this.value)}})
            console.log(res.data)
            this.modalType = 1
            this.dialogVisible = true
            // 注意需要对当前行数据进行深拷贝，否则会出错
            this.form = JSON.parse(JSON.stringify(row))
        },
        async handlePage(val){
            console.log(val)
            const {data:res}=await this.$http.get('/api/suppliers',{params:{page:val}})
            console.log(res.data);
            this.val=val
            this.tableData=res.data.supplierList

        },
        handleAdd() {
            this.modalType = 0
            this.dialogVisible = true
        },
        async handle(){
            this.val=1
            const {data:res}=await this.$http.get('/api/suppliers',{params:{page:1}})
            this.tableData=res.data.supplierList
            this.total=res.data.count
        },
    }
}
 </script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.manage {
    height: 90%;
    }
.manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
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