<template>
	<!-- 历史上的今天 -->
	<view class="historyCon">
		<view class="historyList" v-for="(item,index) in historyList" :key="item._id">
			<view class="title">{{index+1}}.{{item.title}}</view>
			<view class="des">{{item.des}}</view>
			<image v-if="item.pic!=''" class="imgs" :src="item.pic" mode=""></image>
		</view>
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant-weapp/dist/toast/toast';
	export default {
		data() {
			return {
				month: '',
				day: '',
				historyList: []
			}
		},
		onLoad() {
			var now = new Date();
			this.month = now.getMonth() + 1;
			this.day = now.getDate();
			this.getHistory()
			console.log(this.month, this.day)

		},
		methods: {
			getHistory() {
				if (this.cityName == "") {
					Toast("城市名称不能为空！")
				} else {
					this.$minApi.getHistory({
						v: '1.0',
						month: this.month,
						day: this.day,
						key: "1cc91f206cda183fb25d58c471793d2c"
					}).then(data => {
						this.historyList = data.data.result
						console.log(data)
					})
				}

			}
		}
	}
</script>


<style lang="scss">
	.historyCon {
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #FFF;

		.historyList {
			width: 100%;
			// background-color: rgb(65,168,99);
// color: #fff;
			margin-top: 20rpx;
			
			font-size: 32rpx;
			border-radius: 30rpx;
			padding: 20rpx;
			box-sizing: border-box;

			border: 2rpx solid rgb(65, 168, 99);
			color:#000;

			.title {
				font-size: 40rpx;
			}

			.des {
				margin-top: 20rpx;
				text-indent: 2em;

			}

			.imgs {
				width: 100%;
				border-radius: 30rpx;
				margin-top: 20rpx;
			}
		}
	}
</style>
