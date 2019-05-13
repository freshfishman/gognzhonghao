import React from 'react';
import Module from '../../lib/module';
import { Flex, WhiteSpace, WingBlank, Text,List,Button, InputItem,Carousel,Toast,Modal } from 'antd-mobile'
import ListItem from 'antd-mobile/lib/list/ListItem';
const h = document.documentElement.clientHeight;

class Experience extends Module {
    constructor(props) {
        super(props);
        this.state={
            data:[1,2,3,4],                        //
            imagesUrl:[],                          //轮播图连接
            userName:'',                           //用户姓名
            userPhone:'',                          //用户手机号码
            siid:'',                               //当前店铺的id
            openId:0,
            showModal:false, 
        }
    }

    componentDidMount() {
        this.getSwiperImages(); 
    }

    /** 
     *获取轮播图 
     */
    getSwiperImages(){
        let siid = this.props.location.search.substring(1).split('=')[1]
        this.request({
            api:'GetSwiperImages'
        },res=>{
            this.setState({
                imagesUrl:res.data,
                siid
            })
        })
    }

    /** 
     * 获取姓名 
     */
    changeName(val){
        this.setState({
            userName:val
        })
    }

    /** 
     * 获取手机号码 
     */
    changePhone(val){
        this.setState({
            userPhone:val
        });
    }

    /**
     * 向后台传输数据 
     */
    submitInfo=()=>{
        let { userName,userPhone,siid,openId } = this.state;
        if(userName&&userPhone){
            this.request({
                api:'GetExperienceInfo',
                params:{
                    PHONE:userPhone,
                    NAME:userName,
                    SIID:siid,
                    OPEN_ID:openId
                }
            },res=>{
                if(res.code === '200'){
                    this.setState({
                        showModal:true,
                    })
                }
            })
        }else{
            Toast.info('请输入姓名和手机号码',1)
        }
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
        let { imagesUrl,showModal } = this.state
        return (
            <div className="C_Experience bg_f" style={{ height: h }}>
                <div className="carousel">
                    <Carousel className="space-carousel"
                        frameOverflow="visible"
                        cellSpacing={10}
                        slideWidth={0.8}
                        autoplay
                        infinite
                        swipeSpeed={15}
                        autoplayInterval={2000}
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
                                onBlur={val=>{this.changeName(val)}}
                            >姓名</InputItem>
                        </ListItem>
                        <ListItem>
                            <InputItem 
                                className="fs_14"
                                type="phone"
                                placeholder="请填写手机号码"
                                onChange={val=>{this.changePhone(val)}}
                            >填写手机号</InputItem>
                        </ListItem>
                    </List>
                </div>
                <div className="submit-btn fs_22" onClick={this.submitInfo}>
                    申请体验
                </div>

                <Modal
                    visible={showModal}
                    transparent
                    maskClosable={false}
                    footer={[{ text: '确定', onPress: () => { this.props.history.goBack()} }]}
                    afterClose={() => { alert('afterClose'); }}
                >
                    <div style={{ height: 20, overflow: 'scroll',color:'#000' }}>
                      申请成功
                    </div>
                </Modal>
            </div>
        )
    }

}

module.exports = Experience;