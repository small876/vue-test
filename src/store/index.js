import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
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
    },
    ShowOrder(context){
        if(state.Order.length != 0){
            context.commit('SHOWORDER')
        }
    },
    
}

const mutations = {
    ADDCART(state, item){
        state.CartItem.push(item)
        console.log("item_name",item.name,"item",item)
        item.totalcount = 1
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
            let ItemEmpty = state.Order.findIndex((x) => x._id === item._id)         
            state.Order.splice(ItemEmpty, 1)
            console.log('check false, item check:',item.isSelected, state.Order) 
        }
    })
    },

    async PURCHASE(state){       
    try{        
        if(state.Order.length != 0){
            let total = await state.Order.reduce(
                (total, item)=>{
                    return total + item.price*item.totalcount
                },0
            )

            let order_send = {
                // "ordering_person":"6472200d12886c7e2b5c9672",
                "orderContent":[],
                "order_price":total
            };
            (async ()=>  {await state.Order.forEach(item=>{
                 order_send.orderContent.push({"product":item._id,
                                                "order_quantity": item.totalcount ,
                                                "order_item_price":item.price
                                })
                    }
                )
            })();
            console.log("order_send",order_send);
            axios.post('http://127.0.0.1:3000/purchase',order_send,  
            { 
                headers: { 
                        Authorization: 'Bearer ' + localStorage.getItem('authTokenAccess'),
                    } }
                    ).then(
                        response => { 
                            if (response.status === 200){
                                console.log('order successful', response.data)
                            }
                        },
                        error => {
                            console.log('failed', error.message)
                        }
                    );
            (()=>{state.Order.forEach(item => { 
                let ItemEmpty = state.CartItem.findIndex((x) => x.title === item.title)         
                state.CartItem.splice(ItemEmpty, 1)                
                })
                state.Order.splice(0, state.Order.length)})()
                state.dialog = false
                   
        }
        else{
            throw new Error('Oops no item in here!')
        }

    } catch(err) {
        console.log(err)
        }
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
    ItemTotalPrice(state){  //can't watch order.item.property changed
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