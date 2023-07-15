<template>
    <div class="orderhistory-container">

    <b-overlay :show="show" rounded="sm">
        <b-container>
            <b-row>
                <b-col lg="4" md="4" sm="12">
                    <div>
                        <b-card no-body style="max-width: 20rem;">
                            <template #header>
                                <h4 class="mb-0">個人資料</h4>
                            </template>

                            <b-card-body>
                                <b-card-title>{{ responsedata.firstname + responsedata.lastname }}</b-card-title>
                                <b-card-text>
                                    {{ responsedata.birth }}
                                </b-card-text>
                            </b-card-body>

                            <b-card-body>
                                <RouterLink to="/editor">
                                    <b-button variant="outline-gray" class="p-2">
                                        <b-icon icon="cart-check-fill" aria-hidden="true"></b-icon>
                                        edit
                                    </b-button>
                                </RouterLink>
                            </b-card-body>
                        </b-card>
                    </div>
                </b-col>

                <b-col lg="8" md="8" sm="12">
                    <div v-for="(data, index) in responsedata.orderhistory" :key="data._id">
                        <div>
                            <div>
                                <b-card class="mt-1">
                                    <b-card-title>訂單編號:{{ data._id }}</b-card-title>
                                    <b-card-text>價錢:{{ data.order_price }}</b-card-text>
                                    <b-card-text>訂單狀態:{{ orderstatus[data.order_status] }}</b-card-text>
                                    <b-card-text>收件人:{{ data.receiver }}</b-card-text>
                                    <b-card-text>付款方式:{{ payment[data.payment] }}</b-card-text>
                                    <b-card-text>訂購日期:{{ data.createdAt }}</b-card-text>
                                    <b-card-body>
                                        <b-button v-b-toggle="'collapse' + index" class="mt-1">
                                            展開訂單
                                        </b-button>
                                    </b-card-body>
                                </b-card>
                            </div>
                        </div>
                        <b-collapse :id="`collapse${index}`">
                            <b-card>
                                <b-container fluid class="text-center mx-auto" style="border-bottom: #bbbbbb 1px solid;">
                                    <b-row>
                                        <b-col>
                                            <b-table striped :fields="field" :items="data.orderContent" class="mx-auto ">
                                            </b-table>
                                        </b-col>
                                    </b-row>
                                </b-container>
                            </b-card>
                        </b-collapse>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </b-overlay>
    </div>
</template>


<script>
// import { RouterLink } from 'vue-router';
import { UserInfo } from '@/api/api'

export default {
    name: "OrderHistory",
    data() {
        return {
            show:true,
            "responsedata": '',
            orderstatus: {
                "O": "訂單已下訂",
                "R": "收到訂單",
                "D": "訂單處理中",
                "S": "出貨中",
                "F": "訂單完成",
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
    async created() {        
        let response = await UserInfo()
        this.responsedata = response.data
        this.responsedata.birth = response.data.birth.substring(0, 10)
        this.show = false
    },
    // components: { RouterLink },
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
    height: 100%;
    font-family: 'Noto Sans TC', sans-serif;
}
</style>