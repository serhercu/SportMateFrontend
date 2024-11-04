<template>
	<v-container fluid>
		<v-col>
			<h1 style="text-align: center;">{{ $t('searchCenter.searchCenter') }}</h1>
		</v-col>
		<v-col>
			<v-card color="blue-grey lighten-4">
				<v-container>
					<v-col>
						<v-row class="my-2">
							<v-text-field v-model="dSearch" prepend-icon="mdi-magnify" outlined  hide-details="auto" 
							:label="$t('searchCenter.centerName')" class="rounded-text-field custom-width" background-color="white" clearable>
							</v-text-field>
						</v-row>
						<v-row>
							<v-select v-model="dCity" :items="dCities" prepend-icon="mdi-city" outlined class="rounded-text-field custom-width" 
								background-color="white" :label="$t('searchCenter.city')" item-value="id" clearable>
								<template v-slot:item="{ item }">
									<span>{{ item.name }}</span>
								</template>
								<template v-slot:selection="{ item }">
									<span>{{ item.name }}</span>
								</template>
							</v-select>
						</v-row>
						<v-row>
							<v-select v-model="dSportsSelected" :items="dSports" attach chips label="cambiar" multiple
								outlined class="rounded-text-field custom-width" background-color="white" prepend-icon="mdi-basketball"
								:label="$t('searchCenter.sports')" :item-text="fGetSportName" item-value="id" clearable>
							</v-select>
						</v-row>
						<v-row justify="center">
							<v-btn color="amber" class="white--text" @click="fSearchCenter">{{$t("btn.search")}}</v-btn>
						</v-row>
					</v-col>
				</v-container>
			</v-card>
		</v-col>
		<v-col>
			<v-container fluid>
				<v-row justify="center">
					<v-col cols="4" v-for="center in dCenters" :key="center.id" class="d-flex justify-center align-center">
						<CenterCard :pCenter="center"></CenterCard>
					</v-col>
				</v-row>
			</v-container>
		</v-col>
	</v-container>
</template>

<script>
	import GamePlayerCommon from '@/common/GamePlayerCommon'
	import CenterCard from '@/components/cards/CenterCard'

	import srvCenter from '@/services/srv-center'

	export default {
		extends: GamePlayerCommon,
		components: {
			CenterCard
		},
		data() {
			return {
				dSearch: null,
				dCities: [],
				dCity: null,
				dSports: [],
				dSportsSelected: [],
				dCenters: []
			}
		},
		mounted() {
			this.fGetCities()
			this.fGetSports()
		},
		methods: {
			async fGetCities() {
				this.dCities = await this.fGetAllCities()
			},
			async fGetSports() {
				this.dSports = await this.fGetAllSports()
			},
			fSearchCenter() {
				const sports = this.dSportsSelected.length > 0 && this.dSportsSelected !== null ? this.dSportsSelected : null
				srvCenter.searchCenters(this.dSearch, this.dCity, sports).then((res) => {
					this.dCenters = res
				})
			},
		},
		watch: {
		}
	}
</script>