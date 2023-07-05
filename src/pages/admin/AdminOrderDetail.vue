<template>
    <div class="orderdetail">
        <div class="detail-header">
            <h3>訂單詳情</h3><button @click="back">回朔</button>
            <div class="control">
                <button v-show="responsedata.order_status == 'O'" @click="receive">收到訂單</button>
                <button v-show="responsedata.order_status == 'R'" @click="deal">開始理貨</button>
                <button v-show="responsedata.order_status == 'D'" @click="delivery">出貨</button>
                <button v-show="responsedata.order_status == 'S'" @click="complete">訂單完成</button>
            </div>
        </div>
        <div class="detail-body">
            <p>訂單編號:{{responsedata._id}}</p>
            <p>訂單日期:{{responsedata.createdAt}}</p>
            <p>訂單狀態:{{ orderstatus[responsedata.order_status]}}</p>
            <p>訂單金額:{{responsedata.order_price}}</p>
            <p>收件人姓名:{{responsedata.receiver}}</p>
            <p>地址:{{responsedata.address}}</p>
            <p>電話:{{responsedata.phone_number}}</p>
            <p>付款方式:{{responsedata.payment}}</p>
            <div class="wrap">
                <table>
                    <tr> 
                        <td>名稱</td>
                        <td>原價</td>
                        <td>數量</td>
                        <td>成交價</td>
                    </tr>   
                    <tr v-for="orderdata in responsedata.orderContent" :key="orderdata._id">
                        <td>{{ orderdata.product.name}}</td>
                        <td>{{ orderdata.product.price}}</td>
                        <td>{{ orderdata.order_quantity}}</td>
                        <td>{{ orderdata.order_item_price}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    </template>
    
    
    <script>
    // import axios from 'axios';
    import { OrderDetail,OrderStatusModified } from '@/api/api'

    export default{
        name: "AdminOrderDetail",
        data() {
            return {
                "responsedata": '',
                orderstatus:{
                "O":"",
                "R":"收到訂單",
                "D":"訂單處理中",
                "S":"出貨中",
                "F":"訂單完成",
            }
            };
        },
        created() {
            OrderDetail(this.$route.params.id)
            .then(response => {               
                console.log("Get ", response.data);
                this.responsedata = response.data;
                console.log("responsedata", this.responsedata)
            })
            .catch(error => {
                if (error.response.status == 401){
                alert('請重新登入')}
            })
        },
        methods:{
            showdetail(id){
                    this.$router.push({ 
                    path: `/ItemDetail/${id}`
                    })
                },
            receive(){
                OrderStatusModified(this.$route.params.id, {"order_status":"R"}).then(
                    response =>{
                        this.responsedata.order_status = response.data.order_status
                     }
                )                
            },
            deal(){
                OrderStatusModified(this.$route.params.id, {"order_status":"D"}).then(
                    response =>{
                        this.responsedata.order_status = response.data.order_status
                     }
                )                
            },
            delivery(){
                OrderStatusModified(this.$route.params.id, {"order_status":"S"}).then(
                    response =>{
                        this.responsedata.order_status = response.data.order_status
                    }
                ).catch(error=>{
                    console.log(error.message)
                })
             },
            complete(){
                    OrderStatusModified(this.$route.params.id, {"order_status":"F"}).then(
                        response =>{
                            this.responsedata.order_status = response.data.order_status
                        }
                    ).catch(error=>{
                        console.log(error.message)
                    })
    },
            back(){
                    OrderStatusModified(this.$route.params.id, {"order_status":"O"}).then(
                        response =>{
                            this.responsedata.order_status = response.data.order_status
                        }
                    ).catch(error=>{
                        console.log(error.message)
                    })
    }
}
}
    </script>
    
    
    <style scoped>
    /* #region############################################## header ##################################################### */
    .detail-header{
        width: 100vh;
        display: flex;
        position: relative;
        border-bottom: solid 1px rgba(192,192,192,0.3);
    }
    
    .control{
        position: absolute;
        right: 10px;
      
    }

    .control button{
        margin:0px 10px;
        background-color: rgba(192,192,192,1);
        border: solid 1px rgba(0,0,0,1);
        padding: 2px;
        border-radius:5px
    }

    /*#endregion########################################################################################################### */
    
    /* #region############################################## body ##################################################### */
    .detail-body p{
        margin: 30px 0px
    }

    .detail-body{
        width: 100vh;
    }

    .wrap{
    overflow:hidden;
    border-radius:10px 10px 0px 0px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.35);
    }

    table{
    border-collapse:collapse;
    }

    th{
    color:#ffffff;
    width:25vw;
    height:75px;
    }

    td{
    background-color:#ffffff;
    width:25vw;
    height:50px;
    text-align:center;
    }

    tr{
    border-bottom: 1px solid #dddddd;
    }


    tr:nth-of-type(even) td{
    background-color:#f3f3f3;
    }

    /*#endregion########################################################################################################### */
    .orderdetail{
        width: 1190px;
        margin: auto;
    }
    </style>