<template>
  <div id="login">
    <div class="content">
      <ul class="menu">
        <li :class="{'current':item.isActive}" @click="toggle(item)"  v-for="item in menuTab" :key="item.id">{{item.txt}}</li>
        </ul>
        <!-- 表单开始 -->
       <div class="form">
         <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="" size="small">
        <el-form-item prop="email">
          <label class="my__label">邮箱</label>
          <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <label class="my__label">密码</label>
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkPasss" v-if="showReg=='reg'">
          <label class="my__label">重复密码</label>
          <el-input type="password" v-model="ruleForm.checkPasss" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <label class="my__label">验证码</label>
         
          <el-row :gutter="10">
            <el-col :span="16"> <el-input v-model.number="ruleForm.code"></el-input></el-col>
            <el-col :span="8"><el-button type="success">获取验证码</el-button></el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button class="block" type="danger" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
       </div>
      
    </div>
  </div>

</template>

<script>
//导入函数
import {stripscript,validateEmail} from '@/tool/validate'

export default {
  name: "Login",
  components: {

  },
  data(){
      //邮箱验证
      var myvalidateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if(!validateEmail(value)){
          callback(new Error("邮箱格式不正确"));
        }else {
          callback();
        }
      };

      //密码验证
      var validatePassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(value.length<6 || value.length>20){
          callback(new Error('密码必须大于6位且小于20位'));
        }else {
          callback();
        }
      };

       //重复密码验证
      var validatePassWords = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(value != this.ruleForm.checkPass){
          callback(new Error('两次密码不一致'));
        }else {
          callback();
        }
      };

      //验证码验证
      var checkCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入验证码'));
        }else{
          callback();
        }
      };
    return{
      menuTab:[
        {txt:"登录",isActive:true,type:"login"},
        {txt:"注册",isActive:false,type:"reg"}
        ],
      ruleForm: {
          email: '',
          checkPass: '',
          checkPasss: '',
          code: ''
        },
        rules: {
          email: [
            { validator: myvalidateEmail, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePassWord, trigger: 'blur' }
          ],
          checkPasss: [
            { validator: validatePassWords, trigger: 'blur' }
          ],
          code: [
            { validator: checkCode, trigger: 'blur' }
          ]
        },
        showReg : "login",
    }
  },

  methods:{
    //切换登录/注册
    toggle(data){
      this.menuTab.forEach(element => {
        element.isActive = false;
      });
      data.isActive = true;
      this.showReg = data.type;
      // console.log(this.menuTab);
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

  }
}

</script>
<style lang="scss" scoped>
    #login{
        background-color:#344a5f;
        height:100vh;
        width:100vw;
        display: flex;
        justify-content:center;
        align-items:center;
    }
    .content{
      width:30%;
      height:65%;
      // background-color: #0f0;
    }
    .menu{
      width: 100%;
      height:12%;
      // background-color: #f00;
      color:#fff;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content:center;
    }
    .menu li{
      padding:3% 30px;
      border-radius: 3px;
      font-size:14px;
      text-align: center;
    }


    .current{
      background-color:rgba(0,0,0,.2);
    }

    .form{
      margin-top:5%;
      width:100%;
      height:100%;
      // background-color: #000;
      display:flex;
      align-items: center;
      justify-content: center;
      // margin-right:18%;
    }
    .my__label{
      color:#fff;
    }

    .block{
      display: block;
      width:100%;
    }

</style>

