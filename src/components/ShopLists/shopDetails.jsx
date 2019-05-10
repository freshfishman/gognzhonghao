import React from 'react';
import Module from '../../lib/module';
import { Flex, WhiteSpace, WingBlank, Text } from 'antd-mobile';
import ReactQMap from 'react-qmap';
const h = document.documentElement.clientHeight;
let classMap, windowMap;
const WX = window.wx;
class ShopDetails extends Module {
    constructor(props) {
        super(props);
        this.state={
            shopDetail:null,                  //店铺详情          
        }
    }

    componentDidMount() {
        
        this.getShopDetail(); 
    }

    getShopDetail(){
        let info;
        let shopDetail = {};
        info = decodeURIComponent(window.location.href)
        info = info.substring(info.indexOf('?')+1).split('&')
        info.map((item,index)=>{
            //console.log(item.split('='))
            shopDetail[item.split('=')[0]]=item.split('=')[1]
        })
        this.setState({
            shopDetail
        })
    }

    /* getOwnerLocation(shopDetail) {
        var myLatlng = new qq.maps.LatLng(shopDetail.lat, shopDetail.lng);
        var myOptions = {
            zoom: 8,
            center: myLatlng
        };
        var map = new qq.maps.Map(document.getElementsByClassName("shop-map"), myOptions);
        console.log(map)
    }
 */
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

    _setMarker = () => {
        let { shopDetail } = this.state;
        const marker = new windowMap.Marker({
            map: classMap,
            position: new windowMap.LatLng(shopDetail.lat,shopDetail.lng),
            animation: windowMap.MarkerAnimation.DROP,
        });
        //console.log(marker);
    }
    _getMap = (map, wMap) => {
        classMap = map;
        windowMap = wMap;
        this._setMarker();
    }
    
    render() {
        let { shopDetail } = this.state;
        return (
            shopDetail && <div className="C_ShopDetails bg_f" style={{height:h}}>
                <div className="headers">
                    <img width="100%" height="100%" src={shopDetail.image} />
                </div>
                <Flex className="shop-info wShadow">
                    <div>
                        <img src={require('../../resources/images/logo.png')} />
                    </div>
                    <div className="fs_14" style={{ flex: 1, marginLeft: '14px', color:'rgba(115, 196, 112, 1)'}}>
                        <Text>健康路径{shopDetail.name}</Text>
                    </div>
                    <div 
                        className="express-btn fs_12" 
                        onClick={()=>{this.props.history.push('/Experience')}}
                    >
                        申请体验
                    </div>
                </Flex>
                <div className="shop-map">
                    <ReactQMap
                        center={{ latitude: shopDetail.lat, longitude: shopDetail.lng }}
                        initialOptions={{ zoomControl: true, mapTypeControl: true,zoom:12 }}
                        getMap={(map, wMap) => this._getMap(map, wMap)}
                        apiKey="xxxxxx-xxxxx-xxxxx-xxxxxx"
                    />
                </div>
                <WingBlank>
                    <div style={{ color: 'rgba(0,0,0,.8)',fontWeight: 600 }}>
                    <div className="fs_16">基础信息</div>
                    <WhiteSpace size="md" />
                    <div className="fs_12">
                        <Text style={{ color: 'rgba(0,0,0,.6)' }}>公司全称:</Text>
                        <Text >健康路径{shopDetail.name}</Text>
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