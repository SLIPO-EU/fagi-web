const React = require('react');
const ReactDOM = require('react-dom');

var properties = require('../constants/properties');

var options =  properties.map(function(property) {
  return (
   <option key={property.key} value ={property.value}>{property.label}</option>
  );
});

var propertySelect = (< select title = "Choose property" >
 {options}
< /select>);
  
class Property extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      < div > 
        {propertySelect}
      < /div>
    );
  }
}

export default Property;