<template>
    <div class="mian">
    <div class="content">
       <div  class="title"> <span>congratulations</span></div>
        <img src="../../../../assets/home/qiandao_done.svg" alt="">
       <div class="text"> <span>今日签到获得<span class="clor">{{ currentReward }}</span>时长,已经成功签到{{time+1}}天</span></div>
       <div> <button>获得更多时长</button></div>
    </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { onMounted } from 'vue';
// import { getSignData } from '@/api/home';
// const time = ref(1);
// const currentReward = ref(0); // 初始化 currentReward
onMounted(async () => {
  await postqiandao();
});
const postqiandao = async () => {
  const storedQiandaoData = localStorage.getItem('qiandaoData');
  if (storedQiandaoData) {
    const qiandaoData = JSON.parse(storedQiandaoData);
    time.value = qiandaoData.signCount;
    currentReward.value = qiandaoData.lastReward;
    // console.log('从本地存储加载的签到数据:', currentReward.value);
  }  
//   const result = await getSignData();
//   console.log('签到成功:', error.response?.data?.message || error.message);
//   time.value = result.data.signCount+=1;
//   currentReward.value = result.data.rewards[time.value] + 'min';
};
const time = ref(1);
const currentReward = ref(0); // 初始化 currentReward

</script>

<style scoped lang="scss">
.mian{
    width: 296.38px;
    height: 273.1px;
    border-radius: 10.01px;
    background: linear-gradient(145.12deg, #FFFFFF 0%, #4AA1FF 100%);
    .content{
        display: flex;
        flex-direction: column;
       text-align: center;
       align-items: center;
    .title{
        color: #163BF5;
font-family: ABeeZee;
font-weight: Italic;
font-size: 27.04px;
line-height: 1;
letter-spacing: 0px;
font-style: italic;
text-align: left;
width: 199px;
height: 27px;
margin-bottom: 15px;
    }
    img{
        width: 105px;
        height: 100px;
        margin-bottom: 20px;
    }
    .text{
        color: #000000;
font-family: ABeeZee;
font-weight: Italic;
font-size: 16.04px;
line-height: 1;
letter-spacing: 0px;
text-align: center;
width: 260px;
height: 32px;
  .clor{
    color: #ee642a;
  }
    }
    button{
        width: 137px;
        height: 37px;
        border-radius: 12.92px;
background: linear-gradient(142.79deg, #3d8af5 22%, #FFFFFF 100%);
border: none;
margin-top: 9px;
color:#fff;
    }
    }
}
</style>