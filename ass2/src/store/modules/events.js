
import axios from "axios";

const state = {
    events:[],
    eventForDisplay:[],
    count:0,
    pageLength:0,
    hosted:[]


}


const getters = {
    allEvents:function (state){
        return ()=>{
            return state.events
        }
    },

    displayEvents:(state)=>state.eventForDisplay,
    count:(state)=>state.events.length,

    getHosted:function(state){
        return()=>{
            return state.hosted
        }
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
    },

    hostedEvent({commit}){
        let userID = localStorage.getItem("userId")
        axios.get(`http://localhost:4941/api/v1/events?organizerId=${userID}`).then(response=>{
            commit("setHosted",response.data)
        })


    }

}

//send mutation change commit to mutation

const mutations = {
    
    setReNew(state,newEvent){
        state.events = null;
        return state.events = newEvent
    },
    setDisplayEvents(state,selectedEvents){
        return state.eventForDisplay = selectedEvents
    },

    setHosted(state,hostedEvent){
        return state.hosted = hostedEvent
    }

}
//change the state

export default {
    state,
    getters,
    actions,
    mutations
};

