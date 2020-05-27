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
        <el-form-item prop="checkPasss" v-if="menuTab.type=='reg'">
          <label class="my__label">重复密码</label>
          <el-input type="password" v-model="ruleForm.checkPasss" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <label class="my__label">验证码</label>
         
          <el-row :gutter="10">
            <el-col :span="16"> <el-input v-model.number="ruleForm.code"></el-input></el-col>
            <el-col :span="8"><el-button type="success" @click="getSms()" :disabled="codeButtonStatus.status">{{codeButtonStatus.txt}}</el-button></el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button class="block" type="danger" @click="submitForm('ruleForm')" :disabled="buttonStatus">{{menuTab.type === 'reg' ? "注册" : "登录"}}</el-button>
        </el-form-item>
      </el-form>
       </div>
      
    </div>
  </div>

</template>

<script>
//导入函数
import sha1 from "sha1";
import {stripscript,validateEmail} from '@/tool/validate';
import {reactive,ref,isRef, onMounted} from '@vue/composition-api';
import {getsms,register} from "@/api/login";

export default {
  name: "Login",
  components: {

  },
  setup(props,context){
        //邮箱验证
    let myvalidateEmail = (rule, value, callback) => {
      // alert(111);
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if(!validateEmail(value)){
        callback(new Error("邮箱格式不正确"));
      }else {
        callback();
      }
    };
    // console.log(isRef(menuTab)); 

    //密码验证
    let validatePassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if(value.length<6 || value.length>20){
        callback(new Error('密码必须大于6位且小于20位'));
      }else {
        callback();
      }
    };

      //重复密码验证
    let validatePassWords = (rule, value, callback) => {
      if(menuTab.type == 'login'){
        callback();
      }else{
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(value != ruleForm.checkPass){
          callback(new Error('两次密码不一致'));
        }else {
          callback();
        }
      }
    };

    //验证码验证
    let checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入验证码'));
      }else{
        callback();
      }
    };
    
    /*******************************************************************
     * 声明变量
     */
    //切换按钮
    const  menuTab = reactive([
      {txt:"登录",isActive:true,type:"login"},
      {txt:"注册",isActive:false,type:"reg"}
      ]);
    
    //提交按钮状态
    const buttonStatus = ref(false);

    //表单
    const ruleForm =  reactive({
          email: 'mayi@qq.com',
          checkPass: '',
          checkPasss: '',
          code: ''
        });

    //表单验证
    const rules = reactive({
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
        });

        //验证码按钮状态及名称
        const codeButtonStatus = reactive({
          status:false,
          txt:"获取验证码"
        })

        //倒计时
        const timer = ref(null);


    /********************************************************************
     * 自定义函数
     */
    //切换登录/注册及状态重置
    const toggle=(data)=>{
      menuTab.forEach(element => {
        element.isActive = false;
      });
      data.isActive = true;
      menuTab.type = data.type;
      context.refs.ruleForm.resetFields();
      clearInterval(timer.value);
      codeButtonStatus.txt = "获取验证码";
      codeButtonStatus.status = false;
      buttonStatus.value = true;
      // console.log(this.menuTab);
    };

    // 倒计时
    const countDown = (number=>{

      let time = number;
      timer.value = setInterval(()=>{
        // let time = parseInt(window.sessionStorage.getItem("time"));
        time--;
        if(time == 0){
          clearInterval(timer.value);
          // time = 60;
          codeButtonStatus.txt = "重新发送";
          codeButtonStatus.status = false;
        }else{
          codeButtonStatus.txt = `发送中${time}s`;
          codeButtonStatus.status = true;
        }
      },1000)
    });


    //发送验证码
    const getSms = ()=>{
      if(ruleForm.email == ''){
        context.root.$message.error("邮箱不能为空");
        return false;
      }
      if(!validateEmail(ruleForm.email)){
        context.root.$message.error("邮箱格式不正确");
        return false;
      }
      let requestData = {
        email:ruleForm.email,  //邮箱
        account:menuTab.type == undefined ? "login" : menuTab.type//值为login或者reg，默认为login
      };

      // console.log(requestData);
      //延迟发送
      setTimeout(()=>{
          getsms(requestData).then(response=>{
            let data = response.data;
            context.root.$message({
              message: '验证码发送成功',
              type: 'success'
            })
            countDown(61);
            buttonStatus.value = false;
            // console.log(response);
        }).catch(error=>{
            console.log(error);
        })
      },1000)
    };

    //提交表单
    const submitForm = (formName)=>{
      
      context.refs[formName].validate((valid) => {
        // console.log(valid);
        if (valid) {
          let submitData = {
            email:ruleForm.email,
            password:sha1(ruleForm.checkPass),
            code:ruleForm.code,
            account: menuTab.type == undefined ? "login" : menuTab.type
          }
          console.log(submitData.password);
          if(menuTab.type === 'reg'){
            //注册提交
            register(submitData).then(regResponse=>{
              let data = regResponse.data;
              context.root.$message({
                message: data.msg,
                type: 'success'
              });
              toggle(menuTab[0]);
            }).catch(regError=>{
              // console.log(regError)
            })
          }else{
            //登录提交
            context.root.$store.dispatch('login/login',submitData).then(loginResponse=>{
               let data = loginResponse.data;
              context.root.$message({
                message: data.msg,
                type: 'success'
              });
              console.log(data);
              context.root.$router.push({path:"/console"});
            }).catch(loginError=>{
              console.log(loginError)
            });
          }
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    };

    

    /**
     * 页面加载后
     */
    onMounted(()=>{
      // console.log(process.env);

    });

    return {
        menuTab,
        toggle,
        submitForm,
        ruleForm,
        timer,
        countDown,
        rules,
        getSms,
        buttonStatus,
        codeButtonStatus,
      }
  },
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
      background-color: rgba(33,33,33,.1);
      border-radius: 5px;
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
      background-color:rgba(0,234,33,.1);
      border-radius: 5px;
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

