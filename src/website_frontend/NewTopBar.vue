<template>   
    <div class="root">
        <input type="checkbox" style="display:none"  id="SlideNavBar">
        <div id="TopBar" class="TopBar">
            <div class="NavListLeft">
                <router-link to="/"><h3>welcome</h3></router-link>
                <div>
                    <ul>
                        <li id="about">關於我們
                            <div class="second-inform">
                                <div class="secondbox">
                                    <ul>
                                        <li>消息1</li>
                                        <li>消息2</li>                                  
                                    </ul>
                                    <ul>
                                        <li>消息3</li>
                                        <li>消息4</li>                                  
                                    </ul>
                                </div>
                            </div> 
                        </li>                                
                    </ul>
                </div>
            </div>

            <div class="NavListRight">
                <nav>
                    <input class="SearchBar" type="text" placeholder="測試用 暫時無法使用" disabled="true"><button class="SearchBarBtn" >search</button>
                    <button class="cart" @click="ToCart">購物車</button>          
                    <button class="userinfo" @click="dialog=true" v-show=!isLogin>Login</button>

                    <transition name="modal">
                        <div class="modal-mask"  v-show="dialog">
                            <div class="modal-wrapper">
                                <div class="modal-container">

                                <div class="modal-header">
                                    <slot name="header">
                                        <h3>登入</h3>
                                    </slot>
                                </div>

                                <div class="modal-body">
                                    <div><h3>Username</h3><input v-model="account" placeholder="Enter Username"></div>
                                    <div><h3>Password</h3><input  v-model="password" type="password" placeholder="Enter Password"></div>
                                </div>

                                <div class="modal-footer">
                                    <slot name="footer">
                                        <!-- <button @click="showuser">登入</button>  -->
                                        <button @click="showuser">登入</button>     
                                        <button @click="dialog=false" >取消</button>
                                        <button @click="UserRegister">註冊</button>
                                    </slot>
                                </div>

                                </div>
                            </div>
                        </div>
                    </transition>

                    <div class="dropdown" v-show=isLogin>
                        <button  class="dropbtn" @click="dropdown=!dropdown">Dropdown<i class="fas fa-chevron-down fa-sm"></i></button>
                        <div id="myDropdown" class="dropdown-content" v-show=dropdown>
                            <router-link to="/">Home</router-link>
                            <router-link to="/OrderHistory">OrderHistory</router-link>
                            <button class="selectoption" @click="RemoveIdentify">logout</button>
                        </div>
                    </div>

                </nav>

                <label for="SlideNavBar">
                    <i class="fas fa-angle-right"></i>
                </label>
            </div>

        </div> 
    </div>
  </template>
  
<script>
    import jwt_decode from 'jwt-decode' 
    import axios from 'axios'   
    export default {
        name: 'NewTopBar',
        components: {
},
        data(){         
          return{
            account:null,
            password:null,
            dialog:false,
            isLogin : false,
            dropdown :false
        }
        },       
        
        methods:{
            register(){

            },
            showuser(){
                if(!this.account || !this.password){
                    alert('不得為空')
                } else {
                        axios.post('http://127.0.0.1:3000/login',  
                            {"account":this.account,
                            "password":this.password}
                            // {
                            //     headers:{
                            //         'Content-Type':'application/json'
                            //     },
                            //     }
                            )
                            .then(
                                response => {
                                    if (response.status === 200){
                                        console.log(response.data)  
                                        localStorage.setItem("authTokenAccess",response.data['access'])
                                        this.user=jwt_decode(localStorage.getItem('authTokenAccess'))['username']
                                        console.log('##############################', this.user)
                                        this.username = ''
                                        this.password = ''
                                        this.dialog = false
                                        this.isLogin = true
                                        this.$router.push({
                                            path:'/'
                                        })
                                    } 
                                })
                    .catch(error=> {
                                alert(error.response.data.message)
                            })
                }} 
            ,
            ToHome(){
                console.log('ToHome')
                if(this.$route.path !=''){this.$router.push('')}
            },
            ToCart(){
                if (this.$route.path != '/mycart') {
                    this.$router.push("/mycart");
                }
            },
            UserRegister(){
                this.dialog=false
                this.$router.push("/register")
            },
            RemoveIdentify(){
                // localStorage.removeItem("authTokenRefresh")
                localStorage.removeItem("authTokenAccess")
                this.isLogin=false
                this.$router.push({
                    path:'/'
                })
                console.log('router')
            }
        },

        mounted(){
            if(localStorage.getItem("authTokenAccess")){
                this.isLogin = true
                console.log('has token')
            } else {
                this.isLogin = false
                console.log('didnt has token')
            }
            console.log("mounted")
        }
        
}

  
  
