<template>
    <div class="checkpage">
       <div class="process">
            <div class="checkitem" ref="checkitem">
                <p>確認商品</p>
            </div>
            <div class="orderinfo" ref="info">
                <p>填寫個人訊息</p>
            </div>
            <div class="pay" ref="info">
                <p>付款方式</p>
            </div>
        </div>

       <div class="checkitembox" v-if="!itemcheck">
            <div class="itemlist">
                <table> 
                    <tr v-for=" item in this.Order" :key="item._id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.totalcount }}</td>
                        <td>${{ item.totalcount*item.price }}</td>
                    </tr>
                </table>
            </div>

            <div class="detail">
                <h3>可使用優惠</h3>
                <div class="coupon">
                    <div class="coupondetail" v-for="a in 3" :key="a.index">
                        <h4>全館85折</h4>
                        <p>使用期限:2099-12-31</p>                       
                    </div>
                </div>
                <div class="total">
                    <h3>總金額:{{ ItemTotalPrice }}</h3>
                    <h3>折扣後金額:{{ Math. floor(ItemTotalPrice*0.85)  }}</h3>
                </div>
            </div>            
       </div>

        <div class="info" v-if="itemcheck">
            <div class="receive">
                <form action="">
                    <label for="name">名字：</label>
                    <input id="name" type="text" v-model="name" required>

                    <label for="date">到貨日期:</label>
                    <b-form-datepicker id="example-datepicker" v-model="date" class="mb-2"></b-form-datepicker>

                    <label for="phone">電話</label>
                    <input id="phone" type="text" v-model="phone" required>

                    <label for="address">地址</label>
                    <input id="address" type="text" v-model="address" required>                    
                </form>
            </div>

            <div class="payment">
                <input type="radio" id="payment" value="1" v-model="payment">
                <label for="payment">
                    <div class="payment-1">
                        <span>超商繳費</span>
                    </div>
                </label>
               
                <input type="radio" id="payment-2" value="2" v-model="payment">  
                <label for="payment-2" class="payment2">
                    <div class="payment-2">
                        <span>取貨付款</span>
                    </div>
                </label>
                            
            </div>
            <button @click="istrue">送出訂單</button>
        </div>

       <div class="nextpage" @click="nextstep('checkitem')" v-show="!itemcheck">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                <span class="material-symbols-outlined">
                    arrow_forward
                </span>
       </div>

    </div>
</template>

<script>
import { mapGetters, mapMutations, mapState} from 'vuex';
import { reg_phoneType } from '@/utils/validate'
import { UserPurchase } from '@/api/api';

export default{
    name:'CheckOut',
    data(){
        return{
            itemcheck:false,
            name:'',
            date:'',
            address:'',
            phone:'',
            payment:''
        }
    },
    computed:{         
        ...mapState({'SumValue':'sum', 'TotalPrice':'TotalPrice', 'CartItem':'CartItem',}),
        ...mapState(["Order"]),
        ...mapGetters(["DisCount","DiscountPrice","ItemTotalPrice","ItemCount"])
        
    },
    methods:{  
        ...mapMutations({increment:'ADD','CountItemTotalPrice':'CountItemTotalPrice'}), //methods有指定value為n 但這裡沒有指定param所以必須在func回傳
        nextstep(pos){
            this.$refs[pos].style.backgroundColor = '#f5f5f5'
            this.itemcheck = true
        },
        test(){console.log(this.$data)},
        istrue(){
            if ( 
                !this.name || !this.date || !this.address || !this.phone){
                alert('資料不得為空')
            }
            else if (!this.payment){
                alert('請選擇一種付款方式')
            }
            else if (!reg_phoneType(this.phone)){
                    alert('電話格式錯誤')
            }
            else{
                this.PURCHASE()
            }

        },

        async PURCHASE(){  
            console.log(this.$store.state.Order.length)     
        try{        
            if(this.$store.state.Order.length != 0){
                let total = await this.$store.state.Order.reduce(
                    (total, item)=>{
                        return total + item.price*item.totalcount
                    },0
                )

                let order_send = {
                    "orderContent":[],
                    "order_price": Math. floor(total * 0.85),
                    "receiver" : this.name,
                    "phone_number" : this.phone,
                    "payment" : this.payment,
                    "date" : this.date,
                    "address" : this.address,
                };
                (async ()=>  {await this.$store.state.Order.forEach(item=>{
                    order_send.orderContent.push({"product":item._id,
                                                    "order_quantity": item.totalcount ,
                                                    "order_item_price":item.price
                                    })
                        }
                    )
                })();
                console.log("order_send",order_send);

                let response = await  UserPurchase(order_send);

                this.$router.push({
                    path:'/OrderHistory'
                })
                console.log(response.data);

                (()=>{this.$store.state.Order.forEach(item => { 
                    let ItemEmpty = this.$store.state.CartItem.findIndex((x) => x.title === item.title)         
                    this.$store.state.CartItem.splice(ItemEmpty, 1)                
                    })
                    this.$store.state.Order.splice(0, this.$store.state.Order.length)})()
                    
            }
            else{
                throw new Error('Oops no item in here!')
            }

        } catch(err) {
            console.log(err)
            }
        
        }
    }       
} 
    



