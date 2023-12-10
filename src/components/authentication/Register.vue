<template>
  <v-app>
    <v-main>
      <v-container class="form-container">
        <v-stepper v-model="dStep">
          <Stepper :pStep="dStep" :pTotalSteps="3"></Stepper>
          
          <v-stepper-items>
            <v-flex ma-4>
              <span class="titleStepperContent">{{$t('register.step') + ' ' + dStep + ': ' + dListTitles[dStep - 1] }}</span>
            </v-flex>
            <v-stepper-content step="1">
                <p v-if="dAuthErrorMsg" class="red-box"/>{{dAuthErrorMsg}}
                <v-text-field v-model="dEmail" :label="$t('label.email')" :data-vv-as="$t('label.email')" data-vv-validate-on='blur|change|input'
                    v-validate="'max:50|required|email'" name="email" :color="errors.has('email') || dIsEmailTaken ? 'datValidationErrorLabel':'datSecondary'" :class="errors.has('email') || dIsEmailTaken ? 'datValidationErrorLabel':''"
                    required prepend-icon="mdi-email" hide-details></v-text-field>
                <ValidationSpan fieldName="email"></ValidationSpan>
                <v-text-field v-model="dUsername" :label="$t('label.username')" :data-vv-as="$t('label.username')" data-vv-validate-on='blur|change|input'
                    v-validate="'max:25|required'" name="username" :color="errors.has('username') || dIsUserTaken ? 'datValidationErrorLabel':'datSecondary'" :class="errors.has('username') || dIsUserTaken ? 'datValidationErrorLabel':''"
                    required prepend-icon="mdi-account" hide-details></v-text-field>
                <ValidationSpan fieldName="username"></ValidationSpan>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-container v-if="dStep >= 2" class="form-container" fluid>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="dName" :label="$t('label.name')" :data-vv-as="$t('label.name')" data-vv-validate-on='blur|change|input'
                        v-validate="'max:25|required'" name="name" :color="errors.has('name') ? 'datValidationErrorLabel':'datSecondary'" :class="errors.has('name') ? 'datValidationErrorLabel':''"
                        hide-details required ></v-text-field>
                    <ValidationSpan fieldName="name"></ValidationSpan>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="dSurname" :label="$t('label.surname')" :data-vv-as="$t('label.surname')" data-vv-validate-on='blur|change|input'
                        v-validate="'max:50|required'" name="surname" :color="errors.has('surname') ? 'datValidationErrorLabel':'datSecondary'" :class="errors.has('surname') ? 'datValidationErrorLabel':''"
                        hide-details required ></v-text-field>
                    <ValidationSpan fieldName="surname"></ValidationSpan>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="dPassword" :label="$t('label.password')" :type="dShowPassword ? 'text' : 'password'" 
                        @click:append="dShowPassword = !dShowPassword" 
                        :data-vv-as="$t('label.password')" data-vv-validate-on='blur|change|input'
                        v-validate="'max:50|required'" ref="password" name="password" :color="errors.has('password') ? 'datValidationErrorLabel':'datSecondary'" 
                        :class="errors.has('password') ? 'datValidationErrorLabel':''"
                        required :append-icon="dShowPassword ? 'mdi-eye' : 'mdi-eye-off'">
                    </v-text-field>
                    <ValidationSpan fieldName="password"></ValidationSpan>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="dPasswordConfirm" :label="$t('label.confirmPassword')" :type="dShowPassword ? 'text' : 'password'" 
                        :append-icon="dShowPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="dShowPassword = !dShowPassword"
                        :data-vv-as="$t('password')" data-vv-validate-on='blur|change|input'
                        v-validate="'confirmed:password|required'" name="confirmPassword" :color="errors.has('confirmPassword') ? 'datValidationErrorLabel':'datSecondary'" 
                        :class="errors.has('confirmPassword') ? 'datValidationErrorLabel':''"
                        required>
                    </v-text-field>
                    <ValidationSpan fieldName="confirmPassword"></ValidationSpan>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-menu ref="menu" v-model="dMenuDate" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dBirthday" :label="$t('register.birthday')" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="dBirthday" :active-picker.sync="dActivePicker" min="1940-01-01" @change="fSaveDatepickerMenu"
                        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)">
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </v-stepper-content>
            
            <v-stepper-content step="3">
              <v-form v-if="dStep >= 3" >
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                        v-model="dSelectedSport" :items="dSports" :label="$t('createGame.selectSport')"
                        item-text="name" item-value="id" required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="dSelectedSkillLevel" :items="dLevels" :label="$t('label.selectLevel')"
                      item-text="description" required
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn @click="addSelectedSport" >
                      {{$t('register.addSport')}}
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col v-for="(sport, index) in dSelectedSportList" :key="index" cols="12" sm="6" md="4">
                    <v-card>
                      <v-card-title>{{ sport.name }}</v-card-title>
                      <v-card-subtitle>{{ sport.skillLevel }}</v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
              </v-form>

            </v-stepper-content>
            
            <v-stepper-content step="4">
              <p v-if="dStep >= 4" >{{$t('register.thanks')}}</p>
            </v-stepper-content>

            <v-layout>
              <v-flex v-if="dStep <= 3 && dStep > 1" class="button-wrapper-left">
                <v-btn @click="fNextStep(false)">{{$t('btn.back')}}</v-btn>
              </v-flex>
              <v-flex v-if="dStep < 4" class="button-wrapper">
                <v-btn :disabled="cFieldsValid" @click="fNextStep(true)">{{$t('btn.next')}}</v-btn>
              </v-flex>
            </v-layout>

          </v-stepper-items>
        </v-stepper>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>

