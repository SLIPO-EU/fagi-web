
const React = require('react');
const ReactDOM = require('react-dom');

import QueryBuilder from 'react-querybuilder';

import ActionRuleBuilder from './components/actionRule-builder';
import RuleBuilder from './components/rule-builder';
import Property from './components/property';
import { Provider } from 'react-redux';
import { createStore } from 'redux' 
require('./RuleBox.scss');

import fusionPropertyReducer from './reducers/fusionProperty';

let store = createStore(fusionPropertyReducer);

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      < div > 
        < div className="RuleBox" > 
          < div align="center"> FAGI< /div > 
        < /div >
        <div >
          < RuleBuilder/ > 
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
