<template>
    <div class="orderdetail">
        <b-breadcrumb class="p-2">
            <b-breadcrumb-item>
                <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
                <router-link to="/admin"><a>訂單</a></router-link>
            </b-breadcrumb-item>
        </b-breadcrumb>
        <b-container class="mx-auto" style="min-width: 25rem; max-width: 40rem">
            <b-row>
                <h3>訂單詳情</h3><b-button @click="back">回朔</b-button>
                <b-button v-if="responsedata.order_status == 'O'" @click="receive">收到訂單</b-button>
                <b-button v-if="responsedata.order_status == 'R'" @click="deal">開始理貨</b-button>
                <b-button v-if="responsedata.order_status == 'D'" @click="delivery">出貨</b-button>
                <b-button v-if="responsedata.order_status == 'S'" @click="complete">訂單完成</b-button>
            </b-row>
        </b-container>
        <b-list-group class="mx-auto" style="min-width: 25rem; max-width: 40rem">
            <b-list-group-item>訂單編號:{{responsedata._id}}</b-list-group-item>
            <b-list-group-item>訂單日期:{{responsedata.createdAt}}</b-list-group-item>
            <b-list-group-item>訂單狀態:{{ orderstatus[responsedata.order_status]}}</b-list-group-item>
            <b-list-group-item>訂單金額:{{responsedata.order_price}}</b-list-group-item>
            <b-list-group-item>收件人姓名:{{responsedata.receiver}}</b-list-group-item>
            <b-list-group-item>地址:{{responsedata.address}}</b-list-group-item>
            <b-list-group-item>電話:{{responsedata.phone_number}}</b-list-group-item>
            <b-list-group-item>付款方式:{{payment[responsedata.payment]}}</b-list-group-item>
        </b-list-group>
        <b-table striped  :fields="field" :items="responsedata.orderContent" class="mx-auto px-2" style="min-width: 25rem; max-width: 40rem">
        </b-table>
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
            },
            field: [
                {
                    "key": "product.name",
                    "label": "name"
                },
                {
                    "key": "order_quantity",
                    "label": "Quantity"
                },
                {
                    "key": "order_item_price",
                    "label": "Item_Price"
                }
            ],
            payment: { 0: '無', 1: '貨到付款', 2: '超商繳費' }
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
    *{
        height: 100%;
        font-family: 'Noto Sans TC', sans-serif;
    }

    </style>