<template>
    <div class="itemdetailcontainer">
        <div class="navrouter">
            <div class="historyrouter">
                <router-link to="/"><a>首頁</a></router-link>  <a>/</a> <router-link to="/ShopPage"><a>商品頁面</a></router-link> <a>/</a> <a>詳細訊息</a>
            </div>           
        </div>
        <div class="itemdetail">
            <div class="itemimage">
                <img src="https://picsum.photos/200/300" loading="lazy">
            </div>

            <div class="detailtext">
                <h3>{{ itemdata.name }}</h3>
                <h4>NT{{ itemdata.price }}</h4>
                <p>{{ itemdata.intro }}</p>
                <button @click="ItemIncrementAndAlert(itemdata)">加入購物車</button>
            </div>
        </div>
        <Transition>
            <div v-show="hint" class="hint">
                <p>加入購物車</p>
            </div>
        </Transition>  
    </div>
</template>
  
<script>

import {mapMutations,mapActions} from 'vuex'
import { GetItemDetail } from '@/api/api'

    export default {
        name: 'ItemDetail',
        data(){
        return{
            hint:false,
            itemdata:null
        }
    },

    async created(){
        let response = await GetItemDetail(this.$route.params.id)
        this.itemdata = response.data
    },

    methods:{
        ...mapMutations({ADDCART:'ADDCART'}),
        ...mapActions({ItemIncrement:'ItemIncrement'}), 
        ItemIncrementAndAlert(item){
                this.ItemIncrement(item)
                this.hint=true
                setTimeout(() => this.hint=false, 1000)                
            } 
    }
}
  
  
</script>
  
<style>
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

.itemdetailcontainer{
    width: 100%;
    height: 100%;
    background-color: #FBF3DE;
}

.itemdetail{
    display: flex;
    margin: 0px 300px;
}

.itemimage {
    height: 300px;
    width: 200px;
    margin: 20px 10px;
}

.detailtext{
    margin: 50px 10px;
}

.detailtext h4{
    color:red
}

.detailtext button{
    padding: 10px;
    border:1px solid rgba(0,0,0,1)
}

.detailtext p {
    width: 1000px;
    font-family: 'Great Vibes', "cursive";
}

/* #region############################################## hint  ##################################################### */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
   opacity: 0;
}

.hint{ 
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #909FA6;
    border-radius: 10px;
    position: fixed;
    left: 50%;
    top: 20px;
    z-index: 999;    
}

.hint p{
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0;
} 
/* #endregion */  

/* #region############################################## navrouter  ##################################################### */
.navrouter{
    margin-left: 200px;
    height: 50px;
    width: 100%;
    display: block;
    align-items: center; 
}

.historyrouter a{
    margin: 0px 5px;
}

.navrouter a{
    height: 50px;
    width: 100%;
}

/*#endregion*/
</style>