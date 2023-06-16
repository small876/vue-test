<template>

    <!-- <div class="root">     -->
      

        <div class="container">
            <div class="navbar">
                <div class="activity">
                    <h3>排序:</h3>
                    <input type="radio" name="gender" value="2" v-model="SortType">名稱
                    <input type="radio" name="gender" value="3" v-model="SortType">金額
                    <!-- <h4>{{ SortType }}</h4> -->
                </div>
            </div>
            <div class="itembox" v-for="TestData in itemData" :key="TestData._id">
                    <!-- <img src="../assets/pexels-polina-zimmerman-3747279.jpg"> -->
                    <img src= "#">
                    <div class="ItemListDetail">
                        <p>{{ TestData.name}}</p>
                        <p>${{ TestData.price }}</p>
                        <button @click="ItemIncrementAndAlert(TestData)"><v-icon end >mdi-cart-plus</v-icon></button>
                    </div>
            </div>

            <Transition>
                <div v-show="hint" class="hint">
                 <p>加入購物車</p>
                </div>
            </Transition>
  
        </div>

   
        <!-- <div id="banner">
            
        </div>

        <div class="webfooter">
            <span>@www.google.com</span>
        </div>  -->

<!--######################################################### Test #################################################################################################-->
        <!-- <input type="checkbox" style="display:none" id="testcheckbox">        
        <div class="testslidebar">

            <div class="slidebar">          
                <label for="testcheckbox"></label>
            </div> 
       
        </div> -->

        <!-- <div class="test">
            <div class="testinner"></div>
        </div> -->



<!--###################################################################################################################################################################-->
        <!-- <WebHeader></WebHeader>
        <MainNav></MainNav>
        <MainContent></MainContent> -->
  
       <!--<RecommendList :Itemdata="ItemData">-->
            <!-- <div v-for="value in ItemData" :key="value.id">                
                <v-img slot="RecommendItemPic"  :src= "value.image" cover height="250"> </v-img>
                <v-card-title slot="RecommendItemTitle">{{ value.title }}</v-card-title> 
                <v-card-subtitle slot="RecommendItemSubTitle">
                    <span class="me-1">Local Favorite</span>
                    <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                </v-card-subtitle>
            </div>   -->
       <!-- </RecommendList>-->
    <!-- </div> -->

  
  </template>
  
<script>
    import { mapMutations, mapActions } from 'vuex'
    import axios from 'axios'
    // import RecommendList from '../pages/RecommendList'
    // import WebHeader from '../pages/WebHeader'
    // import MainNav from '../pages/MainNav'
    // import MainContent from '../pages/MainContent'
    
    export default {
        name: 'HomePage',
        data(){
        return{
            SortType:'',
            itemData:null,
            hint:false,
            Testdata:[{
                title : 'No1',
                price : 3000,
                totalcount:0,
                isSelected:false,
                imageURL:require('../assets/pexels-polina-zimmerman-3747279.jpg')
            },{
                title: 'No2',
                price : 551,
                totalcount:0,
                isSelected:false,
                imageURL:require('../assets/pexels-pixabay-256450.jpg')
            },{
                title : 'No3',
                price : 552,
                totalcount:0,
                isSelected:false,
                imageURL:require('../assets/pexels-polina-zimmerman-3747309.jpg')
            },
            {
                title : 'No4',
                price : 553,
                totalcount:0,
                isSelected:false,
                imageURL:require('../assets/pexels-thought-catalog-904620.jpg')
            },
            {
                title : 'No5',
                price : 554,
                totalcount:0,
                isSelected:false,
                imageURL:require('../assets/pexels-polina-zimmerman-3747279.jpg')
            },
            {
                title : 'No6',
                price : 555,
                totalcount:0,
                isSelected:false,
                imageURL:require('../assets/pexels-polina-zimmerman-3747279.jpg')
            },
            {
                title : 'No7',
                price : 556,
                totalcount:0,
                isSelected:false,
                imageURL:require('../assets/pexels-polina-zimmerman-3747279.jpg')
            },
            {
                title : 'No8',
                price : 557,
                totalcount:0,
                isSelected:false,
                imageURL:require('../assets/pexels-polina-zimmerman-3747279.jpg')
            },
            {
                title : 'No9',
                price : 558,
                totalcount:0,
                isSelected:false,
                imageURL:require('../assets/pexels-polina-zimmerman-3747279.jpg')
            },
            {
                title : 'No10',
                price : 559,
                totalcount:0,
                isSelected:false,
                imageURL:require('../assets/pexels-polina-zimmerman-3747279.jpg')
            },
        ]
           
            }
        },
        mounted(){
            axios.get('http://127.0.0.1:3000/products/').then(
                response => {
                    console.log('Get ',response.data)
                    this.itemData = response.data
                    console.log('itemdata ',response.data)
                },
                error => {
                    console.log('failed', error.message)
                }
            )   
        },
        watch:{
            SortType:{
                handler(newValue){
                    if(newValue == 2){
                        this.itemData.sort(function(a, b) {
                            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }

                            // names must be equal
                            return 0;
                            })                            
                        }
                    else if (newValue == 3){
                        this.itemData.sort(function(a, b) {
                            if (a.price < b.price) {
                                return 1;
                            }
                            if (a.price > b.price) {
                                return -1;
                            }
                            return 0;
                            })
                            console.log(this.itemData)
                    }
                }	 //handler會在發生改變時呼叫
		}
            },


        methods:{
            ...mapMutations({ADDCART:'ADDCART'}),
            ...mapActions({ItemIncrement:'ItemIncrement'}),  

            ItemIncrementAndAlert(item){
                this.ItemIncrement(item)
                this.hint=true
                setTimeout(() => this.hint=false, 1000)                
            },
            /*###################################### Link ##################################################### */
        ToHome(){
            console.log('ToHome')
            this.$router.push({
            path:'/'
            })
        },

        ToCart(){
            this.$router.push({
            path:'/mycart',
            })
        }
        }
    }

  
  
