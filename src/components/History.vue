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
        <q-btn label="엑셀다운" @click="exportExcel" icon-right="archive"/>
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
import * as XLSX from 'xlsx';

export default defineComponent({
  setup() {
    moment.tz.setDefault("Asia/Seoul");

    const columns = [
      { name: 'IP', label: 'IP', align: 'center', sortable: true, field: 'ip' },
      { name: 'UUID', label: 'UUID', align: 'center', sortable: true, field: 'uuid' },
      { name: '들어온 시간', label: '들어온 시간', align: 'center', sortable: true, field: 'createdAt', format: val => moment(val).format('YYYY-MM-DD HH시mm분ss초') },
      { name: '횟수', label: '횟수', align: 'center', sortable: true, field: 'cnt', },
      { name: '국가', label: '국가', align: 'center', sortable: true, field: 'country' },
      { name: '도시', label: '도시', align: 'center', sortable: true, field: 'city' },
      { name: 'OS', label: 'OS', align: 'center', sortable: true, field: 'os' },
      { name: 'Browser', label: 'Browser', align: 'center', sortable: true, field: 'browser' },
      { name: 'Source', label: 'Source', align: 'center', sortable: true, field: 'source' },
    ];
    const rows = ref([]);
    const newIP = ref('');
    const filter = ref('');

    onMounted(async () => {
      api().get('/history').then(res => {
        if ((/2../).test(res.status.toString())) {
          rows.value = res.data;
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

    const customData = (data => {
      return columns.reduce((a, c) => {
        if (c.field === 'createdAt') a[c.name] = moment(data[c.field]).format('YYYY-MM-DD HH시mm분ss초');
        else a[c.name] = data[c.field];
        return a;
      }, {});
    });
    const exportExcel = async () => {
      const wb = XLSX.utils.book_new();    // 엑셀 파일 생성 (workbook)
      const ws = XLSX.utils.json_to_sheet(rows.value.map(v=> customData(v)))    // 시트 생성 (worksheet) 및 데이터 삽입
      XLSX.utils.book_append_sheet(wb, ws, 'sheet1');  // 엑셀 파일에 시트 추가

      XLSX.writeFile(wb, 'log.xlsx'); // 엑셀 다운로드
    };

    return {
      columns,
      rows,
      newIP,
      filter,

      deleteAllHistory,
      exportExcel,
    };
  },
});
</script>
