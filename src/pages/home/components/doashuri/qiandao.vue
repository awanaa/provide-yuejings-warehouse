<template>
    <div>
        <div v-if="isshow"><Qiaodaoed></Qiaodaoed></div>
        <div class="mian" v-else>
        <div class="guli">
            <img src="../../../../assets/home/Rectangle 421.svg">
            <div class="guli-text"><span>签到得时长啦！！！即签即得，时长帮助你解锁更多新功能</span></div>
        </div>
        <div class="card">
            <div>
                <div class="top">
                    <div class="top-left">
                        <span class="top-t">每日签到</span>
                        <span class="top-o">已连续签到 <span class="top-p">{{ time }}</span> 天 </span>
                    </div>
                    <div class="top-right">
                        <span>签到提醒</span>
                        <div class="switch"> <el-switch v-model="value1" /></div>
                    </div>

                </div>
                <div style="display: flex;" class="card-body">
                    <div v-for="(item, index) in src" :key="index">
                        <img :src="item.src">
                        <span class="card-body-text">{{ item.text }}</span>
                    </div>
                </div>
            </div>


        </div>
        <div class="meiri">
            <div class="meiri-left">
                <img src="../../../../assets/home/Slice 10.svg">
               <div class="meiri-text" style="display: flex;flex-direction: column;">
                <span class="meiri-left-qiandao">每日签到</span>
                <span class="meiri-left-qiandaotext">连续签到天数越长，奖励越多</span>
               </div>
            </div>
            <div class="meiri-right">
                <button @click="finished">签到</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { getSignData,postsigned } from '@/api/home';
import Qiaodaoed from '@/pages/home/components/doashuri/qiaodaoed.vue';

const value1 = ref(true);
const currentReward = ref(0); // 初始化 currentReward
const time = ref(1);
const src = ref([
    { src: new URL('../../../../assets/home/qiandao(be done).svg', import.meta.url).href, text: '已签', status: 0 },
    { src: new URL('../../../../assets/home/qiandao(ing).svg', import.meta.url).href, text: '30min', status: 1 },
    { src: new URL('../../../../assets/home/qiandao(will done).svg', import.meta.url).href, text: '30min', status: 2 },
    { src: new URL('../../../../assets/home/qiandao(will done).svg', import.meta.url).href, text: '30min', status: 2 },
    { src: new URL('../../../../assets/home/qiandao(will done).svg', import.meta.url).href, text: '30min', status: 2 },
    { src: new URL('../../../../assets/home/qiandao(will done).svg', import.meta.url).href, text: '30min', status: 2 },
    { src: new URL('../../../../assets/home/qiandao(will done).svg', import.meta.url).href, text: '30min', status: 2 }
]);
const isshow = ref(false);
  // 每天凌晨清空本地存储的qiandaoData
  // const now = new Date();
  // const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  // setTimeout(() => {
  //   localStorage.removeItem('qiandaoData');
    
  // }, midnight.getTime() - now.getTime());

const finished = async () => {

  // 更新签到状态
  time.value++;
  src.value.forEach((item, index) => {
    if (index === time.value - 1) {
      item.status = 0;
      item.text = '已签';
      item.src = new URL('../../../../assets/home/qiandao(be done).svg', import.meta.url).href;
    }
  });
  try {
    const signReward = currentReward.value
    const response = await postsigned(signReward);
    console.log('签到成功:', currentReward.value);
    console.log('签到成功:', response);
    isshow.value = true;
} catch (error: any) {
    if (error.response && error.response.status === 500) {
     // console.error('服务器错误:', error.response?.data?.message || error.message);
      isshow.value = true;

    } else {
      // console.error('签到失败:', error.response?.data?.message || error.message);
      isshow.value = true;
    }
   
   
  }


};


onMounted(async () => {
    await getqiandao();
    
});
const getqiandao = async () => {


  try {
    console.log('获取签到数据111111');
    const result = await getSignData();
    console.log('11111')
    console.log('签到数据:', result);
    time.value = result.data.signCount;
    currentReward.value = result.data.rewards[time.value]; // 获取今天签到的奖励
    console.log('签到数据:', currentReward.value);  
    const qiandaoData = {
      signCount: time.value,
      lastReward: currentReward.value
    };
    localStorage.setItem('qiandaoData', JSON.stringify(qiandaoData));
    src.value.forEach((item, index) => {
      if (index < time.value) {
        item.status = 0;
        item.text = '已签';
        item.src = new URL('../../../../assets/home/qiandao(be done).svg', import.meta.url).href;
      } else if (index === time.value) {
        item.status = 1;
        item.text = result.data.rewards[index] + 'min';
        item.src = new URL('../../../../assets/home/qiandao(ing).svg', import.meta.url).href;
      } else {
        item.status = 2;
        item.text = result.data.rewards[index] + 'min';
        item.src = new URL('../../../../assets/home/qiandao(will done).svg', import.meta.url).href;
      }
    });
  } catch (error: any) {
    if (error.response && error.response.status=== 500) {
      console.error('服务器错误:', error.response?.data?.message || error.message);
      console.log(error)
      // isshow.value = true;
    } else {
      console.error('获取签到数据失败:', error);
        // isshow.value = true;
    //   console.error('获取签到数据失败:', error.response?.data?.message || error.message);
      // 根据需要处理其他错误情况
    }
       console.error('获取签到数据失败:', error);
  }

};

