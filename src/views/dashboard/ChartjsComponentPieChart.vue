<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: {
    data: {
      default: null,
      required: true
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.data, this.options);
  }
};
</script>
