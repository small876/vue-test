<template>
    <div class="CartContainer">
        <button @click="ToHome">tohome</button>
        <div class="ItemList">
            <div class="ItemDetail" v-for="item in CartItem" :key="item.id">
                <input type="checkbox" @click="selectitem(item)" v-model="item.isSelected"> 
                <img :src="item.imageURL">
                <h3>${{ item.price }} ,共{{item.totalcount}}件, 共{{item.totalcount*item.price}}元</h3>
                <b-button href="#" variant="gray" @click="ITEMDECREMENT(item)">--</b-button>
                <b-button href="#" variant="warning" @click="ItemIncrement(item)">Add To Cart(has been)</b-button>
                <b-button variant="danger" @click="DELETEITEM(item)">delete</b-button>            
            </div>          
        </div>



        <div class="ItemListTotal">
            <h3>選取的件數:{{ ItemCount }}</h3>
            <h4>總金額:{{ ItemTotalPrice }}</h4>  
            <v-btn size="x-large" @click="ShowOrder()"> <v-icon>mdi-cart-check</v-icon>購買</v-btn>             
            
        </div>  

        <transition name="modal">
        <div class="modal-mask"  v-show="dialog">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                    <h3>明細</h3>
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  <div class="OrderDetail" v-for="item in Order" :key="item.id">
                    <h3 style="width: 100%">{{item.title}} ${{ item.price }} ,共{{item.totalcount}}件, 共{{item.totalcount*item.price}}元</h3>
                  </div>
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                    <!-- <button @click="PURCHASE()">購買</button>    -->
                    <button @click="redirect()">購買</button>   
                    <button @click="CLOSEORDER()">取消</button> 
                  <button class="modal-default-button" @click="showModal = dialog">
                    OK
                  </button>
                </slot>
              </div>

            </div>
          </div>
        </div>
      </transition>
      <div id="app">  
        <modal v-if="showModal" @close="showModal = false">
   
        </modal>
    </div>  

    </div>

</template>

<script>
// import axios from 'axios';
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex';

export default{
    name:'WebCart',
    data(){
        return{
            showModal: false 
        }
    },
    computed:{
        
        // SumValue(){
        //     return this.$store.getters.TotalSum
        // }       自己寫computed讓template使用 也可用mapstate
        
        ...mapState({'SumValue':'sum', 'TotalPrice':'TotalPrice', 'CartItem':'CartItem',}), // '...'為ES6語法 能把object拆開
        ...mapState(["Order","dialog","checked"]),
        ...mapGetters(["DisCount","DiscountPrice","ItemTotalPrice","ItemCount"])  //取得getters的functions
    },
    methods:{
        ToHome(){
            this.$router.push({
            path:'/'
            })},
        
        // increment(){
        //     // this.$store.dispatch('add', this.n) 如不處理資料判斷的邏輯 可直接調用commit
        //     this.$store.commit('ADD', this.n)
        // }       自己寫methods 也可用mapmutation 
        // redirect(){
        //   new Promise((resolve) => {
        //     this.PURCHASE()
        //     resolve('/');            
        //   }).
        //   then((resolve)=>{
        //     this.$router.push({
        //     path:resolve
        //     })
        //   })
        // },
        async redirect(){
         try{
           await this.PURCHASE()
            // console.log('no catch!', result)
          //   this.$router.push({
          //   path:'/OrderHistory'
          // })
          // setTimeout(function() { alert("successful!")}, 3000)         
          } catch (err) {
            console.log('catch!',err)
            this.$router.push({
            path:'/'
          }) 
          }
        },
    
        ...mapMutations({increment:'ADD','CountItemTotalPrice':'CountItemTotalPrice'}), //methods有指定value為n 但這裡沒有指定param所以必須在func回傳
        ...mapMutations(["ITEMDECREMENT","selectitem","ITEMINCREMENT","SelectCancel","SetOrder","DELETEITEM","PURCHASE","SHOWORDER","CLOSEORDER","SHOWORDER"]),
        ...mapActions({ItemIncrement:'ItemIncrement'}),
        ...mapActions(["ShowOrder"])
    },
    beforeRouteLeave(to, from, next){
                // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
                // if (answer) {
                //     next()
                // } else {
                //     next(false)
                // }
                next()
                this.CartItem[0].isSelected = false
                this.Order = this.Order.splice(0, this.Order.length)
                console.log(this.Order)
            }    
            
    // mounted(){
    //     axios.get('http://127.0.0.1:8000/book_data/',{
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("authTokenAccess")}`                
    //                 }
    //             }
    //         )
    //         .then(
    //             response => {
    //                 if(response.status ==200 ){
    //                 console.log('Get data', response.data)
    //                 }
    //             },
    //             error => {
    //                 console.log('failed', error.message)
    //             }
    //         ), console.log(`Bearer ${localStorage.getItem("authTokenAccess")}`)
    // },
    // beforeDestroy(){
    //     console.log('cart被銷毀',this.CartItem)
    // }
}
</script>
<style>

/*#region ################ modal ##############################*/
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.OrderDetail h3{
  width: 100%;
  /* margin: 10px 10px; */
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
  display: flex;
  flex-wrap: wrap;
  font-size: 18px;
}


.modal-body {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  font-size: 18px
}

.modal-default-button {
  float: right;
}


.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
/* #endregion */
/**##################################################################################################################### */


.CartContainer{
    width: 1200px;
    margin: auto;
    display:flex ;
    align-items: center;
    justify-content: space-around;
    background-color:  rgba(255,255,255,1);
    flex-wrap: wrap;
    position: relative;
}

.ItemDetail{
    display:flex ;
    justify-content: space-around;
    align-items: center;
    background-color:rgba(128,128,128,0.3);
    margin: 10px 0px;
}

.ItemList{    
    width: 1000px;;

    margin: 30px 0px;
}


.ItemListTotal{
    height:100px;
    font-size: 28px;
    position: absolute;
    bottom: -100px;
    right: 100px ;
}

.ItemDetail img{
    margin: 10px 10px;
    height: 180px;
    width: 120px;
}

.Count button{
    height: 20px;
    width: 20px;
    margin: 0px 7.5px 50px;
}

button:hover {
    /* :hover 代表滑鼠移到元素上時的狀態 */ 
    transform: scale(1.05);
  }

button:active {
    /* :active是滑鼠點擊元素的狀態 */
    transform: scale(1);
    box-shadow: inset 0 0 10px 1px rgba(0, 0, 0, .2);
  }

.b-card{
    padding: 20px;
}

.b-card .dropdown-1{
    margin-bottom: 10px;
}

.select{
    width: 50px;
}
</style>