</script>
  
<style>
/*#region ################ modal ##############################*/
.modal-mask {
  position: fixed;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.OrderDetail h3{
  width: 100%;
  /* margin: 10px 10px; */
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
  display: flex;
  flex-wrap: wrap;
  font-size: 18px;
}


.modal-body {
    width: 100%;
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  font-size: 18px
}

.modal-default-button {
  float: right;
}


.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
/* #endregion */

/*#region ############################################## dropdown ################################################## */
.dropbtn {
  background-color: inherit;
  color: white;
  padding: 0px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropbtn:hover, .dropbtn:focus {
  background-color: inherit;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: block;
  position: absolute;
  background-color: #f1f1f1;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  overflow: hidden;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {background-color: #ddd;}

.show {display: block;}
/*#endregion*/

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/*#region ############################################## TopBar ################################################## */
.secondbox{
    display: flex;
}
.second-inform ul{
    z-index: 9999;
    height: inherit;
    width: 100px;
    padding:0;
    position: relative;
    left: 10px;
}

.second-inform ul li:hover{
    transform: scale(1.1);
    color: aliceblue;
  }

button:active {
    transform: scale(1);
    box-shadow: inset 0 0 10px 1px rgba(255, 255, 255);
  }


#TopBar{
    background-color:	rgba(192,192,192, 0.7);
    height: 80px;
    margin: 0;
    position: sticky;
    top:0;
    display:flex;
    align-content: center;
    justify-content: space-between;
    padding: 0px 20px;    
    position: relative;
}

#TopBar a{
    line-height: 80px;
}

.NavListLeft ul{
    margin:0
}

#about{
    padding: 0px 10px;
}

.NavListLeft{
    line-height: 60px;
    display: flex;
    align-items: center;    
}

#about{
    display: flex;
    align-items: center;
    line-height: 80px;
    margin-left: 50px;
}

#about:hover{
    background-color: #909FA6;
}

.second-inform{
    height:200px;
    width: 100%;    
    background-color:rgba(128,138,135,0.8);
    position: absolute;
    display: none;
    top: 80px;
    left: 0;
    overflow: hidden;
    z-index: 9999;
}

#about:hover .second-inform{
    display:block;
}

#TopBar input{
    line-height: 30px;
    margin: 25px 0px;
    background-color: aliceblue;
    border:2px solid aquamarine;
    border-radius: 4px;
}

#TopBar input:focus{
    background-color: antiquewhite;
}

#TopBar button{
    margin:0px 15px;
    color: rgba(41,36,33,1);
    line-height: 80px;
}




/*#endregion*/

/*#region ############################################## SlideNavBar ################################################## */
@media  screen and (max-width:768px){
    #TopBar {
        width: 100%;
        padding: 0 ;
        padding-left:20px;       

    }

    .NavListRight{                    /*slidemenu */
        width: 200px; 
        height: 500px;
        background-color:rgba(128,138,135,0.3);        
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        box-shadow: 5px 0 5px rgba(23,23,54,0.6);
        transform: translate(200px,0px);             /*  將box往右移200px到螢幕外*/
        transition:0.5s ;
        transition-timing-function:ease;
        justify-content: center;        
        position: relative;        
    }

    .NavListRight input{           /*slidemenu */
        border: 1px solid rgba(128,138,135,1);
    }

    .NavListRight button{          /*slidemenu */
        margin: 10px 0;
        text-decoration: none;
        font-size: 40px;
        cursor: pointer;
    }

    .NavListRight button:hover{            /*slidemenu */
        color:skyblue
    }

    label{
        width: 20px;
        height: 40px;
        background-color: #d1d1d1;
        border-radius: 5px 0 0 5px;
        box-shadow: 0 5px 5px rgba(23, 23, 54, 0.6);
        position: absolute;
        left: -20px;
        text-align: center;
    }

    #SlideNavBar:checked ~* .NavListRight{         /* (~*)才能選中裡面的元素 */
        transform: translate(0,0);                /*讓SlideMenu回到原本位置 */
    }
}

/* #endregion*/

/* .second-inform-menu{
    padding:10px 0px
} */


</style>