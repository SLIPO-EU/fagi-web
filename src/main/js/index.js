
const React = require('react');
const ReactDOM = require('react-dom');

import QueryBuilder from 'react-querybuilder';

import ActionRuleBuilder from './components/actionRule-builder';
import RuleBuilder from './components/rule-builder';
//var RuleBuilder = require('./components/rule-builder').default;
import Property from './components/property';
import { Provider } from 'react-redux';
import { createStore } from 'redux' 

require('./RuleBox.scss');

import fusionPropertyReducer from './reducers/fusionProperty';

let store = createStore(fusionPropertyReducer);

var ind = {key:0};

class App extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentWillMount(){
    var rules = [{id:0}];
    this.setState({rules : rules});    
  }
  
  addRule(e) {
    ind.key++;
    var newRules = this.state.rules;
    newRules.push({id:ind.key});
    this.setState({rules : newRules});
  }
  
  render() {

    return (
      < div > 
        < div className="RuleBox" > 
          < div align="center"> FAGI < /div >
        < /div >
        <div>
          <button className = "Button" type="button" onClick={e => this.addRule()}>Add Rule</button> 
        </div>
        <div >
          < RuleBuilder
            rules={this.state.rules}
          /> 
        </div>
      < /div >
    )
  }
}

ReactDOM.render(
   <Provider store={store}>
       <App />
   </Provider>,
  document.getElementById('root')
)
