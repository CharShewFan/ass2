

const state = () => ({
    loginStatus : false,
    userName:"",
    userEmail:"" ,

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
        commit("setName")
        commit("setEmail")
    },

    refreshPage({commit}){
        let Status = true
        commit("setStatus",Status);
    }

}

const mutations = {
    setStatus(state, status) {
        return state.loginStatus = status;
    },

    setName(state){
        return state.userName = "";
    },
    setEmail(state){
        return state.userEmail = "";
    }
}


export default {
    state,
    getters,
    actions,
    mutations
};