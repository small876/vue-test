<template>
    <div class="container">
        <h3>Admin Login</h3>
        <label for='account'>account</label><br>
        <input id='account' type="text" placeholder="enter account" v-model="account"><br>
        <label for='password'>password</label><br>
        <input id='password' type="password" placeholder="enter password" v-model="password"><br>
        <button @click="login">login</button>
    </div>

</template>

<script>
import { AdminLogin } from '@/api/api'

export default{
    name:"AdminLogin",
    data(){
        return{
            account:'T000001',
            password:'123456'
        }
    },
     methods:{
        async login(){
        try{
           await AdminLogin({
                'account':this.account,
                'password':this.password
                })
            this.$router.push({                                    
                        path:'/admin'
            })
        }
        catch(error){console.log(error.message)}
        }
     }
}

</script>

<style scoped>
label input{
    display: block;
}
input{
    border:1px solid rgba(0,0,0,1)
}

</style>