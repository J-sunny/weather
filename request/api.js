import MinRequest from './index.js'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
	// console.log(request)
	return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {

	return response
})

// 设置默认配置
minRequest.setConfig((config) => {
	// config.baseURL = 'http://192.168.2.102:8089/backwordSystem'
	config.baseURL = 'http://'
	return config
})

export default {
	// 这里统一管理api请求
	apis: {
		// 获取天气
		getWeather(data) {
			return minRequest.get('apis.juhe.cn/simpleWeather/query', data)
		},
		// 历史上的今天
		getHistory(data) {
			return minRequest.get('api.juheapi.com/japi/toh', data)
		},
		// 生成二维码
		getCode(data){
			return minRequest.get('apis.juhe.cn/qrcode/api', data)
		},
		// 笑话大全
		getJoke(data){
			return minRequest.get('v.juhe.cn/joke/randJoke.php', data)
		}

	}
}
