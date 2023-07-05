<template>
        <div class="UserInfoUpdate">
            <h3>個人信息</h3>

            <label for="account">帳號：</label>
            <input id="account" type="text" :value="account" disabled="false">

            <label for="firstname">姓</label>
            <input id="firstname" type="text" v-model="responsedata.firstname">

            <label for="lastname">名字：</label>
            <input id="lastname" type="text" v-model="responsedata.lastname">

            <label for="birthday">生日：</label>
            <input id="birthday"  v-model="responsedata.birth" disabled="true">        

            <button @click="modifiedInfo" type="button" :disabled="updatedata" >送出</button>
        </div>
</template>
    
    
    <script>
    import axios  from 'axios';
    import { UserInfo } from '@/api/api'
    import jwt_decode from 'jwt-decode' 
    export default{
        name: "UserUpdate",
        data() {
            return {
                "responsedata": null,
                "account":null,
                "trydisable":null
            };
        },
        mounted() {
            UserInfo().then(response => {
                console.log("Get ", response.data);
                this.responsedata = response.data;
                console.log("responsedata", this.responsedata);
                this.account = jwt_decode(localStorage.getItem('authTokenAccess'))['account']
            }, error => {
                console.log("failed", error.message);
            });
        },
        methods:{
            modifiedInfo(){
                axios.post('http://127.0.0.1:3000/update',this.responsedata,  
            { 
                headers: { 
                        Authorization: 'Bearer ' + localStorage.getItem('authTokenAccess'),
                    } }
                    ).then(
                        response => { 
                            if (response.status === 200){
                                console.log('successful', response.data)
                                this.$router.push("/OrderHistory")
                            }
                        },
                        error => {
                            console.log('failed', error.message)
                        }
                    )
            }
        },
        computed: {
            updatedata(){
                return  !this.responsedata.firstname || !this.responsedata.lastname 
            }}

        }
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
        background-color: #ccc2c2;
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
        margin: 10px 5px;
        padding:8px 8px;
        width: 100%;
        border: 5px;
        background-color: rgba(255,255,255,1);
    }
     
    </style>