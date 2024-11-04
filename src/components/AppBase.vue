<template>
  <div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'AppBase',
  components: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
