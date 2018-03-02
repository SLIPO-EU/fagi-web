const React = require('react');
const ReactDOM = require('react-dom');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');

var properties = require('../constants/properties');

var { setPropertyA, setPropertyB } = require('../actions/PropertyPairActions');
    
var options =  properties.map(function(property) {
  return (
   <option 
    key={property.key} 
    value ={property.value}>{property.label}</option>
  );
});

class Property extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.onSelectA(properties[0].value);
    this.props.onSelectB(properties[0].value);
  }
  
  render() {
    console.log(this);
    return (
      <div>
        <div className="PropertyBox">
          < div className="PropertyBox_content" > 
            <label>Fusion property A:&nbsp;&nbsp;</label>
          < /div >
          < div className="PropertyBox_content" > 
            < select title = "Choose property" 
              onChange={e => this.props.onSelectA(e.target.value)}  >            
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
              onChange={e => this.props.onSelectB(e.target.value)}  >            
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
