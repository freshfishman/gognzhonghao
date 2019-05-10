const request = require('request');
const express = require('express');
const router = express.Router();
const Mock = require('mockjs');

// router.get('/GetUserInfo', (req, res, next) => {
// 	let data = Mock.mock({
// 		resultCode: 200,
// 		resultJson: {
// 			'id|10000-20000': 10000,//id: 10000-20000之间的随机一个数字
// 			'name': '@cname',//name: 随机生成一个中文名
// 			'star|0-5': '☆',//star: 指定的字符串重复0-5次生成
// 			'image': '',//image:
// 			'locked|1-2': false,//locked: 随机生成 true 或 false
// 			'address|1': ['北京市','贵州省','浙江省'],// role: 北京、贵州、杭州 随机三选一
// 			'phone': /^(13|14|15|18)[0-9]\d{8}$/,//phone: 符合正则的随机字符串
// 			'order|10': [//order: 重复10次指定内容组成一个数组
// 				{
// 					'id|+1': 10000,//id从10000开始，每次+1
// 					'orderName': '@ctitle',//orderName: 随机生成一个中文标题
// 					'orderTime': '@datetime',//orderTime: 随机生成一个 yyyy-MM-dd HH:mm:ss 格式的时间
// 				}
// 			],
// 			'loginTime':function(){//loginTime: 函数的生成的特定返回值
// 				return new Date().getTime();
// 			}
// 		},
// 		resultMessage: '查询成功'
// 	});
// 	res.json(data)
// });

router.post('/BB_OfficialAccounts/Signature', (req, res, next) => {
	let data = Mock.mock({
		"code": "200",
		"codeDesc": "",
		"msg": "获取成功",
		"success": true,
		"clientNeedReLogin": false,
		"userId": null,
		"extendData": "",
		"uck": "",
		"muck": "",
		"userHasLogined": false,
		"isMonitorAccount": false,
		"data": {
			"signat": "jsapi_ticket=HoagFKDcsGMVCIY2vOjf9gqamBvcLn6BjeQfkzELg3s_Vf_jBmxVAonhiOpTdqkwnzPIZJq-l7SF7kyAvwdxkg&noncestr=uXuElimFDLoIrwy&timestamp=1557310825&url=http://101.37.80.132:8085/BB_OfficialAccounts/HTML/index.html",
			"noncestamp": "uXuElimFDLoIrwy",
			"tiemstamp": 1557310825
		}
	});
	res.json(data)
});

