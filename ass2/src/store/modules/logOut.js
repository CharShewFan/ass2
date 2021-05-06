//import axios from 'axios'

import axios from "axios";

const state = {
    logOutStatus:false,

}

const getters = {
    isLogOut:(state) => state.logOutStatus,


} //retrieve value from state



const actions = {

    async logOut({commit}){

        await axios.post('/users/logout')
        localStorage.clear()
        console.log("log out now!")

        let Status = false
        commit("setStatus",Status)
    },


} //send mutation change commit to mutation

const mutations = {
    //setStatus: (state, Status) => (state.loginStatus = Status),

    setStatus(state,status){
        return state.logOutStatus = status
    },


}
 //change the state

export default {
    state,
    getters,
    actions,
    mutations
};

