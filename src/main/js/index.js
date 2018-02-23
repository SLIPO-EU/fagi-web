'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

import QueryBuilder from 'react-querybuilder';

import RuleBuilder from './components/rule-builder';
import Property from './components/property';

require('./RuleBox.scss');
               

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      < div > 
        < div className="RuleBox" > 
          < div align="center"> FAGI< /div > 
        < /div >
        < div className="RuleBox" > 
          < Property/ > 
        < /div >
        < div className="RuleBox" > 
          < Property/ > 
        < /div >
        < div > 
          < RuleBuilder/ > 
        < /div>
      < /div >
    )
  }
}

ReactDOM.render(
  < App / > ,
  document.getElementById('react')
)
