<template>
<v-hover v-slot="{ hover }">
    <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" align-center>
      <v-icon class="align-center" size="100">{{pSport.image}}</v-icon>
      <v-card-title class="justify-center">{{$t('sport.' + pSport.name)}}</v-card-title>
    </v-card>
</v-hover>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  props: {
    pSport: {
      type: Object,
      required: true
    },
    pHover: {
      type: Object,
      required: false
    }
  }
  
}
</script>