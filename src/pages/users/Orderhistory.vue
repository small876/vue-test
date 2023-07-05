<template>
    <div class="orderhistory-container">
        <div class="userdetail">
            <p>使用者名稱 : </p>
            <p>{{ responsedata.firstname + responsedata.lastname }}</p>
            <p>生日 : </p>
            <p>{{ responsedata.birth }}</p>
            <RouterLink to="/editor">
                <button class="edit">
                    <link rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                </button>
            </RouterLink>
        </div>


        <div class="orderbox">
            <div class="orderlist" v-for="ordertest in responsedata.orderhistory" :key="ordertest.index">
                <div class="orderListDetail">
                    <p>訂單號碼:</p><span class="orderid" @click="showorder(ordertest)">{{ ordertest._id }}</span>
                    <p>訂購日期:{{ ordertest.createdAt.substring(0, 10) }}</p>
                    <h3>總金額:{{ ordertest.order_price }}</h3>
                </div>
            </div>
        </div>

        <div class="orderdetail" v-if="show">
            <button class="close" @click="show = false">x</button>
            <div class="detail-body">
                <p>訂單編號:{{ detail._id }}</p>
                <p>訂單日期:{{ detail.createdAt }}</p>
                <p>訂單狀態:{{ orderstatus[detail.order_status] }}</p>
                <p>訂單金額:{{ detail.order_price }}</p>
                <p>收件人姓名:{{ detail.receiver }}</p>
                <p>地址:{{ detail.address }}</p>
                <p>電話:{{ detail.phone_number }}</p>
                <p>付款方式:{{ detail.payment }}</p>
                <div class="wrap">
                    <table>
                        <tr>
                            <td>名稱</td>
                            <td>數量</td>
                            <td>價格</td>
                        </tr>
                        <tr v-for="orderdata in detail.orderContent" :key="orderdata._id">
                            <td>{{ orderdata.product.name }}</td>
                            <td>{{ orderdata.order_quantity }}</td>
                            <td>{{ orderdata.order_item_price }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>


    </div>
</template>


<script>
import { RouterLink } from 'vue-router';
import { UserInfo } from '@/api/api'

export default {
    name: "OrderHistory",
    data() {
        return {
            "responsedata": '',
            'detail': '',
            'show': '',
            orderstatus: {
                "O": "訂單已下訂",
                "R": "收到訂單",
                "D": "訂單處理中",
                "S": "出貨中",
                "F": "訂單完成",
            }
        };
    },
    async created() {
        let response = await UserInfo()
        this.responsedata = response.data
        console.log(this.responsedata)
        this.responsedata.birth = response.data.birth.substring(0, 10)
    },
    components: { RouterLink },
    methods: {
        showdetail(id) {
            this.$router.push({
                path: `/ItemDetail`,
                query: { id: id }
            })
        },
        showorder(ordertest) {
            this.show = true
            this.detail = ordertest
        }
    },
}
</script>


<style scoped>
.orderhistory-container {
    width: 1190px;
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    position: relative;
}

/*#region############### userInfo ##################################################################*/
.userdetail {
    flex-wrap: wrap;
    position: absolute;
    top: 0;
    left: 0;
    height: 300px;
    width: 200px;
    background-color: #A0522D;
    background-image:
        linear-gradient(hsla(0, 0%, 100%, 0),
            hsla(0, 0%, 100%, 0.5) 5px,
            hsla(0, 0%, 100%, 0) 25px);
    /* -webkit-filter: drop-shadow(0 2px 6px hsla(0, 0%, 0%, 0.75)); */
    box-sizing: border-box;
    padding-top: 50px;
    color: rgb(255, 255, 255);
    font-size: 1.5em;
    text-shadow: 0 -1px 0 hsla(0, 0%, 0%, 0.5);
}

.userdetail:before,
.userdetail:after {
    content: '';
    display: block;
    position: absolute;
}

.userdetail:before {
    bottom: -50%;
    height: 100%;
    width: 100%;
    background-image:
        linear-gradient(-45deg,
            transparent 50%,
            #A0522D 50%),
        linear-gradient(45deg,
            transparent 50%,
            #A0522D 50%);
    z-index: -1;
}

.userdetail:after {
    height: 136.5%;
    width: 88%;
    left: 6%;
    top: 0;
    border-style: dashed;
    border-color: yellow;
    border-width: 0 1px;
    pointer-events: none;
}

.userdetail p {
    padding-left: 15px;
    width: 100%;
}

.edit {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}

/*#endregion */

/*#region############### orderhistory ##################################################################*/
.orderbox {
    height: 100%;
    width: 800px;
    margin: 10px 300px;
    display: flex;
    flex-wrap: wrap;
    background-color: #FAEBD7;
    padding: 20px;
    border-radius: 10px 60px 30px;
}

.orderid:hover {
    color: #ffffff;
    cursor: pointer;
}

.orderlist {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 5px;
}

.orderListDetail {
    width: 800px;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 2px solid rgba(192, 192, 192, 1);
    padding: 10px;
}

.orderListDetail>* {
    margin-top: 10px;
    font-family: serif;
    font-size: 30px;
    width: 100%;
}

/*#endregion */

/*#region############### orderdetail ##################################################################*/
.orderdetail {
    height: 80vh;
    width: 50%;
    padding: 10px;
    background-color: #ffffff;
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 50%;
    bottom: 50%;
    ;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    border-radius: 5%;
    border: 2px solid #A0522D;
    scrollbar-color: red orange;
    scrollbar-width: thin;
}

.orderdetail::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: none;
    margin: 10px 0px;

}

.orderdetail::-webkit-scrollbar {
    width: 12px;
    background-color: none;
}

.orderdetail::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: none;
}

.close {
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
}

.detail-body p {
    margin: 30px 10px
}

.detail-body {
    width: 100vh;
}

.wrap {
    overflow: hidden;
    border-radius: 10px 10px 0px 0px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.35);
}

table {
    border-collapse: collapse;
}

th {
    color: #ffffff;
    width: 25vw;
    height: 75px;
}

td {
    background-color: #ffffff;
    width: 25vw;
    height: 50px;
    text-align: center;
}

tr {
    border-bottom: 1px solid #dddddd;
}


tr:nth-of-type(even) td {
    background-color: #f3f3f3;
}
</style>