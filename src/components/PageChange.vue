<script>
import { useRoute } from 'vue-router';
import { api } from '@/lib/api';
import { onMounted } from 'vue';

export default {
  setup() {
    const route = useRoute();

    onMounted(async () => {
      const url = route.params.url;
      await api().get(`/address/${url}`).then(res => {
        if ((/2../).test(res.status.toString())) {
          window.location.href = res.data;
        }
      });
    })
  }
}
</script>
