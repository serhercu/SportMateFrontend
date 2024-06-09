<template>
  <v-container fluid mb-10>
		<v-row>
			<v-col>
				<h1 style="text-align: center;">{{ $t('myGames.gamesCalendar') }}</h1>
			</v-col>
		</v-row>
		<v-row class="mb-2">
			<v-divider></v-divider>
		</v-row>
		<v-row>
			<v-col cols="1" class="d-flex align-center justify-center">
				<v-btn icon class="ma-2" @click="$refs.calendar.prev()">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
			</v-col>
			<v-col>
				<v-sheet height="600">
					<v-select v-model="type" :items="dTypes" item-value="type" :label="$t('myGames.calendarMode')" dense rounded hide-details>
						<template v-slot:item="{ item }">
							<span>{{ $t('myGames.' + item.text) }}</span>
						</template>
						<template v-slot:selection="{ item }">
							<span>{{ $t('myGames.' + item.text) }}</span>
						</template>
					</v-select>
					<v-col v-if="$refs.calendar" style="text-align: center;">
						<span class="subtitle-upper">{{ $refs.calendar.title }}</span>
					</v-col>
					<v-calendar ref="calendar" v-model="dCalendarValue" :weekdays="weekday" :type="type" :events="dEvents"
						@click:event="fViewEvent" locale="es-es"></v-calendar>
				</v-sheet>
			</v-col>
			<v-col cols="1" class="d-flex align-center justify-center">
				<v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import srvGame from '@/services/srv-game'

	import Constants from '@/util/constants'	

  export default {
    data () {
      return {
				type: 'month',
				types: ['month', 'week'],
				weekday: [1, 2, 3, 4, 5, 6, 0],
				dCalendarValue: '',
				events: [],
				colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
				names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
				dGames: [],
				dEvents: [],
				dTypes: [
					{
					type: 'month',
					text: 'monthly'
					},
					{
					type: 'week',
					text: 'weekly'
					}
				]
			}
		},
		mounted() {
			this.fGetGames()
		},
    methods: {
			fGetGames() {
				srvGame.getGamesByPlayer(JSON.parse(localStorage.getItem(Constants.PLAYER_INFO)).id).then((response) => {
					this.dGames = response
					this.fBuildEvents(response)
				})
			},
			fBuildEvents(gameEvents) {
				let events = []
				for (const game of gameEvents) {
					events.push(this.fBuildSingleEvent(game))
				}

        this.dEvents = events
			},
			fBuildSingleEvent(gameEvent) {
				return {
					name: this.$t('sport.' + gameEvent.sport.name),
					start: this.fGetDate(gameEvent.date, gameEvent.time),
					end: null,
					color: Constants.sportColors[(gameEvent.sport.name).toLowerCase()],
					timed: true,
					gameId: gameEvent.id
				}
			},
			fGetDate(date, time) {
				let datePart = date.split('T')[0]
				let combinedStr = `${datePart}T${time}.000+00:00`
				return new Date(combinedStr);
			},
			fViewEvent(event) {
				this.$router.push('/game/' + event.event.gameId)
			}
    },
  }
</script>