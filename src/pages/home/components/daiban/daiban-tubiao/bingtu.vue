<template>
    <div>
        <canvas id="myChart" width="150" height="150"></canvas>
    </div>
</template>

<script setup lang="ts">
import {  onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
// 注册所有必要的组件
Chart.register(...registerables);


onMounted(() => {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement | null;
  if (ctx) {
    new Chart(ctx, {
      type: 'doughnut',
      data: {
  labels: [
    '学习',
    '工作',
    '娱乐',
    '生活'
   
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 700],
    backgroundColor: [
      'rgb(22, 91, 170)',
      'rgb(161, 85, 185)',
      'rgb(247, 101, 163)',
      'rgb(22, 191, 214)'
    ],
    hoverOffset: 4,
    borderWidth: 0
  }]
},
options: {
        plugins: {
          legend: {
            position: 'right', // 设置图例位置为右侧
             labels: {
              // 设置图例标记的宽度
              boxWidth: 24.87, // 默认为 40
              boxHeight: 10.38, // 默认为 40，如果你想要一个正方形，则可以设置这个值
            }
          },
         
        }
      }
    });
  } else {
    console.error('无法找到 id 为 "myChart" 的 canvas 元素');
  }
});
</script>

<style scoped>

</style>