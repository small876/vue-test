<template>
  <div class="webcart">
        <div v-if="CartItem.length == 0">
          <h4>購物車內無東西</h4>
        </div>
 

    <b-table striped :items="CartItem" :fields="fields" class="mx-auto" style="max-width: 80rem ;min-width: 35rem" v-if="CartItem.length != 0">
      <template v-slot:cell(check)="{ item }">
        <b-input-group-prepend is-text>
          <input type="checkbox" @click="selectitem(item)" v-model="item.isSelected" v-bind:item="item.isSelected">
        </b-input-group-prepend>
      </template>
      <template v-slot:cell(quantity)="{ item }">
        <span>
          <b-btn @click="ITEMDECREMENT(item)"><b-icon icon="bookmark-dash-fill" aria-hidden="true"></b-icon></b-btn>
          <b-badge variant="light" class="mx-2 bg-light">{{ item.totalcount }}</b-badge>
          <b-btn @click="ITEMINCREMENT(item)"><b-icon icon="bookmark-plus-fill" aria-hidden="true"></b-icon></b-btn>
        </span>
      </template>
      <template v-slot:cell(totalprice)="{ item }">
        <span>{{ item.totalcount * item.price }}</span>
      </template>
      <template v-slot:cell(delete)="{ item }">
        <b-button @click="DELETEITEM(item)"><b-icon icon="cart-x" scale="1.2" class="mb-1" variant="danger"></b-icon></b-button>
      </template>
    </b-table>

    <div v-if="CartItem.length != 0" class="float-right">
      <b-container fluid class="text-center">
        <b-col md="4" sm="12" class="p-3">
          <b-list-group style=" min-width: 25rem">
            <b-list-group-item class="d-flex align-items-center bg-transparent">
              <span class="mr-auto my-2">
                <h2>選取的件數:{{ ItemCount }}</h2>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex align-items-center bg-transparent ">
              <span class="mr-auto my-2">
                <h2>總金額:{{ ItemTotalPrice }}</h2>
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-col>

        <b-col md="4" class=" p-3">
        <router-link to="/CheckOut">
          <b-button variant="outline-gray" class="p-2" v-if="Order.length != 0">
            <b-icon icon="cart-check-fill" aria-hidden="true"></b-icon>            
              購買  
          </b-button>
        </router-link>
      </b-col>

      </b-container>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: "WebCart",
  data() {
    return {
      fields: ['check', 'name', 'price', 'quantity', 'totalprice', 'delete']
    };
  },
  computed: {
    ...mapState(["CartItem","Order"]),
    ...mapGetters(["DiscountPrice", "ItemTotalPrice", "ItemCount"]), //取得getters的functions
  },
  methods: {
    ...mapMutations(["ITEMDECREMENT", "selectitem", "ITEMINCREMENT", "DELETEITEM"]),
    test(item) {
      console.log(item)
    }
  },

}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Noto Sans TC', sans-serif;
}

.webcart {
  width: 100%;
  height: 100vh;
  padding: 0 10rem;
  background-color: #FBF3DE;
}</style>