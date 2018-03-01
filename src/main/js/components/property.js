const React = require('react');
const ReactDOM = require('react-dom');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');

var properties = require('../constants/properties');

var { setPropertyA, setPropertyB } = require('../actions/FusionPropertyActions');
    
var options =  properties.map(function(property) {
  return (
   <option key={property.key} value ={property.value}>{property.label}</option>
  );
});

class Property extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  selectPropertyA(e){
    console.log(e);
    this.props.actions.setPropertyA(e);
  }

  selectPropertyB(e){
    console.log(e);
    this.props.actions.setPropertyB(e);
  }
  
  render() {

    return (
      <div>
        <div className="PropertyBox">
          < div className="PropertyBox_content" > 
            <label>Fusion property A:&nbsp;&nbsp;</label>
          < /div >
          < div className="PropertyBox_content" > 
            < select title = "Choose property" 
              onChange={e => this.selectPropertyA(e.target.value)}  >            
              {options}
            < /select>
          < /div >
        </div>
        <div className="PropertyBox">
          < div className="PropertyBox_content" > 
            <label>Fusion property B:&nbsp;&nbsp;</label>
          < /div >
          < div className="PropertyBox_content" > 
            < select title = "Choose property" 
              onChange={e => this.selectPropertyB(e.target.value)}  >            
              {options}
            < /select>
          < /div >
        </div>
      </div> 
    );
  }
}

function mapStateToProps(state) {
  return {
    propertyA: state.propertyA,
    propertyB: state.propertyB
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { setPropertyA, setPropertyB}) , dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Property);
