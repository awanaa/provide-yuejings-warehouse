<template>
  <div class="one">
    <div class="jishiqi">
      <div class="jishiqi-ing" v-if="isTiming">
        <div class="jishiqi-title">
      
          <span v-if="checklisting">{{ checklisting.checklistTitle }}</span>
          <img src="../../../../../assets/home/one_daibanshixiang/jiantou.png" alt="">
        </div>
        <div class="timer">
          <div class="timer-ding">{{ formattedTime }}</div>
          <div v-if="showStartButtons">
            <!-- 隐藏开始按钮 -->
            <!-- <button @click="start">开始</button> -->
            <button @click="stop">停止</button>
            <button @click="complete(checklisting)" class="jishi">结束计时</button>
          </div>
          <div v-else>
            <button @click="reset">重置</button>
            <button @click="resume" class="jishi">继续计时</button>
          </div>
        </div>
      </div>
      <div class="jishiqi-end" v-else>
        <div class="end-shang">
          <img src="../../../../../assets/home/one_daibanshixiang/checked.svg" alt="">
          <span v-if="checklisting">{{ checklisting.checklistTitle }}</span>
        </div>
        <div class="end-zhong">{{ formattedTime }}</div>
        <div class="end-xia">恭喜你已完成该待办</div>
      </div>
      <el-dialog v-model="jieshuzhuangtai" title="结束状态选择" style="width:511px">
    <form @submit.prevent="submitXgForm" class="form-item-center">
     <div>待办完成状态:</div>
    
        <el-switch
          v-model="userChoice"
          inline-prompt
          active-color="#D7F5E5"
          active-text="已完成"
          inactive-text="未完成"
          width="200px"
          size="large"
        />
  
    </form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="jieshuzhuangtai = false">取消</el-button>
        <el-button type="primary" @click="submitXgForm(checklisting)">提交</el-button>
      </div>
    </template>
  </el-dialog>
    </div>
    <!-- 本来是日历组件后来删了 -->
    <!-- <div class="rili">
        <div class="top">
          <div class="left">
            <span>Welcome back ,<span class="blue">Title</span>!</span>
          </div>
          <div class="right">
            <img src="../../../../../assets/home/Chevron.svg" @click="prevWeek" alt="Previous Week">
           
            <img src="../../../../../assets/home/Chevron (1).svg" @click="nextWeek" alt="Next Week">
          </div>
        </div>
        <div class="calendar">
    <div class="neirong">
      <div class="days">
        <div v-for="date in currentWeekDates" :key="date.getTime()" class="date-container">
          <span class="weekday" :class="{'weekend': isWeekend(date)}">{{ weekdays[date.getDay()] }}</span>
          <div class="dayss" :class="{'today-circle': isToday(date)}" :style="{'--circle-color': '#3498db'}">
            {{ date.getDate() }}
          </div>
        </div>
      </div>
    </div>
  </div>
      </div> -->
    <div class="daiban">
      <div class="but">
        <button @click="qingkongbiaodan" class="tianjiadaiban">
          <img src="../../../../../assets/home/Trailing-Elements.svg" alt="">
          <span>添加新的待办</span>
        </button>
        <el-dialog v-model="showForm" title="添加待办事项"   style="max-width: 600px">
          <span>
            <form @submit.prevent="submitForm"  label-width="auto" style="max-width: 600px">
              <div class="form-row">
                <div class="form-column">
                  <el-form-item label="待办标题:">
          <el-input v-model="formData.checklistTitle" class="custom-input" required maxlength="10"
            show-word-limit ></el-input>
        </el-form-item>
        <el-form-item label="截止时间:">
          <el-date-picker
            v-model="formData.deadline"
            type="datetime"
            placeholder="选择日期时间"
            class="custom-date-picker"
            :picker-options="pickerOptions"
            required
          ></el-date-picker>
        </el-form-item>
                  <el-form-item label="待办类型:">
                    <el-select v-model="formData.checklistType" class="custom-select" required>
            <el-option label="请选择待办类型" value=""></el-option>
            <el-option label="普通计时" value="1"></el-option>
            <el-option label="普通不计时" value="2"></el-option>
            <el-option label="循环计时" value="3"></el-option>
            <el-option label="循环不计时" value="4"></el-option>
          </el-select>
                  </el-form-item>

                </div>
                <div class="form-column">
                  <el-form-item label="优先级:">
                    <el-select v-model="formData.priority" class="custom-select" required>
            <el-option label="请选择优先级" value=""></el-option>
            <el-option label="紧急" value="0"></el-option>
            <el-option label="最重要" value="1"></el-option>
            <el-option label="次要" value="2"></el-option>
          </el-select>
                  </el-form-item>
                <el-form-item label="某日必做:(选填)">
                  <el-date-picker
            v-model="formData.mustDoDay"
            type="date"
            placeholder="选择日期时间"
            class="custom-date-picker"
           
            required
          ></el-date-picker>
                  </el-form-item>

                </div>
              </div>
            
            </form>
          </span>
          <template #footer>
      <div class="dialog-footer">
        <el-button   @click="showForm = false">取消</el-button>
        <el-button type="primary" @click="submitForm">
       添加
        </el-button>
      </div>
    </template>

        </el-dialog>
        <button class="lajitong tianjiadaiban">
          <img src="../../../../../assets/home/one_daibanshixiang/laji.svg" alt="" @click="toggleArrowss"
            v-if="!showXCircle">
          <span v-else @click="toggleArrowss">完成</span>
        </button>
      </div>
      <!-- <div>
            <img src="../../../../../assets/home/one_daibanshixiang/weikaishi.png" alt="">
          </div> -->
      <div class="content-daiban">

        <div class="content-daiban-card" v-for="(item, index) in CheckListGetChecklistsdata" :key="index">

          <div class="shang">
            <div class="card-left">
              <!-- 当checklistType为1时显示播放按钮，并绑定点击事件 -->
              <img v-if="item.checklistType === 1 || item.checklistType === 3" :src="bofanImage" alt=""
                @click="startChecklistTimer(item.checklistId)">
              <!-- 当checklistType为2时显示未选中图片，并根据是否完成显示选中或悬浮图片 -->
              <img v-else-if="item.checklistType === 2|| item.checklistType === 4" :src="getImageSrc(item)" alt=""
                @click="confirmChecklistCompletion(item)" @mouseover="hoveredImage = item.checklistId"
                @mouseleave="hoveredImage = null">
            </div>
            <div class="card-text">
              <span class="title">{{ item.checklistTitle }}</span>

            </div>
            <div class="card-right">
              <!-- 使用 v-if/v-else 来切换图标 -->
              <img v-if="showXCircle" src="../../../../../assets/home/one_daibanshixiang/x-circle(1).svg" alt=""
                style="margin-top: 4px;" @click="shanchudaiban(item.checklistId)">
              <img v-else src="../../../../../assets/home/one_daibanshixiang/right.svg" alt=""  @click="editChecklist(item)">
           
            </div>
              <!-- 修改待办事项的对话框 -->
  <el-dialog v-model="isEditing" title="修改待办" style="max-width: 600px">
    <span>
      <form @submit.prevent="submitEditForm" :model="editFormData">
        <div class="form-row" >
                <div class="form-column">
                  <el-form-item label="待办标题:">
          <el-input v-model="editFormData.checklistTitle" class="custom-input" required></el-input>
        </el-form-item>
        <el-form-item label="截止时间:">
          <el-date-picker
            v-model="editFormData.deadline"
            type="datetime"
            placeholder="选择日期时间"
            class="custom-date-picker"
            :picker-options="pickerOptions"
            required
          ></el-date-picker>
        </el-form-item>
                  <el-form-item label="待办类型:">
                    <el-select v-model="editFormData.checklistType" class="custom-select" required>
            <el-option label="请选择待办类型" value=""></el-option>
            <el-option label="普通计时" value="1"></el-option>
            <el-option label="普通不计时" value="2"></el-option>
            <el-option label="循环计时" value="3"></el-option>
            <el-option label="循环不计时" value="4"></el-option>
          </el-select>
                  </el-form-item>

                </div>
                <div class="form-column">
                  <el-form-item label="优先级:">
                    <el-select v-model="editFormData.priority" class="custom-select" required>
            <el-option label="请选择优先级" value=""></el-option>
            <el-option label="紧急" value="0"></el-option>
            <el-option label="最重要" value="1"></el-option>
            <el-option label="次要" value="2"></el-option>
          </el-select>
                  </el-form-item>
                <el-form-item label="某日必做:(选填)">
                  <el-date-picker
            v-model="editFormData.mustDoDay"
            type="date"
            placeholder="选择日期时间"
            class="custom-date-picker"
            :picker-options="pickerOptions"
            required
          ></el-date-picker>
                  </el-form-item>

                </div>
              </div>
      </form>
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isEditing = false">取消</el-button>
        <el-button type="primary"  @click="submitEditForm">保存</el-button>
      </div>
    </template>
  </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, computed, onMounted, onUnmounted, onBeforeUnmount } from 'vue';
