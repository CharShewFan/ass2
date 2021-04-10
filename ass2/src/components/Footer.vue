<template>
  <v-footer
      dark
      padless

      max-height="50px"
      class="blue lighten-1 "
  >
    <v-card
        flat
        tile
        class="blue lighten-1 white--text text-center mx-auto px-0 py-0"
        max-height="50px"

    >
      <v-card-text class="my-0 py-0 px-0">
        <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text my-0"
            icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

<!--      <v-card-text class="white&#45;&#45;text pt-0">-->
<!--        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.-->
<!--      </v-card-text>-->

<!--      <v-divider></v-divider>-->

<!--      <v-card-text class="white&#45;&#45;text">-->
<!--        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>-->
<!--      </v-card-text>-->
    </v-card>
  </v-footer>
</template>

<script>


export default {
  name:"Footer",
  data: () => ({
      icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
      ],
}),
}
</script>

<style>
.card{
  display: block;
  line-height: 50px;
}
</style>