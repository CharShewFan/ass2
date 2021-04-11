
import axios from "axios";

const state = {
    events:[],
    eventForDisplay:[],
    count:0


}
const getters = {
    allEvents:(state)=>state.events,
    displayEvents:(state)=>state.eventForDisplay,
    count:(state)=>state.events.length
} //retrieve value/new state from state



const actions = {

    async getEvents({commit}){
        try{
            const response = await axios.get('/events')
            console.log("hello mother fucker")

            commit("setReNew",response.data)
        }catch(err){
            console.log(err)
            commit("setReNew","event loading failed")
        }
    },

    selectEvent({commit}){
       let length = this.$store.getters.allEvents.length
        let array = [];
        for(let i = 0; i < length; i ++){
            array.push(this.$store.getters.allEvents[i])
        }
        commit("setDisplayEvents",array)
    },

    updateCount({commit}){
        //commit(state,&store.getters.count)
    }

} //send mutation change commit to mutation

const mutations = {
    
    setReNew(state,newEvent){
        return state.events = newEvent
    },
    setDisplayEvents(state,selectedEvents){
        return state.eventForDisplay = selectedEvents
    }

}
//change the state

export default {
    state,
    getters,
    actions,
    mutations
};
