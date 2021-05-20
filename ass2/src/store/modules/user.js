import axios from "axios";
axios.defaults.headers.common['X-Authorization'] = localStorage.getItem("token");


const state = {
  userName:"",
  userEmail:"" ,
    status:"",
    firstName:"",
    lastName:"",
    imageData:{},
    imageURl:"" // for the image URL send back from server
}



const getters = {
    //isLogIn:(state)=>state.loginStatus,
    isUserName:(state)=>{
        return state.userName
    },

    isEmail:(state)=>{
        return state.userEmail
    },

    isFirstName:(state)=>{
        return state.firstName
    },

    isLastName:(state)=>{
        return state.lastName
    }

}

const actions = {
     getUserInfo({commit},id){
        axios.defaults.headers.common['X-Authorization'] = localStorage.getItem('token')
        axios.get(`http://localhost:4941/api/v1/users/${id}`).then(response=>{
            if(response.status === 200){
                commit("setName",response.data.firstName +" " + response.data.lastName)
                commit("setEmail",response.data.email)
                commit("setCode","success")
            }

            if(response.status === 401){
                commit("setCode","un-authorized")

            }
        }).catch(err=>{console.log(err)})
    },


    async getName({commit},id){
        axios.defaults.headers.common['X-Authorization'] = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:4941/api/v1/users/${id}`)
        if(response.status === 200){
            commit("setFName",response.data.firstName)
            commit("setLName",response.data.lastName)

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
    },
    setFName(state,playLoad){
        return state.firstName = playLoad
    },

    setLName(state,playLoad){
        return state.lastName = playLoad
    }

}


export default {
    state,
    getters,
    actions,
    mutations
};