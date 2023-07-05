<template>
    <div class="shop-container">
        <div class="navrouter">
            <div class="historyrouter">
                <router-link to="/"><a>首頁</a></router-link> <a>/</a> <a>商品頁面</a>
            </div>
        </div>
        <div class="navbar">
            <div class="activity">
                <h3>排序:</h3>
                <input type="radio" name="gender" value="2" v-model="SortType">名稱
                <input type="radio" name="gender" value="3" v-model="SortType">金額
                <!-- <h4>{{ SortType }}</h4> -->
            </div>
        </div>
        <div class="itemblock">
            <div class="itembox" v-for="TestData in itemData" :key="TestData._id">
                <img src="https://picsum.photos/200/300" loading="lazy" @click="showdetail(TestData._id)">
                <div class="ItemListDetail">
                    <p>{{ TestData.name }}</p>
                    <p>${{ TestData.price }}</p>
                    <button @click="ItemIncrementAndAlert(TestData)"><v-icon end>mdi-cart-plus</v-icon></button>
                </div>
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
import { mapMutations, mapActions } from 'vuex'
import axios from 'axios'

export default {
    name: 'ShopPage',
    data() {
        return {
            slide: 0,
            sliding: null,
            SortType: '',
            itemData: null,
            hint: false,
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:3000/products/').then(
            response => {
                console.log('Get ', response.data)
                this.itemData = response.data
                console.log('itemdata ', response.data)
            },
            error => {
                console.log('failed', error.message)
            }
        )
    },
    watch: {
        SortType: {
            handler(newValue) {
                if (newValue == 2) {
                    this.itemData.sort(function (a, b) {
                        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }

                        // names must be equal
                        return 0;
                    })
                }
                else if (newValue == 3) {
                    this.itemData.sort(function (a, b) {
                        if (a.price < b.price) {
                            return 1;
                        }
                        if (a.price > b.price) {
                            return -1;
                        }
                        return 0;
                    })
                    console.log(this.itemData)
                }
            }	 //handler會在發生改變時呼叫
        }
    },


    methods: {
        ...mapMutations({ ADDCART: 'ADDCART' }),
        ...mapActions({ ItemIncrement: 'ItemIncrement' }),

        ItemIncrementAndAlert(item) {
            this.ItemIncrement(item)
            this.hint = true
            setTimeout(() => this.hint = false, 1000)
        },

        showdetail(id) {
            this.$router.push({
                path: `/ItemDetail/${id}`,
            })
        }
    }
}



</script>
  
<style scoped>
/* #region################################################################################################### */
* {
    margin: 0;
    padding: 0;
}

html {
    height: 100%;
    background-color: #FBF3DE;
}

.shop-container {
    width: 100%;
    background-color: #FBF3DE;
}

button:hover {
    transform: scale(1.1);
}

button:active {
    transform: scale(1);
    box-shadow: inset 0 0 10px 1px rgba(255, 255, 255);
}

/*#endregion */

/* #region############################################## navrouter  ##################################################### */
.navrouter {
    margin-left: 200px;
    height: 50px;
    width: 100%;
    display: block;
    align-items: center;
}

.historyrouter a {
    margin: 0px 5px;
}

.navrouter a {
    height: 50px;
    width: 100%;
}

/*#endregion*/

/* #region############################################## hint  ##################################################### */
.v-enter-active {
    transition: 0.1s;
}

.v-leave-active {
    transition: 0.1s;
    opacity: 0;

}

.v-enter {
    transform: translateY(-100px)
}

.hint {
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

.hint p {
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0;
}

/* #endregion */

/* #region############################################## navbar  ##################################################### */
.navbar h3 {
    display: inline;
}

.navbar {
    padding-left: 200px;
    z-index: 1;
    display: flex;
    height: 50px;
    width: inherit;
    align-items: center;
}

.navbar input {
    position: relative;
    ;
    margin: 0px 10px;

}

/* #endregion */

/* #region############################################## recommendlist  ##################################################### */
.itemblock {
    display: flex;
    margin: 0px 300px;
    justify-content: space-around;
    flex-wrap: wrap;
    overflow: visible;
}

.itembox {
    width: 300px;
    height: 300px;
    margin: 10px 10px;
    background-color: rgba(192, 192, 192, 0.7);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
}

.ItemListDetail {
    display: flex;
    position: absolute;
    left: auto;
    bottom: 10px
}

.ItemListDetail * {
    margin: 0px 5px;
}

.ItemListDetail :last-child {
    margin-right: 0px;
}

.itembox img {
    margin-top: 10px;
    height: 240px;
    width: 160px;
}

.itembox img:hover{ 
    cursor: pointer;
}

/* #endregion */


</style>