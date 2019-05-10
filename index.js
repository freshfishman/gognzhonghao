/**
 * Created by tonghao on 2019/2/28.
 */
import React from 'react';
import ReactDom from 'react-dom'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'

import App from './src/components/App';                                 //所有模块父组件
import ShopLists from './src/components/ShopLists';                     //门店列表
import AboutUs from './src/components/AboutUs';                         //关于我们
import ShopDetails from './src/components/ShopLists/shopDetails';       //门店详情
import Experience from './src/components/Experiences';                  //申请体验课

import './src/resources/css/app.less';
import 'antd-mobile/dist/antd-mobile.css';
import "./node_modules/video-react/dist/video-react.css";

ReactDom.render((
	<HashRouter>
		<App>
			<Route exact path="/ShopLists" component={ShopLists} />
			<Route exact path="/ShopDetails" component={ShopDetails} />
			<Route exact path="/AboutUs" component={AboutUs} />
			<Route exact path="/Experience" component={Experience} />
		</App>
	</HashRouter>
), document.getElementById('J_app-pages'));

// <Router history={hashHistory} routes={routerConfig} />