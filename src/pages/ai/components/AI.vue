<template>
	<div>
		<div class="top">
			<Top />
		</div>
		<div class="content">
			<div class="mian">
				<div class="row">
					<div class="left">
						<div class="row-title">
							<div class="row-title-1">
								<img src="../../../assets/ai/logo.png" alt="">
								<span>伴学助手</span>
							</div>
							<img src="../../../assets/ai/Sign_out.png" alt="">
						</div>
						<div class="row-top newmsg">
							<button class="new_convo" @click="newConversation">
								<img src="../../../assets/ai/fbad30d49556b2566a9af73e23c76cf.png" alt="">
								<span>新建对话</span>
							</button>


						</div>
						<div class="row-title row-search">
							<div class="row-title-1">
								<img src="../../../assets/ai/more.png" alt="">
								<span class="search">
									<input type="text" v-model="searchKeyword" placeholder="搜索对话..."
										@input="searchConversations" />
								</span>
							</div>
							<img src="../../../assets/ai/search.png" alt="">
						</div>
						<div class="bottom_buttons" @click="handlishi">
							<button @click="getConversationHistory">
								<img src="../../../assets/ai/history.png" alt="">
								<span>历史记录</span>
							</button>
						</div>
					
						<div class="spinner" v-if="showSpinner">

							<div v-for="(convo, convoIndex) in conversationHistory.slice().reverse()" :key="convoIndex"
								@click="selectConvo(convoIndex)" class="spinner-convo">
								<!-- 渲染每个对话的概要或标题 -->
								<div class="spinner-title">{{ convo[0].content }}</div>
								<div class="spinner-time">{{ convo[0].time }}</div>

								<img src="../../../assets/home/one_daibanshixiang/laji.svg" class="trash-icon"
									@click.stop="deleteConvo(convoIndex)">
							</div>
						</div>
					</div>
					<div class="right">
						<div class="right-top"><span>AI导师</span><img src="" alt=""></div>

						<div class="chatcontent" ref="chatContainer" v-if="shouye">
							<div v-for="(item, index) in allmessages" :key="index" class="chat-mian">
								<!-- 用户消息 -->
								<div class="user" v-if="item.sender === 'user'">
									<div class="beijing">{{ item.content }}</div>
									<div class="avatar-background">
										<img src="../../../assets/home/touxiang.svg" alt="" class="avatar">
									</div>
								</div>
								<!-- AI助手消息 -->
								<div v-else class="chat">

									<div class="avatar-background">
										<img src="../../../assets/ai/logo.png" alt="" class="avatar">
									</div>
									<div :id="item.messageId" class="beijing">{{ item.content }}</div>
								</div>
							</div>
						</div>
                        <div class="shouye" v-else>
							<div class="shouye-left">
								<div class="shouye-left-top">WELCOME TO </div>
								<div class="shouye-left-title">伴学助手</div>
								<div class="shouye-left-xian"></div>
								<div class="shouye-left-xiangqing">更好的<span>学习帮手</span>，为你的学习添柴助火</div>
								<div class="shouye-left-xiangqing shouye-left-w"><span>AI指导老师</span>全程在线，帮助你解答课程上的专业问题，轻松get知识点</div>
							</div>
							<div class="shouye-right">
								<img src="../../../assets/ai/Chat_search_fill.png" alt="">
							</div>
						</div>
						<div class="send" style="position: fixed; bottom: 20px; width: 65%; left: 25%;">
							<img src="../../../assets/ai/Folder_file_alt_light.png" alt="">
							<input type="text" v-model="chatContent" placeholder="你好，欢迎来到伴学助手，助力您的学习成长。"
								@keydown.enter="sendmessage(uuid)" />
							<img src="../../../assets/ai/Send_fill.png" alt="" @click="sendmessage(uuid)" v-if="loading">
							<div class="loader" v-else>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: rgb(129 174 212);
  border-radius: 50%;
  margin: 0 3px;
  animation: bounce 0.6s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}