</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

/*#region ################ page ##############################*/
*{
    margin: 0;
    padding: 0;
    border: 0
}

.nextpage{
    margin-top: 20px;
    height: 50px;
    width: 50px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 80%;
}

.nextpage:hover{
    opacity: 1.2;
    box-shadow: 14px rgba(0,0,0,0.25);
    cursor: pointer;
}

/* #endregion */

/*#region ################ top ##############################*/
.checkpage{
    width: 100%;
    height: 100vh;
    background-color: #FBF3DE;
    padding: 0px 300px;
}

.process{
    padding: 50px;
    display: flex;
    justify-content: space-between;
}

.checkitem, .orderinfo, .pay{
    width: 150px;
    height: 50px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
}

/* #endregion */

/*#region ################ itembox ##############################*/

.checkitembox{
    padding:10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    height: 70%;
    width:100% ;
    background-color: rgba(242,243,225);
    display: flex;
}

::-webkit-scrollbar {

width: 7px;

}

::-webkit-scrollbar-button {

background: transparent;

border-radius: 4px;

}

::-webkit-scrollbar-track-piece {

background: transparent;

}

::-webkit-scrollbar-thumb {

border-radius: 4px;

background-color: rgba(0, 0, 0, 0.4);

border: 1px solid slategrey;

}

::-webkit-scrollbar-track {

box-shadow: transparent;

}

.itemlist{
    padding:30px;
    width: 50%;
    height: 100%;
    border-right: 1px solid rgba(192,192,192,1);
    overflow: auto;
}

.itemlist table tr{
    font-family: 'Great Vibes', "cursive";
    font-size: 30px;
    height: 80px;
    border-bottom: 2px solid rgba(192,192,192,0.3);
}

.itemlist table td{
    padding: 0px 20px;
}
/* #endregion */

/*#region ################ detail ##############################*/
.detail{
    width: 50%;
    height: 100%;
    border-left: 1px solid rgba(192,192,192,1);
    padding: 10px;
    display: flex; 
    flex-wrap: wrap;
}

.detail h3{
    padding-top: 30px;
    width: 100%;
    
    flex-shrink: 0;
}

.coupon{
    width: 100%;
}


.coupon :hover{
    background-color: #FBF3DE;

}


.coupondetail{ 
    margin: 10px 10px;
    background-color: #E5D2B4;
    border:1px solid rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    padding: 5px;
    align-items: center;
    position: relative;
}

.coupondetail >*{
    margin-left: 20px;
}


.coupondetail:before,
.coupondetail:after{
  content: '';
  display: block;
  position: absolute;
}


.coupondetail:before {
  right: 10%;
  top:0;
  height: 30px;
  width: 30px;
  background-image:
    linear-gradient(
      -45deg,
      transparent 50%,
      red 50%),
    linear-gradient(
      45deg,
      transparent 50%,
      red 50%);
}




.total{
    margin-top: 20px;
    margin-left: 60%;
}

/* #endregion */

/*#region ################ info ##############################*/
.info{
    background-color: #fff;
    width: 100%;
    height: 70%;
    padding:10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    background-color: rgba(242,243,225);
    display: flex;
    position: relative;
}

.receive{
    padding:30px;
    width: 50%;
    height: 100%;
    border-right: 1px solid rgba(192,192,192,1);
    overflow: auto;
}

.receive label{
    font-size: 25px;
    width: 100%;
}
.receive input[type=text]{
    height: 40px;
    width: 100%;
    background-color: #fff;
    border: 1px solid rgba(192,192,192,1);
}

.receive input{
    width: 100%;
    border:1px solid #000
}


.payment{
    width: 50%;
    height: 100%;
    border-left: 1px solid rgba(192,192,192,1);
    padding: 10px;
    display: flex; 
    flex-wrap: wrap;
}

.payment > label{
    width: 100%;
    height: 50%;
}

.payment-1, .payment-2{
    font-size: 50px;
    width: 100%;
    height: 50%;
    background-color: #fff;
}

input[type="radio"] {
  display: inline-block;
  width: 25px;
  height: 25px;
  padding: 6px;
  background-clip: content-box;
  border: 2px solid #bbbbbb;
  background-color: #e7e6e7;
  border-radius: 50%;
}


input[type="radio"]:checked > div {
  border: 1px solid #000
}

.info button{
    position: absolute;
    background-color: #fff;
    padding: 10px;
    bottom: 10px;
    right: 10px;
    z-index: 1;
    border: 1px solid #000;
    border-radius: 2px;
}

/* #endregion */
</style>