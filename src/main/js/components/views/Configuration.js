var React = require('react');
var { bindActionCreators } = require('redux');
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import MDSpinner from "react-md-spinner";
var { uploadFile, submitConfiguration } = require('../../actions/ConfigurationActions');

var style = {
  textAlign: 'center',
  fontSize: '1em',
  color: '#656565',
  border: '1px dotted #656565'
}

var styleBlur = {
  textAlign: 'center',
  fontSize: '1em',
  color: '#656565',
  border: '1px dotted #656565',
  filter: 'blur(2px)'
}

class Configuration extends React.Component {

  constructor() {
    super();
    this.state = {ontologyFile: null, configXML: null}
  }

  onOntologyDrop(files) {
    var context = this;
    var reader = new FileReader();
    reader.addEventListener("loadend", function(event) {
      context.props.actions.uploadFile(event.target.result);
    });
    reader.readAsText(files[0]);
    this.setState({
      ontologyFile : files[0]
    });
  }

  onConfigDrop(files) {

    var context = this;
    let configurationXML = null;
    var reader = new FileReader();
    reader.readAsText(files[0]);
    reader.addEventListener("loadend", function(event) {
      let configurationXML = files[0];
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(event.target.result, "text/xml");

      if(!xmlDoc.getElementsByTagName("left").length > 0){
        alert("Something is wrong with configuration");
      } else {
        configurationXML.left = xmlDoc.getElementsByTagName("left")[0].childNodes[5].firstChild.nodeValue;
        configurationXML.right = xmlDoc.getElementsByTagName("right")[0].childNodes[5].firstChild.nodeValue;
        configurationXML.links = xmlDoc.getElementsByTagName("links")[0].childNodes[5].firstChild.nodeValue;
        configurationXML.mode = xmlDoc.getElementsByTagName("target")[0].childNodes[3].firstChild.nodeValue;
        configurationXML.output = xmlDoc.getElementsByTagName("target")[0].childNodes[5].firstChild.nodeValue;

        context.props.actions.submitConfiguration(event.target.result, files[0]);
      }
    });

    this.setState({configXML: configurationXML});
  }

  render() {

    let loading = null;
    if(this.props.loading){
      
      loading = (
        <div className="centered-up">
          <MDSpinner 
            color1="#263238"
            color2="#676f73"
            color3="#a8adaf"
            color4="#676f73"
            duration={4000} 
            size={80}
          />
        </div>
      );      
    }

    let ontInfo = null;
    if(this.props.ontology) {
      if(this.props.ontology.properties){
        ontInfo = (
          <ul>
            <li key={'1'}><b>{this.props.ontology.numberOfClasses}</b> classes</li>
           <li key={'2'}><b>{this.props.ontology.properties.length}</b> properties</li>
          </ul>
        );        
      }
    }

    let configInfo = null;
    if(this.props.configXML) {
        configInfo = (
          <ul>
            <li key={'1'}><b>Left dataset: </b>{this.props.configXML.left}</li>
            <li key={'2'}><b>Right dataset: </b>{this.props.configXML.right}</li>
            <li key={'3'}><b>Links: </b>{this.props.configXML.links}</li>
            <li key={'4'}><b>Fusion mode: </b>{this.props.configXML.mode}</li>
            <li key={'5'}><b>Ouptut directory: </b>{this.props.configXML.output}</li>
            <li key={'6'}><b>Last modified: </b>{this.props.configXML.lastModifiedDate.toString()}</li>
          </ul>
        );        
    }

    let ontologyLabel = this.state.ontologyFile && this.props.ontology ? "Accepted Ontology: " + this.state.ontologyFile.name : "Accepted Ontology: None";
    let configLabel = this.props.configXML ? "Accepted configuration: " + this.props.configXML.name : "Accepted configuration: None";

    return (
      <div>
        <div className="breadcrumb">
            <span>
            <li className="breadcrumb-item">
                Configuration
            </li>
            </span>
        </div>
        <div>
          <div className="ComponentBox">
          <section>
            <div>
              <Dropzone 
                disabled={this.props.loading}
                style={this.props.loading ? styleBlur : style}
                multiple={false}
                onDrop={this.onOntologyDrop.bind(this)}>
                <p>Drag and drop ontology file , or click and select a file. </p>
                <p>Only *.owl files will be accepted</p>
              </Dropzone>
            </div>
           {loading}
            <aside className ={(this.props.loading ? 'blur' : null)}>
              <label>{ontologyLabel}</label>
              {ontInfo}
            </aside>
          </section>
          </div>
          <div className="ComponentBox">
            <section>
              <div>
                <Dropzone 
                  disabled={this.props.loading}
                  style={this.props.loading ? styleBlur : style}
                  multiple={false}
                  onDrop={this.onConfigDrop.bind(this)}>
                  <p>Drag and drop configuration XML file , or click and select a file. </p>
                  <p>Only *.xml files will be accepted</p>
                </Dropzone>
              </div>
              <aside className ={(this.props.loading ? 'blur' : null)}>
                <label>{configLabel}</label>
                {configInfo}
              </aside>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.configuration.loading,
    ontology: state.configuration.ontology,
    configXML: state.configuration.configXML
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { uploadFile, submitConfiguration }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);