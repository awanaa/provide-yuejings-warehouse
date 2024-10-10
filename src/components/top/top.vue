<template>
  <div class="top">
    <div class="logo">
      <img src="@/assets/home/logo.svg">
    </div>
    <div class="nav">
      <ul>
        <li v-for="item in navItems" :key="item.index" :class="{ active: activeIndex === item.index }"
          @click="changeActiveIndex(item.index)" class="let">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </li>
      </ul>

    </div>
    <div class="xiangqing">
      <div class="time">目前获得时长为 : <span>{{ time }}min</span></div>
      <div class="shezhi"><img src="../../assets/home/shezhi.svg"></div>
      <div class="lingsheng"><img src="../../assets/home/lingsheng.svg"></div>
      <div class="youtx" @click="toinfo"><img src="../../assets/home/touxiang.svg"></div>
      <div class="txt">
        <p class="title">Title</p>
        <p class="des">Description</p>
      </div>
      <el-dropdown>
    <span class="el-dropdown-link geren">
      <img src="../../assets/home/xia.svg">
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="toinfo">个人中心</el-dropdown-item>
        <el-dropdown-item @click="nologin">退出登录</el-dropdown-item>
        <!-- <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item disabled>Action 4</el-dropdown-item>
        <el-dropdown-item divided>Action 5</el-dropdown-item> -->
      </el-dropdown-menu>
    </template>
  </el-dropdown>
      <!-- <div class="geren"><img src="../../assets/home/xia.svg"></div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue';
const time = ref(0);
const activeIndex = ref('home'); // 默认激活首页
const navItems = ref([
  { index: 'home', path: '/home', name: '首页' },

  { index: 'task', path: '/task', name: '学习任务' },
  { index: 'news', path: '/ai', name: 'Ai助手' },
  { index: 'contact', path: '/contact', name: '应用管理' },
]);
onMounted(() => {
   const timed = localStorage.getItem('qiandaoData')
    time.value = timed ? JSON.parse(timed).lastReward : 0;
  const matchingNavItem = navItems.value.find(item => item.path === router.currentRoute.value.path);
  activeIndex.value = matchingNavItem ? matchingNavItem.index : 'home';
});
const route = useRoute();
function changeActiveIndex(index: string) {
  activeIndex.value = index;
};
function toinfo() {
  router.push('/person');
}
//退出登录
function nologin() {
  localStorage.removeItem('token');
  router.push('/login');
}
// 监听路由变化来更新activeIndex
watch(() => route.name, (newName) => {
  const matchingNavItem = navItems.value.find(item => item.name === newName);
  activeIndex.value = matchingNavItem ? matchingNavItem.index : 'home';
}, { immediate: true });

</script>

<style scoped lang="scss">
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.top {
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 79px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow:-11px 1px 21.5px 0px #b3b3b3;

  .logo {
    margin-left: 36px;
    margin-top: 16px;

    img {
      width: 118px;
      height: 53px;
    }
  }

  .nav {
    ul {
      display: flex;
      margin-right: 70px;
      li {
        // width: 119px;
        // height: 32px;

        // padding: 4px 30px;
        // border-radius: 40px;
        font-size: 15px;
        align-items: center;
        line-height: 32px;
        margin: 10px 30px;
        background: #fff;

        // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
        a {
          text-decoration: none;
          color: #000;
        }
      }
    }


  }

  .let.active a {
    padding: 4px 35px;
    border-radius: 40px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    color: #007AFF;
  }

  .xiangqing {
    display: flex;
    align-items: center;

    .time {
      padding: 30px 20px;

      span {
        color: #007AFF;
        background: url('../../assets/home/star.svg') no-repeat;
        background-position: center right;
      }
    }

    .shezhi,
    .lingsheng {
      img {
        margin-right: 22px;
      }
    }

    .youtx {
      margin-right: 10px;
    }

    .txt {
      margin-right: 10px;

      .title {
        color: #757575;
        font-family: Inter;
        font-weight: Semi Bold;
        font-size: 16px;
        line-height: 1.4;
        letter-spacing: 0px;
        text-align: left;

      }
      .des {
        color: #B3B3B3;
        font-family: Inter;
        font-weight: regular;
        font-size: 16px;
        line-height: 1.4;
        letter-spacing: 0px;
        text-align: left;
      }
    }
  }
}
</style>