.top {
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 10;
}
.shouye{
	border-radius: 25px;
background: #FFFFFF;
box-shadow: 2.66px 3.55px 3.55px 0px #1570D83F;
width: 40%;
height: 30%;
margin-top: 5%;
display: flex;

.shouye-left{
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-left: 10px;
	
	.shouye-left-top{
	color: #000000;
font-family: PingFang HK;
font-weight: semibold;
font-size: 34px;
line-height: normal;

}
.shouye-left-title{
	color: #217EBB;
font-family: PingFang HK;
font-weight: semibold;
font-size: 26px;
line-height: normal;
margin-bottom: 7px;
}
.shouye-left-xian{
	border-radius: 25px;
background: #3783EC;
box-shadow: 0px 2px 4px 0px #0000003F;
width: 70%;
height: 5px;
margin-bottom: 9px;
}
.shouye-left-w{
	width: 82%;
}
.shouye-left-xiangqing{
	
	color: #000;
font-family: PingFang HK;
font-weight: regular;
font-size: 14px;
line-height: normal;

text-align: center;
span{
	color: #007AFF;
}
}
}
.shouye-right{
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;

}
}
.spinner::-webkit-scrollbar {
	display: none;
	/* 隐藏滚动条 */
}

.spinner {

	display: flex;
	flex-direction: column;
	gap: 10px;
	max-height: 70vh;
	overflow-y: auto;
	scrollbar-width: none;

	.spinner-convo:hover {
		background: #F3F8FE;
	}

	.spinner-convo {
		padding: 10px;
		border-radius: 10px;
		background: #FFFFFF;
		box-shadow: 0px 1px 1px 0px #0000001A;
		cursor: pointer;
		position: relative;

		.spinner-title {
			color: #133564;
			font-family: Roboto;
			font-weight: medium;
			font-size: 14px;
			line-height: 20px;
			letter-spacing: 0.1px;
		}

		.spinner-time {
			color: #133564;
			font-family: Roboto;
			font-weight: medium;
			font-size: 12px;
			line-height: 17px;
			letter-spacing: 0.1px;
		}

		.trash-icon {
			background: none;
			border: none;
			cursor: pointer;
			/* 根据需要调整位置 */
			position: absolute;
			right: 10px;
			top: 20px;


		}
	}
}

