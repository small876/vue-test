<template>
    <div class="container">
        <h3>訂單管理</h3>
        <label for='account'>訂單查詢</label><br>
        <input id='account' placeholder="輸入訂單號碼" v-model="account"><br>
        <div>
            <label for="example-datepicker">日期查詢</label>
            <b-form-datepicker id="example-datepicker" v-model="date" class="mb-2"></b-form-datepicker><button @click="filter(date)">查詢</button>
            <p>{{ date }}</p>
        </div>
        <h4>所有訂單</h4>
        <div class="wrap">
            <table>
                <tr>
                    <td>訂單號碼</td>
                    <td>金額</td>
                    <td>訂購人</td>
                    <td>訂單日期</td>
                    <td>訂單狀態</td>
                </tr>
                <tr v-for="orderdata in order " :key="orderdata.index">
                    <td @click="detail(orderdata._id)"><span>{{ orderdata._id }}</span></td>
                    <td>{{ orderdata.order_price }}</td>
                    <td>{{ orderdata.ordering_person }}</td>
                    <td>{{ orderdata.createdAt.substring(0,10) }}</td>
                    <td>{{ orderstatus[orderdata.order_status]}}</td>
                </tr>
            </table>
        </div>
    </div>

</template>

<script>
import { OrderList, OrderFilter } from '@/api/api';


export default{
    name:"AdminPage",
    data(){
        return{
            account:null,
            password:null,
            order:'',
            date:'',
            orderstatus:{
                "R":"收到訂單",
                "D":"訂單處理中",
                "S":"出貨中",
                "F":"訂單完成",
            }
        }
    },
    methods:{
        async filter(date){
            let response = await OrderFilter(date)
            this.order = response.data
            console.log(response.data)
        }
        ,

        detail(id){
            this.$router.push({
                path:`/AdminOrderDetail/${id}`,
            })
        }
},
    created(){
        OrderList()
        .then((response) => this.order = response.data)
        .catch((error) => console.log(error))
    }
}


</script>

<style scoped>
label input{
    display: block;
}
input{
    border:1px solid rgba(0,0,0,1)
}
h4{
    margin: 20px 0px;
}

.wrap{
  overflow:hidden;
  border-radius:10px 10px 0px 0px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.35);
}

.wrap span:hover{
    color: #dddddd;
    cursor: pointer;
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

button{
    border:1px solid rgba(0,0,0,1)
}

</style>