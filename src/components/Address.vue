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
        <q-btn label="추가" @click="addAddress"/>
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
            <div v-if="!editMode || editMode._id!==props.row._id">
              <q-btn size="sm" flat dense icon="clear" @click="deleteAddress(props.row._id)" />
              <q-btn size="sm" flat dense icon="edit" @click="editAddress(props.row)" />
            </div>
            <div v-else>
              <q-btn size="sm" flat dense icon="done" @click="updateAddress()" />
            </div>
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <div v-if="editMode && editMode._id===props.row._id">
              <q-input v-model="editMode[col.field]"></q-input>
            </div>
            <div v-else>
              {{ col.value }}
            </div>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:bottom-row>
        <q-tr v-if="addMode !== null">
          <q-td auto-width>
            <q-btn size="sm" flat dense icon="done" @click="createAddress()" />
          </q-td>
          <q-td
            v-for="col in columns"
            :key="col.name"
          >
            <q-input v-model="addMode[col.field]"></q-input>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style>
</style>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { api } from '../lib/api';

export default defineComponent({
  setup() {
    const columns = [
      { name: '관리자명', label: '관리자명', align: 'center', sortable: true, field: 'owner' },
      { name: '방정보', label: '방정보', align: 'center', sortable: true, field: 'Roomname' },
      { name: '새 URL', label: '새 URL', align: 'center', sortable: true, field: 'newURL' },
      { name: '모바일', label: '모바일', align: 'center', sortable: true, field: 'mobileURL' },
      { name: 'PC', label: 'PC', align: 'center', sortable: true, field: 'PCURL' },
      { name: 'LD', label: 'LD', align: 'center', sortable: true, field: 'LPURL' },
    ];
    const rows = ref([]);
    const editMode = ref(null);
    const addMode = ref(null);
    const filter = ref('');

    onMounted(async () => {
      api().get('/address').then(res => {
        if ((/2../).test(res.status.toString())) {
          rows.value = res.data;
        }
      }).catch(e => {
        console.log(e);
      });
    });

    const deleteAddress = async (id) => {
      await api().delete(`/address/${id}`).then(res => {
        if ((/2../).test(res.status.toString())) {
          const idx = rows.value.findIndex(row => row._id === id);
          rows.value.splice(idx, 1);
        }
      }).catch(e => {
        console.log(e);
      });
    };

    const editAddress = (row) => {
      editMode.value = row;
    };

    const updateAddress = async () => {
      const data = editMode.value;
      const id = data._id;
      delete data._id;
      await api().patch(`/address/${id}`, data).then(res => {
        if ((/2../).test(res.status.toString())) {
          const idx = rows.value.findIndex(row => row._id === id);
          rows.value[idx] = res.data;
        }
      }).catch(e => {
        console.log(e);
      });
      editMode.value = null;
    };

    const addAddress = () => {
      addMode.value = {};
    };

    const createAddress = async () => {
      await api().post('/address', addMode.value).then(res => {
        if ((/2../).test(res.status.toString())) {
          rows.value.push(res.data);
        }
      }).catch(e => {
        console.log(e);
      });
      addMode.value = null;
    };

    return {
      columns,
      rows,
      editMode,
      addMode,
      filter,

      deleteAddress,
      editAddress,
      updateAddress,

      addAddress,
      createAddress,
    }
  },
});
</script>
