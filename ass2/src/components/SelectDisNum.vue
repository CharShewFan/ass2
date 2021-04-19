<template>
  <v-container>



  <v-row>
    <v-col sm="12" md="4" lg="2" xl="2">
      <v-select
          item-text="name"
          label="chose display number per page"
          :item-value="value"
          :items = "this.items"
          v-model="this.selected"


      ></v-select>
      {{this.selected}}
    </v-col>
  </v-row>

<!--    <v-col sm="12" md="4" lg="3" xl="3"  v-for="event in totalEvents.slice((parseInt(`${currentPage}`)-1)*`${selected}`, parseInt(`${currentPage}`)*`${selected}`)" :key="event.index" >-->

  </v-container>
</template>

<script>
export default {
name: "SelectDisNum"
}
</script>

<style scoped>

</style>