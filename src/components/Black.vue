<template>
  <div class="q-pa-md">
    <q-table
      :rows="rows"
      :columns="columns"
      :filter="filter"
      row-key="_id"
    >
      <template v-slot:top>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <q-input v-model="newIP" label="IP">
          <template v-slot:after>
            <q-btn label="추가" @click="addBlackIP" />
          </template>
        </q-input>
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
        <q-tr
          :props="props">
          <q-td auto-width>
            <q-btn size="sm" flat dense icon="clear" @click="deleteBlackIP(props.row._id)"/>
          </q-td>
          <q-td
            v-for="(col) in props.cols"
            :key="col.name"
            :props="props"
          >
            <div v-if="col.field=='ignored'">
              <q-toggle v-model="props.row.ignored" @click="updateBlackIP(props.row._id, props.row.ignored)"/>
            </div>
            <div v-else>
              {{ col.value }}
            </div>
          </q-td>
        </q-tr>
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

export default defineComponent({
  setup() {
    const columns = [
      { name: '차단 IP', label: '차단 IP', align: 'center', sortable: true, field: 'ip' },
      { name: '비활성화', label: '비활성화', align: 'center', field: 'ignored' },
    ];
    const rows = ref([]);
    const newIP = ref('');
    const filter = ref('');

    onMounted(async () => {
      api().get('/black').then(res => {
        if ((/2../).test(res.status.toString())) {
          rows.value = res.data;
        }
      }).catch(e => {
        console.log(e);
      });
    });

    const addBlackIP = async () => {
      if (!newIP.value.length) return;
      await api().post('/black', { ip: newIP.value }).then(res => {
        if ((/2../).test(res.status.toString())) {
          rows.value.push(res.data);
        }
      }).catch(e => {
        console.log(e);
      });
      newIP.value = '';
    };

    const deleteBlackIP = async (id) => {
      await api().delete(`/black/${id}`).then(res => {
        if ((/2../).test(res.status.toString())) {
          const idx = rows.value.findIndex(row => row._id === id);
          rows.value.splice(idx, 1);
        }
      }).catch(e => {
        console.log(e);
      });
    };

    const updateBlackIP = async (id, isIgnored) => {
      await api().put(`/black/${id}`, { ignored: isIgnored }).then(res => {
        if ((/2../).test(res.status.toString())) {
          const idx = rows.value.findIndex(row => row._id === id);
          rows.value[idx] = res.data;
        }
      }).catch(e => {
        console.log(e);
      });
    };

    return {
      columns,
      rows,
      newIP,
      filter,

      addBlackIP,
      deleteBlackIP,
      updateBlackIP,
    };
  },
});
</script>
