<template>
  <v-hover v-slot="{ hover }">
      <v-card width="100%" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
				<v-layout>
					<v-flex xs1 sm1 md1 lg1>
						<v-icon size="100">{{ pGame.sport.image }}</v-icon>
					</v-flex>
          <!-- class="justify-center" -->
					<v-flex xs9 sm9 md9 lg9 ml-2>
						<v-card-title>{{$t('sport.' + pGame.sport.name)}}</v-card-title>
						<v-card-subtitle>
							<v-icon>mdi-map-marker</v-icon>
							{{$t('sport.' + pGame.sport.name)}}
						</v-card-subtitle>
						<v-card-text>
							<v-icon>mdi-calendar</v-icon>
							{{ cDateGame }}
						</v-card-text>
					</v-flex>
				</v-layout>
      </v-card>
  </v-hover>
</template>

<script>

import { format } from 'date-fns'
export default {
  data () {
    return {
    }
  },
  props: {
    pGame: {
      type: Object,
      required: true
    },
    pHover: {
      type: Object,
      required: false
    }
  },
	computed: {
		cDateGame() {
			return format(new Date(this.pGame.date), 'dd/MM/yyyy')
		}
	}
  
}
</script>