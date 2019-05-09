import React from 'react';
import Module from '../../lib/module';
import { Flex, WhiteSpace, WingBlank, Text,List,Button, InputItem,Carousel } from 'antd-mobile'
import ListItem from 'antd-mobile/lib/list/ListItem';
const h = document.documentElement.clientHeight;

class Experience extends Module {
    constructor(props) {
        super(props);
        this.state={
            data:[1,2,3,4],                        //
            imagesUrl:[],                          //
        }
    }

    componentDidMount() {
        // console.log(this.props.location.query);
        /*  WX.config({
             debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
             appId: 'wxaff0bc4ad040f2a8', // 必填，公众号的唯一标识
             timestamp: , // 必填，生成签名的时间戳
             nonceStr: '', // 必填，生成签名的随机串
             signature: '',// 必填，签名
             jsApiList: [] // 必填，需要使用的JS接口列表
         }); */
        this.getSwiperImages(); 
    }

    /** 
     *获取轮播图 
     */
    getSwiperImages(){
        this.request({
            api:'GetSwiperImages'
        },res=>{
            this.setState({
                imagesUrl:res.data
            })
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
            search: `?type=${this.state.type}`
        });


    }

    render() {
        let { imagesUrl } = this.state
        return (
            <div className="C_Experience bg_f" style={{ height: h }}>
                <div className="carousel">
                    <Carousel className="space-carousel"
                        frameOverflow="visible"
                        cellSpacing={16}
                        slideWidth={0.8}
                        autoplay
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => this.setState({ slideIndex: index })}
                    >
                        {this.state.data.map((val, index) => (
                            <a
                                key={val}
                                href="javascript:;"
                                style={{
                                    display: 'block',
                                    position: 'relative',
                                    top: this.state.slideIndex === index ? -10 : 0,
                                    height: this.state.imgHeight,
                                    boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                <img
                                    src={imagesUrl[index]}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                </div>
                <div>
                    <List>
                        <ListItem>
                            <InputItem 
                                className="fs_14"
                                placeholder="请输入姓名"
                            >姓名</InputItem>
                        </ListItem>
                        <ListItem>
                            <InputItem 
                                className="fs_14"
                                type="phone"
                                placeholder="请填写手机号码"
                            >填写手机号</InputItem>
                        </ListItem>
                    </List>
                </div>
                <div className="submit-btn fs_22">
                    申请体验
                </div>
            </div>
        )
    }

}

module.exports = Experience;