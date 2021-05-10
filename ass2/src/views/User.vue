<template>
    <div>
     <v-container>
       <UserInfo></UserInfo>
     </v-container>
    </div>
    
  
  
  </template>
  
  <script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue'
  //import NavBar from '@/components/NavBar.vue'
  import UserInfo from '@/components/UserInfo.vue'
  
  export default {
    name: 'User',
    components: {
     // NavBar
     UserInfo
    },
    data:()=>{

    }
  }
  </script>
  