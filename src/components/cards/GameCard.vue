<template>
  <v-hover v-slot="{ hover }">
		<v-card @click="pRedirectClick ? $router.push('/game/' + pGame.id) : ''" width="100%" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" 
      class="rounded-card">
			<v-layout>
				<v-flex xs1 sm1 md1 lg1>
					<v-icon size="100">{{ pGame.sport.image }}</v-icon>
				</v-flex>
				<v-flex xs9 sm9 md9 lg9 ml-2>
					<v-card-title>{{$t('sport.' + pGame.sport.name)}}</v-card-title>
					<v-card-subtitle>
						<v-flex>
							<v-icon>mdi-map-marker</v-icon>
							{{ pGame.city.name }}
						</v-flex>
						<v-layout align-start>
							<v-flex>
								<v-icon>mdi-calendar</v-icon>
								{{ cDateGame }}
							</v-flex>
							<v-flex>
								<v-icon>mdi-clock-outline</v-icon>
								{{ cTimeParsed }}
							</v-flex>
						</v-layout>
					</v-card-subtitle>
					
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
import { mxDate } from '@/mixins/mxDate';

export default {
	mixins: [mxDate],
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
		},
		cTimeParsed() {
			return this.mxFormatHour(this.pGame.time)
		}
	}
  
}
</script>
<style scoped>
.rounded-card {
  border-radius: 15px; /* Adjust the value as needed */
  background-color: rgba(212, 213, 216, 0.308); /* Adjust the transparency as needed */
	transition: box-shadow 0.3s ease;
}
</style>