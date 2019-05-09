import React from 'react';
import Module from '../../lib/module';
import { Flex, WhiteSpace, WingBlank,Text,ListView } from 'antd-mobile';


const WX = window.wx;
class ShopLists extends Module {
    constructor(props) {
        super(props);
        this.state={
            shopListData:[],                             //门店列表 
            location:[],                                 //门店定位
            shopListDetail:[],                           //门店详细信息
            distances:[],                                //距离           
        }
    }

    componentDidMount() {
        // console.log(this.props.location.query);
        this.getWxConfig();
        this.getOwnerLocation();
        this.getStoresListsData();
    }
    
    
    /** 
     * 获取wx配置信息
     * 需要timestamp,nonceStr,signature 
     */
    getWxConfig(){
        this.request({
            api:'GetSignature'
            },res=>{
                WX.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wxaff0bc4ad040f2a8', // 必填，公众号的唯一标识
                    timestamp: res.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.noncestamp, // 必填，生成签名的随机串
                    signature: res.signat   ,// 必填，签名
                    jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表
                }); 
        })
    }

    /**
     * 获取用户当前地理位置
     * 使用jssdk 
     */
    getOwnerLocation(){
        WX.getLocation
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
        var that = this
        var callbacks = {
            complete: function (results) {
                /* map.setCenter(result.detail.location);
                var marker = new qq.maps.Marker({
                    map: map,
                    position: result.detail.location
                }); */
                _location.push(results.detail.location);
                that.setState({
                    location:_location
                },()=>{
                    that.combineShopListWithLocation();
                })
                
            }
        }
        //var geocoder = new qq.maps.Geocoder(callbacks);
        list.map((item,index)=>{
            //腾讯地图的api
            var geocoder = new qq.maps.Geocoder(callbacks)
            geocoder.getLocation(item.dress);
        });
    }

    /**
     * 关联地址与坐标 
     */
    combineShopListWithLocation(){
        let { shopListData,location } = this.state;
        let _shopListDetail = [];
        shopListData.map((item,index)=>{
            if(location[index]){
                let distance = {};
                //let from =  new qq.maps.latLng();
                //let to = new qq.maps.latLng(...location);
                //qq.maps.geometry.spherical.computeDistanceBetween(from,to)
                _shopListDetail.push(JSON.parse(JSON.stringify(Object.assign(item,location[index]))));
            }
        });
        this.setState({
            shopListDetail:_shopListDetail
        });
    }
    /** 
     * 计算两地之间距离 
     */
    getDistance(from,to){
        console.log(from,to)
        /* console.log(qq.maps.geometry.spherical.computeDistanceBetween(from,to)) */
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

    renderRow = (rowData, sectionID, rowID) => {
        return (
            <div className="bg_f shop-item">
                <WingBlank size="md">
                    <div className="fs_14 shop-item-name">
                        店铺:滨江区西兴街道
                        </div>
                    <Flex align="end" className="shop-item-details">
                        <div className="shop-item-logo">
                            <img width="100%" height="100%" src={require('../../resources/images/logo.png')} />
                        </div>
                        <Flex align="stretch" justify="between" className="fs_12 shop-item-addr" direction="column">
                            <div style={{ color: 'rgba(0,0,0,.8)' }}>
                                <Text>浙江省杭州市滨江区西兴街道101号健康路径1号店</Text>
                            </div>
                            <div style={{ color: 'rgba(0,0,0,.6)' }}>
                                <Text>营业时间9:00-18:00</Text>
                            </div>
                        </Flex>
                        <div className="fs_12 shop-item-distance" style={{ color: 'rgba(0,0,0,.3)' }}>
                            0.8km
                            </div>
                    </Flex>
                </WingBlank>
            </div>
        )
    }

    onEndReached = () => {
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
    }

    onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true, PageIndex: 1, isReload: true });
        this.getList();
    };

    render() {
        let { shopListDetail } = this.state;
        
        return (
            <div className="C_ShopLists">
                <Flex justify="between" className="headers bg_f">
                    <div className="logo"></div>
                    <div className="fs_20" style={{flexGrow:1,marginLeft:'.27rem' ,}}>健康路径线下门店</div>
                    <Flex>
                        <div className="fs_14">杭州</div>
                        <div></div>
                    </Flex>
                </Flex>
                <WhiteSpace size="md" />
                <div className="bg_f shop-item">
                    <WingBlank size="md">
                        <div className="fs_14 shop-item-name">
                            店铺:滨江区西兴街道
                        </div>
                        <Flex align="end" className="shop-item-details">
                            <div className="shop-item-logo"> 
                                <img width="100%" height="100%" src={require('../../resources/images/logo.png')} />
                            </div>
                            <Flex align="stretch" justify="between" className="fs_12 shop-item-addr" direction="column">
                                <div style={{color:'rgba(0,0,0,.8)'}}>
                                    <Text>浙江省杭州市滨江区西兴街道101号健康路径1号店</Text>
                                </div>
                                <div style={{ color: 'rgba(0,0,0,.6)' }}>
                                    <Text>营业时间9:00-18:00</Text>
                                </div>
                            </Flex>
                            <div className="fs_12 shop-item-distance" style={{ color: 'rgba(0,0,0,.3)' }}>
                                0.8km
                            </div>
                        </Flex>
                    </WingBlank>
                </div>
                {/* <ListView
                    ref={el => this.lv = el}
                    dataSource={new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }).cloneWithRows(listData)}
                    renderRow={this.renderRow}
                    scrollRenderAheadDistance={500}
                    pageSize={4}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                    renderFooter={() => (<div style={{ textAlign: 'center' }}>
                        {isLoading && '加载中...'}
                        {!hasMore && '没有更多了'}
                    </div>)}
                    pullToRefresh={<PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
                /> */}
			</div>
        )
    }

}

module.exports = ShopLists;