.content {
	margin-top: 85px;
	height: calc(100vh - 80px);
	overflow: hidden;

	.mian {
		border: none;
		width: 100%;
		height: 100%;

		.row {
			display: flex;
			border-radius: 0px 10px 10px 0px;
			background: #FFFFFF;
			box-shadow: 29px -2px 29px 0px #6DA9EC3F;
			height: 100%;

			.left {
				width: 15%;
				height: 100%;
				display: flex;
				flex-direction: column;

				.row-title {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.row-title-1 {
						display: flex;
						align-items: center;

						.search {
							color: #474747;
							font-family: Roboto;
							font-weight: regular;
							font-size: 11.56px;
							line-height: 17.33px;
							letter-spacing: 0.36px;
							text-align: left;

							input {
								//去除边框
								border: none;
							}

						}

						span {
							color: #245AA6;
							font-family: Inter;
							font-weight: Bold Italic;
							font-size: 20px;
							line-height: normal;
							letter-spacing: 0px;

						}
					}
				}

				.row-search {
					border: 1px solid #E5EDFA;

				}

				.row-top {
					margin-bottom: 2px;
				}

				.newmsg {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.new_convo {
					margin-top: 10px;
					padding: 8px 40px;
					gap: 18px;
					align-items: center;
					cursor: pointer;
					user-select: none;
					border-radius: 4px;
					background: #6495ED;
					border: 1px #000;


					span {
						color: #F3F8FE;
						font-family: Roboto;
						font-weight: medium;
						font-size: 14px;
						line-height: 20px;
						letter-spacing: 0.1px;
						margin-left: 10px;

					}
				}

				.new_convo:hover {
					border-style: solid;
				}

				.bottom_buttons {
					margin-bottom: 10px;
					width: 100%;
					display: flex;
					flex-direction: column;
					gap: 10px;
					margin-top: 2px;
					border-radius: 4px;
					background: #E5EDFA;
					border: 1px solid #E5EDFA;

					button {
						padding: 8px 12px;
						/* display: flex; */
						gap: 18px;
						align-items: center;
						cursor: pointer;
						user-select: none;
						background: transparent;
						border: 1px solid #E5EDFA;
						border-radius: 4px;

					}

					span {
						color: #133564;
						font-family: Roboto;
						font-weight: medium;
						font-size: 14px;
						line-height: 20px;
						letter-spacing: 0.1px;
						text-align: center;
						margin-left: 5px;
					}
				}


			}

			.right {
				width: 85%;
				min-height: 100%;
				background-color: #b6d6f9;
				display: flex;
				flex-direction: column;
				align-items: center;

				.right-top {
					margin-top: 10px;
					width: 40%;
					border-radius: 100px;
					background: #FFFFFF;
					align-items: center;
					display: flex;
					justify-content: center;

					span {
						color: #007AFF;
						font-family: Inter;
						font-weight: medium;
						font-size: 16px;
						line-height: 20px;
						letter-spacing: 0px;
						text-align: left;

					}
				}

				.chatcontent::-webkit-scrollbar {
					display: none;
					/* 隐藏滚动条 */
				}

				.chatcontent {
					width: 75%;
					max-height: 70%;
					overflow-y: auto;
					scrollbar-width: none;

					.chat-mian {
						.avatar-background {
							width: 40px;
							height: 40px;
							border-radius: 50%;
							background-color: #fff;
							display: flex;
							justify-content: center;
							align-items: center;
							margin: 0 10px;

							.avatar {
								width: 80%;
								height: auto;
								border-radius: 50%;

							}
						}

						.beijing {

							border-radius: 25px;
							background: #FFFFFF;
							box-shadow: -3px 5px 4px 0px #1570D83F;
							padding: 10px;
							align-items: center;
							word-wrap: break-word;
							max-width: 85%;
							margin: 5px;
							padding: 10px 20px;
							line-height: 22px;
						}

						.user {
							display: flex;
							justify-content: flex-end;
							align-items: center;
							margin-top: 10px;

							img {
								width: 40px;
								height: 40px;
								border-radius: 50%;
							}
						}

						.chat {
							display: flex;
							justify-content: flex-start;

							margin-top: 10px;

							img {
								width: 30px;
								height: 30px;
								border-radius: 50%;
							}
						}
					}
				}

				.send {
					padding: 5px 10px;
					display: flex;
					align-items: center;
					border-radius: 13px;
					background: #FFFFFF;
					border: 1px solid #9797976D;
					box-shadow: 0px -41px 55px 0px #E5EDFA;

					input {
						flex-grow: 1;
						margin-right: 10px;
						padding: 8px;
						border: none;

					}
				}
			}
		}
	}
}
</style>

<script setup>
import Top from '@/components/top/top.vue'
import { ref, onMounted, watch, nextTick } from 'vue'
import axios, { all } from 'axios'
import { v4 as uuidv4 } from 'uuid';
import router from '@/router';
import { ElLoading } from 'element-plus'
const shouye = ref(true)
const loading = ref(true)
let dataObject = ref([])
const messages = ref([])
let allmessages = ref([])
let conversationHistory = ref([])
const selectedConvoIndex = ref(null);
const chatContent = ref('')
const uuid = ref('');
const currentUUID = ref('') // 存储当前对话的UUID
const chatContainer = ref(null)
let showSpinner = ref(true)

function generateUUID() {
	uuid.value = uuidv4();
	console.log(uuid)
	return uuid
}
// const { v4: uuidv4 } = require('uuid');
// if (localStorage.getItem('token') == null) {
// 	router.push('/login')
// }
onMounted(() => {

	scrollToBottom()
	generateUUID()
	localStorage.getItem('conversationHistory') && (conversationHistory.value = JSON.parse(localStorage.getItem('conversationHistory')))

	console.log(allmessages.value)
	if (allmessages.value && allmessages.value.length > 0) {
	
        shouye.value = true; // 如果有历史对话，则不显示shouye
      } else {
        shouye.value = false; // 如果没有历史对话，则显示shouye
      }
});
const elapsed = ref(0);
const timer = ref(null);
function newConversation() {
	generateUUID()
	allmessages.value = []
	shouye.value = false;
}
function handlishi() {
	showSpinner.value = !showSpinner.value
}
function selectConvo(convoIndex) {
	selectedConvoIndex.value = convoIndex; // 设置选中的对话索引
	const selectedConvo = conversationHistory.value[convoIndex];
	if (selectedConvo) {
		currentUUID.value = selectedConvo[0].convId; // 更新当前对话的UUID
		allmessages.value = selectedConvo; // 更新 allmessages 为选中的对话消息
		shouye.value = true; // 显示对话内容
	}
	nextTick(() => {
		scrollToBottom();
	});
}

function deleteConvo(convoIndex) {
	// 由于列表是倒序渲染的,计算正确的索引
	const actualIndex = conversationHistory.value.length - 1 - convoIndex;

	// 删除对话
	conversationHistory.value.splice(actualIndex, 1);
	allmessages.value = [];

	// 更新本地存储
	localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory.value));
}

