<template>
    <div class="UserInfoUpdate">
        <h3>註冊</h3>
        <form action="">
            <label for="account">帳號：</label>
            <input id="account" type="text" v-model="account"  required placeholder="輸入英文字母開頭的6-16位帳號" pattern="/^[a-zA-Z][a-zA-Z0-9_]{5,16}$/">

            <label for="password">密碼:</label>
            <input id="password" type="password" v-model="password" placeholder="密碼" required>

            <label for="firstname">姓:</label>
            <input id="firstname" type="text" v-model="firstname" required>

            <label for="lastname">名字：</label>
            <input id="lastname" type="text" v-model="lastname" required>

            <label for="birthday">生日：</label>
            <input id="birthday" 
            type="date"  
            v-model="birth" 
            min="1900-01-01" 
            max="2023-01-01"
            required>
            <button  type="submit" :disabled="isDisabled" >送出</button>
        </form>
    </div>
</template>
    
    
    <script>
    // import { reg_phoneType, reg_account, reg_pwdCommon} from "../utils.validate.js"
    // import { reg_account} from "../utils/validate.js"
    import { UserRegister } from '@/api/api'
    export default{
        name: "UserRegister",
        data(){
            return{
                "account"     : null ,   
                "firstname"   : null ,   
                "lastname"    : null ,
                "birth"       : null ,
                "password"    : null ,
            };
        },
        method:{
            register(){
                UserRegister().then(
                    response => {
                        if (response.status === 200){
                            console.log(response.data)  
                            localStorage.setItem("authTokenAccess",response.data['access'])
                            this.$router.push({
                                path:'/OrderHistory'
                            })
                        } else {
                        console.log(response.data.message)
                        }
                    },
                    error => {
                        console.log('failed', error.message)
                    }
                )
            }
        },

        computed: {
            isDisabled(){
                return !this.account || !this.firstname || !this.lastname || !this.password ;
            },

            // validate(){
            //     return reg_account(this.account) ? true : "some thing wrong!"
            // },
        },
        watch: {
    }}
    </script>
    
    
    <style>
    .UserInfoUpdate button{
        border-radius: 10px;
        border: 2px solid;
        display: flex;
        padding: 10px 10px;
        right: 0;
        margin: 10px 10px;
        margin-left: 1100px;        
    }

    .UserInfoUpdate button[disabled]{
        background-color: rgba(192,192,192,1);
        pointer-events: none;
        border:none;
    }

    .UserInfoUpdate{
        margin: auto;
        width: 1190px;
        background-color: rgba(192,192,192,0.3);
        display: flex;
        flex-wrap: wrap;
    }

    .UserInfoUpdate label{
        margin-left: 10px;
        font-size: 20px;
    }

    .UserInfoUpdate h3{
        width: 100%;
        margin: 10px 10px;
    }

    .UserInfoUpdate input{
        border-radius: 10px;
        margin: 10px 0px;
        padding:8px 8px;
        border: 1px solid rgba(0,0,0,1);
    }


    </style>