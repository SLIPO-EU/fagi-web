const React = require('react');
require('../../../scss/style.scss');
import MDSpinner from "react-md-spinner";
import { connect } from 'react-redux';
import RuleSet from './RuleSet';

var { bindActionCreators } = require('redux');
var datasetActionConstants = require('../../constants/DatasetActionConstants');
var { setDatasetAction, fuse, download } = require('../../actions/AppActions');

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

  download(){
    this.props.actions.download();
  }

  selectDatasetAction(e){
    this.props.actions.setDatasetAction(e);
  }

  render() {

    let loading;
    if(this.props.calculating){
      loading = (
        <div className="centered-up">
          <MDSpinner 
            color1="#263238"
            color2="#676f73"
            color3="#a8adaf"
            color4="#676f73"         
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
        <div className="breadcrumb">
            <span>
            <li className="breadcrumb-item">
                Specification
            </li>
            </span>
        </div>
        {loading}
        <div className ={(this.props.calculating ? 'blur' : null)}>
          <div >
            < RuleSet />
          </div>
          <span style={{float: 'right'}}>
            <div className = "ComponentBox">
              <button className = "fagi-button" type="button" onClick={e => this.fuse()}>Fuse</button>
              <button className = "fagi-button" type="button" onClick={e => this.download()}>Download results</button>
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
    actions : bindActionCreators(Object.assign({}, { setDatasetAction, fuse, download }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);