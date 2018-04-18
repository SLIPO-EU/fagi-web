const React = require('react');
const ReactDOM = require('react-dom');

var properties = require('../constants/properties');
  
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

    return (
      <div>
        <div className="RuleSelectBox">
          <div className="RuleSelectBox_content"> 
            <label>Fusion property A:&nbsp;&nbsp;</label>
          </div>
          <div className="RuleSelectBox_content"> 
            <select title = "Choose property" 
              onChange={e => this.props.onSelectA(e.target.value)}>            
              {options}
            </select>
          </div>
        </div>
        <div className="RuleSelectBox">
          <div className="RuleSelectBox_content"> 
            <label>Fusion property B:&nbsp;&nbsp;</label>
          </div>
          <div className="RuleSelectBox_content"> 
            <select title = "Choose property" 
              onChange={e => this.props.onSelectB(e.target.value)}>            
              {options}
            </select>
          </div>
        </div>
      </div> 
    );
  }
}

module.exports = Property;
