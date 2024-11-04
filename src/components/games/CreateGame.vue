<template>
<div>
  <v-flex ma-4>
    <v-stepper v-model="e1" flat >
      <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1" color="amber">{{$t("createGame.sport")}}
            <small>{{dSelectedSport !== null ? $t('sport.' + dSelectedSport.name) : ''}}</small>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2" color="amber">{{$t("createGame.dateAndTime")}}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 3" step="3" color="amber">{{$t("createGame.location")}}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 4" step="4" color="amber">{{$t("createGame.numberOfPlayers")}}
            <!-- <small>{{dSelectedSport !== null ? $t('sport.' + dSelectedSport.name) : ''}}</small> -->
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 5" step="5" color="amber">{{$t("createGame.gameDescription")}}
            <!-- <small>{{dSelectedSport !== null ? $t('sport.' + dSelectedSport.name) : ''}}</small> -->
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="6" color="amber">{{$t("createGame.created")}}
            <!-- <small>{{dSelectedSport !== null ? $t('sport.' + dSelectedSport.name) : ''}}</small> -->
          </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- Sport selector -->
        <v-stepper-content step="1">
          <v-flex pt-4>
            <p h2 class="black--text" align="center"><span class="subtitle-upper">{{$t("createGame.selectSport")}}</span></p>
          </v-flex>
          <v-container v-bind="{ [`grid-list-${size}`]: true }" fluid>
            <v-layout row wrap>
              <v-flex v-for="sport in dSports" @click="fHandleSportSelect(sport)" :key="sport" xs4 pa-2>
                <SportCard :pSport="sport" :pHover="hover"></SportCard>
              </v-flex>
            </v-layout>
          </v-container>
        </v-stepper-content>

        <!-- Date selector -->
        <v-stepper-content step="2">
          <v-container>
            <v-row class="mb-4">
              <v-col cols="12" lg="6">
                <p h2 class="black--text" align="center"><span class="subtitle-upper">{{$t("createGame.selectDate")}}</span></p>
                <v-layout justify-center>
                  <v-date-picker v-model="dSelectedDate" :min="dMinDate" :max="dMaxDate" @change="dDatePicker = false" color="blue-grey darken-2" locale="es-es"></v-date-picker>
                </v-layout>
                <v-layout justify-center>
                  <v-text-field v-model="dSelectedTime" :label="$t('createGame.selectHour')" persistent-hint type="time"></v-text-field>
                </v-layout>
              </v-col>
              <v-col cols="12" lg="6">
                <p h2 class="black--text" align="center"><span class="subtitle-upper">{{$t("createGame.selectLocation")}}</span></p>
                <v-autocomplete v-model="dSelectedCity" :items="dCities" :label="$t('createGame.addCity')" item-value="id" item-text="name" 
                  return-object solo prepend-icon="mdi-city-variant-outline" color="amber">
                </v-autocomplete>
                <v-col v-if="dSelectedCity !== null">
                  <v-select v-model="dSelectedCenter" :items="dCenters" :label="$t('createGame.addCenter')" prepend-icon="mdi-store-search" 
                    item-text="name" return-object color="amber" clearable :disabled="dSelectedLocation !== null">
                    <template v-slot:item="{ item }">
                      <v-icon color="yellow">mdi-star</v-icon>
                      <span>{{ item.name }}</span>
                    </template>
                  </v-select>
                  <v-text-field v-if="dSelectedCenter == null" v-model="dSelectedLocation" :label="$t('createGame.addLocation')" prepend-icon="mdi-map-marker" 
                    color="amber" clearable>
                  </v-text-field>
                  <v-row v-if="dSelectedCenter !== null" class="mx-4">
                    <CenterCard :pCenter="dSelectedCenter" :pShowDetails="false"></CenterCard>
                  </v-row>
                </v-col>
                <p h2 class="black--text" align="center"><span>{{$t("createGame.selectTime")}}</span></p>
                <v-layout justify-center>
                  <v-time-picker v-model="dSelectedTime" color="blue-grey darken-2"></v-time-picker>
                </v-layout>
            <v-btn color="amber" @click="fHandleDateLocation">{{$t("btn.next")}}</v-btn>
          </v-layout>
        </v-stepper-content>

        <!-- Location selector -->
        <v-stepper-content step="3">
          <v-flex pt-4>
            <p h2 class="black--text" align="center"><span>{{$t("createGame.addComment")}}</span></p>
          </v-flex>
          <v-container justify-center>
            <p h2 class="black--text" align="center"><span>{{$t("createGame.selectLocation")}}</span></p>
            <v-autocomplete v-model="dSelectedProvince" :items="dProvinces" :label="$t('createGame.addProvince')" item-value="id" item-text="name" solo></v-autocomplete>
            <v-text-field :value="dSelectedLocation" :label="$t('createGame.addLocation')" clearable></v-text-field>
          </v-container>
          <v-layout justify-end>
            <v-btn text @click="e1 -= 1">{{$t("btn.back")}}</v-btn>
            <v-btn color="amber" @click="fHandleLocation">{{$t("btn.next")}}</v-btn>
          </v-layout>
        </v-stepper-content>

        <!-- Number of players selector -->
        <v-stepper-content step="4">
          <v-container>
            <v-row>
              <v-col align-start cols="1" lg="6">
                <p h2 class="black--text" align="center"><span class="subtitle-upper">{{$t("createGame.selectNumberPlayers")}}</span></p>
                <NumberSelector v-model="dNumberPlayers" @changeNumber="fChangeNumber"></NumberSelector>
                <v-switch v-model="dPrivacySwitch" :label="$t('createGame.privateGame')" color="amber" hide-details></v-switch>
              </v-col>
              <v-col align-start cols="1" lg="6">
                <p h2 class="black--text" align="center"><span class="subtitle-upper">{{$t("createGame.selectLevel")}}</span></p>
                <v-select v-model="dLevelSelected" :items="dLevels" return-object solo>
                  <template v-slot:item="{ item }">
                    <span>{{ $t('level.' + item.description) }}</span>
                  </template>
                  <template v-slot:selection="{ item }">
                    <span>{{ $t('level.' + item.description) }}</span>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-layout justify-end>
            <v-btn text @click="e1 -= 1">{{$t("btn.back")}}</v-btn>
            <v-btn color="amber" @click="fHandlePlayersSelect">{{$t("btn.next")}}</v-btn>
          </v-layout>
        </v-stepper-content>

        <!-- Description selector -->
        <v-stepper-content step="5">
          <v-flex pt-4>
            <p h2 class="black--text" align="center"><span class="subtitle-upper">{{$t("createGame.addComment")}}</span></p>
          </v-flex>
          <v-container>
            <v-textarea v-model="dSelectedDescription" clearable clear-icon="mdi-close-circle" :label="$t('general.optional')"></v-textarea>
          </v-container>
          <v-layout justify-end>
            <v-btn text @click="e1 -= 1">{{$t("btn.back")}}</v-btn>
            <v-btn color="amber" @click="fHandleDescriptionSelector">{{$t("btn.next")}}</v-btn>
          </v-layout>
        </v-stepper-content>

        <!-- Created -->
        <v-stepper-content step="5">
          <v-row justify="center" align="center">
            <v-col class="text-center mt-2" cols="auto">
              <v-row>
                <v-icon x-large color="green">mdi-check-circle-outline</v-icon>
                <h1>{{$t('createGame.created')}}</h1>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn color="amber" @click="$router.push('/home')">{{$t("btn.home")}}</v-btn>
                </v-col>
              </v-row>
            </v-col>   
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-flex>

  </div>
