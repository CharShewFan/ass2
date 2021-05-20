
import axios from "axios";

const state = {
    events:[],
    eventForDisplay:[],
    count:0,
    pageLength:0


}
const getters = {
    allEvents:function (state){
        return ()=>{
            return state.events
        }
    },
   // allEvents:(state)=>state.events,
    displayEvents:(state)=>state.eventForDisplay,
    count:(state)=>state.events.length,

    calPageLen:function (state){
        let pageSize = 10
        return state.pageLength = Math.ceil(this.state.events.length / pageSize);
    }
} //retrieve value/new state from state



const actions = {

    getEvents({commit}){
        axios.get("http://localhost:4941/api/v1/events").then(response=>{
            commit("setReNew",response.data)

        }).catch(err=>{
            console.log(err)
        })
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
        commit(state)
    },
    //e is event parameter

    searchFeedBack({commit},playLoad){
        commit("setReNew",playLoad)
    }

} //send mutation change commit to mutation

const mutations = {
    
    setReNew(state,newEvent){
        state.events = null;
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

