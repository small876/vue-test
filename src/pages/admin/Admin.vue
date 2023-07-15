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
        <b-table striped  :fields="field" :items="order" class="mx-auto px-2">
            <template #cell(id)="{ item }">
                <span @click="detail(item._id)" class="pl-2 bg-transparent">
                    {{ item._id }}
                </span>
            </template>

            <template #cell(到貨日期)="{ item }">
                <span class="bg-transparent">
                    {{ item.date.substring(0,10) }}
                </span>
            </template>

            <template #cell(createdAt)="{ item }" >
                <span class="bg-transparent">
                    {{ item.createdAt.substring(0,10) }}
                </span>
            </template>

            <template #cell(orderstatus)="{ item }">
                <span class="bg-transparent">
                    {{ orderstatus[item.order_status]}}
                </span>
            </template>
        </b-table>
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
            },
            field: [
                "id",
                {
                    "key": "order_price",
                    "label": "金額"
                },
                "到貨日期",
                'createdAt',
                'orderstatus'        
            ]
        }
    },
    methods:{
        async filter(date){
            let response = await OrderFilter(date)
            this.order = response.data
        }
        ,

        detail(id){
            this.$router.push({
                path:`/AdminOrderDetail/${id}`,
            })
        }
},
    async created(){
        let response = await OrderList()
        this.order = response.data
    }
}


</script>

<style scoped>
 *{
    height: 100%;
    font-family: 'Noto Sans TC', sans-serif;
}

label input{
    display: block;
}
input{
    border:1px solid rgba(0,0,0,1)
}
h4{
    margin: 20px 0px;
}


.pl-2:hover{
    color: #dddddd;
    cursor: pointer;
}
</style>