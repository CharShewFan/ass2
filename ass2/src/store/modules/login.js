import axios from 'axios'

const state = {
    loginStatus : false
}

const getters = {
    isLogIn:(state)=>state.loginStatus,
}

const actions = {
    async logIn({commit},email,password){
        try{
            const response = await axios.post("/users/login",{
                "email":email,
                "password":password
            })

            console.log(response.data)
            if(response.status === 200){
                localStorage.setItem("userId",response.data.id)
                localStorage.setItem("token",response.data.token)
                let Status = true
                commit("setStatus",Status)
            }else{
                let Status = false;
                commit("setStatus",Status);
            }

        }catch (e) {
            console.log(e)
            let Status = false
            commit("setStatus",Status)
        }

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