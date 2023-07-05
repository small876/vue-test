<template>
    <div class="root">
        <input type="checkbox" style="display:none" id="SlideNavBar">
        <div id="TopBar" class="TopBar">
            <div class="NavListLeft">
                <router-link to="/">
                    <h3>welcome</h3>
                </router-link>
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
                    <input class="SearchBar" type="text" placeholder="測試用 暫時無法使用" disabled="true"><button
                        class="SearchBarBtn">search</button>
                    <RouterLink to="ShopPage"><button class="cart">商品</button></RouterLink>
                    <button class="cart" @click="ToCart">購物車</button>
                    <button class="userinfo" @click="dialog = true" v-show=!isLogin>登入</button>


                    <div class="mask" v-if="dialog">
                        <div class="logincontext">
                            <h3>登入</h3>
                            <label for="account">account</label>
                            <input type="text" id="account" v-model="account">

                            <label for="password">password</label>
                            <input type="password" id="password" v-model="password">
                            <div class="footer">
                                <button @click="userlogin">登入</button>
                                <button @click="dialog = false">取消</button>
                                <button @click="UserRegister">註冊</button>
                            </div>
                        </div>
                    </div>

                    <div class="dropdown" v-if=isLogin>
                        <button class="dropbtn" @click="dropdown = !dropdown">用戶專區<i
                                class="fas fa-chevron-down fa-sm"></i></button>
                        <div class="dropdown-content" v-if=dropdown>
                            <router-link to="/"><button>首頁</button></router-link>
                            <router-link to="/OrderHistory"><button>個人資訊</button></router-link>
                            <button class="selectoption" @click="RemoveIdentify">登出</button>
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
import { RouterLink } from 'vue-router'
import { UserLogin } from '@/api/api'


export default {
    name: 'NewTopBar',
    components: {
        RouterLink
    },
    data() {
        return {
            account: 'webtest1',
            password: '123456',
            dialog: false,
            isLogin: false,
            dropdown: false
        }
    },

    methods: {
        register() {

        },
        userlogin() {
            if (!this.account || !this.password) {
                alert('不得為空')
            } else {
                UserLogin(
                    {
                        "account": this.account,
                        "password": this.password
                    })
                    .then(
                        this.username = '',
                        this.password = '',
                        this.dialog = false,
                        this.isLogin = true,
                    )
                if (this.$route.path != '/') {
                    this.$router.push({
                        path: '/'
                    })
                }
            }
        }
        ,
        ToCart() {
            if (this.$route.path != '/mycart') {
                this.$router.push("/mycart");
            }
        },
        UserRegister() {
            this.dialog = false
            this.$router.push("/register")
        },
        RemoveIdentify() {
            // localStorage.removeItem("authTokenRefresh")
            localStorage.removeItem("authTokenAccess")
            this.isLogin = false
            if (this.$route.path != '/') {
                this.$router.push({
                    path: '/'
                })
            }
        }
    },

    mounted() {
        if (localStorage.getItem("authTokenAccess")) {
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
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none
}

/*#region ################ login ##############################*/
.mask {
    height: 100%;
    width: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logincontext {
    background-color: #fff;
    height: 500px;
    width: 500px;
    border-radius: 10%;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    vertical-align: middle
}

.logincontext label {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    font-size: 30px;
}

.logincontext h3 {
    text-align: center;
    width: 100%;
    border-bottom: 1px solid rgba(128, 128, 128, 1);
}

.logincontext input {
    margin: 0;
    height: 50px;
    width: 100%;
}

/* #endregion */

/*#region ############################################## dropdown ################################################## */
.dropbtn {
    padding: 0px;
    font-size: 16px;
    border: none;
    cursor: pointer;
}

.dropbtn:hover,
.dropbtn:focus {
    background-color: inherit;
}


.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    background-color: #F3CDA9;
    width: 140px;
    position: absolute;
    z-index: 1;
    overflow: hidden;
}

.dropdown-content button {
    padding: 8px 20px;
}


.dropdown-content a {
    /*router-link */
    text-decoration: none;
}


.show {
    display: block;
}

/*#endregion*/


/*#region ############################################## second bar ################################################## */
.secondbox {
    display: flex;
}

.second-inform ul {
    z-index: 9999;
    height: inherit;
    width: 100px;
    padding: 0;
    position: relative;
    left: 10px;
}

.second-inform ul li:hover {
    transform: scale(1.1);
    color: aliceblue;
}


/*#endregion*/

button:active {
    transform: scale(1);
    box-shadow: inset 0 0 10px 1px rgba(255, 255, 255);
}

/*#region ############################################## TopBar ################################################## */
#TopBar {
    background-color: #E5D2B4;
    height: 80px;
    margin: 0;
    position: sticky;
    top: 0;
    display: flex;
    align-content: center;
    justify-content: space-between;
    padding: 0px 20px;
    position: relative;
    font-family: 'Noto Sans TC', sans-serif;
}

#TopBar a {
    line-height: 80px;
}

.NavListLeft ul {
    margin: 0
}

#about {
    padding: 0px 10px;
}

.NavListLeft {
    line-height: 60px;
    display: flex;
    align-items: center;
}

.NavListRight {
    padding: 0px 50px;
}

#about {
    display: flex;
    align-items: center;
    line-height: 80px;
    margin-left: 50px;
}

#about:hover {
    background-color: #909FA6;
}

.second-inform {
    height: 200px;
    width: 100%;
    background-color: rgba(128, 138, 135, 0.8);
    position: absolute;
    display: none;
    top: 80px;
    left: 0;
    overflow: hidden;
    z-index: 9999;
}

#about:hover .second-inform {
    display: block;

}

#TopBar input {
    line-height: 30px;
    margin: 25px 0px;
    background-color: aliceblue;
    border: 2px solid rgba(192, 192, 192);
    border-radius: 4px;
}

#TopBar input:focus {
    background-color: antiquewhite;
}

#TopBar button {
    margin: 0px 15px;
    color: rgba(41, 36, 33, 1);
    line-height: 80px;
}

/*#endregion*/

/*#region ############################################## SlideNavBar ################################################## */
@media screen and (max-width:768px) {
    #TopBar {
        width: 100%;
        padding: 0;
        padding-left: 20px;

    }

    .NavListRight {
        /*slidemenu */
        z-index: 9999;
        width: 200px;
        height: 500px;
        background-color: rgba(128, 138, 135, 0.3);
        display: flex;
        flex-direction: column;
        padding: 20px;
        box-shadow: 5px 0 5px rgba(23, 23, 54, 0.6);
        transform: translate(200px, 0px);
        /*  將box往右移200px到螢幕外*/
        transition: 0.5s;
        transition-timing-function: ease;
        justify-content: center;
        position: relative;
    }

    .NavListRight input {
        /*slidemenu */
        border: 1px solid rgba(128, 138, 135, 1);
    }

    .NavListRight button {
        /*slidemenu */
        margin: 10px 0;
        text-decoration: none;
        font-size: 40px;
        cursor: pointer;
    }

    .NavListRight button:hover {
        /*slidemenu */
        color: skyblue
    }

    label {
        width: 20px;
        height: 40px;
        background-color: #d1d1d1;
        border-radius: 5px 0 0 5px;
        box-shadow: 0 5px 5px rgba(23, 23, 54, 0.6);
        position: absolute;
        left: -20px;
        text-align: center;
    }

    #SlideNavBar:checked~* .NavListRight {
        /* (~*)才能選中裡面的元素 */
        transform: translate(0, 0);
        /*讓SlideMenu回到原本位置 */
    }
}

/* #endregion*/</style>