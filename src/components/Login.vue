<template>
  <div class="absolute-center">

    <q-form
      @submit="login"
      class="q-gutter-md"
    >
      <q-input
        outlined
        v-model="uid"
        label="ID"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        outlined
        type="password"
        v-model="password"
        label="Password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <div class="float-right">
        <q-btn label="Submit" type="submit"/>
      </div>
    </q-form>

  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '../lib/api';

export default defineComponent({
  setup() {
    const router = useRouter();

    const uid = ref('');
    const password = ref('');

    const login = async () => {
      await api().post('/login', { uid: uid.value, password: password.value }).then(res => {
        if ((/2../).test(res.status.toString())) {
          localStorage.setItem('token', res.data);
          router.push('/');
        }
      }).catch(e => {
        console.log(e)
      });
    };

    return {
      uid,
      password,

      login,
    };
  },
})
</script>
