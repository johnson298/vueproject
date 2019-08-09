<template>
<VxCardCustom title="Giới tính">
    <e-charts :options="pie" ref="pie" auto-resize />
</VxCardCustom>
</template>

<script>
import VxCardCustom from './vx-card/VxCardCustom.vue';
import ECharts from 'vue-echarts/components/ECharts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/pie';

export default {
  data() {
    return {
      pie: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Nữ', 'Nam']
        },
        series: [{
          name: 'Giới tính',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          color: ['#FF9F43', '#28C76F', '#EA5455', '#87ceeb', '#7367F0'],
          data: [{
            value: 234,
            name: 'Nữ'
          },
          {
            value: 1548,
            name: 'Nam'
          }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
    };
  },
  components: {
    ECharts,
    VxCardCustom
  },
  mounted() {
    let dataIndex = -1;
    let pie = this.$refs.pie;
    let dataLen = pie.options.series[0].data.length;
    setInterval(() => {
      pie.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex
      });
      dataIndex = (dataIndex + 1) % dataLen;
      pie.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex
      });
      pie.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex
      });
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>

</style>
