import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)


const actions = {
    ItemIncrement(context,NewItem){
        let a=false
        state.CartItem.forEach(item => {
            if(item.title == NewItem.title){
                console.log('已在購物車內')
                context.commit('ITEMINCREMENT', item)
                a = !a
            }
        })
        if(a==false){
            context.commit('ADDCART', NewItem)
        }
    },
    ShowOrder(context){
        if(state.Order.length != 0){
            context.commit('SHOWORDER')
        }
    },
    
}

const mutations = {
    ADDCART(state, item){
        // item["totalcount"]=0,
        // item["isSelected"]=false,
        state.CartItem.push(item)
        item.totalcount += 1
        // console.log('ADDCART被調用',item.totalcount)
        state.TotalPrice = item.count*item.price + state.TotalPrice
    },

    ITEMINCREMENT(state, item){
        item.totalcount += 1
        console.log('ITEMINCREMENT被調用',item.totalcount,state)
        console.log('item and cartitem', state.CartItem[0] === item)
    },
    ITEMDECREMENT(state, item){
        item.totalcount -= 1
        if(item.totalcount == 0){
            mutations.DELETEITEM(state, item)
            console.log('delete',state)
        }
        console.log('ITEMDECREMENT被調用',item.totalcount,item.count,state) 
        console.log('ordercart',state.Order)
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
       new Promise((resolve) => {
        item.isSelected = !item.isSelected
        resolve(item)
       }).then((item)=>{
        if(item.isSelected == true){
            state.Order.unshift(item)            
            // console.log('check true, item check:',item.isSelected, state.Order)          
        }
        else if(item.isSelected == false){
            let ItemEmpty = state.Order.findIndex((x) => x.title === item.title)         
            state.Order.splice(ItemEmpty, 1)
            console.log('check false, item check:',item.isSelected, state.Order) 
        }
    })
    },
    PURCHASE(state){ 
    new Promise((resolve, reject) => {
         if(state.Order.length != 0){
             resolve(state)
             state.dialog = false
         }
         else{
             reject('no item')
             state.dialog = false
         }
     }).then((state) =>{ state.Order.forEach(item => { 
                let ItemEmpty = state.CartItem.findIndex((x) => x.title === item.title)         
                state.CartItem.splice(ItemEmpty, 1)                
                })
                state.Order.splice(0, state.Order.length)}
        )
     .catch(err=>{
         console.log('fail',err)
     })
     
    },

    SHOWORDER(state){
        state.dialog = true
    },
    CLOSEORDER(state){
        state.dialog = false
    }
}



const state = {
    sum:0,
    TotalPrice:0,
    // CartItem:[{id : '001',name : 'Book1',price : 300,count:0,totalcount:0},],
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
 
    TotalSum(state){
        return state.sum*0.7
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