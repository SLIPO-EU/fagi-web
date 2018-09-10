var _ = require('lodash');

export const getShapedProperties = (properties) => properties.map(prop => ({
  key: getLabel(prop),
  label: getLabel(prop),
  value: getValue(prop)
}));

//_.remove(props, prop => prop.label === 'name → nameValue');

function getLabel(property){
  let a = property.objectProperty;
  let la = a.split("#");
  let b = property.datatypeProperty;
  let lb = b.split("#");
  let label = la[1] + ' → ' + lb[1];
  return label;
}

function getValue(property){
  let value = property.objectProperty + ' ' + property.datatypeProperty;
  return value;
}
