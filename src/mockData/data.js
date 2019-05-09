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
				"image": "http://qiniu.hinets.net/guali.png"
			},
			{
				"dianpu": "瓜沥店",
				"dress": "杭州市萧山区瓜沥人民路419号2楼",
				"image": "http://qiniu.hinets.net/guali.png"
			}]
	});
	res.json(data)
});
router.post('/BB_OfficialAccounts/DanceTypes', (req, res, next) => {
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