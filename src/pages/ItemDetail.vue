<template>
    <div class="itemdetailcontainer">
        <b-breadcrumb class="p-2">
            <b-breadcrumb-item>
                <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
                <router-link to="/"><a>首頁</a></router-link>
            </b-breadcrumb-item>
            <b-breadcrumb-item>
                <router-link to="/ShopPage"><a>商品頁面</a></router-link>
                
            </b-breadcrumb-item>
            <b-breadcrumb-item active>商品信息</b-breadcrumb-item>
        </b-breadcrumb>
        <b-container>
            <b-row>
                <b-col cols="12" class="mx-auto mt-1">
                    <b-card img-src="https://picsum.photos/200/300" loading="lazy" img-alt="Card image" img-left class="mb-3 mx-auto">
                        <b-card-title>{{ itemdata.name }}</b-card-title>
                        <b-card-sub-title class="mb-2 mt-1">${{ itemdata.price }}</b-card-sub-title>
                        <b-card-text>
                            {{ itemdata.intro }}
                        </b-card-text>
                        <b-button size="lm" class="mb-2 p-1 mt-2" style="max-width: 10rem;" @click="ItemADDCART(itemdata)">
                            <b-icon icon="cart-plus" aria-hidden="true"></b-icon> 加入購物車
                        </b-button>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
        <b-alert class="fixed-top ml-4 mt-4" style="max-width:100% " :show="dismissCountDown" variant="info"
            @dismissed="dismissCountDown = 0" @dismiss-count-down="countDownChanged">
            加入購物車
        </b-alert>
    </div>
</template>
  
<script>

import { mapMutations, mapActions } from 'vuex'
import { GetItemDetail } from '@/api/api'

export default {
    name: 'ItemDetail',
    data() {
        return {
            dismissCountDown: 0,
            itemdata:''
        }
    },

    async created() {
        let response = await GetItemDetail(this.$route.params.id)
        this.itemdata = response.data
    },

    methods: {
        ...mapMutations({ ADDCART: 'ADDCART' }),
        ...mapActions({ ItemIncrement: 'ItemIncrement' }),
        ItemADDCART(item) {
            this.ItemIncrement(item)
            this.dismissCountDown = 1
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
    }
}


</script>
  
<style></style>