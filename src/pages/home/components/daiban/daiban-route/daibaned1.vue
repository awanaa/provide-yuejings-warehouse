<template>
    <div  class="two">
       <div class="tubiao-mian">
       <div class="tubiao-mian-top">
        <div class="but">
        <button>
          <img src="../../../../../assets/home/Trailing-Elements.svg" alt="">
        <span>添加新的待办</span>
        </button>
       </div>
      <div class="tubiao-title"><span>TIMEN DISTRIBUTION</span></div>
       </div>
        <div class="tubiao">
        <div class="bingtu"> <Bingtu></Bingtu></div>
        <div class="leida"><Leida></Leida></div>
        </div>
       </div>
   <div class="card-mian">
    <div class="card" v-for="(item,index) in src" :key="index">
  <div>
    <img :src=item >
    <div class="card-content">
        <ul>
            <li>时长不合理</li>
            <li>工作量过大</li>
            <li>工作内容不明确</li>
        </ul>
    </div>
  </div>
   </div>
   </div>
   <div class="zongjie">
    <div>
        <!-- <span>SUMMARY</span> -->
        <img src="@/assets/home/two_aifupan/summary.svg">
      <input type="text" placeholder="我是世界上最自律的human了！！！" >
    <div class="mianyidu">
        <div class="demo-rate-block">
   <span>满意度</span>
    <el-rate v-model="value1" />
  </div>
  <div class="demo-rate-block">
   <span>个人总结</span>
    <el-rate v-model="value2" />
  </div>
    </div>  
    </div>
    
   </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Bingtu from '@/pages/home/components/daiban/daiban-tubiao/bingtu.vue'
import Leida from '@/pages/home/components/daiban/daiban-tubiao/leida.vue'
const value1 = ref(0);
const value2 = ref(0);
const src = ref([
  new URL('../../../../../assets/home/two_aifupan/improve.svg', import.meta.url).href,
  new URL('../../../../../assets/home/two_aifupan/keep.svg', import.meta.url).href,
  new URL('../../../../../assets/home/two_aifupan/start.svg', import.meta.url).href,
  new URL('../../../../../assets/home/two_aifupan/stop.svg', import.meta.url).href,
]);
</script>
<style scoped lang="scss">
.tubiao-mian{
    .tubiao-mian-top{
        .but{
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
   button{
     width: 96.45px;
    height: 24.43px;
    border-radius: 100px;
background: #FFFFFF;
border: 1px solid #FFFFFF;
color: #000000;
font-family: Microsoft YaHei UI;
font-weight: regular;
font-size: 8.14px;
line-height: 12.22px;
letter-spacing: 0.25px;
text-align: left;
display: flex;
  align-items: center;
  justify-content: center;
   }
  }
  .tubiao-title{
    span{
        color: #212529;
font-family: Microsoft YaHei UI;
font-weight: regular;
font-size: 13.89px;
line-height: normal;
letter-spacing: 0px;
text-align: center;
    }
}
    }
    .tubiao{
    display: flex;
  .leida{
        width: 161.33px;
      margin-left: 10px;
    }
}
}
.two{
    width: 338px;
    height: 673.39px;
    display: flex; /* 设置为flex容器 */
  flex-direction: column; /* 子元素垂直排列 */
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中，如果需要的话 */
}
.zongjie{
    margin-left: 24px;
    img{
      margin-top: 4px;
    }
    span{
        color: #212529;
text-shadow: 0px 1px 4px 0px #FFFFFFEA;
font-family: Microsoft YaHei UI;
font-weight: regular;
font-size: 10.89px;
line-height: 26.37px;
letter-spacing: 0px;
text-align: left;
   
    }

    input{
        width: 305px;
        height: 35.58px;
        color: #6C757D;
font-family: ABeeZee;
font-weight: regular;
font-size: 9.83px;
line-height: 18px;
letter-spacing: 0px;
text-align: left;
margin-bottom: 12px;
    }
    .mianyidu{
    width: 305px;
    height: 68.27px;
    background-color: #fff;
    padding: 10px 0px 0px 0px;
    .demo-rate-block{
        align-items: center;
        display: flex;
        margin-left: 12.26px;
      height: 25px;
        span{
            color: #000000;
font-family: Microsoft YaHei UI;
font-weight: light;
font-size: 8.71px;
line-height: 7.52px;
letter-spacing: 0.16px;
text-align: center;
margin-right: 16px;

        }
    }
}
}
.card-mian{
display: flex;
justify-content: center;
flex-wrap: wrap;


}
.card{
    width: 144px;
   margin-left: 12.28px;
    span{
        display: block;
        height: 27px;
        width: 144px;
        color: #212529;
font-family: Figma Hand;
font-weight: regular;
font-size: 13.89px;
line-height: 26.37px;
letter-spacing: 0px;
text-align: left;
margin-bottom: 8.79px;
    }
    .card-content{
        width: 144px;
        height: 129.63px;
        background-color: #fff;
        display: flex; // 使用 Flexbox 布局
    justify-content: center; // 水平居中
 
        
        ul{
            list-style: disc; // 添加这个属性来显示点
            padding-left: 0; 
            padding-top: 8.79px;
            margin: 0 auto; 
           li{
            color: #6C757D;
font-family: ABeeZee;
font-weight: regular;
font-size: 9.83px;
line-height: 18px;
letter-spacing: 0px;
text-align: left;
           }

        }
    }
}
</style>