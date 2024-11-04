<template>
  <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="(item, i) in pImages" :key="i" :src="'http://localhost:8082' + item">
    </v-carousel-item>
  </v-carousel>
</template>
<script>
  export default {
		props: {
			pImages: {
				type: Array,
				required: true,
				default: []
			}
		},
    data () {
      return {
      }
    },
  }
</script>