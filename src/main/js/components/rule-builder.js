const React = require('react');
const ReactDOM = require('react-dom');

import QueryBuilder from 'react-querybuilder';

require('./query-builder.scss');

const fields = [
 {name: 'Function 1', label: 'Function 1'},
 {name: 'Function 2', label: 'Function 2'}
];

const translations = {
    fields: {
        title: "Fields",
    },
    operators: {
        title: "Operators",
    },
    value: {
        title: "Value",
    },
    removeRule: {
        label: "x",
        title: "Remove rule",
    },
    removeGroup: {
        label: "x",
        title: "Remove group",
    },
    addRule: {
        label: "+Function",
        title: "Add function",
    },
    addGroup: {
        label: "+Group",
        title: "Add group",
    },
    combinators: {
        title: "Logical Operation",
    }
}
function logQuery(query) {
  console.log(query);
}

class RuleBuilder extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      < div className="query-builder"> 
        < QueryBuilder
          fields = {fields}
          translations = {translations}
          onQueryChange = {logQuery} / > 
      < /div>
    );
  }
}

export default RuleBuilder;