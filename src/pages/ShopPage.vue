<template>
    <div class="shop-container">
        <b-breadcrumb class="p-2">
            <b-breadcrumb-item>
                <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
                <router-link to="/"><a>首頁</a></router-link>
            </b-breadcrumb-item>
            <b-breadcrumb-item active>商品頁面</b-breadcrumb-item>
        </b-breadcrumb>

        <b-overlay :show="show" rounded="sm">
        <div class="navbar">
            <div class="activity">
                <h3>排序:</h3>
                <input type="radio" name="gender" value="2" v-model="SortType">名稱
                <input type="radio" name="gender" value="3" v-model="SortType">金額
                <!-- <h4>{{ SortType }}</h4> -->
            </div>
        </div>

       
        <div class="mx-auto">
            <b-card-group deck class="ml-4" style="width: 100%;">
                <b-card no-body style="max-width: 22rem; min-width: 20rem;" class="ml-1 mr-1 p-2"
                    img-src="https://picsum.photos/200/300" img-alt="Image" img-top v-for="TestData in itemData"
                    :key="TestData._id">

                    <b-card-body>
                        <b-card-title @click="showdetail(TestData._id)" class="title">{{ TestData.name }}</b-card-title>
                        <b-card-sub-title class="mb-2 mt-1">${{ TestData.price }}</b-card-sub-title>
                        <b-card-text>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos nisi, molestias ratione veritatis
                            tempore facilis, labore minus culpa soluta mollitia itaque maiores unde quae eligendi voluptas
                            quibusdam. Doloremque, asperiores earum!
                        </b-card-text>
                    </b-card-body>
                    <b-button size="lm" class="mb-2 p-1 mt-2" style="max-width: 10rem;"
                        @click="ItemADDCART(TestData)">
                        <b-icon icon="cart-plus" aria-hidden="true"></b-icon> 加入購物車
                    </b-button>
                </b-card>
            </b-card-group>
        </div>
        <b-alert class="fixed-top ml-4 mt-4" style="max-width:100% " :show="dismissCountDown" variant="info"
            @dismissed="dismissCountDown = 0" @dismiss-count-down="countDownChanged">
            加入購物車
        </b-alert>
    </b-overlay>

    </div>
</template>
  
<script>
import { mapMutations, mapActions } from 'vuex'
import { GetItemList } from '@/api/api'

export default {
    name: 'ShopPage',
    data() {
        return {
            show:true,
            SortType: '',
            itemData: null,
            dismissCountDown: 0
        }
    },
    async created() {
        try{
            let response = await GetItemList()
            this.itemData = response.data
            this.show = false
        } catch(error) {
            console.log(error)
        }
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
        ...mapMutations(['ADDCART']),
        ...mapActions(['ItemIncrement']),

        ItemADDCART(item) {
            this.ItemIncrement(item)
            this.dismissCountDown = 1
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },

        showdetail(id) {
            this.$router.push({
                path: `/ItemDetail/${id}`,
            })
        },
    }
}



</script>
  
<style scoped>
.shop-container{
    background-color: #FBF3DE
}

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
    background-color: #FBF3DE
}

.navbar input {
    position: relative;
    ;
    margin: 0px 10px;

}

.title:hover{
    color: #dddddd;
    cursor: pointer;
}

/* #endregion */


</style>