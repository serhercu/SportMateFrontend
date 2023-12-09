<template>
  <v-card>
    <!-- Display the filtered results -->
    <v-list>
      <v-list-item v-for="result in filteredResults" :key="result.id">
        <v-list-item-content>
          <v-list-item-title>{{ result.name }}</v-list-item-title>
          <!-- Display other game details here -->
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    filteredResults: {
      type: Array,
      default: () => []
    }
  }
};
</script>