import { getCheckListGetChecklists, postCheckListTimerStart, postCheckListTimerEnd, postCheckListUpdate, postCheckListAdd,postCheckListDelete } from "@/api/home"
import { DaibanData } from '@/types/home';
import bofanImage from '../../../../../assets/home/one_daibanshixiang/bofan.png';
import checkedImage from '../../../../../assets/home/one_daibanshixiang/checked.png';
import checkHoverImage from '../../../../../assets/home/one_daibanshixiang/check_hover.png';
import uncheckImage from '../../../../../assets/home/one_daibanshixiang/uncheck.png';

//清空表单信息
const qingkongbiaodan = () => {
  showForm.value = true;
  resetForm();
};
//编辑表单
const isEditing = ref(false);// 是否处于编辑状态
const editFormData = ref({
  checklistTitle: '',
  checklistType: 0,
  priority: '',
  deadline: '',
  mustDoDay: '',
  timeSpan: 1,
  checklistStatus: '',
  timeDuration: '',
  todayDoTime: '',
  checklistId:null
});
// 编辑待办事项
const editChecklist = (item) => {
  console.log('编辑待办事项', item);
  isEditing.value = true; 

  editFormData.value = {
    checklistId: item.checklistId, 
    checklistTitle: item.checklistTitle, 
    checklistType: item.checklistType, 
    priority: item.priority, 
    deadline: item.deadline, 
    mustDoDay: item.mustDoDay,
    timeSpan: item.timeSpan,
    checklistStatus: item.checklistStatus,
    timeDuration: item.timeDuration,
    todayDoTime: item.todayDoTime

  };
  console.log('编辑', editFormData.value);
};

