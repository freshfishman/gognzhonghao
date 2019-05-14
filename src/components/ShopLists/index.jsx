import React from 'react';
import Module from '../../lib/module';
import { Flex, WhiteSpace, WingBlank,Text,ListView,PullToRefresh,Toast } from 'antd-mobile';
import _ from 'lodash';
import $ from 'jquery';
const WX = window.wx;
class ShopLists extends Module {
    constructor(props) {
        super(props);
        this.state={
            shopListData:[],                             //门店列表 
            distances:[],                                //距离      
            userLocation: null || { lat: 30.180775, lng: 120.26557},                             //用户当前坐标  
            isLoading:true,    
            refreshing:false,                   

        }
    }

    componentDidMount() {
        // console.log(this.props.location.query);
        this.getWxConfig();
        this.getStoresListsData();
    }
    
    
    /** 
     * 获取wx配置信息
     * 需要timestamp,nonceStr,signature 
     */
    getWxConfig(){
        console.log(window.location.href.split('#')[0])
        this.request({
            api:'GetSignature',
            params:{
                URL:window.location.href.split('#')[0]
            }
        },res=>{
                var that = this
                WX.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wx3537810f129eda5a', // 必填，公众号的唯一标识
                    timestamp: res.data.tiemstamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.noncestamp, // 必填，生成签名的随机串
                    signature: res.data.signat   ,// 必填，签名
                    jsApiList: ['getLocation','checkJsApi'] // 必填，需要使用的JS接口列表
                }); 
                WX.ready(function (params) {
                    WX.checkJsApi({
                        jsApiList:['geoLocation'],
                        success:function(res){
                            
                        }
                    });
                    /**
                     * 获取用户当前地理位置
                     * 使用jssdk
                     */
                    WX.getLocation({
                        type: 'gcj02',                     // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: function (res) {
                            var _userLocation = {};
                            var latitude = res.latitude;   // 纬度，浮点数，范围为90 ~ -90
                            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                            var speed = res.speed;         // 速度，以米/每秒计
                            var accuracy = res.accuracy;   // 位置精度
                            _userLocation.lat = latitude;
                            _userLocation.lng = longitude;
                            that.setState({
                                userLocation: _userLocation
                            })
                        }
                    })
                })
        })
    }

    /**
     * 获取门店信息 
     */
    getStoresListsData(){
        this.request({
            api:'GetStoresList'
        },res=>{
            /* res.data.map((item,index)=>{
                console.log(item.dress)
                console.log(this.getOwnerLocation)
            }) */
            let _shopListData = this.deepClone(res.data);
            this.setState({
                shopListData:_shopListData
            },()=>{
               this.getShopsLocation(this.state.shopListData) 
            })
        })
    }
    /** 
     * 获取门店地址定位
     * 调用腾讯地图javascapi获取门店的坐标
     * 并将坐标按list顺序push到this.state.location中
     * @param list   门店列表 
     */
    getShopsLocation(list){
        var _location = [];
        var that = this;
        for(let i=0;i<list.length;i++){
            this.getDemoLocation(list[i],_location);
        }
    }

    /** 
     * 获取坐标及距离 
     */
    getDemoLocation(detail,arr){
        return new Promise((resolve,reject)=>{
            let geocoder = null;
            let that = this;
            let from, to, distance;
            let { userLocation } = this.state;
            from = new qq.maps.LatLng(userLocation.lat, userLocation.lng);
            geocoder = new qq.maps.Geocoder();
            geocoder.setComplete(function(result) {
                resolve(
                    detail.result = result,
                    to = new qq.maps.LatLng(result.detail.location.lat,result.detail.location.lng),
                    distance = qq.maps.geometry.spherical.computeDistanceBetween(from,to),
                    detail.distance = Number((distance / 1000).toFixed(2)),
                    arr.push(detail),
                    that.setState({
                        shopListData:arr
                    },()=>{
                        //console.log(that.state.shopListData)
                    })
                );
            });
            geocoder.setError(function(err) {
                console.log(err+'----'+'门店地址不明确')
            })
            geocoder.getLocation(detail.dress);
        })
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
            //search: `?type=${this.state.type}`
        });


    }
    
    renderRow = (rowData, sectionID, rowID) => {
        return (
            <div className="bg_f shop-item" 
                 onClick={()=>{this.props.history.push({
                     pathname:'/ShopDetails',
                     search: `?name=${rowData.dianpu}&addr=${rowData.dress}&image=${rowData.image}&lat=${rowData.result.detail.location.lat}&lng=${rowData.result.detail.location.lng}&siid=${rowData.siid}`
                 })}}
            >
                <WingBlank size="md">
                    <div className="fs_14 shop-item-name">
                        {rowData.dianpu}
                        </div>
                    <Flex align="end" className="shop-item-details">
                        <div className="shop-item-logo">
                            <img width="100%" height="100%" src={`${rowData.image}?imageMogr2/format/jpg/quality/20`} />
                        </div>
                        <Flex align="stretch" justify="between" className="fs_12 shop-item-addr" direction="column">
                            <div style={{ color: 'rgba(0,0,0,.8)' }}>
                                <Text>{rowData.dress}</Text>
                            </div>
                            <Flex align="start" className="fs_12">
                                <div>
                                    <Text style={{ color: 'rgba(0,0,0,.6)' }}>营业时间：</Text>
                                </div>
                                <div>
                                    <div>
                                        <Text>周二至周五 13:00--21:00</Text>
                                    </div>
                                    <WhiteSpace size="md" />
                                    <div>
                                        <Text>周六至周日 08:00--21:00</Text>
                                    </div>
                                </div>

                            </Flex>
                        </Flex>
                        <div className="fs_12 shop-item-distance" style={{ color: 'rgba(0,0,0,.3)' }}>
                            {rowData.distance}km
                        </div>
                    </Flex>
                </WingBlank>
                <WhiteSpace className="bg_f5" size="md" />
            </div>
        )
    }

    loadingToast(){
        Toast.loading('资源加载中，请稍等...',0)
    }
    
    componentDidUpdate = (prevProps, prevState) => {
      if(this.state.shopListData.length>0){
          Toast.hide();
      }
    };
    

    /* onEndReached = () => {
        let { isLoading, hasMore, PageIndex } = this.state;
        this.state.getMessageNum = null;
        if (isLoading || !hasMore) {
            return;
        }
        this.setState({
            isLoading: true,
            PageIndex: ++PageIndex
        }, () => {
            this.getList();
        });
    } */

    /* onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true, PageIndex: 1, isReload: true });
        this.getStoresListsData();
    }; */

    render() {
        let { shopListData } = this.state;
        shopListData = _.sortBy(shopListData,['distance']);
        return (
            (shopListData.length>0)?(
            <div className="C_ShopLists">
                <Flex justify="between" className="headers bg_f">
                    <div className="logo"></div>
                    <div className="fs_20" style={{flexGrow:1,marginLeft:'.27rem' ,}}>健康路径线下门店</div>
                    <Flex>
                        <div className="fs_14">杭州</div>
                        <div className="font_family icon-weizhi fs_20" style={{ marginLeft: '10px', color:'rgba(142, 213, 78, 1)'}}></div>
                    </Flex>
                </Flex>
                <WhiteSpace size="md" />
                <ListView
                    dataSource={new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }).cloneWithRows(shopListData)}
                    renderRow={this.renderRow}
                    scrollRenderAheadDistance={500}
                    pageSize={4}
                    /* onEndReached={this.onEndReached} */
                    onEndReachedThreshold={10}
                    /* renderFooter={() => (<div style={{ textAlign: 'center' }}>
                        {isLoading && '加载中...'}
                        {!hasMore && '没有更多了'}
                    </div>)}
                    pullToRefresh={<PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />} */
                />
                
            </div>): <div onClick={this.loadingToast()}></div>
        )
    }

}

module.exports = ShopLists;