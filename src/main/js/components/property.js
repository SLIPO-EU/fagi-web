const React = require('react');
const ReactDOM = require('react-dom');

class Property extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      < div > 
        < select title = "Choose property" >
          <option value ="property 1">property 1</option>
          <option value ="property 2">property 2</option>
          <option value ="property 3">property 3</option>
       < /select>
      < /div>
    );
  }
}

export default Property;