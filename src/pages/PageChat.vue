<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center"> User is offline. </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form class="full-width">
          <q-input
            v-model="newMessage"
            bg-color="white"
            outlined
            rounded
            label="Message"
            dense
          >
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                @click="sendMessage"
                color="white"
                icon="send"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Ref } from 'vue'

export default {
  setup() {
    const messages: Ref<{ text: string; from: string }[]> = ref([
      {
        text: 'Hey, Jim! How are you?',
        from: 'me',
      },

      {
        text: 'Good thancks, Danny! How are you?',
        from: 'them',
      },

      {
        text: 'Hey, Jim! How are you?',
        from: 'me',
      },
    ])
    const newMessage: Ref<string> = ref('')
    return {
      newMessage,
      messages,
      sendMessage() {
        messages.value.push({
          text: newMessage.value,
          from: 'me',
        })
      },
    }
  },
}
</script>

<style></style>
