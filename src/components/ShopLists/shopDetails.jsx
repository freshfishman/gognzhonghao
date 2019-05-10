import React from 'react';
import Module from '../../lib/module';
import { Flex, WhiteSpace, WingBlank, Text } from 'antd-mobile';
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
        },()=>{
            let {shopDetail}=this.state;
            this.getOwnerLocation(shopDetail);
        })
    }
    /** 
     * 绘制地图 
     */
    getOwnerLocation(shopDetail) {
        var myLatlng = new qq.maps.LatLng(shopDetail.lat, shopDetail.lng);
        var myOptions = {
            zoom: 13,
            center: myLatlng,
            mapTypeControlOptions: {
                //设置控件的地图类型ID，ROADMAP显示普通街道地图，SATELLITE显示卫星图像，HYBRID显示卫星图像上的主要街道透明层
                mapTypeIds: [
                    qq.maps.MapTypeId.ROADMAP
                ],
            }
        };
        var map = new qq.maps.Map(document.getElementById("shop-map"), myOptions);
        var marker = new qq.maps.Marker({
            //设置Marker的位置坐标
            position: myLatlng,
            //设置显示Marker的地图
            map: map
        });

        //设置Marker的可见性，为true时可见,false时不可见，默认属性为true
        marker.setVisible(true);
        //设置Marker的动画属性为从落下
        marker.setAnimation(qq.maps.MarkerAnimation.DOWN);
        ////设置Marker自定义图标的属性，size是图标尺寸，该尺寸为显示图标的实际尺寸，origin是切图坐标，该坐标是相对于图片左上角默认为（0,0）的相对像素坐标，anchor是锚点坐标，描述经纬度点对应图标中的位置
        /* var anchor = new qq.maps.Point(0, 39),
            size = new qq.maps.Size(42, 68),
            origin = new qq.maps.Point(0, 0),
            icon = new qq.maps.MarkerImage(
                "https://open.map.qq.com/doc/img/nilt.png",
                size,
                origin,
                anchor
            );
        marker.setIcon(icon); */
        //设置Marker阴影图片属性，size是图标尺寸，该尺寸为显示图标的实际尺寸，origin是切图坐标，该坐标是相对于图片左上角默认为（0,0）的相对像素坐标，anchor是锚点坐标，描述经纬度点对应图标中的位置
        /* var anchorb = new qq.maps.Point(3, -30),
            sizeb = new qq.maps.Size(42, 11),
            origin = new qq.maps.Point(0, 0),
            iconb = new qq.maps.MarkerImage(
                "https://open.map.qq.com/doc/img/nilb.png",
                sizeb,
                origin,
                anchorb
            );
        marker.setShadow(iconb);   */      
        //添加信息窗口
        var info = new qq.maps.InfoWindow({
            map: map
        });
        //获取标记的可拖动属性
        info.open();
        info.setContent(`公司地址:<br/>${shopDetail.addr}`);
        info.setPosition(marker.getPosition()); 
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
                        onClick={()=>{this.props.history.push({
                            pathname:'/Experience',
                            search:`?siid=${shopDetail.siid}`
                        })}}
                    >
                        申请体验
                    </div>
                </Flex>
                <div id="shop-map"></div>
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