var React = require('react');
import { connect } from 'react-redux';
var { bindActionCreators } = require('redux');


class Configuration extends React.Component {

  onChangeFile(event) {
      event.stopPropagation();
      event.preventDefault();
      var file = event.target.files[0];
      console.log(file);
      this.setState({file});
  }
  
  showOpenFileDlg() {
      this.inputOpenFileRef.current.click()
  }
  
  render() {
    return (
       <div>
          <input className="FuseButton" id="myInput"
             type="file"
             ref={(ref) => this.upload = ref}
             onChange={this.onChangeFile.bind(this)}
          />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.app.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);

