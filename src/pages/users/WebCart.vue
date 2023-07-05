<template>
  <div class="webcart">
    <div class="CartContainer">
        <div v-if="CartItem.length == 0">
          <h4>購物車內無東西</h4>
        </div>
      <div class="ItemList">
        <div class="ItemDetail" v-for="item in CartItem" :key="item.id">    
            <input type="checkbox" @click="selectitem(item)" v-model="item.isSelected" v-bind:item="item.isSelected"> 
            <img src="https://picsum.photos/200/300" loading="lazy">
            <h3>{{ item.name }},
              共{{item.totalcount}}件,
              共{{item.totalcount*item.price}}元</h3>
            <b-button href="#"  @click="ITEMDECREMENT(item)">--</b-button>
            <b-button href="#" variant="warning" @click="ITEMINCREMENT(item)">++</b-button>
            <b-button variant="danger" @click="DELETEITEM(item)">delete</b-button>            
        </div>
        <div v-if="CartItem.length !=0 " class="ItemListTotal">
          <h3>選取的件數:{{ ItemCount }}</h3>
          <h4>總金額:{{ ItemTotalPrice }}</h4>
            
          <router-link to="/CheckOut"><v-btn><v-icon>mdi-cart-check</v-icon>購買</v-btn> </router-link> 
        </div>            
      </div>
    </div>
  </div>  
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex';

export default{
    name: "WebCart",
    data() {
        return {
            showModal: false
        };
    },
    computed: {
        ...mapState(["CartItem" ]),
        ...mapGetters([ "DiscountPrice", "ItemTotalPrice", "ItemCount"]), //取得getters的functions
    },
    methods: {
        ...mapMutations(["ITEMDECREMENT", "selectitem", "ITEMINCREMENT", "DELETEITEM"]),
        ...mapActions({ ItemIncrement: "ItemIncrement" }),
    },

}
</script>

<style scoped>
.webcart{
    width: 100%;
    height: 100%;
    background-color: #FBF3DE;
}

.CartContainer{
    padding: 0px 300px;
    display:flex;
    align-items: center;
    justify-content: space-around; 
    flex-wrap: wrap;
}

.ItemDetail{
    display:flex ;
    justify-content: space-around;
    align-items: center;
    background-color:rgba(128,128,128,0.3);
    margin: 10px 0px;
    flex-shrink: 0
}

.ItemList{    
    width: 1000px;;

    margin: 30px 0px;
}


.ItemListTotal{
    padding-left: 70%;
    font-size: 28px;
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