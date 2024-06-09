<template>
	<v-container fluid>
		<Carousel :pImages="dCenter.images.banner"></Carousel>
		<v-col>
			<h1 style="text-align: center;">{{ dCenter.name }}</h1>
		</v-col>
		<v-row justify="center">
			<span style="display: block; width: 50%; margin: 0 auto; text-align: center;">{{ dCenter.description }}</span>
		</v-row>
		<v-row class="mt-8" justify="center">
			<v-icon>mdi-map-marker</v-icon>
			<span>{{ dCenter.location }}</span>
		</v-row>
		<v-row>
			<v-col class="mt-4" style="text-align: center;">
				<span class="subtitle-upper">{{ $t('centerPage.sports') }}</span>
			</v-col>
			<v-carousel height="400" hide-delimiter-background show-arrows-on-hover>
				<v-carousel-item v-for="(sportSet, index) in cGroupedSports" :key="index">
					<v-container fluid class="horizontal-container align-center justify-center">
						<v-col v-for="sport in sportSet" :key="sport.id" class="sport-card" cols="4">
							<SportCard :pSport="sport" :pHover="hover"></SportCard>
						</v-col>
					</v-container>
				</v-carousel-item>
			</v-carousel>
		</v-row>
	</v-container>
</template>
<script>
	import srvCenter from '@/services/srv-center'

	import Constants from '@/util/constants'

	import Carousel from '@/components/util/Carousel'
	import SportCard from '@/components/cards/SportCard'

	export default {
		components: {
			Carousel,
			SportCard
		},
		props: {
			pCenter: {
				type: Object,
				required: false,
				default: null
			}
		},
		data() {
			return {
				dCenter: null,
				dPlayer: JSON.parse(localStorage.getItem(Constants.PLAYER_INFO))
			}
		},
		mounted() {
			this.fLoadCenter()
		},
		computed: {
			cGroupedSports() {
				const groupSize = 3;
				const groups = [];
				for (let i = 0; i < this.dCenter.sports.length; i += groupSize) {
					groups.push(this.dCenter.sports.slice(i, i + groupSize));
				}
				return groups;
			}
		},
		methods: {
			fLoadCenter() {
				this.dCenter = this.pCenter
				if (this.pCenter === null) {
					const centerId = this.$route.params.idCenter
					srvCenter.getCenter(centerId).then((response) => {
						this.dCenter = response
					})
				}
			}
		}
	}
</script>
<style>
  .horizontal-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .sport-card {
    flex: 1;
    margin-right: 10px;
  }
</style>