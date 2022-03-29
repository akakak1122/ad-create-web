<template>
  <Address />
  <Black />
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        *사용법 : http://13.124.218.201/api/address/새URL<br><br>

        새 URL이 '가나다' =><br><br>

        http://13.124.218.201/api/address/가나다<br><br>

        -모바일,PC,LD 에는 http:// 가 포함되는 주소를 넣습니다.
        새 URL 에는 포함하지 않습니다.
      </q-card-section>
    </q-card>
  </div>
</template>

<style>
</style>

<script>
import Address from './Address.vue';
import Black from './Black.vue';

export default {
  components: {
    Address,
    Black,
  }
}
</script>