//定位最新内容
function scrollToBottom() {
	if (chatContainer.value) {
		chatContainer.value.scrollTop = chatContainer.value.scrollHeight
	}
}
// 函数用于发送聊天内容并获取messageId
async function sendChatRequest(uuid) {
	shouye.value = true;
	messages.value = []
  loading.value=false
	try {
		const token = localStorage.getItem('token')
		const response = await axios.post('http://120.76.158.214:8081/api/v1/llmApp/chat', {
			// 根据您的ChatAiContentRequest结构来设置请求体
			convId: uuid, // 由uuid生成
			//   convId : uuidv4(),
			content: chatContent.value,// 假设这是聊天内容	  
		}, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		});
		console.log('Received response:', response.data);
		class DataObject {
			constructor(data) {
				this.data = data;
			}
		}
		dataObject.value = new DataObject(response.data.data);

		console.log(dataObject.value.data)
		if (chatContent.value.trim() !== '') {
			allmessages.value.push({
				messageId: uuidv4(),
				convId: uuid,
				content: chatContent.value,
				sender: 'user',
				time: new Date().toLocaleString()
			});
		}

		if (response.data && response.data.code === 200) {
			const messageId = response.data.data.messageId; // 假设返回的数据中包含messageId
			console.log('Received messageId:', messageId);
			allmessages.value.push({
				convId: uuid,
				messageId: messageId,
				content: null,
				sender: 'ai',
				time: new Date().toLocaleString()
			});
			nextTick(() => {
				scrollToBottom();
			});
			return messageId; // 返回messageId以供后续使用
		} else {
			console.error('Failed to get AI response:', response.data.message);
			return null;
		}
	} catch (error) {
		console.error('Error sending chat request:', error);
		return null;
	} finally {
		// 请求发送完毕后清空输入框
		saveConversationHistory(uuid.value, allmessages.value);
		chatContent.value = ''
		loading.value = true
	};
}
// 函数用于使用messageId连接到SSE流
function connectToMessageStream(messageId) {
	if (!messageId) {
		console.error('Invalid messageId');
		return;
	}

	const source = new EventSource(`http://120.76.158.214:8081/api/v1/llmApp/connect/${messageId}`);
	console.log('Connected to message', messageId);
	source.onopen = function () {
		console.log('Connection to server opened.');
	}
	source.onmessage = function (event) {

		try {
			const data = JSON.parse(event.data);
			console.log('Message from server:', data);
			console.log('Message :', JSON.parse(data).content);
			messages.value.push(JSON.parse(data).content);
			document.getElementById(`${messageId}`).innerHTML = messages.value.join('');

			nextTick(() => {
				scrollToBottom();
			});

		} catch (error) {
			console.error('Failed to parse message as JSON:', event.data, error);
		}
	};

	source.onerror = function (error) {
		console.error('EventSource failed:', error);
		// 根据错误类型进行不同的处理
		// 检查 error.target 是否存在
		if (error.target) {
			if (error.target.readyState === EventSource.CLOSED) {
				console.log('Connection was closed.');
			} else if (error.target.readyState === EventSource.CONNECTING) {
				console.log('Reconnecting...');
			} else {
				console.log('An unknown error occurred.');
			}
		} else {
			console.log('Error target is undefined.');
			
		}

		// 关闭连接

		source.close();
	
		
		setTimeout(() => {
			loading.value = true;
  }, 500);
  // 查找消息的索引
		const newContent = messages.value.join('');
		const index = allmessages.value.findIndex(item => item.messageId === messageId);
		// console.log('index:', index);
		// console.log(allmessages)
		// 如果消息存在，则更新它的内容
		if (index !== -1) {
			allmessages.value[index].content = newContent;
			saveConversationHistory(allmessages.value)
			//   console.log('更新不出来')
			//   console.log('Updated message:',  allmessages.value[index].content);
		} else {
			// console.log('找不到消息')
			console.log('Complete sentence:', messages.value.join(''));
		}

	};

};

