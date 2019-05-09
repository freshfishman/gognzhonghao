import React, { Component, PropTypes } from 'react';
import Module from '../../lib/module';
import { WhiteSpace, WingBlank,Flex,Text } from 'antd-mobile'

class AboutUs extends Module {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentDidMount() {

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
            pathname: name
        });


    }

    render() {
        return (
            <div className="C_AboutUs">
                <WhiteSpace size="xl" />
                <div className="title fs_18">
                    <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '4px', background:'#78DF04',verticalAlign:'middle',marginRight:'6px'}}></span>
                    <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '5px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px' }}></span>
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '6px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px'}}></span>
                    关于我们
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '6px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px',marginLeft: '6px', }}></span>
                    <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '5px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px' }}></span>
                    <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '4px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px' }}></span>
                </div>
                <WhiteSpace size="md" />
                <div className="title fs_12" style={{ color:'#61E55D'}}>Healthy</div>
                <WhiteSpace size="xl" />
                <WingBlank size="md">
                <video
                    src="http://qiniu.hinets.net/%E5%85%AC%E5%8F%B8%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4"
                    height="200px"
                    controls
                    autoPlay
                ></video>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank size="md">
                    <div>
                        <p className="paragraph fs_12">
                            我们是一家专业从事青少年儿童体育与艺术培训的连锁机构。经营品牌为健康路径，寓意：通过科学适量的运动训练，达到促进学员身心健康的目的，即我们不但要传授学员最专业的运动技术，更要培养身心健康全面发展的优秀学员，要做好当前学校教育的有效补充。
                        </p>
                        <p className="paragraph fs_12">
                            目前直营分店主要集中分布在杭州、绍兴、嘉兴及宁波等地。开设的运动课程有基础体能、跆拳道、中国舞、拉丁舞、街舞、还有针对高端群体的少儿击剑和体适能（筹备开设中）等运动项目。现有常年在学学员2万多人，教职工180多人。培训对象为5至15岁的青少年儿童。
                        </p>
                        <p className="paragraph fs_12">
                            百师名匠，创品牌力量，我们本着以教学为王的教学理念为核心，用心、用爱来做儿童受益终生的运动教学服务。
                        </p>
                    </div>
                </WingBlank>
                <WhiteSpace size="xl" />
                <div className="title fs_18">
                    <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '4px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px' }}></span>
                    <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '5px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px' }}></span>
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '6px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px' }}></span>
                    企业文化
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '6px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px', marginLeft: '6px', }}></span>
                    <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '5px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px' }}></span>
                    <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '4px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px' }}></span>
                </div>
                <WhiteSpace size="md" />
                <div className="title fs_12" style={{ color: '#61E55D' }}>Healthy</div>
                <WhiteSpace size="xl" />
                <WingBlank size="md">
                    <Flex >
                        <div className="slogan-1 fs_12">
                            尊重
                        </div>
                        <div className="paragraph fs_12" style={{marginLeft:'.18rem'}}>
                            <div>
                                尊重他人，也要尊重自己。
                            </div>
                            <div>
                                尊重他人的所有物。
                            </div>
                        </div>
                    </Flex>
                    <Flex >
                        <div className="slogan-2 fs_12">
                            认真
                        </div>
                        <div className="paragraph fs_12" style={{ marginLeft: '.18rem',width:'2.7rem' }}>
                            <div>
                                对生活和学习的态度要认真，在任何境遇下都要积极的对待生活和学习。
                            </div>
                            <div>
                                不论问题大小，坚持实事求是的原则，慎重处理。
                            </div>
                            <div>
                                生活和学习注重高质量和高效率。
                            </div>
                            <div>
                                注重细节，把认真落到实处。
                            </div>
                        </div>
                    </Flex>
                </WingBlank>
                <WhiteSpace size="xl" />
                <div className="title fs_18">
                    <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '4px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px' }}></span>
                    <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '5px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px' }}></span>
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '6px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px' }}></span>
                    课程介绍
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '6px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px', marginLeft: '6px', }}></span>
                    <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '5px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px' }}></span>
                    <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '4px', background: '#78DF04', verticalAlign: 'middle', marginRight: '6px' }}></span>
                </div>
                <WhiteSpace size="md" />
                <div className="title fs_12" style={{ color: '#61E55D' }}>Healthy</div>
                <WhiteSpace size="xl" />
                <WingBlank size="md">
                    <div className="lessons">
                        <div className="lessons-item dShadow">
                            <div className="latin">
                                <div className="mask">
                                    拉丁舞
                                </div>
                            </div>
                            <div className="desc dShadow">
                                <Text>无论是从生理心理或社交的观点来看,跳拉丁舞是项高带氧的最佳运动之一。它不单有趣、自由,最大的好处是它总是与别人一起完成,可以强身健体,避免过渡肥胖或瘦弱。</Text>
                                
                            </div>
                        </div>
                        <div className="lessons-item dShadow">
                            <div className="hip-hop">
                                <div className="mask">
                                    街舞
                                </div>
                            </div>
                            <div className="desc dShadow">
                                <Text>跳舞可使新陈代谢显著增强,儿童正处于骨骼的生长时期,使其身体各部的生长发育更快舞指可增加骨的血液供给，使骨组织得到更多的营养物质,又能给生长的骨骺受到适当刺激。</Text>
                                
                            </div>
                        </div>
                        <div className="lessons-item">
                            <div className="teakwondo">
                                <div className="mask">
                                    跆拳道
                                </div>
                            </div>
                            <div className="desc dShadow">
                                <Text>学习跆拳道対儿童的好处很多不只可以培养儿童的意志カ,增强体质，使身体更加柔软対体型也有很好的帮助而且可以改变内向的性格,増加自信心,突出性格,让注意力更加集中。</Text>
                                
                            </div>
                        </div>
                        <div className="lessons-item dShadow">
                            <div className="chinese-dance">
                                <div className="mask">
                                    中国舞
                                </div>
                            </div>
                            <div className="desc dShadow">
                                <Text>通过科学系统的舞蹈教学训练,可以塑造美丽,增添魅力,锻炼体力,增强体质,磨练毅力，,培养自信心,丰富想像力,促进智力,还可以陶冶心灵,培养出活泼、热情开朗的性格。</Text>
                                
                            </div>
                        </div>
                    </div>
                </WingBlank>
                <WhiteSpace size="xl" />
                <Flex justify="center" align="center" className="tel fs_18">
                    <div className="tel-icon"></div>
                    <div style={{ color:'#F1E945'}}>咨询电话：</div>
                    <div>82567321</div>
                </Flex>
            </div>
        )
    }

}

module.exports = AboutUs;