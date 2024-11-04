<template>
	<v-container>
		<v-flex mb-5 class="centered-flex">
			<v-text-field v-model="dSearch" prepend-icon="mdi-magnify" outlined  hide-details="auto" :label="$t('searchPlayer.searchPlayer') " class="rounded-text-field custom-width"></v-text-field>
		</v-flex>
		<ListVertical :pType="'P'" :pItems="dSearchList" :pNotFoundMsg="$t('searchPlayer.playerNotFound')"/>	
	</v-container>
</template>

<script>

import ListVertical from '@/components/util/ListVertical'

import srvPlayer from '@/services/srv-player'

import Constants from '@/util/constants'

export default {
	components: {
    ListVertical
  },
  data() {
    return {
      dGames: [],
			dSearch: '',
			dSearchList: [],
			dSearchTimer: null,
    }
  },
  methods: {
		fSearchUser(search) {
			srvPlayer.searchPlayer(search, JSON.parse(localStorage.getItem(Constants.PLAYER_INFO)).id).then((response) => {
				this.dSearchList = response
			})
		}
  },
	watch: {
		dSearch() {
			if (this.dSearch === '') {
				this.dSearchList = null
				return
			}
			clearTimeout(this.dSearchTimer)
      this.dSearchTimer = setTimeout(() => {
        this.fSearchUser(this.dSearch)
      }, 1000)
		}
	}
}
</script>

<style>

.rounded-text-field .v-input__control .v-input__slot,
.rounded-text-field .v-input__control .v-field__outline,
.rounded-text-field .v-input__control .v-input__prepend-inner,
.rounded-text-field .v-input__control .v-input__append-inner {
  border-radius: 16px; /* Adjust the value to get the desired roundness */
}

.centered-flex {
  display: flex;
  justify-content: center;
}
</style>
