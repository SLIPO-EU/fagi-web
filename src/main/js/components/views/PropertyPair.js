const React = require('react');
const ReactDOM = require('react-dom');

var properties = require('../../constants/properties');
import Select from './Select';
var propertiesConfig = require('../../helpers/properties-config');
  
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
            <Select 
              id = "1"
              title = "Choose property" 
              options={this.props.ontology.properties ? propertiesConfig.getShapedProperties(this.props.ontology.properties) : properties}
              onChange={e => this.props.onSelectA(e)}>
            </Select>
          </div>
        </div>
        <div className="RuleSelectBox">
          <div className="RuleSelectBox_content"> 
            <label>Fusion property B:&nbsp;&nbsp;</label>
          </div>
          <div className="RuleSelectBox_content"> 
            <Select 
              id = "2"
              title = "Choose property" 
              options={this.props.ontology.properties ? propertiesConfig.getShapedProperties(this.props.ontology.properties) : properties}
              onChange={e => this.props.onSelectB(e)}>
            </Select>
          </div>
        </div>
      </div> 
    );
  }
}

module.exports = Property;
