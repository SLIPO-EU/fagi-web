const Properties = [
//  {
//    key:"help text",
//    label:"Select a property",
//    value:"Select a property",
//    selected: "selected",
//    disabled: "disabled"
//  },  
  {
    type:"property",
    key:"name",
    label:"name",
    value:"http://slipo.eu/def#name http://slipo.eu/def#nameValue",
    selected: null,
    disabled: false
  },
  {
    type:"property",
    key:"phone",
    label:"phone",
    value:"http://slipo.eu/def#phone http://slipo.eu/def#contactValue",
    selected: null,
    disabled: false
  },
  {
    type:"property",
    key:"street",
    label:"address-street",
    value:"http://slipo.eu/def#address http://slipo.eu/def#street",
    selected: null,
    disabled: false
  },
  {
    type:"property",
    key:"number",
    label:"address-number",
    value:"http://slipo.eu/def#address http://slipo.eu/def#number",
    selected: null,
    disabled: false
  },
  {
    type:"property",
    key:"date",
    label:"date",
    value:"http://slipo.eu/def#address http://slipo.eu/def#date",
    selected: null,
    disabled: false
  }  
];

module.exports = Properties;
