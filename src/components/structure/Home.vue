<template>
  <span>HOLA</span>
</template>

<script>

import ValidationSpan from '@/components/util/ValidationSpan'

export default {
	inject: ['$validator'],
	components: {
		ValidationSpan
	},
  data() {
    return {
      dUsername: null,
      dPassword: null
    }
  },
  methods: {
  }
};
</script>