import Stepper  from '@/components/util/Stepper'
import ValidationSpan from '@/components/util/ValidationSpan'

import srvSport from '@/services/srv-sport'
import srvLevel from '@/services/srv-level'
import srvAuth from '@/services/srv-auth'

import backendErrors from '@/util/backendErrorCodes'

export default {
  inject: ['$validator'],
  components: {
    Stepper,
    ValidationSpan
  },
  data() {
    return {
      dStep: 1,
      dEmail: null,
      dUsername: null,
      dName: null,
      dSurname: null,
      dBirthday: null,
      dBirthdayFormatted: null,
      dBirthdayMenu: false,
      dPassword: null,
      dPasswordConfirm: null,
      dShowPassword: false,
      dSports: [],
      dLevels: [],
      dSport: [],
      dSkillLevel: [],
      dSelectedSport: null,
      dSelectedSkillLevel: null,
      dSelectedSportList: [],
      dListTitles: [
        this.$t('register.userEmail'),
        this.$t('register.basicData'),
        this.$t('register.yourSports'),
        this.$t('register.thanks')
      ],
      dAuthErrorMsg: null,
      dIsEmailTaken: false,
      dIsUserTaken: false,
      dActivePicker: null,
      dMenuDate: false
    }
  },
  mounted () {
    this.fGetAllSports()
    this.fGetAllLevels()
  },
  computed: {
    cAge() {
      if (this.dBirthday) {
        const today = new Date();
        const birthDate = new Date(this.dBirthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      }
      return null;
    },
    cFieldsValid() {
      return this.errors.any()
    },
    cActualDate() {
      return this.$moment().format()
    }
  },
  watch: {
    dMenuDate (val) {
      val && setTimeout(() => (this.dActivePicker = 'YEAR'))
    }
  },
  methods: {
    fNextStep(advance) {
      if (advance) {
        this.$validator.validateAll().then(result => {
          if (result) {
            if (this.dStep === 1) {
              this.fCheckUsernameEmail()
            }
            else if (this.dStep == 3) {
              srvAuth.registerPlayer(this.dEmail, this.dUsername, this.dName, this.dSurname, this.dBirthday, this.dSelectedSportList,
                  this.dPassword, this.dPasswordConfirm).then((result) => {
                this.dStep++
              })
            } else {
              this.dStep++
            }
          }
        })
      } else {
        this.dStep--
      }
      
    },
    setBirthday() {
      this.dBirthdayMenu = false;
      this.dBirthdayFormatted = this.$refs.dBirthdayMenu.internalValue;
    },
    addSelectedSport() {
      if (this.dSelectedSport && this.dSelectedSkillLevel) {
        this.dSelectedSportList.push({
          idSport: this.dSelectedSport,
          level: this.dSelectedSkillLevel
        })
        this.dSelectedSport = null;
        this.dSelectedSkillLevel = null;
      }
    },
    fGetAllSports () {
      srvSport.getAllSports().then((result) => {
        this.dSports = result.sort((a, b) => a.name.localeCompare(b.name))
      })
    },
    fGetAllLevels () {
      srvLevel.getAllLevels().then((result) => {
        this.dLevels = result
      })
    },
    fCheckUsernameEmail() {
      srvAuth.checkUsernameEmail(this.dUsername, this.dEmail).then((result) => {
        if (result === backendErrors.EMAIL_ALREADY_EXISTS) {
          this.dAuthErrorMsg = this.$t('errors.emailAlreadyExists')
          this.dIsEmailTaken = true
        } else if (result === backendErrors.USER_ALREADY_EXISTS) {
          this.dAuthErrorMsg = this.$t('errors.userAlreadyExists')
          this.dIsUserTaken = true
        } else {
          this.dAuthErrorMsg = null
          this.dIsUserTaken = false
          this.dIsEmailTaken = false
          this.dStep++
        }
      })
    },
    fSaveDatepickerMenu (date) {
      this.$refs.menu.save(date)
    },
  }
}
</script>

<style scoped>
  .form-container {
    max-width: 600px;
    margin: 0 auto;
  }

  .button-wrapper {
    text-align: right;
    margin: 16px;
  }
  .button-wrapper-left {
    text-align: left;
    margin: 16px;
  }
  .ageFont {
    font-size: 50px;
    font-weight: bold;
  }
  .ageTextFont {
    font-size: 30px;
  }

</style>