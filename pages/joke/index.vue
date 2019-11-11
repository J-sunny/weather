<template>

	<view class="jokeBox">
		<scroll-view class="scrollViewBox" :scroll-top="scrollTop" scroll-y="true" scroll-with-animation="true"
		 @scrolltolower="lower" @scroll="scroll">
			<view class="joke" v-for="item in jokeList" :key='item.hashId'>
				{{item.content}}
			</view>
			<view class="refresh" @click="getJoke()" @tap="goTop" v-if="showTop">刷新</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				jokeList: [],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				showTop:false
			}
		},
		methods: {
			getJoke() {
				this.$minApi.getJoke({
					key: "a5d995147d87d58091d1bf504b322f55"
				}).then(data => {
					console.log(data)
					this.jokeList = data.data.result
				})
			},
			lower(e) {
				console.log(e)
				this.showTop=true
			},
			scroll(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop(e) {
				this.showTop=false
				this.scrollTop = this.old.scrollTop
				this.$nextTick(() => {
					this.scrollTop = 0
				});
			}
		},
		created() {
			this.getJoke()
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.jokeBox {
		padding: 20rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		width: 100%;
		box-sizing: border-box;
		position: relative;
		height: 100%;

		.scrollViewBox {
			height: inherit;
			.refresh {
				width: 100rpx;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
				background: #FE6F45;
				color: #fff;
				position: fixed;
				border-radius: 50%;
				right: 20rpx;
				bottom: 100rpx;
			}

			.joke {
				background-color: rgb(65, 168, 99);
				margin-top: 20rpx;
				border-radius: 30rpx;
				padding: 20rpx;
				color: #fff;
				box-sizing: border-box;
			}
		}


	}
</style>