// 添加其他事件监听，例如 onopen, onclose 等，如果需要的话


// 结合使用两个函数

async function sendmessage(chatContent) {

	sendChatRequest(chatContent).then(messageId => {

		if (messageId) {
			connectToMessageStream(messageId);

		} else {
			console.error('No messageId received, cannot connect to message stream.');

		}
	});
}
function saveConversationHistory(allmessages) {
	// 检查 `allmessages` 是否是一个数组
	if (allmessages && Array.isArray(allmessages)) {
		// 从本地存储获取历史记录
		const historyArray = conversationHistory.value;

		// 查找是否已存在具有相同 `convId` 的对话组
		const existingGroupIndex = historyArray.findIndex(group =>
			group[0] && allmessages[0] && group[0].convId === allmessages[0].convId
		);

		if (existingGroupIndex > -1) {
			// 如果找到，只添加尚未存在于该对话组中的新消息
			allmessages.forEach(msg => {
				if (!historyArray[existingGroupIndex].some(hmsg => hmsg.messageId === msg.messageId)) {
					historyArray[existingGroupIndex].push(msg);
				}
			});
		} else {
			// 如果没有找到，将整个新对话组添加到历史记录中
			historyArray.push(allmessages);
		}

		// 更新响应式引用
		conversationHistory.value = [...historyArray];
		// 更新本地存储
		localStorage.setItem('conversationHistory', JSON.stringify(historyArray));
	}

}

// 添加一个响应式数据属性来存储搜索关键字
const searchKeyword = ref('');
// 用于存储防抖的定时器ID
let debounceTimer = null;

// 创建一个防抖函数来搜索对话
function debounce(func, delay) {
	return function (...args) {
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
}

// 实际执行搜索的方法
function performSearch() {
	if (searchKeyword.value.trim() === '') {
		// 如果搜索关键字为空，则显示全部历史对话
		showSpinner.value = true;
		// 还原原始的对话历史
		conversationHistory.value = JSON.parse(localStorage.getItem('conversationHistory')) || [];
	} else {
		// // 过滤历史对话，基于搜索关键字 检查对话中是否有消息包含搜索关键字
		// const filteredConversations = conversationHistory.value.filter(convo => {
		//   return convo.some(msg => msg.content.toLowerCase().includes(searchKeyword.value.toLowerCase()));
		// 过滤历史对话，基于搜索关键字,检查对话的第一个消息（标题）是否包含搜索关键字
		const filteredConversations = conversationHistory.value.filter(convo => {
			return convo[0] && convo[0].content.toLowerCase().includes(searchKeyword.value.toLowerCase());
		});

		// 更新视图以显示搜索结果
		conversationHistory.value = filteredConversations;
		console.log(filteredConversations)
	}
}

// 使用防抖功能包装搜索方法
const debouncedSearch = debounce(performSearch, 300);

// 监听搜索关键字的变化，并调用防抖函数
watch(searchKeyword, (newValue, oldValue) => {
	debouncedSearch();
});
// sendChatRequest('你好，AI助手！')
</script>
