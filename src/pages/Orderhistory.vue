<template>
<div class="orderhistory-container">
    <div class="userdetail">
        <p>使用者名稱:{{ responsedata.firstname + responsedata.lastname}}</p>
        <p>生日:{{ responsedata.birth.substring(0,10)}}</p>
        <RouterLink to="/editor"><button>修改檔案</button></RouterLink>
    </div>

    
    <div class="orderbox">
        <div class="orderlist" v-for="ordertest in responsedata.orderhistory" :key="ordertest.index">
            <input type="checkbox" id="orderList" checked="checked">
            <label for="orderList" >
                <div class="orderListDetail">   
                        <p>訂單號碼:{{ ordertest._id}}</p>                
                        <p>訂購日期:{{ ordertest.createdAt.substring(0,10) }}</p>                    
                        <div class="ordercontent" v-for="item in ordertest.orderContent" :key="item.index">
                            <p>{{ item.product.name }}</p>
                            <p>{{ item.product.price }}</p>
                            <p>{{ item.order_quantity }}</p>
                            <p>{{ item.order_quantity * item.product.price }}</p>
                        </div>
                        <h3>總金額:{{ ordertest.order_price }}</h3>                     
                </div>
            </label>   
        </div>
    </div>
</div>
<!-- <img src="https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg"> -->
</template>


<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
export default{
    name: "OrderHistory",
    data() {
        return {
            "responsedata": null,
        };
    },
    mounted() {
        axios.get("http://127.0.0.1:3000/userinfo", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authTokenAccess"),
            }
        }).then(response => {
           
            console.log("Get ", response.data);
            this.responsedata = response.data;
            console.log("responsedata", this.responsedata)
        })
        .catch(error => {
            if (error.response.status == 401){
            alert('請重新登入')}
        })
    },
    components: { RouterLink }
}
</script>


<style>
/*#region#################################################################################*/
.orderhistory-container{
    width: 1190px;
    display: flex;
    flex-wrap: wrap;
    margin: auto
    /* justify-content: space-around;  */
    /* position: relative; */
}

.userdetail{
    width: 300px;
    height: 300px;
    background-color: #DCDCDC;    
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-around;
    margin-top: 10px;
    border-radius: 10px
}

.userdetail *{
    font-size: 20px;
    width: 100%;
    margin-left: 10px;
    margin-top: 10px;
}
/*#endregion */

.orderbox{
    height: 100%;
    width: 800px;
    margin: 10px 10px;
    display: flex;
    flex-wrap: wrap;
}

.orderlist{
    display: flex;
    width: 100%;
    flex-wrap: wrap;  
}

.orderListDetail{ 
    width: 800px;
    background-color: rgba(245,245,245,0.8);     
    display: flex;      
    flex-wrap: wrap;
    border-radius: 10px
}

.orderListDetail > p{
    margin:10px 10px;
    font-family: serif;
    padding: 10px;
    font-size: 30px;
    width: 100%;
}

.orderListDetail h3 {
    padding: 10px;
}


.ordercontent{
    width: 100%;
    font-family: serif;
    font-size: 12px;       
    background-color: rgba(192,192,192, 0.3);
    display:none;
    align-items: center;
    justify-content: baseline;
} 

.ordercontent > p{
    font-family: serif;
    font-size: 30px; 
    margin: 10px 10px;
}


#orderList:checked ~* .ordercontent{
    display: flex;
    justify-content: space-between ;
}

#orderList{
    display: none;
}

.ordercontent{
    border-bottom-style:solid;
    border-color: black;
    border-width: 1px;
}

.ordercontent>p:nth-child(1){
   padding: 10px;
   
}

.ordercontent>p:nth-child(2){
    font-size: 20px;    
}

.ordercontent>p:nth-child(3){
    font-size: 20px;    
}

.ordercontent>p:nth-child(4){
    font-size: 20px;    
}


</style>