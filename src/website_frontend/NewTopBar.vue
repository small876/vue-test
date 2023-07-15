<template>
    <div class="root">
        <b-navbar toggleable="lg" type="dark" variant="dark"  style="height:80px">
            <router-link to="/"><b-navbar-brand>
                    <p class="h2">welcome</p>
                </b-navbar-brand></router-link>

            <b-navbar-toggle target="nav-collapse" class=" float-right"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav class="bg-transparent">


                <b-navbar-nav class="ml-auto"> 
                    <b-button text="Lang" type="button" pill right variant="light" class="mr-2" @click="ToAdmin">
                        Admin
                    </b-button>
                    
                    <b-button text="Lang" type="button" pill right variant="light" class="mr-2" @click="ToShopPage">
                        商品
                    </b-button>

                    <b-button text="Lang" type="button" pill right variant="light" class="mr-2"  @click="ToCart">
                        <b-badge variant="light" class="mx-2 bg-light">{{ CartItem.length }}</b-badge> 購物車 
                    </b-button>

                    <b-button text="Lang" type="button" pill right variant="light" v-if="!isLogin" @click="showModal">
                        登入 
                    </b-button>
                    
                    
                    <b-dropdown text="用戶專區" right variant="light" v-if="isLogin" class="mr-2" style="border-radius: 50rem;">
                        <b-dropdown-item @click="ToHome" >首頁</b-dropdown-item>
                        <b-dropdown-item class="pt-1 pb-1" @click="ToOrderHistory">個人資訊</b-dropdown-item>
                        <b-dropdown-item @click="RemoveIdentify">登出</b-dropdown-item>
                    </b-dropdown>
                
                </b-navbar-nav>
            </b-collapse>

            <div>
                <b-modal ref="my-modal" hide-footer title="Login">
                    <div class="d-block text-center">
                        <b-form-input v-model="account" placeholder="Enter your account"></b-form-input>
                        <b-form-input v-model="password" class="mt-1" placeholder="Enter your password"></b-form-input>
                    </div>
                    <b-button class="mt-2" variant="outline-warning" block @click="userlogin">Login</b-button>
                    <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-button>

                </b-modal>
            </div>
        </b-navbar>

        <!-- <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav> -->

        <!-- Right aligned nav items -->
        <!-- <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar> -->
        <!-- </div> -->
    </div>
</template>
  
<script>
import { RouterLink } from 'vue-router'
import { UserLogin } from '@/api/api'
import { mapState } from 'vuex'


export default {
    name: 'NewTopBar',
    components: {
        RouterLink
    },
    data() {
        return {
            account: 'webtest1',
            password: '123456',
            isLogin: false,
        }
    },

    methods: {
        async userlogin() {
            if (!this.account || !this.password) {
                alert('不得為空')
            } else {
                try {
                    await UserLogin({
                        "account": this.account,
                        "password": this.password
                    })
                    console.log('send to backend')
                    this.username = ''
                    this.password = ''
                    this.isLogin = true
                    this.hideModal()
                    if (this.$route.path != '/') {
                        this.$router.push({
                            path: '/'
                        })
                    }
                } catch (error) {
                    console.log(error,'page')
                }
                }
            }
        ,
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        ToHome(){
            if (this.$route.path != '/') {
                this.$router.push({
                    path: '/'
                })
            }
        },
        ToCart() {
            if (this.$route.path != '/mycart') {
                this.$router.push("/mycart");
            }
        },
        ToOrderHistory(){
            if (this.$route.path != '/OrderHistory') {
                this.$router.push("/OrderHistory");
            }
        },
        ToShopPage(){
            if (this.$route.path != '/ShopPage') {
                this.$router.push("/ShopPage");
            }
        },
        ToAdmin(){
            if (this.$route.path != '/adminlogin') {
                this.$router.push("/adminlogin");
            }
        },
        UserRegister() {
            this.$router.push("/register")
        },
        RemoveIdentify() {
            localStorage.removeItem("authTokenAccess")
            this.isLogin = false
            this.ToHome()
        }
    },
    computed: {
        ...mapState(["CartItem"])
    }
    ,

    mounted() {
        if (localStorage.getItem("authTokenAccess")) {
            this.isLogin = true
            console.log('has token')
        } else {
            this.isLogin = false
            console.log('didnt has token')
        }
        console.log(this)

    }

}



</script>
  
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Noto Sans TC', sans-serif;
    z-index: 999;
}
</style>