// 提交编辑表单
const submitEditForm = async () => {
  try {

    await postCheckListUpdate(editFormData.value);

    isEditing.value = false;

    ElMessage({
      type: 'success',
      message: '待办事项更新成功！',
    });
    // 刷新待办列表
    getCheckListGetChecklist();
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '更新待办事项失败，请稍后再试。',
    });
    console.error(error);
  }
};
//添加待办
const showForm = ref(false);
const formData = ref({
  checklistTitle: '',
  checklistType: 0,
  priority: '',
  deadline: '',
  mustDoDay: '',
  timeSpan: 1,
  checklistId:'',
  checklistStatus: '',
  timeDuration: '',
  todayDoTime: '',
});
const resetForm = () => {
  formData.value = {
    checklistTitle: '',
  checklistType: 0,
  priority: '',
  deadline: '',
  mustDoDay: '',
  timeSpan: 1,
  checklistId:'',
  checklistStatus: '',
  timeDuration: '',
  todayDoTime: '',
  };
};
const submitForm = async () => {
  const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; 
};
const formatDate1 = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
const formatDateString = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return formatDate(date);
  };
  try {

    await postCheckListAdd({
      ...formData.value,
      mustDoDay: formData.value.mustDoDay ? formatDate1(formData.value.mustDoDay) : '',
      deadline: formData.value.deadline ? formatDateString(formData.value.deadline) : '',
    });

    showForm.value = false;
    console.log('添加待办事项成功', formData.value);

     ElMessage({
      type: 'success',
      message: '待办事项添加成功！',
    });
    console.log('添加待办事项成功', formData.value);
    // 刷新待办列表
    getCheckListGetChecklist();
    // 清空表单
    resetForm();


  } catch (error) {
    ElMessage({
      type: 'error',
      message: '添加待办事项失败，请稍后再试。',
    });

    console.log('添加待办事项发给后端的数据', formData.value);
    console.error(error);
  }
};

