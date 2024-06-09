<template>
	<v-container ma-2>
		<v-row class="mb-1">
			<v-tooltip top>
				<template v-slot:activator="{ on, attrs }">
					<v-btn @click="fAcceptFriendRequest" color="green" outlined v-bind="attrs" v-on="on">
						<v-icon>mdi-account-check-outline</v-icon>
					</v-btn>
				</template>
				<span>{{$t('friends.acceptFriendRequest')}}</span>
			</v-tooltip>
		</v-row>
		<v-row>
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn @click="fDeclineFriendRequest" color="red" outlined v-bind="attrs" v-on="on">
						<v-icon>mdi-account-remove-outline</v-icon>
					</v-btn>
				</template>
				<span>{{$t('friends.declineFriendRequest')}}</span>
			</v-tooltip>
		</v-row>
	</v-container>
</template>

<script>
export default {
	methods: {
		fAcceptFriendRequest() {
			this.$emit('replyFriendRequest', 'A')
		},
		fDeclineFriendRequest() {
			this.$emit('replyFriendRequest', 'B')
		}
	}
}
</script>