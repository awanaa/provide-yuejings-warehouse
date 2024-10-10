<template>
    <div class="three">
   <div class="three-top">
    <div class="top-time">{{ today }}</div>
    <div class="top-text">已完成行程数量为: <span>{{ shu }}</span></div>
   </div>
   <div class="three-zhong">
    <div class="zhong-title"><span>今日行程规划如下：</span></div>
    <div class="zhong-bianji">
        <img src="../../../../../assets/home/three_xingcheng/Edit .svg" alt="">
        <span>编辑</span>
    </div>
    <div><img src="../../../../../assets/home/three_xingcheng/add.svg" alt=""></div>
   </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const today = ref('');
const shu = ref(0);
onMounted(() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的
  const day = date.getDate().toString().padStart(2, '0');
  today.value = `${year}-${month}-${day}`;
});
</script>

<style scoped lang="scss">
.three{
    .three-top{
        margin-top: 17.63px;
        width: 360px;
        height: 70px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
background: #FFFFFF;
   .top-time{
    color: #007AFF;
font-family: Microsoft YaHei UI;
font-weight: regular;
font-size: 27.14px;
line-height: 26px;
height: 26px;
letter-spacing: 0px;
text-align: center;
   }
   .top-text{
   color: #0000006B;
font-family: Microsoft YaHei UI;
font-weight: regular;
font-size: 12.14px;
line-height: 31.48px;
letter-spacing: 0px;
text-align: center;
height: 31.48px;
span{
    color: #4462f7;
}
   }
    }
    .three-zhong{
        display: flex;
        margin-top: 18px;
       .zhong-title{
        width: 230px;
        height: 25.52px;
        border-radius: 10px;
background: #FFFFFF;
margin-right: 6px;
padding-top: 3px;
span{
    color: #000000;
font-family: Microsoft YaHei UI;
font-weight: regular;
font-size: 10.14px;
line-height: normal;
letter-spacing: 0px;
text-align: center;
margin-left: 19px;
}
       }
       .zhong-bianji{
        width: 92px;
        height: 26px;
        border-radius: 10px;
background: #FFFFFF;
display: flex;
justify-content: center;
align-items: center;
margin-right: 3px;
span{
    color: #000000;
font-family: Microsoft YaHei UI;
font-weight: regular;
font-size: 10.14px;
line-height: normal;
letter-spacing: 0px;
text-align: center;
margin-left: 4px;
}
       }
    }
}
</style>