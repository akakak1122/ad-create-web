<script>
import { useRoute, useRouter, } from 'vue-router';
import { api } from '@/lib/api';
import { onMounted } from '@vue/runtime-core';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
      const url = route.params.url;
      const res = await api().get(`/address/${url}`);
      if ((/2../).test(res.status.toString()) && res.data.length) {
        window.location.href = res.data;
      }
      router.push('/404');
    });
  }
}
</script>