//上面是添加待办


const hoveredImage = ref(null); // 用于追踪鼠标悬停的待办事项的ID

const getImageSrc = (item) => {
  if (item.isChecked) {
    return checkedImage;
  } else if (hoveredImage.value === item.checklistId) {
    return checkHoverImage;
  } else {
    return uncheckImage;
  }
};

const confirmChecklistCompletion = async (item) => {
  ElMessageBox.confirm(
    '是否确认该待办已经完成？',
    '温馨提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    item.isChecked = true; // 更新待办事项的状态为已完成
    // 构造更新状态所需的数据对象
    const updateData: DaibanData = {
      checklistId: item.checklistId,
      checklistTitle: item.checklistTitle,
      checklistType: item.checklistType,
      priority: item.priority,
      deadline: item.deadline,
      mustDoDay: item.mustDoDay,
      timeSpan: item.timeSpan,
      checklistStatus: 2, // 设置状态为已完成
      timeDuration: item.timeDuration,
      todayDoTime: item.todayDoTime
    };


      // 发送请求到服务器更新状态
      const response = await postCheckListUpdate(updateData);
      console.log(updateData)
      console.log('待办事项更新成功', response);
     
      ElMessage({
        type: 'success',
        message: '待办事项已完成！',
      });
      // 刷新待办列表
      getCheckListGetChecklist();
      }).catch((error) => {
      console.error('待办状态更新失败', error);
      ElMessage({
        type: 'error',
        message: '待办状态更新失败',
      });
    });
};

//垃圾桶逻辑
// 初始状态为不显示垃圾桶图标
const showXCircle = ref(false);

// 切换垃圾桶图标的显示状态
const toggleArrowss = () => {
  console.log('点击了箭头图标');
  showXCircle.value = !showXCircle.value;
};
//删除待办事项
const shanchudaiban =  (checklistId:number) => {

  ElMessageBox.confirm(
    '你确定删除该待办吗',
    '温馨提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  .then(async () => {
      console.log('传递给后端的数据:', { checklistId });
        const response = await postCheckListDelete(checklistId);
        console.log('待办事项删除成功', response);
        ElMessage({
          type: 'success',
          message: '待办事项删除成功！',
        });
        getCheckListGetChecklist();
      })
    .catch((error) => {
      console.error('待办事项删除失败', error);
      ElMessage({
        type: 'error',
        message: '删除待办事项失败，请稍后再试。',
      });
    });
};

//定时器逻辑
const timer = ref(null);
const elapsed = ref(parseInt(localStorage.getItem('elapsed')) || 0);
const showStartButtons = ref(false);
const isTiming = ref(false); // 控制计时状态
const formattedTime = computed(() => {
  const date = new Date(null);
  date.setSeconds(elapsed.value); // 设置秒
  const utc = date.toUTCString();
  return utc.substr(utc.indexOf(':') - 2, 8); // 返回格式化的时间
});

const start = () => {
  isTiming.value = true; // 开始计时
  showStartButtons.value = true;
// 记录开始计时的时间戳
const startTime = new Date().getTime();
  localStorage.setItem('startTime', startTime.toString());
  if (!timer.value) {
    timer.value = setInterval(() => {
      elapsed.value++;
      localStorage.setItem('elapsed', elapsed.value); // 更新本地存储
    }, 1000);
  }
};

const stop = () => {
  clearInterval(timer.value);
  timer.value = null;
  showStartButtons.value = false;
};

const resume = () => {
  start();
};

