<template>
<v-container>
    <v-card>
<!--        <v-img src=""></v-img> here should display user profile image-->
        <v-card-title>user name here</v-card-title>
        <v-card-subtitle>user email here</v-card-subtitle>

      <v-btn @click="edit()">edit</v-btn>

    </v-card>
</v-container>
</template>


<script>
    export default{
        name:"userInfo",
        data:()=>{

        },
        components:{

        },
        methods:{

        },
      props:{
        userName:String,
        email:String
      }
    }
</script>