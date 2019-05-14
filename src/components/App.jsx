import React, { Component, PropTypes } from 'react';
import Module from '../lib/module';

class App extends Module {
	constructor(props) {
		super(props);
		this.state = {
			value: "0"
		}
	}

	componentDidMount() {
		this.changeTitle('健康路径')
		// console.log(Toast);
	}

	handleChange = (evevt, value) => {
		this.setState((prevState, props)=>({
			value
		}))
	}

	render() {
		return (
			this.props.children
		)
	}

}

module.exports = App;