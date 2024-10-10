<template>
    <div class="conmian">
    <div><Top /></div>
    <div class="zhuyao">
      <div class="mian">
       
        <div class="clas" v-if="showtop" @click="noshowtop"><Classtop @select-week="handleSelectWeek"  @course-list-updated="handleCourseListUpdated"/></div>
        <div class="back-to-top clas" v-else @click="noshowtop">
          <img src="../../assets/home/play.svg">
          <span>返回顶部</span>
        </div>
        <div class="classm"><classmian :selectedWeek="selectedWeek" :courseList="courseList" /></div>
      </div>
      <div class="daoshuri"><Daoshuri></Daoshuri></div>
      <div class="xian"></div>
      <div class="daiban"><Daiban></Daiban></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Top from '@/components/top/top.vue'
import Classtop from '@/pages/home/components/class/classtop.vue'
import classmian from '@/pages/home/components/class/classmian.vue';
import Daoshuri from '@/pages/home/components/doashuri/index.vue';
import Daiban from '@/pages/home/components/daiban/index.vue'
import { ref } from 'vue';
const selectedWeek = ref(1); // 默认选中第一周
const courseList = ref([]); // 初始化课程列表
// 模态框的显示状态
const dialogVisible = ref(false)

const showtop = ref(true);
const noshowtop = () => {
  showtop.value = !showtop.value;
};
const handleSelectWeek = (weekIndex: number) => {
  selectedWeek.value = weekIndex;
};
const handleCourseListUpdated = (courseListData: any) => {
  // 更新课程列表数据
  courseList.value = courseListData.data;
  console.log('接收到的课程列表数据:', courseList.value);
};
</script>

<style scoped lang="scss">
.conmian{
  height: 100%;
}
.back-to-top {
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 118px;
  background-color: rgb(229, 237, 250);
  border-radius: 10px;
  span{
    color: #65558F;
font-family: Roboto;
font-weight: medium;
font-size: 14px;
line-height: 20px;
letter-spacing: 0.1px;
text-align: center;
margin: 0px 10px;
  }
}

.zhuyao{  
    height: 1024px;
    display: flex;
    justify-content: center;
    background: linear-gradient(-179.65deg, #FEFEFF 0%, #8ABDF5 100%);
    .mian{
        display: flex;
        flex-direction: column;
        margin-right: 14px;
   
        .clas{
            margin-bottom: 11px;
           
        }
        .classm{
            width: 616px;
           
            flex-grow: 1;
        }
    }
    .xian{
        background: #e5edfa;
        width: 5px;
        height: 841px;
        margin: 118px 20px 0px 20px;
    }
    
}
</style>