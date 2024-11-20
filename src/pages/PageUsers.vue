<template>
  <q-page class="flex q-pa-md">
    <q-list
      class="full-width"
      separator
    >
      <q-item
        v-for="user in users"
        :key="user.userId"
        to="/chat"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar
            color="primary"
            text-color="white"
          >
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label>{{ user.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="user.online ? 'light-green-5' : 'grey-4'">
            {{ user.online ? 'Online' : 'Offline' }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { useChatStore } from 'src/stores/example-store'
// import { userItem } from 'src/components/models'
const store = useChatStore()
export default defineComponent({
  name: 'IndexPage',
  setup() {
    // const users: userItem[] = store.usersArray as userItem[]
    const users = store.usersArray

    onBeforeMount(() => {})

    return {
      users,
    }
  },
})
</script>

<style></style>
