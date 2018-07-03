var React = require('react');
var { bindActionCreators } = require('redux');
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import MDSpinner from "react-md-spinner";
var { uploadFile } = require('../../actions/ConfigurationActions');

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
    this.state = {files: []}
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

    return (
      <div>
        <div>
          <div className="FusionBox">
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
              <label>Accepted Ontology</label>
              <ul>
                {
                  this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
              </ul>
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
    loading: state.configuration.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { uploadFile }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);