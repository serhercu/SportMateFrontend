<template>
	<v-container fluid>
		<v-col  class="text-center">
			<h1>{{ $t('friends.friends') }}</h1>
		</v-col>
		<v-col>
			<v-icon>mdi-account-question-outline</v-icon>
			<span>{{ $t('friends.pendingRequests') }}</span>
		</v-col>
		<ListHorizontal :pItems="dFriendRequests" :pType="'P'" :pPlayerFriendRequest="true" @friendRequestReplied="fUpdateFriends"></ListHorizontal>
		<v-col>
			<v-icon>mdi-account-check-outline</v-icon>
			<span>{{ $t('friends.myFriends') }}</span>
		</v-col>
		<ListHorizontal :pItems="dFriends" :pType="'P'"></ListHorizontal>
	</v-container>
</template>

<script>

import ListHorizontal from '@/components/util/ListHorizontal'

import Constants from '@/util/constants'

import srvFriend from '@/services/srv-friend'

export default {
	components: {
    ListHorizontal
  },
  data() {
    return {
      dFriendRequests: [],
			dFriends: []
    }
  },
	mounted() {
		this.fUpdateFriends()
	},
  methods: {
		fUpdateFriends() {
			console.log('aqui 3')

			this.fGetFriendRequests()
			this.fGetFriends()
		},
		fGetFriendRequests() {
			srvFriend.getFriendRequestByPlayer(JSON.parse(localStorage.getItem(Constants.PLAYER_INFO)).id).then((response) => {
				this.dFriendRequests = response
			})
		},
		fGetFriends() {
			srvFriend.getFriendsByPlayer(JSON.parse(localStorage.getItem(Constants.PLAYER_INFO)).id).then((response) => {
				this.dFriends = response
			})
		}
  }
}
</script>
