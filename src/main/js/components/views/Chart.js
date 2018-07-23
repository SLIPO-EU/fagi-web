var React = require('react');
import { connect } from 'react-redux';
var { bindActionCreators } = require('redux');

import ReactEchartsCore from 'echarts-for-react/lib/core';

//import echarts modules to reduce bundle size
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

var loadingOption = {
  text: 'Calculating...',
  color: 'rgba(210, 210, 255, 0.9)',
  textColor: '#000',
  maskColor: 'rgba(255, 255, 255, 0.8)',
  zlevel: 0
};

class Chart extends React.Component {

  render() {

    let content;
    if(this.props.show){
      content = this.props.loading ? this.props.defaultOption : this.props.option;
    } else {
      content = this.props.defaultOption;
    }
    
    return (
      <ReactEchartsCore
        echarts={echarts}
        option={content} 
        loadingOption={loadingOption}
        showLoading={this.props.loading}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.statistics.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);

