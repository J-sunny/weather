<template>
	<view class="codeBox">
		<view class="text">
			<textarea v-model="text" placeholder="请输入要生成二维码的内容" />
			</view>
		<view class="logo" v-if="false">
			<view class="logoTitle">
				选择中间Logo:
			</view>
			<image @click="selectLogo()" class="codeLogo" v-if="logo!=''" :src="logo" mode=""></image>
			<view  v-if="logo==''" class="imgDiv" @click="selectLogo()">
				<view class="add">+</view>
			</view>
		</view>
		<view class="confirm" @click="getCode()">确认</view>
		<view class="qrCodeBox" v-if="makeCode!=''">
			<image class="qrCodePic" :src="makeCode"  @longpress="saveImg"></image>
			<view class="totses">长按保存</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:"",
				logo:"",
				logos:"",
				w:"",
				m:"",
				lw:"",
				makeCode:"",
				baseCode:""
			}
		},
		methods: {
			
			selectLogo(){
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['compressed'], //压缩图，
				    sourceType: ['album'], //从相册选择
				    success: (res)=> {
						this.logo="data:image/jpeg;base64,"+wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64")
						 this.logos=encodeURI(wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64"))
				    },
					
				});
			},
			getCode(){
				this.$minApi.getCode({
					text:this.text,
					bgcolor:"ffffff",
					fgcolor:"000000",
					logo:this.logos,
					w:this.w,
					m:this.m,
					lw:"30",
					type:"1",
					key: "e7a5d06a73fdf487dc5b54f7bda2fb82"
				}).then(data => {
					console.log(data)
					// this.makeCode=data.data.data
					this.baseCode=data.data.result.base64_image
					this.makeCode="data:image/jpeg;base64,"+this.baseCode
				})
			},
			// 长按保存图片
			  saveImg(e){
				  console.log(e)
			    let url = this.baseCode;
				
			    //用户需要授权
			    wx.getSetting({
			      success: (res) => {
			        if (!res.authSetting['scope.writePhotosAlbum']) {
			          wx.authorize({
			            scope: 'scope.writePhotosAlbum',
			            success:()=> {
			              // 同意授权
			              this.saveImg1(url);
			            },
			            fail: (res) =>{
			              console.log(res);
			            }
			          })
			        }else{
			          // 已经授权了
			          this.saveImg1(url);
			        }
			      },
			      fail: (res) =>{
			        console.log(res);
			      }
			    })   
			  },
			  
			  saveImg1(url){
				  var save = wx.getFileSystemManager();
				  var number = Math.random();
				   var imgSrc =  this.baseCode;//base64编码
			   save.writeFile({
			         filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
			         data: imgSrc,
			         encoding: 'base64',
			         success: res => {
			           wx.saveImageToPhotosAlbum({
			             filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
			             success: function (res) {
			               wx.showToast({
			                 title: '保存成功',
			               })
			             },
			             fail: function (err) {
			               console.log(err)
			             }
			           })
			           console.log(res)
			         }, fail: err => {
			           console.log(err)
			         }
			       })
			  },
		},
		created() {
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss">
	.codeBox{
		padding:20rpx;
		box-sizing: border-box;
		.text{
			font-size: 32rpx;
			width: 100%;
			border: 2rpx solid rgb(65, 168, 99);
			border-radius:30rpx;
			padding:20rpx;
			box-sizing: border-box;
			textarea{
				width: 100%;
				overflow-y: auto;
			}
			
		}
		.confirm{
			width: 100%;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			color: #FFFFFF;
			border-radius: 30rpx;
			background: rgb(65, 168, 99);
			margin-top: 20rpx;
		}
		.qrCodeBox{
			width: 400rpx;
			height: 400rpx;
			margin:40rpx auto;
			.qrCodePic{
				display: inline-block;
				width: 400rpx;
				height: 400rpx;
			}
			.totses{
				text-align: center;
				font-size: 28rpx;
			}
		}
		.logo{
			.logoTitle{
				font-size: 32rpx;
				margin-bottom: 20rpx;
			}
			.codeLogo{
				width: 200rpx;
				height: 200rpx;
				border-radius: 30rpx;
				display: block;
				
			}
			.imgDiv{
				width: 200rpx;
				height: 200rpx;
				border:2rpx solid #ccc;
				border-radius: 30rpx;
				.add{
					text-align: center;
					color: #ccc;
					margin-top: 70rpx;
				}
			}
			
		}
	}
</style>