const reset = () => {
  clearInterval(timer.value);
  timer.value = null;
  elapsed.value = 0;
  localStorage.removeItem('elapsed'); // 清除本地存储
  localStorage.removeItem('startTime'); // 清除开始时间
  showStartButtons.value = false;
};
const jieshuzhuangtai = ref(false);//结束状态的弹窗
const userChoice = ref(false); // 用户选择的结束状态
const submitXgForm = (checklisting) => {
  jieshuzhuangtai.value = false;
  complete(checklisting,userChoice.value);
 
  
};
const complete = (checklisting,userChoice:boolean) => {
  if (elapsed.value < 60) {
    // 如果计时不满一分钟，弹出确认对话框
    const userConfirmed = confirm('计时不满一分钟，不会进入复盘。确定要结束并重新计时吗？');
    if (userConfirmed) {
      reset(); // 用户确认后，重置计时器
      sendDataToBackend(0, 0, currentTimingChecklistId.value); // 传递0分钟给后端
      isTiming.value = false; // 结束计时
      //移除本地elapse
      localStorage.removeItem('elapsed');
    }
    // 如果用户点击取消，则什么也不做，计时器继续运行
  } else {
    // 如果计时超过一分钟，弹出带有滑块的确认对话框
    jieshuzhuangtai.value = true;
    if (userChoice === true) {
      clearInterval(timer.value);
      timer.value = null;
      const minutes = Math.floor(elapsed.value / 60); // 转换为分钟
     
      showStartButtons.value = false;
      isTiming.value = false; // 结束计时
      currentTimingChecklistId.value=checklisting.checklistId;
      sendDataToBackend(minutes, 2,currentTimingChecklistId.value); // 传递分钟数和状态给后端
      localStorage.removeItem('elapsed'); // 清除本地存储
      jieshuzhuangtai.value = false;
    } else if (userChoice === false) {
      clearInterval(timer.value);
      timer.value = null;
      const minutes = Math.floor(elapsed.value / 60); // 转换为分钟
      localStorage.removeItem('elapsed'); // 清除本地存储
      reset(); // 重置计时器
      showStartButtons.value = false;
      isTiming.value = false; // 结束计时
      currentTimingChecklistId.value=checklisting.checklistId;
      sendDataToBackend(minutes, 1,currentTimingChecklistId.value); // 传递分钟数和状态给后端
      localStorage.removeItem('elapsed'); // 清除本地存储
      jieshuzhuangtai.value = false;
    }
    // 如果用户点击取消或关闭对话框，则什么也不做，计时器继续运行
  }
};

const sendDataToBackend = async (minutes, status,currentTimingChecklistId) => {
  // 构造请求数据
  console.log(currentTimingChecklistId)
  const data: DaibanData = {
    checklistId: currentTimingChecklistId, 
    checklistStatus: status, // 根据用户的选择设置状态
    doTime: minutes // 传递进来的分钟数
  };
  console.log(data)
  // 调用 postCheckListTimerEnd 函数发送数据
  try {
    const response = await postCheckListTimerEnd(data);
    console.log(`Time: ${minutes} minutes and status:${status} has been sent to the backend. Response:`, response);
    ElMessage({
        type: 'success',
        message: '待办事项已完成！',
      });
   
  } catch (error) {
    console.error(`Failed to send time: ${minutes} minutes and status:${status} to the backend. Error:`, error);
  }
};


onMounted(() => {
 // 页面加载时执行
const initTimer = () => {
  const startTime = localStorage.getItem('startTime');
  const elapsedValue = localStorage.getItem('elapsed');

  // 如果本地存储中有开始时间和已过时间
  if (startTime !== null && elapsedValue !== null) {
    // 计算页面加载时的时间差并更新已过时间
    const currentTime = new Date().getTime();
    const timeDiff = Math.floor((currentTime - parseInt(startTime)) / 1000);
    elapsed.value = parseInt(elapsedValue) + timeDiff;
    console.log('已过时间:', elapsed.value);
    start();
  }
};
 initTimer();
  const storedChecklisting = localStorage.getItem('checklisting');
  if (storedChecklisting) {
    checklisting.value = JSON.parse(storedChecklisting);
  }
});

onBeforeUnmount(() => {
  // 组件销毁前清除定时器
  if (timer.value) {
    clearInterval(timer.value);
  }
});
//上面是定时器
const CheckListGetChecklistsdata = ref()
onMounted(async () => {
  await getCheckListGetChecklist();

});

