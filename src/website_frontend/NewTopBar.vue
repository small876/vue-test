<template>   
    <div class="root">
        <input type="checkbox" style="display:none"  id="SlideNavBar">
        <div id="TopBar" class="TopBar">
            <div class="NavListLeft">
                <h3>welcome</h3>
                <div>
                    <ul>
                        <li id="about">關於我們
                            <div class="second-inform">
                                <div class="secondbox">
                                    <ul>
                                        <li>123132</li>
                                        <li>123132</li>                                  
                                    </ul>
                                    <ul>
                                        <li>123456</li>
                                        <li>123456</li>                                  
                                    </ul>
                                </div>
                            </div> 
                        </li>                                
                    </ul>
                </div>
            </div>

            <div class="NavListRight">
                <nav>
                    <input class="SearchBar" type="text"><button class="SearchBarBtn">search</button>
                    <button class="cart" @click="ToCart">購物車</button>          
                    <button class="userinfo">User</button>
                </nav>

                <label for="SlideNavBar">
                    <i class="fas fa-angle-right"></i>
                </label>
            </div>

        </div> 
    </div>
  </template>
  
<script>    
    export default {
        name: 'NewTopBar',
        components: {      
        },
        data(){         
          
        },       
        
        methods:{
        ToHome(){
            console.log('ToHome')
            if(this.$route.path !=''){this.$router.push('')}
        },
        ToCart(){
            if (this.$route.path != '/mycart') {
                this.$router.push("/mycart");
            }
        },
        // GetIdentify(){
        //     axios.post('http://127.0.0.1:8000/api/token/',  {
        //             'username':this.username, 'password':this.password
        //         },
        //         {
        //             headers:{
        //                 'Content-Type':'application/json'
        //             },
        //             }
        //         ).then(
        //             response => {
        //                 console.log('Get Token', response.status)
        //                 if (response.status === 200){                        
        //                     localStorage.setItem("authTokenRefresh",response.data['refresh']);
        //                     localStorage.setItem("authTokenAccess",response.data['access'])
        //                     this.user=jwt_decode(localStorage.getItem('authTokenAccess'))['username']
        //                     console.log('##############################', this.user)
        //                     this.login = true
        //                 }
        //             },
        //             error => {
        //                 console.log('failed', error.message)
        //             }
        //         )
        //         this.show = !this.show
        //         this.username = ''
        //         this.password = ''
        //         if (this.username === '' & this.password === ''){
        //         console.log('clear')
        //         }
        // },  
        RemoveIdentify(){
            localStorage.removeItem("authTokenRefresh")
            localStorage.removeItem("authTokenAccess")
        }
        },
}

  
  
</script>
  
<style>
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