</script>
  
<style>
/* #region############################################## recommendlist  ##################################################### */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

button:hover {
    transform: scale(1.1);
  }

button:active {
    transform: scale(1);
    box-shadow: inset 0 0 10px 1px rgba(255, 255, 255);
  }

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
   opacity: 0;
}

.hint{ 
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #909FA6;
    border-radius: 10px;
    position: fixed;
    left: 50%;
    top: 20px;
    z-index: 999;    
}

.hint p{
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0;
} 

/* #endregion */  

.navbar h3{
    display: inline;
}

.navbar{
    z-index: 1;
    display: flex;
    height: 50px;
    width: inherit;
    align-items: center;
}

.navbar input{
    position: relative;;
    margin:0px 10px;
    
}



/* #region############################################## recommendlist  ##################################################### */
.root {
    /* background: url('../assets/pexels-pixabay-235985.jpg');/ */
    background-size: cover;
    width: 100%;
    height: 100%;
}

.container{
    width: 1200px;
    margin: auto;
    display:flex ;
    justify-content: space-around;
    /* background-image: url('../assets/pexels-pixabay-235985.jpg');
    background-size: cover; */
    flex-wrap: wrap;
}

.itembox{
    width: 300px;
    height: 300px;
    margin: 10px 10px;
    background-color: rgba(192,192,192, 0.7);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
}

.ItemListDetail {
    display: flex;
    position: absolute;
    left: auto;
    bottom:10px
}

.ItemListDetail *{
    margin: 0px 5px;
}

.ItemListDetail :last-child{
    margin-right: 0px;
}

.itembox img{
    margin-top: 10px;
    height: 240px;
    width: 160px;
}
/* #endregion */


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

/* #region##############################################  main  ##################################################### */
#banner{
    height: 500px;
    background-color: antiquewhite;
}
/*#endregion*/

/* #region##############################################  test  ##################################################### */

/* .test{
    height: 50px;
    width: 50px;
    background-color: antiquewhite;
    position: relative;
    margin:0 auto;
}

.test:hover{
    background-color: aqua;
}

.testinner{
    position: absolute;
    width: 500px;
    height: 500px;
    top: 50px;
    background-color: aquamarine;
    display: none;
}

.test:hover .testinner{
    display:block;
}  */

/* .testslidebar{
    height: 200px;
    width: 100%;
    background-color: aqua;
    position: relative;
}

.slidebar{
    height: 100px;
    width: 100px;
    background-color:#3f6170;
    position: relative;
    transform: translateX(-100%);
    
}

label{
    height:  50px;
    width: 50px;   
    background-color: black;
    position: absolute;
    left: 100px;
}

#testcheckbox:checked ~* .slidebar{
    transform: translate(0,0);
} */

/*#endregion*/

/* #region##############################################  footer  ##################################################### */
.webfooter{
    display: flex;
    height: calc(100vh - 580px);
    /* height: 300px; */
    background-color: #909FA6;
    align-items: end;
    justify-content: space-evenly;
}
/*#endregion*/


</style>