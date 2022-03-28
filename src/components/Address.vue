<template>
  <div class="q-pa-md">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="_id"
    >
      <template v-slot:top>
        <q-space />
        <q-btn color="primary" label="URL 추가" />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" flat dense icon="clear" />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style>
</style>

<script>
import { defineComponent } from 'vue';
import { api } from '../lib/api';

export default defineComponent({
  data() {
    return {
      columns: [
        { name: '관리자명', label: '관리자명', align: 'center', sortable: true, field: 'owner' },
        { name: '방정보', label: '방정보', align: 'center', sortable: true, field: 'Roomname' },
        { name: '새 URL', label: '새 URL', align: 'center', sortable: true, field: 'newURL' },
        { name: '모바일', label: '모바일', align: 'center', sortable: true, field: 'mainURL' },
        { name: 'PC', label: 'PC', align: 'center', sortable: true, field: 'PCURL' },
        { name: 'LD', label: 'LD', align: 'center', sortable: true, field: 'LPURL' },
      ],
      rows: [],
    }
  },
  mounted() {
    return api.get('/address')
      .then(res => {
        if (res.status === 200) {
          this.rows = res.data;
        }
      }).catch(e => {
        console.log(e);
      });
  }
});
</script>
