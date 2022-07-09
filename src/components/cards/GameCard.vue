<template>
  <v-card width="700px" shaped class="transparent">
    <v-container pa-8>
      <v-layout mr-8>
      <v-row>
          <v-col :cols="2" class="mr-4">
              <v-icon size="100">{{pGame.sport.image}}</v-icon>
          </v-col>
        <v-col align-left :cols="5" class="mt-2">
          <v-row align>
            <v-icon>mdi-calendar</v-icon>
            <p>{{$moment(pGame.date).format('DD/MM')}} {{pGame.time.slice(0, -3)}}</p>
          </v-row>
          <v-row>
            <v-icon>mdi-map-marker</v-icon>
            <!-- <p>{{pGame.location}}</p> -->
            <p>TODO Lugar</p>
          </v-row>
        </v-col>
        <v-col>
          <p>{{$moment(pGame.date).format('DD MMMM')}}</p>
        </v-col>
      </v-row>
            </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    pGame: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  }
}
</script>