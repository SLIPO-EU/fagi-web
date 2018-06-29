var React = require('react');
var { bindActionCreators } = require('redux');
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
var { uploadFile } = require('../../actions/ConfigurationActions');

var style = {
  textAlign: 'center',
  fontSize: '1em',
  color: '#656565',
  border: '1px dotted #656565'
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
    return (
      <div className="FusionBox">
      <section>
        <div>
          <Dropzone 
            style={style}
            multiple={false}
            onDrop={this.onDrop.bind(this)}>
            <p>Drag and drop ontology file , or click to select file to upload. </p>
            <p>Only *.owl files will be accepted</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Accepted Ontology</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.app.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { uploadFile }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);