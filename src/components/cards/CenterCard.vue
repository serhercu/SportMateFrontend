<template>
	<v-hover v-slot="{ hover }">
		<v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" align-center class="rounded-card" max-width="100%">
			<v-img :src="'http://localhost:8082' + pCenter.images.profile"></v-img>
			<v-card-title>{{ pCenter.name }}</v-card-title>
			<v-card-subtitle>{{ pCenter.description }}</v-card-subtitle>
			<v-card-text v-if="pShowDetails">
				<v-row justify="center">
					<v-col v-for="sport in pCenter.sports" :key="sport.id">
						<v-tooltip bottom>
							<template v-slot:activator="{ on, attrs }">
								<v-icon v-bind="attrs" v-on="on">{{ sport.image }}</v-icon>
							</template>
							<span>{{$t('sport.' + sport.name)}}</span>
						</v-tooltip>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions v-if="pShowDetails">
				<v-btn @click="fOpenCenter" color="orange lighten-2" text>{{ $t('btn.moreInfo')}}</v-btn>
			</v-card-actions>
		</v-card>
	</v-hover>
</template>
<script>
	export default {
		data () {
			return {
			}
		},
		props: {
			pCenter: {
				type: Object,
				required: true
			},
			pShowDetails: {
				type: Boolean,
				required: false,
				default: true
			}
		},
		methods: {
			fOpenCenter() {
				this.$router.push('/center/' + this.pCenter.id)
			}
		}
	}
</script>
<style scoped>
	.rounded-card {
		border-radius: 15px;
		background-color: rgba(212, 213, 216, 0.308);
		transition: box-shadow 0.3s ease;
}
</style>