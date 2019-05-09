import React from 'react';
import Module from '../../lib/module';
import { Flex, WhiteSpace, WingBlank, Text } from 'antd-mobile'
const h = document.documentElement.clientHeight;

const WX = window.wx;
class ShopDetails extends Module {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // console.log(this.props.location.query);
        console.log(WX);
        /*  WX.config({
             debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
             appId: 'wxaff0bc4ad040f2a8', // 必填，公众号的唯一标识
             timestamp: , // 必填，生成签名的时间戳
             nonceStr: '', // 必填，生成签名的随机串
             signature: '',// 必填，签名
             jsApiList: [] // 必填，需要使用的JS接口列表
         }); */

        this.getOwnerLocation('杭州市萧山区绿都世贸写字楼');
    }

    getOwnerLocation(address) {
        var callbacks = {
            complete: function (results) {
                /* map.setCenter(result.detail.location);
                var marker = new qq.maps.Marker({
                    map: map,
                    position: result.detail.location
                }); */
                console.log(results)
            },
        }
        var geocoder = new qq.maps.Geocoder(callbacks);
        geocoder.getLocation(address)
    }

    jump(name) {
		/**
		 * query是加密的
		 * state不加密
		 * 两则刷新后都会清空
		 */
        // this.props.history.push({
        // 	pathname:name,
        // 	query:{
        // 		type: '1',
        // 		keyword: '2'
        // 	}
        // });

		/**
		 * 刷新后不会被清空
		 */
        this.props.history.push({
            pathname: name,
            search: `?type=${this.state.type}`
        });


    }

    render() {
        return (
            <div className="C_ShopDetails bg_f" style={{height:h}}>
                <div className="headers">
                    <img width="100%" height="100%" src={require('../../resources/images/logo.png')} />
                </div>
                <Flex className="shop-info wShadow">
                    <div>
                        <img src={require('../../resources/images/logo.png')} />
                    </div>
                    <div className="fs_14" style={{ flex: 1, marginLeft: '14px', color:'rgba(115, 196, 112, 1)'}}>
                        <Text>滨江区西兴店</Text>
                    </div>
                    <div className="express-btn fs_12">
                        申请体验
                    </div>
                </Flex>
                <div className="shop-map">

                </div>
                <WingBlank>
                    <div style={{ color: 'rgba(0,0,0,.8)',fontWeight: 600 }}>
                    <div className="fs_16">基础信息</div>
                    <WhiteSpace size="md" />
                    <div className="fs_12">
                        <Text style={{ color: 'rgba(0,0,0,.6)' }}>公司全称:</Text>
                        <Text >健康路径滨江区西兴街道缤纷店</Text>
                    </div>
                    <WhiteSpace size="md" />
                    <div className="fs_12">
                        <Text style={{ color: 'rgba(0,0,0,.6)' }}>公司电话:</Text>
                        <Text>82567321</Text>
                    </div>
                </div>
                </WingBlank>
            </div>
        )
    }

}

module.exports = ShopDetails;