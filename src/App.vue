<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useChatStore } from './stores/example-store'

export default defineComponent({
  name: 'App',

  setup() {
    const store = useChatStore()
    onMounted(() => {
      store.handleAuthStateChanged()
    })
  },
})
</script>
