<template>
	<v-container fluid>
		<v-col>
			<h1 style="text-align: center;">{{ $t('searchCenter.searchCenter') }}</h1>
		</v-col>
		<v-col>
			<v-card color="amber">
				<v-container>
					<v-col>
						<v-row class="my-2">
							<v-text-field v-model="dSearch" prepend-icon="mdi-magnify" outlined  hide-details="auto" 
							:label="$t('searchCenter.centerName')" class="rounded-text-field custom-width" background-color="white">
						</v-text-field>
					</v-row>
					<v-row>
						<v-select v-model="dCity" :items="dCities" prepend-icon="mdi-city" outlined class="rounded-text-field custom-width" 
							background-color="white" :label="$t('searchCenter.city')" return-object>
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
							:label="$t('searchCenter.sports')" :item-text="fGetSportName" item-value="id">
						</v-select>
						</v-row>
						<v-row justify="center">
							<v-btn color="primary" @click="fSearchCenter">{{$t("btn.search")}}</v-btn>
						</v-row>
					</v-col>
				</v-container>
			</v-card>
		</v-col>
	</v-container>
</template>
<script>
	import GamePlayerCommon from '@/common/GamePlayerCommon'
	import srvCenter from '@/services/srv-center'

	export default {
		extends: GamePlayerCommon,
		data() {
			return {
				dSearch: null,
				dCities: [],
				dCity: null,
				dSports: [],
				dSportsSelected: [],
				items: ['foo', 'bar', 'fizz', 'buzz'],
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
				srvCenter.searchCenters(this.dSearch, this.dCity, this.dSportsSelected).then((res) => {
					console.log(res)
				})
			},
		},
		watch: {
		}
	}
</script>