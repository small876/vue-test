import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)


const actions = {
    ItemIncrement(context,NewItem){
        let a=false
        state.CartItem.forEach(item => {
            if(item._id == NewItem._id){
                console.log('已在購物車內')
                context.commit('ITEMINCREMENT', item)
                a = !a
            }
        })
        if(a==false){
            context.commit('ADDCART', NewItem)
        }
    }    
}

const mutations = {
    ADDCART(state, item){
        let cartitem = JSON.parse(JSON.stringify(item))  //避免share by reference 影響原本的
        Object.assign(cartitem, {totalcount:1})
        state.CartItem.push(cartitem)    
    },

    ITEMINCREMENT(state,item){        
        item.totalcount += 1
    },
    ITEMDECREMENT(state, item){
        item.totalcount -= 1
        if(item.totalcount == 0){
            mutations.DELETEITEM(state, item)
            console.log('delete',state)
        }
    },
    DELETEITEM(state,item){
        let ItemEmpty = state.CartItem.findIndex((x) => x === item)         
            state.CartItem.splice(ItemEmpty, 1)
        if (item.isSelected == true){
            let OrderEmpty = state.Order.findIndex((x) => x === item)         
            state.Order.splice(OrderEmpty, 1)
        }
    },   
        
    selectitem(state, item){
        item.isSelected = !item.isSelected
        if(item.isSelected == true){
            state.Order.unshift(item)
        }
        else if(item.isSelected == false){
            let ItemEmpty = state.Order.findIndex((x) => x._id === item._id)         
            state.Order.splice(ItemEmpty, 1)
        }
    }
}

const state = {
    sum:0,
    TotalPrice:0,
    CartItem:[],
    Order:[],
    dialog : false
}

const getters = {
    ItemCount(state){
        if(state.Order.length != 0){ 
            let finalcount = 0
            state.Order.forEach(item => {
                finalcount += item.totalcount
            })
            return finalcount            
            }
            else{
                return 0
            }
    },
    ItemTotalPrice(state){  
        return state.Order.reduce(
            (total, item)=>{
                return total + item.price*item.totalcount
            },0
        )
        },
    DiscountPrice(state){
        if(state.TotalPrice>499){
        return state.TotalPrice*0.8}
        return state.TotalPrice
    }
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})