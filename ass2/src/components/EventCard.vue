<template>
<div>
<v-container class="my-5">
  <v-row>
    <v-col sm="12" md="4" lg="4" xl="4"  v-for="event in events" :key="event.title">
      <v-card>
        <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>{{event.title}}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-4">{{event.category}}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{event.date}}</div>
          <div>{{event.location}}</div>
          <div>{{event.organizer}}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="error" text >Join Now</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{show ? 'mdi-chevron-up':'mdi-chevron-down'}}</v-icon>
          </v-btn>

        </v-card-actions>




        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>
              {{event.description}}
            </v-card-text>
          </div>
        </v-expand-transition>


      </v-card>
    </v-col>
  </v-row>

  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
                v-model="page"
                class="my-4"
                :length="15"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>

</v-container>




</div>
</template>


<script>
export default {
  name: "EventCard",
  data(){
    return{
      events:[
          {
            "title":"mock1",
            "category":"mock category",
            "date":"2021-04-09",
            "description":"  Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
                "Alias, amet asperiores beatae blanditiis, culpa dolores eos, itaque laudantium minima nam nihil nostrum " +
                "odio officia praesentium quam quibusdam reiciendis repellendus sunt. \n",
            "organizer":"mock user1",
            "location":"9 mock location rd holiday park"
          },
        {
          "title":"mock2",
          "category":"mock category",
          "date":"2021-05-09",
          "description":"  Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
              "Alias, amet asperiores beatae blanditiis, culpa dolores eos, itaque laudantium minima nam nihil nostrum " +
              "odio officia praesentium quam quibusdam reiciendis repellendus sunt. \n",
          "organizer":"mock user2",
          "location":"9 mock location rd holiday park"
        },
        {
          "title":"mock3",
          "category":"mock category",
          "date":"2021-05-09",
          "description":"  Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
              "Alias, amet asperiores beatae blanditiis, culpa dolores eos, itaque laudantium minima nam nihil nostrum " +
              "odio officia praesentium quam quibusdam reiciendis repellendus sunt. \n",
          "organizer":"mock user1",
          "location":"9 mock location rd holiday park"
        },
        {
          "title":"mock5",
          "date":"2021-05-09",
          "description":"  Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
              "Alias, amet asperiores beatae blanditiis, culpa dolores eos, itaque laudantium minima nam nihil nostrum " +
              "odio officia praesentium quam quibusdam reiciendis repellendus sunt. \n",
          "organizer":"mock user1",
          "location":"9 mock location rd holiday park"
        }

      ],
      show: false,
      page:"",
      totalPage:[],
      pageSize:5,
      pageNumber:1,
      dataShow:"",
      currentPage:0

    }
  },
  //computed:{
   // getPageNum(){
   //    this.pageNumber = Math.ceil(this.events.length / this.pageSize)
  //  }
 // }
}
</script>

<style scoped>

</style>