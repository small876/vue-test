<template>
    <div class="RecommendList">
        <div class="container">
            <div class="ItemBox" >

                <v-slide-group
                    show-arrows
                    >
                    <v-slide-group-item 
                    v-for = 'Itemdata in Itemdata' :key="Itemdata.id"
                    class="pa-4"
                    >
                        <v-card
                        class="mx-auto my-12"
                        max-width="374"
                    >
                            <!-- <template v-slot:loader="{ isActive }">
                            <v-progress-linear
                                :active="isActive"
                                color="deep-purple"
                                height="4"
                                indeterminate
                            ></v-progress-linear>
                            </template> -->
                            <v-img   :src= "Itemdata.image" cover height="250"> </v-img>
                            <v-card-title >{{ Itemdata.title }}</v-card-title> 
                            <v-card-subtitle >
                                <span class="me-1">{{ Itemdata.author }}</span>
                                <span class="me-1">{{ Itemdata.isbn }}</span>
                                <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                            </v-card-subtitle>
                           
    
                            <v-card-text>


                                <div class="my-4 text-subtitle-1">
                                    ${{ itemtest.price }}
                                </div>

                                <div>Graphic Is Insance</div>
                            </v-card-text>

                            <v-divider class="mx-4 mb-1"></v-divider>

                            <div class="px-4">
                                <v-chip-group>
                                    <v-chip>Science</v-chip>
                                </v-chip-group>
                            </div>

                            <v-card-actions>
                                <v-btn
                                    color="deep-purple-lighten-2"
                                    variant="text"
                                    @click="ItemIncrement(itemtest)"
                                >
                                    加入購物車
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-slide-group-item>
                </v-slide-group>    
                <!-- 如果資料在RecommendList中 可使用:data=data 讓App.vue使用 -->
                
            </div>
        </div>
    </div>

</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default{
    name:'RecommendList',
    props:['Itemdata'],
    data() {
        return{
            itemtest:{
                id : '002',
                name : 'Book2',
                price : 3000,
                totalcount:0,
                isSelected:false
            }
        }
    },
    methods:{
        // ADDCART(){
        //     console.log('被加入了')
        // }
        ...mapMutations({ADDCART}),



        //test******************************************************************************************************
        ...mapActions({ItemIncrement}),
        //******************************************************************************************************
    },
}

</script>

<style scoped>

/*#region ###################################### ??? ##################################################### */
.RecommendList{
        clear:left;
        height: 600px;
    }



    v-card{
        margin:5px 5px
    }
    .ItemBox button{
        display:inline-block;
        vertical-align: middle;
    }
    .ItemBox img{
        margin: 7.5px;
    }
    .ItemBox h4{
        margin: 0px 15px;
        text-align: center;
        height: 30px;
        width: 150px;
    }
/* #endregion */
</style>