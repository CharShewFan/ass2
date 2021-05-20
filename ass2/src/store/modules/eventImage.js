import axios from "axios";
//import store from '../index'

const state = {
    imageList:Array
}

const getters = {
    getImageURl:(state)=>state.imageList
}

const  actions = {

    reqImage({commit}) {
        let tempList = []
            let eventLength = 24
            for (var i = 1; i < eventLength; i++) {
              axios.get(`http://localhost:4941/api/v1/events/${i}/image`, {responseType: 'arraybuffer'}).then(response=>{
                  if (response.status === 200) {
                      const url = window.URL.createObjectURL(new Blob([response.data], {type: ['image/png', 'image/jpg', 'image/gif']}))
                      tempList.push({"id": i, "link": url})
                  }
              }).catch(e=>{
                  tempList.push({"id": i, "link": "require('../assets/userProfileImg.jpeg')"})
                  console.log(e)
              })
            }


        console.log(tempList)

        //    console.log(tempList[0].id)
        //


        // console.log(tempList)
        // console.log([...tempList])
        //console.log(tempList[0].id)



        commit("pushToState", tempList)

    }
}

const mutations = {
    pushToState(state,payload){
        let sorted = [];
        try{

            for(let j = 0; j < 22; j++){
                for(let k = 0; k <22 ; k++){
                    if(payload[k].id === j){
                        sorted.push(payload[k].link)
                        console.log(sorted)
                    }
                }
            }
            console.log("sorted")
            console.log(sorted)
            console.log("sorted")
        }catch (e){
            console.log("heiheihei")
            console.log(sorted)
            console.log(e)
        }
        return state.imageList = sorted
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};

