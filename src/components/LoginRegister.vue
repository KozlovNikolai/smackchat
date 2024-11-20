<template>
  <q-form>
    <q-input
      v-if="tab == 'register'"
      v-model="formData.name"
      class="q-mb-md"
      outlined
      label="Name"
    />
    <q-input
      v-model="formData.email"
      class="q-mb-md"
      outlined
      label="Email"
    />
    <q-input
      v-model="formData.password"
      class="q-mb-md"
      outlined
      type="password"
      label="Password"
    />
    <div class="row">
      <q-space />
      <q-btn
        @click="submitForm"
        color="primary"
        :label="tab"
      />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { useChatStore } from 'src/stores/example-store'

const store = useChatStore()

export default defineComponent({
  name: 'LoginRegister',
  props: ['tab'],
  setup(props) {
    const formData: Ref<{ name: string; email: string; password: string }> =
      ref({
        name: '',
        email: 'cmd@cmd.ru',
        password: '123456',
      })
    const submitForm = () => {
      if (props.tab == 'login') {
        store.loginUser(formData)
      } else {
        store.registerUser(formData)
      }
    }

    return {
      formData,
      submitForm,
    }
  },
})
</script>
