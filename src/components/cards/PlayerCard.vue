<template>
	<v-hover v-slot="{ hover }">
			<v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
				<v-layout>
					<v-flex>
						<v-icon size="100">mdi-account</v-icon>
					</v-flex>
					<v-flex>
						<v-card-title>{{ pPlayer.name }}</v-card-title>
						<v-card-subtitle>{{ pPlayer.username }}</v-card-subtitle>
					</v-flex>
				</v-layout>

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