</template>

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
 }
</style>

<script>

import SportCard from '@/components/cards/SportCard'
import NumberSelector from '@/components/util/NumberSelector'
import CenterCard from '@/components/cards/CenterCard'

import { format, parseISO } from 'date-fns'

import Constants from '@/util/constants'

import srvSport from '@/services/srv-sport'
import srvGame from '@/services/srv-game'
import srvLevel from '@/services/srv-level'
import srvCity from '@/services/srv-city'
import srvCenter from '@/services/srv-center'

  export default {
    components: {
      SportCard,
      NumberSelector,
      CenterCard
    },
    data () {
      return {
        e1: 1,
        dSports: [],
        dGame: {},
        dSelectedSport: null,
        dSelectedDate: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
        dSelectedTime: '12:00',
        dDatePicker: false,
        dSelectedLocation: null,
        dNumberPlayers: 1,
        dPrivacySwitch: false,
        dSelectedDescription: '',
        dLevels: [],
        dLevelSelected: null,
        dCities: [],
        dSelectedCity: null,
        dSelectedTime: null,
        dCenters: [],
        dSelectedCenter: null,
        dMinDate: new Date().toISOString().substr(0, 10),
        dMaxDate: this.fAddMonths(new Date(), 6).toISOString().slice(0, 10)
      }
    },
    mounted() {
      this.fGetAllSports()
      this.fGetAllLevels()
      this.fGetAllCities()
    },
    methods: {
      fGetAllSports () {
        srvSport.getAllSports().then((result) => {
          this.dSports = result.sort((a, b) => a.name.localeCompare(b.name))
        })
      },
      fGetAllLevels () {
        srvLevel.getAllLevels().then((result) => {
          this.dLevels = result
          this.dLevelSelected = result[2]
        })
      },
      fGetAllCities() {
        srvCity.getAllCities().then((result) => {
          this.dCities = result
        })
      },
      fHandleSportSelect (sport) {
        this.dSelectedSport = sport
        this.dGame.sport = this.dSelectedSport
        this.dGame.playerCreator = JSON.parse(localStorage.getItem(Constants.PLAYER_INFO)).id
        this.e1 += 1
      },
      fHandleDate () {
        this.dGame.date = this.dSelectedDate
        this.dGame.time = this.dSelectedTime
        this.dGame.location = this.dSelectedLocation
        this.dGame.city = this.dSelectedCity
        this.dGame.center = this.dSelectedCenter
        this.e1 += 1
      },
      fHandlePlayersSelect () {
        this.dGame.players = this.dNumberPlayers
        this.dGame.privacy = this.dPrivacySwitch ? 1 : 0
        this.dGame.level = this.dLevelSelected
        this.e1 += 1
      },
      fHandleDescriptionSelector () {
        this.dGame.description = this.dSelectedDescription
        this.fCreateGame()        
        this.e1 += 1
      },
      fChangeNumber(val) {
        this.dNumberPlayers = val
      },
      fCreateGame () {
        srvGame.createGame(this.dGame).then(() => {
        })
      },
      fGetCenters() {
        srvCenter.searchCenters(null, this.dSelectedCity.id, null).then((res) => {
          this.dCenters = res
        })
      },
      fAddMonths(date, months) {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
      }
    },
    watch: {
      dSelectedCity() {
        if (this.dSelectedCity !== null) {
          this.fGetCenters()
        }
      }
    }
  }
</script>