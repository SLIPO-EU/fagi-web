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
        <div className="PropertyBox">
           < div className="PropertyBox_content" > 
             <label>Fusion property A:&nbsp;&nbsp;</label>
           < /div >
           < div className="PropertyBox_content" > 
             < Property/ > 
           < /div >
        </div>
        <div className="PropertyBox">
          < div className="PropertyBox_content" > 
            <label>Fusion property B:&nbsp;&nbsp;</label>
          < /div >
          < div className="PropertyBox_content" > 
            < Property/ > 
          < /div >
        </div>
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
