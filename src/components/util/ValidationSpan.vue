<template>
    <div>
      <p class="mb-0 mt-1" :class="errorClass" v-if="errors.has(fieldName)">{{errors.first(fieldName)}}
      </p>
    </div>
  </template>
   
  <script>
  export default {
    inject: ['$validator'],
    props: {
      errorClass: {
        type: String,
        required: false,
        default: 'datValidationError'
      },
      fieldName: {
        type: String,
        required: true
      }
    }
  }
  </script>
<style scoped>

</style>