<template>
<div>
  <v-card flat>
    <v-card-title>Sign In</v-card-title>
  </v-card>

  <v-form class="ml-5">
    <v-text-field label="E-mail" type="email" clearable solo></v-text-field>
    <v-text-field label="Password" type="password" clearable solo></v-text-field>

    <div class="float-right mr-5">
      <v-btn type="button" class="warning mr-5">Reset</v-btn>
      <v-btn type="button" class="primary" >Submit</v-btn>
    </div>


  </v-form>
</div>
</template>

<script>
export default {
name: "Login"
}
</script>

<style scoped>

</style>