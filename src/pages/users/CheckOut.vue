<template>
    <div class="checkpage">
        
        <div v-if="!itemcheck">
            <div class="itemlist">
                <b-container fluid class="text-center" style="min-width: 10rem; max-height: 30rem;">
                    <b-col class="p-3 md-auto">
                        <b-icon icon="card-checklist" aria-hidden="true"></b-icon>
                        <h2>check your order</h2>
                    </b-col>
                </b-container>
            </div>

            <div>
                <b-container class="text-center mx-auto" style="border-bottom: #bbbbbb 1px solid;">
                    <b-row>
                        <b-col>
                            <b-table striped :items="Order" :fields="fieldsitem" class="mx-auto"
                                style="max-width: 40rem ;min-width: 15rem">
                                <template v-slot:cell(TotalPrice)="{ item }">
                                    <span>
                                        {{ item.totalcount * item.price }}
                                    </span>
                                </template>
                            </b-table>
                        </b-col>
                    </b-row>
                </b-container>
                <b-container class="text-center mx-auto bg-transparent">
                    <b-row>
                        <b-col>
                            <div>
                                <h2 class="text-decoration-line-through">金額:{{ ItemTotalPrice }}</h2>
                            </div>
                            <div class="mx-auto ">
                                <h2>折扣後金額:{{ Math.floor(ItemTotalPrice * 0.85) }}</h2>
                            </div>
                            <b-button variant="gray" class="rounded-circle px-2 mt-2">
                                <b-icon icon="arrow-right" scale="2"  @click="itemcheck = true"></b-icon>
                            </b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </div>

        <div v-if="itemcheck">
            <b-form style="max-width:40rem" class="mx-auto py-2">              

                <b-form-group class="mt-1" id="input-group-2" label="收件人姓名:" label-for="input-2">
                    <b-form-input id="input-2" v-model="name" required></b-form-input>
                </b-form-group>

                <b-form-group class="mt-1" id="input-group-1"  label="收貨日期" label-for="example-datepicker">
                    <b-form-datepicker id="example-datepicker" v-model="date" class="mb-2" :date-disabled-fn="dateDisabled" required></b-form-datepicker>
                </b-form-group>

                <b-form-group class="mt-1" id="input-group-2" label="地址:" label-for="input-2">
                    <b-form-input id="input-2" v-model="address" required></b-form-input>
                </b-form-group>

                <b-form-group class="mt-1" id="input-group-2" label="電話號碼:" label-for="input-2">
                    <b-form-input id="input-2" v-model="phone" required></b-form-input>
                </b-form-group>

                <b-form-group class="mt-1" id="input-group-3" label="繳費方式:" label-for="input-3">
                    <b-form-radio v-model="payment"  name="some-radios" value="1">超商繳費</b-form-radio>
                    <b-form-radio v-model="payment"  name="some-radios" value="2">貨到付款</b-form-radio>
                </b-form-group>

                <b-button variant="outline-bold" class="mb-2"  @click="istrue">
                <b-icon icon="credit-card" aria-hidden="true"></b-icon>送出訂單
                </b-button>
            </b-form>
            
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import { reg_phoneType } from '@/utils/validate'
import { UserPurchase } from '@/api/api';

export default {
    name: 'CheckOut',
    data() {
        return {
            itemcheck: false,
            name: '',
            date: '',
            address: '',
            phone: '',
            payment: '',
            fieldsitem: ['name', 'totalcount', 'TotalPrice'],
        }
    },
    computed: {
        ...mapState(['TotalPrice', 'CartItem']),
        ...mapState(["Order"]),
        ...mapGetters(["DisCount", "DiscountPrice", "ItemTotalPrice", "ItemCount"])

    },
    methods: {
        ...mapMutations({ increment: 'ADD', 'CountItemTotalPrice': 'CountItemTotalPrice' }), //methods有指定value為n 但這裡沒有指定param所以必須在func回傳
        
        istrue() {
            if (
                !this.name || !this.date || !this.address || !this.phone) {
                alert('資料不得為空')
            }
            else if (!this.payment) {
                alert('請選擇一種付款方式')
            }
            else if (!reg_phoneType(this.phone)) {
                alert('電話格式錯誤')
            }
            else {
                this.PURCHASE()
            }

        },

        async PURCHASE() {
            console.log(this.$store.state.Order.length)
            try {
                if (this.$store.state.Order.length != 0) {
                    let total = await this.$store.state.Order.reduce(
                        (total, item) => {
                            return total + item.price * item.totalcount
                        }, 0
                    )

                    let order_send = {
                        "orderContent": [],
                        "order_price": Math.floor(total * 0.85),
                        "receiver": this.name,
                        "phone_number": this.phone,
                        "payment": this.payment,
                        "date": this.date,
                        "address": this.address,
                    };
                    (async () => {
                        await this.$store.state.Order.forEach(item => {
                            order_send.orderContent.push({
                                "product": item._id,
                                "order_quantity": item.totalcount,
                                "order_item_price": item.price
                            })
                        }
                        )
                    })();
                    console.log("order_send", order_send);

                    let response = await UserPurchase(order_send);

                    this.$router.push({
                        path: '/OrderHistory'
                    })
                    console.log(response.data);

                    (() => {
                        this.$store.state.Order.forEach(item => {
                            let ItemEmpty = this.$store.state.CartItem.findIndex((x) => x.title === item.title)
                            this.$store.state.CartItem.splice(ItemEmpty, 1)
                        })
                        this.$store.state.Order.splice(0, this.$store.state.Order.length)
                    })()

                }
                else {
                    throw new Error('Oops no item in here!')
                }

            } catch (err) {
                console.log(err)
            }

        },

       
      dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`) and
        // disable days that fall on the 13th of the month
        const weekday = date.getDay()
        const day = date.getDate()
        return weekday === 0 || weekday === 6 || day === 13
      }
    }
}




</script>

<style scoped>

* {
    margin: 0;
    padding: 0;
    border: 0
}

.checkpage {
    height: 100vh;
    background-color: #FBF3DE;
}

.itemlist {
    border-bottom: #bbbbbb 1px solid;
}
</style>