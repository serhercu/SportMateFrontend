<template>
		<v-card class="pa-4" color="amber" >
			<v-card-title>
				{{ $t('searchGame.searchQuestionFilters') }}
			</v-card-title>
			<!-- Sport -->
			<v-select v-model="dSportFilter" :items="dSports" :label="$t('createGame.selectSport')" clearable return-object
				rounded background-color="white" prepend-icon="mdi-tennis-ball-outline">
				<template v-slot:item="{ item }">
					<span>{{ $t('sport.' + item.name) }}</span>
				</template>
				<template v-slot:selection="{ item }">
					<span>{{ $t('sport.' + item.name) }}</span>
				</template>
			</v-select>
			
			<!-- Level -->
			<v-select v-model="dLevelFilter" :items="dLevels" :label="$t('createGame.selectLevel')" clearable return-object
				rounded background-color="white" prepend-icon="mdi-account-star-outline">
				<template v-slot:item="{ item }">
					<span>{{ $t('level.' + item.description) }}</span>
				</template>
				<template v-slot:selection="{ item }">
					<span>{{ $t('level.' + item.description) }}</span>
				</template>
			</v-select>

			<!-- Location -->
			<v-select v-model="dLocationFilter" :items="dLocations" :label="$t('createGame.selectLocation')" clearable return-object
			 	rounded background-color="white" prepend-icon="mdi-map-marker">
				 <template v-slot:item="{ item }">
					<span>{{ item.name }}</span>
				</template>
				<template v-slot:selection="{ item }">
					<span>{{ item.name }}</span>
				</template>
			</v-select>
			
			<!-- Datepicker -->
			<v-layout>
				<v-flex :cols="3">
					<v-menu ref="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
						<template v-slot:activator="{ on, attrs }">
							<v-text-field :label="$t('createGame.selectDateRange')" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
							rounded background-color="white"></v-text-field>
						</template>
						<v-date-picker v-model="dDateRange" clearable range></v-date-picker>
					</v-menu>
				</v-flex>
				<v-flex :cols="9">
					<v-layout>
						<v-flex v-for="(date, i) in dDateRange">
							<v-chip class="ma-2" color="primary" variant="outlined">{{ fCastDate(date) }}</v-chip>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
			
			<v-btn @click="fApplyFilters">{{ $t("searchGame.search") }}</v-btn>
		</v-card>
</template>

<script>
import srvSport from '@/services/srv-sport'
import srvLevel from '@/services/srv-level'
import srvCity from '@/services/srv-city'

export default {
  data() {
    return {
      dSportFilter: null,
			dLevelFilter: null,
			dLocationFilter: null,
      dDateRange: null,
      dSports: [],
			dLevels: [],
			dLocations: []
    }
  },
	mounted() {
		this.fGetAllSports()
		this.fGetAllLevels()
		this.fGetAllCities()
	},
  methods: {
    fApplyFilters() {
			let sportId = this.dSportFilter !== null && this.dSportFilter.id !== null ? this.dSportFilter.id : null
			let levelValue = this.dLevelFilter !== null && this.dLevelFilter.id !== null ? this.dLevelFilter.id : null
			let locationId = this.dLocationFilter !== null && this.dLocationFilter.id !== null ? this.dLocationFilter.id : null
			
			let dateStart = this.dDateRange !== null && this.dDateRange[0] !== undefined && this.dDateRange[0] !== null ? new Date(this.dDateRange[0]).getTime() : null
			let dateEnd
			if (dateStart === null) {
				dateEnd = null
			} else {
				let varDateStart = new Date(this.dDateRange[0])
				let varDateEnd = new Date(this.dDateRange[0])
				if (this.dDateRange[1] === undefined || this.dDateRange[1] === null) {
					varDateEnd.setDate(varDateStart.getDate() + 1)
					dateEnd = varDateEnd.getTime()
				} else {
					dateEnd = new Date(this.dDateRange[1]).getTime()
				}
			}
			this.$emit("applyFilters", {
			  sport: sportId,
			  level: levelValue,
				dateStart: dateStart,
				dateEnd: dateEnd,
				location: locationId
			})
    },
		fGetAllSports () {
        srvSport.getAllSports().then((result) => {
          this.dSports = result.sort((a, b) => a.name.localeCompare(b.name))
        })
    },
		fGetAllLevels () {
			srvLevel.getAllLevels().then((result) => {
				this.dLevels = result
			})
		},
		fGetAllCities() {
			srvCity.getAllCities().then((result) => {
				this.dLocations = result
			})
		},
		fCastDate(inputDate) {
			var date = new Date(inputDate)
			var day = date.getDate()
			var month = date.getMonth() + 1
			var year = date.getFullYear()
			return day + '-' + month + '-' + year
		}
  }
};
</script>
