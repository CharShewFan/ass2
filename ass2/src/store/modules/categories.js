
import axios from "axios";

const state = {
    categories:[]
}
const getters = {
    // allEvents:(state)=>state.events,
    // displayEvents:(state)=>state.eventForDisplay,
    // count:(state)=>state.events.length
} //retrieve value/new state from state



const actions = {

    async getCategories({commit}){
        try{
            const response = await axios.get("/events/categories")
            commit("addCate",response.data)
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
        return state.categories = categories;
    }

}
//change the state

export default {
    state,
    getters,
    actions,
    mutations
};