</script>

<style scoped lang="scss">
.mian {
    width: 296.38px;
    height: 273.1px;
    border-radius: 10.01px;
    background: linear-gradient(145.12deg, #FFFFFF 0%, #4AA1FF 100%);
    display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
    .guli {
        display: flex;

      margin-bottom: 19.4px;
        .guli-text {
            margin-left: 10px;
            border-radius: 10.01px;
            background: #FFFFFF;
            width: 173.74px;
            // height: 53.11px;
            padding: 9px 15px;
            line-height: 4px;
            align-items: center;

            span {
                color: #163BF5;
                text-shadow: -3px 3px 4.01px 0px #67A9F9;
                font-family: ABeeZee;
                font-weight: Italic;
                font-size: 11.04px;
                line-height: 1;
                letter-spacing: 0px;
                text-align: left;
            }
        }
    }

    .card {
        width: 247.53px;
        height: 108.19px;
        border-radius: 12.84px 12.84px 0px 0px;
        background: #FFFFFF;
        border: 0.4px solid #0000000C;
       
        .top {
            display: flex;
            justify-content: space-between;

            .top-left {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 12.84px;
                .top-t {
                    color: #1A1A1A;
                    font-family: ABeeZee;
                    font-weight: Italic;
                    font-size: 13.64px;
                    line-height: normal;
                    letter-spacing: 0px;
                    text-align: left;
                    margin-right: 6.42px;
                }

                .top-o {
                    color: #B0B0B0;
                    font-family: ABeeZee;
                    font-weight: regular;
                    font-size: 9.63px;
                    line-height: normal;
                    letter-spacing: 0px;
                    text-align: left;

                }

                .top-p {
                    color: rgb(104, 162, 251);
                }
            }

            .top-right {
                display: flex;
                align-items: center;

                span {
                    color: #B0B0B0;
                    font-family: ABeeZee;
                    font-weight: regular;
                    font-size: 9.63px;
                    line-height: normal;
                    letter-spacing: 0px;
                    text-align: left;
                    margin-right: 4.81px;
                }


            }
        }

        .card-body {
          margin-left: 12.84px;
            .card-body-text {
                color: #1A1A1A;
                font-family: ABeeZee;
                font-weight: Italic;
                font-size: 8.03px;
                line-height: 1;
                letter-spacing: 0px;
                text-align: center;

            }
        }
    }
    .meiri {
    width: 247.53px;
    height: 45.31px;
    display: flex;
    justify-content: space-between;
    border-radius: 0px 0px 8.84px 8.84px;
    background: #FFFFFF;
    border-top: 0.04px solid #b3b3b324;
    box-shadow: 0px 4px 4px 0px #0000003F;
   
    .meiri-left {
        display: flex;
        align-items: center;

        img {
            margin-left: 10px;
            margin-right: 5.84px;
        }

        .meiri-left-qiandao {
            color: #1A1A1A;
            font-family: ABeeZee;
            font-weight: Italic;
            font-size: 10.2px;
            line-height: 12.24px;
            letter-spacing: 0px;
            text-align: left;
          margin-bottom: 3.4px;
        }

        .meiri-left-qiandaotext {
            color: #B0B0B0;
            font-family: ABeeZee;
            font-weight: regular;
            font-size: 7.48px;
            line-height: 9.52px;
            letter-spacing: 0px;
            text-align: left;
        }
    }

    .meiri-right {
        display: flex;
        align-items: center;
        button {
            width: 42.15px;
            height: 20.4px;
            border-radius: 12.92px;
            background: #163BF5;
            color: #FFFFFF;
            font-family: ABeeZee;
            font-weight: Italic;
            font-size: 8.84px;
            line-height: 1;
            letter-spacing: 0px;
            text-align: center;
            margin-right: 5.7px;
            border: none;
        }
    }
}
}


</style>