<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          @click="goBack"
          icon="arrow_back"
          flat
          no-caps
          dense
          label="Back"
        />

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn
          v-if="!store.userDetails.userId"
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          flat
          no-caps
          dense
          label="Login"
        />
        <q-btn
          v-else
          @click="store.logoutUser"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          flat
          no-caps
          dense
        >
          Logout<br />
          {{ store.userDetails.name }}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useChatStore } from 'src/stores/example-store'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const title = ref('')
    const store = useChatStore()

    const updateTitle = () => {
      switch (route.fullPath) {
        case '/':
          title.value = 'SmackChat'
          break
        case '/auth':
          title.value = 'Login'
          break
        case '/chat':
          title.value = 'Chat'
          break
        default:
          title.value = 'SmackChat'
      }
    }

    const goBack = () => {
      router.go(-1)
    }
    watch(route, updateTitle, { immediate: true })
    watch(route, (newRoute) => {
      console.log('Route changed: ', newRoute.fullPath)
    })

    return {
      title,
      goBack,
      store,
    }
  },
})
</script>