const getCheckListGetChecklist = async () => {
  const params = {
  };
  try {
    const result = await getCheckListGetChecklists(params);
     CheckListGetChecklistsdata.value = result.data.filter(item => [0, 1, 3].includes(item.checklistStatus));
   
    console.log(result)
  } catch (error) {
    // console.error('获取待办事项列表失败:', error);

  }
};
let checklisting = ref()
const currentTimingChecklistId = ref(null);
const startChecklistTimer = async (checklistId) => {
  try {
    const data = checklistId;
    currentTimingChecklistId.value = checklistId;
    const response = await postCheckListTimerStart(data);

    if (response.code === 200) {
      console.log('计时开始成功:', response);
      checklisting = response.data;
      console.log(checklisting);
      //清空时间
      reset();
      start();
      localStorage.setItem('checklisting', JSON.stringify(checklisting));
    } else if (response.code === 500) {
      console.error('计时开始失败:', response.data);
      isTiming.value = true;
     
    }
  } catch (error) {
    console.error('计时开始请求失败:', error);
    isTiming.value = true;
  }
};
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const currentDate = ref(new Date());

const currentWeekDates = computed(() => {
  const startOfWeek = new Date(currentDate.value);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });
});

function prevWeek() {
  const startOfWeek = new Date(currentDate.value);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  currentDate.value = new Date(startOfWeek.setDate(startOfWeek.getDate() - 7));
}

function nextWeek() {
  const startOfWeek = new Date(currentDate.value);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  currentDate.value = new Date(startOfWeek.setDate(startOfWeek.getDate() + 7));
}

function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

function isWeekend(date: Date): boolean {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // 0 is Sunday, 6 is Saturday
}

</script>


<style scoped lang="scss">
  .form-item-center {
    text-align: center;
  }
//下面是添加待办表单的样式
.custom-select {
  border: 1px solid #dcdfe6; /* 边框颜色 */
  border-radius: 4px; /* 边框圆角 */
}
.form-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end; /* 将按钮推到右边 */
}

