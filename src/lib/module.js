import React from 'react';
import API_LIST from '../config/apiList';
import { Toast } from 'antd-mobile';
import $ from 'jquery';
import axios from 'axios';

class Module extends React.Component {
	constructor(props) {
		super(props);
	}

	request(options, success, fail) {
		let that = this;
		if(options.api !== undefined) {
			let api = API_LIST[options.api];
			let _apiArr = api.split('/');
			let _apiLastName = _apiArr[_apiArr.length -1];

			if(!api) {
				console.log('error', 'api 不存在', options.api);
				return;
			}

			//!options.hideToast && Toast.loading('数据加载中...', 0);
			/* axios({
				url:api,
				method:'post',
				baseURL:'',
				data:options.params,
				timeout:300000
			}).then(
				res=>{
					success && success(res.data)
				}
				
			) */
			$.ajax({
				"url": api,
				"type": options.type || "post",
				"ContentType": options.ContentType || "application/x-www-form-urlencoded; charset=UTF-8",
				"dataType": options.dataType || "json",
				"data": options.params,
				"traditional": true,
				"timeout": 300000
			})
				.done(function (result) {
					if(result.code === '201'){
						
					} else if (result.code === '203') {
						Toast.offline("当前接口 "+ _apiLastName +" 请求失败，失败原因：" + result.msg, 3);
						return false;
					} else if (result.code === '202') {
						Toast.offline("当前接口 "+ _apiLastName +" 请求失败，失败原因：" + result.msg, 2);
					} else{
						!options.hideToast && Toast.hide();
					}
					success && success(result);

				})
				.fail(function (errorThrown) {
					if(errorThrown.status === 0) {
						Toast.offline("当前接口 "+ _apiLastName +" 请求超时，请重试！", 3);
					} else {
						Toast.hide();
						Toast.offline("当前接口 "+ _apiLastName +" 调用失败，状态码" + errorThrown.status, 3);
					}
					fail && fail();
				});

		}
	}

	requestPromise(options, success, fail) {
		let that = this;
		return new Promise((resolve,reject)=>{
			if(options.api !== undefined) {
				let api = API_LIST[options.api];
				let _apiArr = api.split('/');
				let _apiLastName = _apiArr[_apiArr.length -1];

				if(!api) {
					console.log('error', 'api 不存在', options.api);
					return;
				}

				!options.hideToast && Toast.loading('数据加载中...', 0);
				$.ajax({
					"url": api,
					"type": options.type || "post",
					"ContentType": options.ContentType || "application/x-www-form-urlencoded; charset=UTF-8",
					"dataType": options.dataType || "json",
					"data": options.params,
					"traditional": true,
					"timeout": 300000
				})
					.done(function (result) {
						if(result.code === '210'){
							
						} else if (result.code === '203') {
							Toast.offline("当前接口 "+ _apiLastName +" 请求失败，失败原因：" + result.msg, 3);
							return false;
						} else if (result.code === '202') {
							Toast.offline("当前接口 "+ _apiLastName +" 请求失败，失败原因：" + result.msg, 2);
						} else {
							!options.hideToast && Toast.hide();
						}
						resolve(result);
					})
					.fail(function (errorThrown) {
						if(errorThrown.status === 0) {
							Toast.offline("当前接口 "+ _apiLastName +" 请求超时，请重试！", 3);
						} else {
							Toast.hide();
							Toast.offline("当前接口 "+ _apiLastName +" 调用失败，状态码" + errorThrown.status, 3);
						}
						reject(errorThrown);
					});

			}
		})
	}

	/**
	 *
	 *  利用递归返回一个深度克隆的对象
	 * @param {Object} data 需要被clone 的元素
	 */
	deepClone(data) {
		let _data;
		switch(typeof data) {
			case 'string':
				_data = data + '';
				break;
			case 'number':
				_data = + data;
				break;
			case 'boolean':
				_data = !!data;
				break;
			default:
			case 'object':
				_data = this._clone(data);
				break;
		}
		return _data;
	}

	/**
	 *
	 *  递归克隆
	 * @private
	 * @param {Object} data
	 * @param {Boolean} isFormatData        是否需要格式化
	 */
	_clone(data, isFormatData) {
		var isArray = data instanceof Array,
			o = isArray ? [] : {},
			i, ni, it, itType;
		if (isArray) {
			for (i = 0, ni = data.length; i < ni; i++) {
				it = data[i];
				itType = typeof it;
				o.push(itType === 'object' ?
					this._clone(it, isFormatData) : it);
			}
		} else if (data === null) {
			o = null;
		} else {
			for (i in data) {
				it = data[i];
				itType = typeof it;
				o[isFormatData ? '"' + i + '"' : i] = itType === 'object' ?
					this._clone(it, isFormatData) : it;
			}
		}
		return o;
	}

	/**
	 * 设置cookie
	 * @param key
	 * @param val
	 */
	setCookie(key, val) {
		document.cookie = key + "="+ escape (val);
	}

	/**
	 * 获取cookie
	 * @param name
	 * @returns {null}
	 */
	getCookie(name) {
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			return unescape(arr[2]);
		} else {
			return null;
		}
	}


    /**
     * 删除cookie
     * @param name
     * @returns {null}
     */
    delCookie(name){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=this.getCookie(name);
        if(cval!=null){
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        }

    }

    /**
     * 七牛云Token
     */
    getQiNiuToken(cb) {
        this.request({
            api: 'getMemberQiNiu',
            params: {
                scope:'healthpath-weixin'
            }
        }, (res) => {
            cb && cb(res.data.qiNiuToken);
        })
    }


    putb64(token, pic,cb){
        return new Promise((resolve,reject)=>{
            // let url = "http://up.qiniu.com/putb64/-1"; //华东空间-服务端上传地址
            let url = "http://upload.qiniup.com/putb64/-1"; //华东空间-客户端上传地址
            let xhr = new XMLHttpRequest();
            if(pic.indexOf('http://qiniu.hinets.net/')>=0){
                resolve(pic);
                return;
            }
            pic=pic.replace('data:image/jpeg;base64,' ,'')
            pic=pic.replace('data:image/png;base64,' ,'')
            xhr.onreadystatechange=function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve('http://qiniu.hinets.net/' + JSON.parse(xhr.responseText).key +'?imageslim');
                        cb && cb('http://qiniu.hinets.net/' + JSON.parse(xhr.responseText).key +'?imageslim')
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.setRequestHeader("Authorization", "UpToken " + token);
            xhr.send(pic);
        })
    }

	/**
	 * 修改title
	 * @param name
	 */
	changeTilte(name) {
		document.title = name;
	}

	/**
	 * 电话号码格式化
	 * @param val
	 * @returns {*}
	 */
	formatPhone(val) {
		val = val.trim();
		let reg = /^[0-9]*$/;
		if(!val || (val.length !== 11)) {
			return val;
		}
		if(val && reg.test(val)) {
			let reg = /^(\d{3})(\d{4})(\d{4})$/;
			let matches = reg.exec(val);
			let newNum = matches[1] + ' ' + matches[2] + ' ' + matches[3];
			return newNum;
		} else {
			return val
		}
	}









}

module.exports = Module;