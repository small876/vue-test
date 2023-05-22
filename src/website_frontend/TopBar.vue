<template>  
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand><router-link class="hello" to="/">welcome</router-link></b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      
        <v-btn class="mx-2" @click="ToCart()">購物車</v-btn>
        <v-btn class="mx-2" title='++' @click ='show = !show' v-if='!login'>
                登入
               </v-btn>

        <b-nav-item-dropdown v-if="login" @click ='show = !show' right>
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item  @click="RemoveIdentify">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <!--#######################################################################################################################-->
          <!-- <button class="hello" @click="ToHome()">welcome</button> -->
        
       
        <!-- Right
        <div class="topbar-nav rightfix">
          <ul class="list clearfix">
            <li><a href="#">商品</a></li>
            <li><router-link to="/mycart">購物車</router-link></li>
            <li></li>          


            <li> -->
              <v-row justify="space-around">
                <v-col cols="auto">             
                  <v-dialog v-model="show"
                    transition="dialog-bottom-transition"
                    width="auto"
                  >
                  <v-card
                  width="500">
                    <v-card-title
                    >
                    Login
                  </v-card-title>

                  <v-col
                    cols="6"
                    sm="2"
                    md="12"                    
                  >
                    <v-text-field
                      label="Username"
                      hint="username"
                      v-model="username"
                      persistent-hint
                      required
                      class='pl-4'
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="6"
                    sm="2"
                    md="12"                    
                  >
                    <v-text-field
                      label="Password"
                      hint="password"
                      persistent-hint
                      v-model="password"
                      required
                      class='pl-4'
                    ></v-text-field>
                  </v-col>

                    <v-card-actions>
                      <v-btn color="gray"  @click="GetIdentify">Login</v-btn>
                      <v-btn color="primary"  @click="show=!show">Close</v-btn>
                      <v-btn ><a href='#'>註冊</a></v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                </v-col>
              </v-row>               
              
            <!-- </li>
          </ul> -->
          
        </div>
      <!-- </div> -->
</template>

<script>
import axios from 'axios'
// import LoginPage from '../pages/LoginPage'
import jwt_decode from 'jwt-decode'

export default{
    name:'TopBar',
    // components:{LoginPage},
    data(){
        return{
          show : false,
          username:'',
          password:'',
          user:'',
          login : false
        }
    },
    methods:{      
      ToHome(){
        console.log('ToHome')
        this.$router.push({
          path:''
        })
      },
      ToCart(){
        this.$router.push({
          path:'/mycart',
        })
      },
      GetIdentify(){
        axios.post('http://127.0.0.1:8000/api/token/',  {
                'username':this.username, 'password':this.password
            },
            {
                headers:{
                    'Content-Type':'application/json'
                },
                }
            ).then(
                response => {
                    console.log('Get Token', response.status)
                    if (response.status === 200){                        
                        localStorage.setItem("authTokenRefresh",response.data['refresh']);
                        localStorage.setItem("authTokenAccess",response.data['access'])
                        this.user=jwt_decode(localStorage.getItem('authTokenAccess'))['username']
                        console.log('##############################', this.user)
                        this.login = true
                    }
                },
                error => {
                    console.log('failed', error.message)
                }
            )
            this.show = !this.show
            this.username = ''
            this.password = ''
            if (this.username === '' & this.password === ''){
              console.log('clear')
            }
      },  
      RemoveIdentify(){
        localStorage.removeItem("authTokenRefresh")
        localStorage.removeItem("authTokenAccess")
      }
    },
    mounted(){
      if (localStorage.getItem("authTokenAccess")){
        this.login = true
      }
    }

}


</script>

<style scoped>
/* #region start top*/ 
.topbar {
  height: 60px;
  background-color: aliceblue;
}

.welcome{
  height: 28px;
  line-height: 60px;
  font-size: 0;
  color: grey;
}

.welcome span, .welcome a {
  font-size: 24px;
}
.topbar  .welcome .hello{
  margin-right: 28px;
}
.topbar  .welcome .login{
  padding-right: 28px;
}

.topbar  .topbar-nav .list li{
  padding-right: 28px;
  height: 28px;
  line-height: 0px;
  float: right;
  margin: 0 auto
}

/* #endregion */
</style>