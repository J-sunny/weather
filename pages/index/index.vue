<template>
	<view class="content">
		<view class="searchBox">
			<input class="weatherInput" type="text" v-model="cityName" placeholder="请输入城市名称" />
			<view class="weatherBtn" @click="getWeather()">查询</view>
		</view>


		<view class="weatherCon" v-if="weahterList.length!=0">
			<!-- 查询不到该城市 -->
			<view class="cityName" v-if="weahterList==null">暂不支持该城市，请检查城市名称是否输入正确！</view>
			<view v-if="weahterList!=null">
				<view class="cityName">{{weahterList.city}}</view>
				<view class="futureTitle">此时天气</view>
				<!-- 此时天气 -->
				<view class="realtimeCon">
					<!-- 温度 -->
					<view class="temperature">
						<text class="bigFont">{{weahterList.realtime.temperature}}</text>
						<text class="c">℃</text>
					</view>
					<!-- 天气 -->
					<view class="info">
						{{weahterList.realtime.info}}
					</view>
					<view class="otherCon">
						<!-- 风力 -->
						<view class="direct">
							<text>{{weahterList.realtime.power}}</text>
							<text>{{weahterList.realtime.direct}}</text>
						</view>
						<!-- 湿度 -->
						<view class="aqiCon">
							<text class="humidity"><text>湿度：</text>{{weahterList.realtime.humidity}}</text>
						</view>
						<!-- 空气质量 -->
						<view class="aqiCon">
							<text class="aqi"><text>空气质量指数：</text>{{weahterList.realtime.aqi}}</text>
						</view>
					</view>

				</view>

				<!-- 未来4天 天气-->
				<view class="futureTitle">未来4天</view>
				<view class="future">
					<view class="futureWeather" v-for="(item,index) in weahterList.future" :key="index">
						<text class="">{{item.date}}</text>
						<text class="">{{item.weather}}</text>
						<text class="">{{item.temperature}}</text>
						<text class="">{{item.direct}}</text>
					</view>
				</view>

			</view>


		</view>

		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant-weapp/dist/toast/toast';
	export default {
		data() {
			return {
				cityName: "",
				weahterList: []
			}
		},
		onLoad() {
			// this.getWeather()
			uni.getLocation({
				type: 'wgs84',
				success: (res) => {
					uni.request({
						header: {
							"Content-Type": "application/text"
						},
						url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude +
							'&key=MVGBZ-R2U3U-W5CVY-2PQID-AT4VZ-PDF35',
						success: (re) => {
							console.log(re)
							this.cityName = re.data.result.address_component.city.match(/(\S*)市/)[1]
							console.log(this.cityName)
							this.getWeather()
						}
					});
				}

			});
		},
		methods: {
			getWeather() {
				console.log(111)
				if (this.cityName == "") {
					Toast("城市名称不能为空！")
				} else {
					this.$minApi.getWeather({
						city: this.cityName,
						key: "db61840614edc100ece62ba71590e632"
					}).then(data => {
						this.weahterList = data.data.result
						console.log(data)
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 20rpx;
		box-sizing: border-box;

		.bigFont {
			font-size: 80rpx;
		}

		.searchBox {
			position:relative;
			width: 100%;
			height: 80rpx;
			.weatherInput {
				border: 2rpx solid rgb(65, 168, 99);
				// margin-top: 20rpx;
				font-size: 28rpx;
				border-radius: 30rpx;
				height: 80rpx;
				line-height: 80rpx;
				padding-left: 20rpx;
				box-sizing: border-box;
				background-color: #fff;
				color: #999;
				z-index: 99;
			}

			.weatherBtn {
				width: 140rpx;
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
				color: #fff;
				background-color: rgb(65, 168, 99);
				border-radius:0 30rpx 30rpx 0;
				position: absolute;
				right: 0;
				top: 0;
				font-size: 32rpx;
				z-index: 100;
			}
		}


		.weatherCon {
			.cityName {
				text-align: center;
				font-size: 40rpx;
				margin: 20rpx 0;
				font-weight: 1000;
			}

			// 此时天气
			.realtimeCon {
				width: 100%;
				background-color: rgb(65, 168, 99);
				color: #fff;
				border-radius: 30rpx;
				padding: 30rpx;
				margin-top: 40rpx;
				box-sizing: border-box;



				.temperature {
					position: relative;
					width: 140rpx;

					.c {
						position: absolute;
						top: 0;
						right: 0;
					}
				}

				.info {
					font-size: 28rpx;
					margin-left: 10rpx;
				}

				.otherCon {
					font-size: 32rpx;
				}
			}

			// 未来天气
			.futureTitle {
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
				// color: #fff;
				// background-color: rgb(65,168,99);
				margin-top: 40rpx;
				border-radius: 30rpx;

				color: rgb(65, 168, 99);
				border: 2rpx solid rgb(65, 168, 99);
			}

			.future {
				width: 100%;
				background-color: rgb(65, 168, 99);
				border-radius: 30rpx;
				color: #fff;
				padding: 30rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				margin-top: 40rpx;

				.futureWeather {
					margin-top: 20rpx;

					text {
						margin-right: 30rpx;
					}

				}

			}

		}
	}
</style>
