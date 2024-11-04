<template>
  <v-layout>
    <v-container fluid full-width>
      <v-card class="ma-8 pa-6 amber" fluid>
        <v-row>
          <p class="d-flex justify-center">Buscar partida</p>
        </v-row>
        <v-layout row wrap justify-center>
          <v-flex md3 mx-2>
            <v-autocomplete v-model="dSelectedProvince" :items="dProvinces" :label="$t('label.province')" item-value="id" item-text="name" prepend-icon="mdi-map-marker" color="blue-grey darken-2" outlined solo></v-autocomplete>
          </v-flex>
          <v-flex md4 mx-2>
            <v-menu ref="menu" v-model="dOpenDate" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="dDate" :label="$t('label.date')" outlined solo color="blue-grey darken-2" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="dDate" locale="es-es" scrollable color="blue-grey darken-2">
                <v-spacer></v-spacer>
                <v-btn text color="amber" @click="dOpenDate = false">{{$t('btn.accept')}}</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex md4 mx-2>
            <v-menu ref="menu" v-model="dOpenTime" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="dTime" :label="$t('label.time')" outlined solo color="blue-grey darken-2" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-time-picker v-if="dOpenTime" v-model="dTime" color="blue-grey darken-2" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="amber" @click="dOpenTime = false">{{$t('btn.accept')}}</v-btn>
              </v-time-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
          <v-flex md4 mx-2>
            <v-select v-model="dSportSelected" :items="dSports" item-value="id" color="blue-grey darken-2" solo :label="$t('label.sport')" outlined>
              <template v-slot:item="{ item }">
                <v-icon>{{item.image}}</v-icon>
                <span>{{ $t('sport.' + item.name) }}</span>
              </template>
              <template v-slot:selection="{ item }">
                <v-icon justify-end>{{item.image}}</v-icon>
                <span>{{ $t('sport.' + item.name) }}</span>
              </template>
            </v-select>
          </v-flex>
          <v-flex md4 mx-2>
            <v-select v-model="dLevelSelected" :items="dLevels" item-value="value" :label="$t('label.level')" outlined solo color="blue-grey darken-2">
              <template v-slot:item="{ item }">
                <span>{{ $t('level.' + item.description) }}</span>
              </template>
              <template v-slot:selection="{ item }">
                <span>{{ $t('level.' + item.description) }}</span>
              </template>
            </v-select>
          </v-flex>
        </v-layout>
        <v-layout justify-center>
          <v-btn text outlined class="blue-grey darken-2" color="white" background-color="white" @click="fFindGame">{{$t('btn.findGame')}}</v-btn>
        </v-layout>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>

import srvSport from '@/services/srv-sport'
import srvProvince from '@/services/srv-province'
import srvLevel from '@/services/srv-level'

import { format, parseISO } from 'date-fns'

export default {
  mounted () {
    this.fGetAllSports()
    this.fGetAllProvinces()
    this.fGetAllLevels()
  },
  data() {
    return {
      dSports: [],
      dOpenTime: false,
      dOpenDate: false,
      dTime: '12:00',
      dDate: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
      dSportSelected: null,
      dProvinces: [],
      dSelectedProvince: null,
      dLevels: [],
      dLevelSelected: null,
      dPage: 1,
      dNumRows: 10
    }
  },
  methods: {
    fGetAllSports () {
        srvSport.getAllSports().then((result) => {
          this.dSports = result.sort((a, b) => a.name.localeCompare(b.name))
        })
    },
    fGetAllProvinces() {
        srvProvince.getAllProvinces().then((result) => {
          this.dProvinces = result
        })
    },
    fGetAllLevels () {
        srvLevel.getAllLevels().then((result) => {
          this.dLevels = result
        })
    },
    fFindGame () {
      let payload = {
        params: {
          sport: this.dSportSelected,
          date: new Date(this.dDate),
          province: this.dSelectedProvince,
          level: this.dLevelSelected,
          time: this.dTime,
          pageNum: this.dPage - 1,
          numRows: this.dNumRows
        }
      }
      this.$emit('searchGame', payload)
    }
  }
}
</script>