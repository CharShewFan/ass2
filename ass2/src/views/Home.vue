<template>
  <div class="root">
  <div  class="grey lighten-4 text-center banner-1 img1"   >
    <v-chip class="error mx-auto " to="/event">Find Events</v-chip>
  </div>
    <v-divider></v-divider>
    <div  class="grey lighten-3 text-center banner-1 img2" >
      <v-chip class="primary mx-auto " to="/registration" >Join Now</v-chip>
    </div>



  </div>
  


</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
//import NavBar from '@/components/NavBar.vue'

export default {
  name: 'Home',
  components: {
   // NavBar
  }
}
</script>

<style>
.root{

}

.banner-1{
  height: 500px;
  line-height: 500px;
}

.img1{
  background-image: url("../assets/joinUs.jpg");
  background-size:     cover;                      /* <------ */
  background-repeat:   no-repeat;
  background-position: center center;
}

.img2{

  background-image: url("../assets/event.jpg");
  background-size:     cover;                      /* <------ */
  background-repeat:   no-repeat;
  background-position: center center;

}
</style>