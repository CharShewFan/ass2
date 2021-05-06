//import axios from 'axios'

import axios from "axios";

const state = {
    loginStatus:false,

}

const getters = {
    isLogIn:(state) => state.loginStatus,


} //retrieve value from state



const actions = {

    async logOut({commit}){
        let token = sessionStorage.getItem('token')
        axios.defaults.headers = {"X-Authorization": token}
        await axios.post('/users/logout')
        sessionStorage.clear()
        console.log("log out now!")

        let Status = false
        commit("setStatus",Status)
    },


} //send mutation change commit to mutation

const mutations = {
    //setStatus: (state, Status) => (state.loginStatus = Status),

    setStatus(state,status){
        return state.loginStatus = status
    },


}
 //change the state

export default {
    state,
    getters,
    actions,
    mutations
};

