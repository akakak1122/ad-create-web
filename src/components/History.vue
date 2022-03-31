<template>
  <div class="q-pa-md">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="_id"
    >
      <template v-slot:top>
        <q-space />
        <q-btn label="초기화" @click="deleteAllHistory"/>
      </template>
    </q-table>
  </div>
</template>

<style>
</style>

<script>
import { ref, defineComponent, } from 'vue';
import { api } from '../lib/api';
import { onMounted } from '@vue/runtime-core';
import moment from 'moment-timezone';

export default defineComponent({
  setup() {
    moment.tz.setDefault("Asia/Seoul");

    const columns = [
      { name: 'IP', label: 'IP', align: 'center', sortable: true, field: 'ip' },
      { name: '들어온 시간', label: '들어온 시간', align: 'center', sortable: true, field: 'createdAt', format: val => moment(val).format('YYYY-MM-DD HH시mm분ss초') },
    ];
    const rows = ref([]);
    const newIP = ref('');

    onMounted(async () => {
      api().get('/history').then(res => {
        if ((/2../).test(res.status.toString())) {
          rows.value = res.data;
          console.log(rows.value)
        }
      }).catch(e => {
        console.log(e);
      });
    });

    const deleteAllHistory = async () => {
      await api().delete('/history').then(res => {
        if ((/2../).test(res.status.toString())) {
          rows.value = [];
        }
      }).catch(e => {
        console.log(e);
      });
    };

    return {
      columns,
      rows,
      newIP,

      deleteAllHistory,
    };
  },
});
</script>
