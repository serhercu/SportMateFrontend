<template>
  <div>
    <v-flex shrink pa-0>
      <v-layout row wrap justify-space-between align-center ma-0>
        <v-flex pa-1 fill-height text-xs-center>
          <v-btn v-on:click.stop @click.prevent="decreaseNumber" flat icon class="ma-0 noHover" :ripple="false">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-flex>
        <v-flex pa-0 text-xs-center fill-height>
          <v-text-field v-model="dNumberValue" height="50" :min="min" :max="max" debounce="500" solo flat hide-details readonly></v-text-field>
        </v-flex>
        <v-flex pa-1 fill-height text-xs-center>
          <v-btn v-on:click.stop @click.prevent="increaseNumber" flat icon class="ma-0 noHover solid" :ripple="false">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>

  </div>
</template>

<style scoped>
  .v-text-field input {
    font-size: 6.8em;
  }
</style>

<script>

export default {
  data() {
    return {
      dNumberValue: 0,
      min: 0,
      max: 10
    }
  }, methods: {
    increaseNumber () {
      this.dNumberValue += 1
      this.$emit('changeNumber', this.dNumberValue)
    },
    decreaseNumber () {
      this.dNumberValue -= 1
      this.$emit('changeNumber', this.dNumberValue)
    },
  }
}
</script>