router.post('/BB_OfficialAccounts/Stores', (req, res, next) => {
	let data = Mock.mock({
		"code": "200",
		"codeDesc": "",
		"msg": "获取成功",
		"success": true,
		"clientNeedReLogin": false,
		"userId": null,
		"extendData": "",
		"uck": "",
		"muck": "",
		"userHasLogined": false,
		"isMonitorAccount": false,
		"data": [
			{
				"dianpu": "事业部",
				"dress": "杭州市萧山区市心中路819号绿都世贸广场805",
				"image": "",
				"siid": "56"
			},
			{
				"dianpu": "瓜沥店",
				"dress": "杭州市萧山区瓜沥人民路419号2楼",
				"image": "http://qiniu.hinets.net/guali.png",
				"siid": "57"
			},
			{
				"dianpu": "义蓬店",
				"dress": "大江东义蓬购物中心C区2楼",
				"image": "http://qiniu.hinets.net/yipeng.png",
				"siid": "58"
			},
			{
				"dianpu": "党山店",
				"dress": "党山井岭路145号2楼",
				"image": "http://qiniu.hinets.net/dangshan.png",
				"siid": "59"
			},
			{
				"dianpu": "金马店",
				"dress": "萧绍路636号金马快乐城1楼",
				"image": "http://qiniu.hinets.net/jinma.png",
				"siid": "60"
			},
			{
				"dianpu": "河庄店",
				"dress": "大江东河庄中心幼儿园对面",
				"image": "http://qiniu.hinets.net/hezhuang.png",
				"siid": "61"
			},
			{
				"dianpu": "靖江店",
				"dress": "空港新城靖江路642号2",
				"image": "http://qiniu.hinets.net/jjkonggangxintiandi.png",
				"siid": "62"
			},
			{
				"dianpu": "旺角店",
				"dress": "萧山区旺角城新天地广场2楼",
				"image": "http://qiniu.hinets.net/wangjiaocheng.png",
				"siid": "63"
			},
			{
				"dianpu": "明珠店",
				"dress": "萧山区市心北路260号恒逸南岸明珠",
				"image": "",
				"siid": "64"
			},
			{
				"dianpu": "萧宝店",
				"dress": "萧山区宝龙广场3楼",
				"image": "http://qiniu.hinets.net/xiaoshanbaolong.png",
				"siid": "65"
			},
			{
				"dianpu": "富宝店",
				"dress": "富阳区育才西路宝龙广场2楼",
				"image": "http://qiniu.hinets.net/fuyangbaolong.png",
				"siid": "66"
			},
			{
				"dianpu": "华丰店",
				"dress": "杭州市下城区华丰路296号2楼",
				"image": "http://qiniu.hinets.net/huafeng.png",
				"siid": "67"
			},
			{
				"dianpu": "测试店",
				"dress": "绿都世贸广场23",
				"image": "",
				"siid": "68"
			},
			{
				"dianpu": "滨海店",
				"dress": "绍兴市滨海新城",
				"image": "http://qiniu.hinets.net/shaoxingbinhai.png",
				"siid": "69"
			},
			{
				"dianpu": "崇福店",
				"dress": "嘉兴市桐乡市崇福镇嘉凯城2楼",
				"image": "http://qiniu.hinets.net/jiaxingchongfu.png",
				"siid": "70"
			},
			{
				"dianpu": "海盐店",
				"dress": "嘉兴市海盐县嘉凯城城市2楼",
				"image": "http://qiniu.hinets.net/jiaxinghaiyan.png",
				"siid": "71"
			},
			{
				"dianpu": "银泰店",
				"dress": "宁波余姚市银泰城1楼",
				"image": "http://qiniu.hinets.net/yuyaoyintai.png",
				"siid": "72"
			},
			{
				"dianpu": "城东店",
				"dress": "杭州市富阳区城东迎宾广场3楼",
				"image": "",
				"siid": "74"
			}
			]

	});
	res.json(data)
});
router.post('/BB_OfficialAccounts/DanceTypes1', (req, res, next) => {
	let data = Mock.mock({
		"code": "200",
		"codeDesc": "",
		"msg": "获取成功",
		"success": true,
		"clientNeedReLogin": false,
		"userId": null,
		"extendData": "",
		"uck": "",
		"muck": "",
		"userHasLogined": false,
		"isMonitorAccount": false,
		"data": [
			"http://qiniu.hinets.net/taiquandao.png",
			"http://qiniu.hinets.net/ladingwu.png ",
			"http://qiniu.hinets.net/jiewu.png",
			"http://qiniu.hinets.net/zhongguowu.png "
		]
	});
	res.json(data)
});
router.post('/BB_OfficialAccounts/Inform', (req, res, next) => {
	let data = Mock.mock({
		"code": "200",
		"codeDesc": "",
		"msg": "获取成功",
		"success": true,
		"clientNeedReLogin": false,
		"userId": null,
		"extendData": "",
		"uck": "",
		"muck": "",
		"userHasLogined": false,
		"isMonitorAccount": false,
		"data": [
			"http://qiniu.hinets.net/taiquandao.png",
			"http://qiniu.hinets.net/ladingwu.png ",
			"http://qiniu.hinets.net/jiewu.png",
			"http://qiniu.hinets.net/zhongguowu.png "
		]
	});
	res.json(data)
});

module.exports = router;