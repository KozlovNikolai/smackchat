<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const title = ref('');

    const updateTitle = () => {
      switch (route.fullPath) {
        case '/':
          title.value = 'SmackChat';
          break;
        case '/auth':
          title.value = 'Login';
          break;
        case '/chat':
          title.value = 'Chat';
          break;
        default:
          title.value = 'SmackChat';
      }
    };

    watch(route, updateTitle, { immediate: true });
    watch(route, (newRoute) => {
      console.log('Route changed: ', newRoute.fullPath)
    })
    return {
      title,
    };
  },
});
</script>
