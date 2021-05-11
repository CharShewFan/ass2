import axios from "axios";
axios.defaults.headers.common['X-Authorization'] = localStorage.getItem("token");


const state = {
  userName:"",
  userEmail:"" ,
    status:""
}



const getters = {
    //isLogIn:(state)=>state.loginStatus,
    isUserName:(state)=>{
        return state.userName
    },

    isEmail:(state)=>{
        return state.userEmail
    }
}

const actions = {
    async getUserInfo({commit},id){
        axios.defaults.headers.common['X-Authorization'] = localStorage.getItem('token')
        const response = await axios.get(`/users/${id}`)
        if(response.status === 200){
            commit("setName",response.data.firstName +" " + response.data.lastName)
            commit("setEmail",response.data.email)
            commit("setCode","success")
        }

        if(response.status === 401){
            commit("setCode","un-authorized")

        }
    },
}

const mutations = {
    setName(state, playLoad) {
        return state.userName = playLoad;
    },
    setEmail(state,playLoad){
        return state.userEmail = playLoad;
    },
    setCode(state,message){
        return state.status = message
    }
}


export default {
    state,
    getters,
    actions,
    mutations
};