.form-column {
  display: flex;
  flex-direction: column;
  width: 45%;
}
.one {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.jishiqi {
  margin-top: 8px;
  width: 374px;
  height: 200px;
  border-radius: 21.82px;
  background: #FFFFFF;
  box-shadow: 0px 4.55px 13.64px 0px #74B4F9;

  .jishiqi-ing {
    .jishiqi-title {
      display: flex;
      justify-content: space-between;
      height: 39px;
      border-radius: 10px;
      background: #518BFF;
      align-items: center;

      span {
        line-height: 39px;
        color: #FFFFFF;
        font-family: Microsoft YaHei UI;
        font-weight: bold;
        font-size: 14px;
        letter-spacing: 0px;
        text-align: left;
        margin-left: 16px;
      }

      img {
        margin-right: 16px;
      }
    }

    .timer {

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 180px;
      margin: 0 auto;

      .timer-ding {
        color: #13457B;
        font-family: Microsoft YaHei UI;
        font-weight: bold;
        font-size: 36px;
        line-height: 19.79px;
        letter-spacing: 0px;
        text-align: left;
      }

      button {
        width: 68px;
        height: 33px;
        margin-top: 37px;
        margin-left: 9px;
        border-radius: 13px;
        background: #FFFFFF;
        border: 0.99px solid #7CBBFF;
        box-shadow: 0px 3.65px 10.95px 0px #252C6126, 0px 1.46px 2.92px 0px #8890C233;
        color: #7CBBFF;
        font-family: Lato;
        font-weight: bold;
        font-size: 10.22px;
        line-height: 1;
        letter-spacing: 0px;
      }
     button:hover {
        background: #eeeded;
      }
      .jishi {
        width: 90px;
        border-radius: 13px;
        background: #888FFF;
        box-shadow: 0px 3.7px 11.1px 0px #252C6126, 0px 1.48px 2.96px 0px #8890C233;
        color: #FFFFFF;
        font-family: Lato;
        font-weight: bold;
        font-size: 10.36px;
        line-height: 1;
        letter-spacing: 0px;
      }
      .jishi:hover {
        background: #6066C9;
      }
    }
  }

  .jishiqi-end {
    display: flex;
    /* 使用flex布局 */
    flex-direction: column;
    /* 子元素垂直排列 */
    justify-content: center;
    /* 垂直居中 */
    align-items: center;
    /* 水平居中 */
    height: 100%;

    .end-shang {
      display: flex;
      align-items: center;

      span {
        margin-left: -26px;
        color: #589CE5;
        font-family: Microsoft YaHei UI;
        font-weight: bold;
        font-size: 24px;
        line-height: 21.03px;
        letter-spacing: 0px;

      }
    }

    .end-zhong {
      color: #10437A;
      font-family: Microsoft YaHei UI;
      font-weight: bold;
      font-size: 22px;
      line-height: 16.44px;
      letter-spacing: 0px;
      margin-top: 16px;
    }

    .end-xia {
      color: #3082F4;
      font-family: Microsoft YaHei UI;
      font-weight: bold;
      font-size: 14px;
      line-height: 1;
      letter-spacing: 0px;
      margin-top: 16px;
    }
  }
}

.rili {
  width: 384px;
  height: 171px;
  border-radius: 0px 0px 45px 46px;
  background: linear-gradient(180deg, #FFFFFF 0%, #4AA1FF 100%);
  padding: 30px 20px 0 20px;

  .top {
    display: flex;
    justify-content: space-between;

    .left {
      span {
        color: #000000;
        font-family: ABeeZee;
        font-weight: regular;
        font-size: 18px;
        line-height: 12.4px;
        letter-spacing: 0.26px;
        text-align: left;

        .blue {
          color: #163bf5;
        }
      }
    }

    .right {
      display: flex;
    }
  }

}

.daiban {
  width: 358px;
  max-height: 496px;
  margin-top: 18px;

  .but {
    display: flex;
    justify-content: flex-end;

    .tianjiadaiban {
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
      margin-right: 10px;
    }

    .lajitong {
      width: 40px;
    }
  }

  .but button:hover {
    background: #eeeded;
  }
  //隐藏滚动条
.content-daiban::-webkit-scrollbar {
    display: none;
}
  .content-daiban {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 10px;
    max-height: 466px;
    overflow-y: auto;
    .content-daiban-card {
      height: 54px;
      border-radius: 7.47px;
      background: linear-gradient(-71.6deg, #D0BDFF 0%, #6F8EFF 100%);
      flex: 0 0 auto;
      margin-bottom: 11px;
      padding: 0px 10px;
      margin-left: 10px;

      .shang {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: auto;
        /* 让宽度根据内容自动调整 */
        min-width: 104px;
        max-width: 408px;

        .card-text {
          display: inline-block;
          padding: 0px 4px 2px 4px;
          min-height: 16px;
          white-space: nowrap;

          .title {
            color: #FFFFFF;
            font-family: 'Microsoft YaHei UI';
            font-weight: normal;
            font-size: 12.8px;
            line-height: 11.21px;
            letter-spacing: 0px;
            text-align: left;
          }
        }
      }

    }
  }
}

.weekdays span,
.days div {
  display: inline-block;
  font-family: Inter;
  font-size: 13.85px;
  width: 2.5em;
  height: 2.5em;
  text-align: center;
  line-height: 2.3em;
}

.dayss {
  color: #007AFF;


}

.weekdays {
  font-weight: regular;

}


.today-circle {
  margin: 0;
  position: relative;
  display: inline-block;
  line-height: 2.5em;
  width: 2.5em;
  height: 2.5em;
  text-align: center;
  border-radius: 50%;
  background-color: var(--circle-color);
  color: white;
}

.neirong .days .date-container {
  background-image: url(../../../../../assets/home/daiban-bgm.svg);
  height: 83.54px;
  width: 46.52px;
  margin-left: 1.9px;
  padding: 10px 0px 0px 0px;
}

.weekend {
  color: #F36A6A;
}

.neirong {
  margin-top: 19.23px;
}
</style>