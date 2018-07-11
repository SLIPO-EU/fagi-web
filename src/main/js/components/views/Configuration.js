var React = require('react');
var { bindActionCreators } = require('redux');
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import MDSpinner from "react-md-spinner";
var { uploadFile, submitConfigurationPath } = require('../../actions/ConfigurationActions');

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
    this.state = {files: [], configPath: '', validPath: false}
  }

  onDrop(files) {
    var context = this;
    var reader = new FileReader();
    reader.addEventListener("loadend", function(event) {
      context.props.actions.uploadFile(event.target.result);
    });
    reader.readAsText(files[0]);
    this.setState({
      files
    });
  }

  setConfigPath(path) {
    //basic validity check for path
    let valid = path.startsWith('/') ? true : false;  
    this.setState({configPath: path, validPath: valid});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    let value = event.target[0].value;
    this.props.actions.submitConfigurationPath(event.target[0].value);
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
    
    if(this.state.files) {
      if(this.state.files.length >0 && this.props.ontology.properties){
        ontInfo = (
          <ul>
            <li key={'1'}>{this.props.ontology.numberOfClasses} classes</li>
           <li key={'2'}>{this.props.ontology.properties.length} properties</li>
          </ul>
        );        
      }
    }
    
    return (
      <div>
        <div>
          <div className="ComponentBox">
          <section>
            <div>
              <Dropzone 
                disabled={this.props.loading}
                style={this.props.loading ? styleBlur : style}
                multiple={false}
                onDrop={this.onDrop.bind(this)}>
                <p>Drag and drop ontology file , or click and select a file. </p>
                <p>Only *.owl files will be accepted</p>
              </Dropzone>
            </div>
           {loading}
            <aside className ={(this.props.loading ? 'blur' : null)}>
              <label>Accepted Ontology:</label>
              {ontInfo}
            </aside>
          </section>
          </div>
          <div className="ComponentBox">
            <form onSubmit={e => this.handleSubmit(e)}>
              <label>
                Configuration filepath:&nbsp;
                <input type="text" value={this.state.configPath} onChange={e => this.setConfigPath(e.target.value)} />
              </label>
              <input  disabled={!this.state.validPath} type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.configuration.loading,
    configPath: state.configuration.configPath,
    ontology: state.configuration.ontology
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { uploadFile, submitConfigurationPath }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);