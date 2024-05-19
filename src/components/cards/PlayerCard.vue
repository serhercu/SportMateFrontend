<template>
	<v-hover v-slot="{ hover }">
		<v-container>
			<v-card class="mx-auto rounded-card" :elevation="hover ? 12 : 2"  width="60%" :class="{ 'on-hover': hover }">
				<v-row>
					<v-col class="ml-2" cols="2" >
						<v-icon size="100">mdi-account</v-icon>
					</v-col>
					<v-col>
						<v-card-title>{{ pPlayer.name }}</v-card-title>
						<v-card-subtitle>
							<v-icon>mdi-at</v-icon>
							{{ pPlayer.username }}</v-card-subtitle>
					</v-col>
				</v-row>
			</v-card>
		</v-container>
	</v-hover>
</template>
	
	<script>
	
	export default {
		data () {
			return {
			}
		},
		props: {
			pPlayer: {
				type: Object,
				required: true
			},
			pHover: {
				type: Object,
				required: false
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