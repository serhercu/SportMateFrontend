<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <v-card-title class="headline">{{ $t('register.loginStart') }}</v-card-title>
          <v-card-text>
						<v-text-field v-model="dUsername" :label="$t('label.username')" name="username" required hide-details
							v-validate="'required'" :data-vv-as="$t('label.username')" data-vv-validate-on='blur|change|input'
							:color="errors.has('username') ? 'datValidationErrorLabel':'datSecondary'" 
							:class="errors.has('username') ? 'datValidationErrorLabel':''">
						</v-text-field>
						<ValidationSpan fieldName="username"></ValidationSpan>
						<v-text-field v-model="dPassword" :label="$t('label.password')" type="password" name="password" required
							v-validate="'required'" :data-vv-as="$t('label.password')" data-vv-validate-on='blur|change|input'
							:color="errors.has('password') ? 'datValidationErrorLabel':'datSecondary'" 
							:class="errors.has('password') ? 'datValidationErrorLabel':''" hide-details>
						</v-text-field>
						<ValidationSpan fieldName="password"></ValidationSpan>
            <v-flex v-if="dAuthErrorMsg" mt-2 class="red-box">
              <span>{{dAuthErrorMsg}}</span>
            </v-flex>
						<v-flex mt-2>
							<v-btn color="primary" @click="fLogin">{{ $t('register.login') }}</v-btn>
						</v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import ValidationSpan from '@/components/util/ValidationSpan'

import srvAuth from '@/services/srv-auth'

import Constants from '@/util/constants'

export default {
	inject: ['$validator'],
	components: {
		ValidationSpan
	},
  data() {
    return {
      dUsername: null,
      dPassword: null,
      dAuthErrorMsg: null
    }
  },
  methods: {
    fLogin() {
      srvAuth.login(this.dUsername, this.dPassword).then((response) => {
        localStorage.setItem(Constants.PLAYER_INFO, JSON.stringify(response))
        localStorage.setItem(Constants.IS_LOGGED, true)
				this.$router.push('/home')
        location.reload()
      }).catch((er) => {
        this.dAuthErrorMsg = this.$t('errors.userPasswordError')
			})
    }
  }
};
</script>
