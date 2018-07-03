const React = require('react');
require('../../../scss/style.scss');
import MDSpinner from "react-md-spinner";
import { connect } from 'react-redux';
import RuleSet from './RuleSet';

var { bindActionCreators } = require('redux');
var datasetActionConstants = require('../../constants/DatasetActionConstants');
var { setDatasetAction, fuse } = require('../../actions/AppActions');

var options =  datasetActionConstants.map(function(action) {
  return (
   <option 
    key={action.key} 
    value ={action.value}>{action.label}</option>
  );
});
  
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      loading: null,
      datasetAction: datasetActionConstants[0]
    }
    
    this.props.actions.setDatasetAction(datasetActionConstants[0].name);
  }

  fuse(){
    this.props.actions.fuse(this.props.config);
  }

  selectDatasetAction(e){
    this.props.actions.setDatasetAction(e);
  }

  render() {

    let loading;
    if(this.props.calculating){
      loading = (
        <div className="centered">
          <MDSpinner 
            duration={4000} 
            size={80}
          />
        </div>
      );
    } else {
      loading = null;
    }

    return (
      <div> 
        {loading}
        <div className="Logo"> 
          <div align="center"> FAGI </div>
        </div>
        <div >
          < RuleSet /> 
        </div>
        <span style={{float: 'right'}}>
          <div className = "FusionBox">
            <button className = "FuseButton" type="button" onClick={e => this.fuse()}>Fuse</button>
            <div className="SelectBox_content"> 
              <label>Default Dataset Action:&nbsp;&nbsp;</label>
            </div>
          <div className="SelectBox_content"> 
            <select title = "Choose Default Dataset Fusion Action" 
              onChange={e => this.selectDatasetAction(e.target.value)}>            
              {options}
            </select>
          </div>
        </div>
        </span>
      </div>
    )
  }
}

function mapStateToProps(state) {

  let config = {datasetAction: state.app.datasetAction, validationRules: state.validator, ruleset: state.ruleset};
  
  return {
    success: state.success,
    error: state.error,
    datasetAction: state.app.datasetAction,
    loading: state.app.loading,
    calculating: state.app.calculating,
    config: config
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { setDatasetAction, fuse }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);