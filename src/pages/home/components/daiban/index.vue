<template>
    <div class="mian">
        <div class="mian-top">
            <div class="tobe">TO BE DONE</div>
            <div class="rute">
                <component :is="tabs[currentTabIndex]"></component>
            </div>
        </div>
        <div class="buttom">
            <div class="xian"></div>
            <ul>
                <li @click="currentTabIndex = 0">
                    <img src="@/assets/home/bottom_one.svg">
                    <span class="text">复盘</span>
                </li>
                <li @click="currentTabIndex = 1">
                    <img src="@/assets/home/bottom_two.svg">
                    <span class="text">待办事项</span>
                </li>
                <li @click="currentTabIndex = 2">
                    <img src="@/assets/home/bottom_three.svg">
                    <span class="text">行程助手</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Daibaned1 from '@/pages/home/components/daiban/daiban-route/daibaned1.vue'
import Daibaned2 from '@/pages/home/components/daiban/daiban-route/daibaned2.vue'
import Daibaned3 from '@/pages/home/components/daiban/daiban-route/daibaned3.vue'
const tabs = [Daibaned1, Daibaned2, Daibaned3];
const currentTabIndex = ref(1);
</script>

<style scoped lang="scss">
.mian{
    width: 408px;
    height: 841px;
    margin-top: 118px;
    border-radius: 18.37px;
background: linear-gradient(179.36deg, #FFFFFF 0%, #4AA1FF 78%);
box-shadow: -3.86px 3.86px 3.86px 0px #0000003F;
display: flex; /* 设置为flex容器 */
  flex-direction: column; /* 子元素垂直排列 */
  align-items: center; /* 水平居中 */
  justify-content: center; 
.tobe{
    font-style: italic;
    width: 384px;
    height: 41.06px;
    border-radius: 31px;
background: #FFAA00;
color: #000000;
font-family: ABeeZee;
font-weight: Italic;
font-size: 19.45px;
line-height: 1.4;
letter-spacing: 3px;
text-align: center;
display: flex;
justify-content: center;
align-items: center;
}
.buttom{
   margin-top: auto;
    .xian{
        border: 1px solid #ffffff88;
        height: 0px;
        width: 335px;
       margin-bottom: 30px;
    }
    ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 335px;
    height: 40px;
    background-color: #fff;
    border-radius: 15px;
    margin-bottom: 17px;
    text-align: left;
}

ul li {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px; /* 初始padding */
    height: 24.5px;
    border-radius: 100px;
    background: #E5EDFA;
    border: 1px solid #C0D6ED;
    color: #000;
    transition: width 0.3s ease, padding 0.3s ease; /* 过渡效果 */
    position: relative; /* 相对定位，为子元素绝对定位做准备 */
    overflow: hidden; /* 隐藏超出部分的内容 */
}

ul li img {
    vertical-align: middle;
    transition: margin-right 0.3s ease; /* 添加过渡效果 */
}

ul li .text {
    display: none;
    margin-left: 2px; /* 文字与图片之间的距离 */
    color: #000000;
font-family: Microsoft YaHei UI;
font-weight: regular;
font-size: 8.14px;
line-height: 12.22px;



}

ul li:hover {
    width: 80px; /* 鼠标悬停时增加宽度 */
    padding: 5px 10px; /* 鼠标悬停时保持padding不变 */
}

ul li:hover img {
    margin-right: 5px; /* 鼠标悬停时，图标向右移动 */
}

ul li:hover .text {
    display: block; /* 鼠标悬停时显示文字 */
}
}
}
</style>