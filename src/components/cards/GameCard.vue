<template>
  <v-hover v-slot="{ hover }">
      <v-card @click="pRedirectClick ? $router.push('/game/' + pGame.id) : ''" width="100%" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
				<v-layout>
					<v-flex xs1 sm1 md1 lg1>
						<v-icon size="100">{{ pGame.sport.image }}</v-icon>
					</v-flex>
					<v-flex xs9 sm9 md9 lg9 ml-2>
						<v-card-title>{{$t('sport.' + pGame.sport.name)}}</v-card-title>
						<v-card-subtitle>
							<v-icon>mdi-map-marker</v-icon>
							{{ pGame.city.name }}
						</v-card-subtitle>
						<v-card-text>
							<v-col>
								<v-icon>mdi-calendar</v-icon>
								{{ cDateGame }}
								<v-icon>mdi-time-outline</v-icon>
								{{ pGame.time }}
							</v-col>
							</v-card-text>
					</v-flex>
					<v-flex mt-2>
						<v-layout>
							<v-icon>mdi-account</v-icon>
							<span>{{ pGame.players.length + ' / ' + (pGame.playersRequired + 1)}}</span>
						</v-layout>
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
    },
		pRedirectClick: {
			type: Boolean,
			required: false,
			default: true
		}
  },
	computed: {
		cDateGame() {
			return format(new Date(this.pGame.date), 'dd/MM/yyyy')
		}
	}
  
}
</script>