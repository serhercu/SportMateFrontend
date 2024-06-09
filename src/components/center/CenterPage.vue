<template>
	<v-container fluid>
		<Carousel :pImages="dCenter.images.banner"></Carousel>
		<v-row justify="center" align="center" class="mt-1">
			<v-col class="text-center" cols="auto">
				<h1>{{ dCenter.name }}</h1>
			</v-col>
			<v-col class="text-center" cols="auto">
				<v-btn v-if="!cIsPlayerFollowing" @click="fFollow" color="primary">{{ $t('btn.follow') }}</v-btn>
				<DialogApp v-else @confirm="fUnfollow" :pTitle="$t('centerPage.unfollowCenter')" :pDescription="$t('dialog.unfollowCenterConfirm')">
					<template v-slot="{ openDialog, closeDialog }">
						<v-btn outlined @click="openDialog" color="green">{{ $t("centerPage.following") }}</v-btn>
					</template>
				</DialogApp>
			</v-col>
		</v-row>
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
		<v-col>
			<v-col style="text-align: center;" class="mb-2">
				<span class="subtitle-upper">{{ $t('centerPage.players') }}</span>
			</v-col>
			<v-row row wrap>
				<v-col v-for="gamePlayer in dCenter.players" cols="3" v-bind:key="dCenter.players.id" ma-2 xs3 sm3 md3 lg3>
					<PlayerCard :pPlayer="gamePlayer"></PlayerCard>
				</v-col>
			</v-row>
		</v-col>
	</v-container>
</template>
<script>
	import srvCenter from '@/services/srv-center'

	import Constants from '@/util/constants'

	import Carousel from '@/components/util/Carousel'
	import SportCard from '@/components/cards/SportCard'
	import PlayerCard from '@/components/cards/PlayerCard'
	import DialogApp from '@/components/util/DialogApp'

	export default {
		components: {
			Carousel,
			SportCard,
			PlayerCard,
			DialogApp
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
			},
			cIsPlayerFollowing() {
				return this.dCenter.players.some(player => player.id === this.dPlayer.id);
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
			},
			fFollow() {
				srvCenter.followCenter(this.dPlayer.id, this.dCenter.id).then((res) => {
					this.dCenter.players = res.players
				})
			},
			fUnfollow() {
				srvCenter.unfollowCenter(this.dPlayer.id, this.dCenter.id).then((res) => {
					this.dCenter.players = res.players
				})
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