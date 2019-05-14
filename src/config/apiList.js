//let href = "http://192.168.124.24:3000/mock";       //mock
let href ='';
//let href = "http://192.168.0.107:3000/mock"
let API_LIST = {
    "GetStoresList": href + "/WeiXins/Stores",          //门店信息列表
    "GetSignature": href + "/WeiXins/Signature",        //获取微信jssdk的config配置  
    "GetSwiperImages": href + "/WeiXins/DanceType",     //获取申请课程页面轮播图
    "GetExperienceInfo": href + "/WeiXins/Inform",       //发送申请体验课详情   
};


export default API_LIST;