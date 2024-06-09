<template>
  <v-container fluid>
    <v-hover v-slot="{ hover }">
      <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" align-center class="rounded-card">
        <v-icon class="align-center" size="100">{{pSport.image}}</v-icon>
        <v-card-title class="justify-center">{{$t('sport.' + pSport.name)}}</v-card-title>
      </v-card>
    </v-hover>
  </v-container>
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
<style scoped>
	.rounded-card {
		border-radius: 15px;
		background-color: rgba(212, 213, 216, 0.308);
		transition: box-shadow 0.3s ease;
}
</style>