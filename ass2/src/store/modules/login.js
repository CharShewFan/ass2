

const state = () => ({
    loginStatus : false
})

const getters = {
    //isLogIn:(state)=>state.loginStatus,
    isLogIn:(state)=>{
        return state.loginStatus
    }
}

const actions = {
     logIn({commit}){
         let Status = true
         commit("setStatus",Status);
     },

    logOut({commit}){
         let Status = false
        commit("setStatus",Status)
    },

    refreshPage({commit}){
        let Status = true
        commit("setStatus",Status);
    }

}

const mutations = {
    setStatus(state, status) {
        return state.loginStatus = status;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
};