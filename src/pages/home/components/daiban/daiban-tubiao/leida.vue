<template>
    <div class="leida">
      <canvas id="myChart1" width="180" height="141"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue';
  import { Chart, registerables } from 'chart.js';
  
  // 注册所有必要的组件
  Chart.register(...registerables);
  
  let myChartInstance: Chart | null = null;
  
  onMounted(() => {
    const ctx = document.getElementById('myChart1') as HTMLCanvasElement | null;
    const data = {
  labels: [
    '全部完成',
    '低效率',
    '没有完成',
    '高效率'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 90, 81],
    fill: true,
    backgroundColor: 'rgba(236, 243, 253)',
    borderColor: 'rgb(130, 217, 235)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)',
    pointRadius:0,
    borderWidth:1
  }]
};
    if (ctx) {
      myChartInstance = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
      elements: {
        line: {
          borderWidth: 3
        }
      },
      scales: {
        r: { // 使用 'r' 来表示 radialLinear scale
          angleLines: {
            display: false // 隐藏角度线
          },
          grid: { // 使用 'grid' 而不是 'gridLines'
            display: false // 隐藏网格线
          },
          pointLabels: {
            display: true // 显示点标签（类别标签）
          },
          ticks: {
            display: false // 隐藏刻度
          }
        }
      },
      plugins: {
          legend: {
            display: false // 隐藏图例
          }
        }
    }
      });
    } else {
      console.error('无法找到 id 为 "myChart" 的 canvas 元素');
    }
  });
  
  onUnmounted(() => {
    if (myChartInstance) {
      myChartInstance.destroy();
    }
  });
  </script>
  
  <style scoped>
.leida{
    background: url('../../../../../assets/home/leida.svg')no-repeat center 0%;
    background-size: 111px 150px;
}
  </style>
  