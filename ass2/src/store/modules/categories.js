
import axios from "axios";

const state = {
    categories:[],
    cateItem:[]
}


const getters = {
   getUpdate:(state)=>{
      return  state.categories
   },

    getCateItem:(state)=>{
       return state.cateItem
    }


} //retrieve value/new state from state



const actions = {

    async getCategories({commit}){
        try{
            let sorted = []
            const response = await axios.get("http://localhost:4941/api/v1/events/categories")
            //console.log(response.data)
           for(let i = 0; i <= 24 ;i++ ){
               for (let j = 0; j <= 23; j++){
                   if(response.data[j].id  === i) {
                       sorted.push(response.data[j])
                   }
               }
            }
            //console.log(sorted)
            commit("addCate",sorted)
        }catch (e) {
            console.log(e)
        }
    }


} //send mutation change commit to mutation

const mutations = {
    
    setReNew(state,newEvent){
        return state.events = newEvent
    },
    setDisplayEvents(state,selectedEvents){
        return state.eventForDisplay = selectedEvents
    },

    addCate(state,categories){
        return state.categories = categories
    },

    // sortCate()

}
//change the state

export default {
    state,
    getters,
    actions,
    mutations
};

