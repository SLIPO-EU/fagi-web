import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as  PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { toggleMenu } from './Menu';
import { StaticRoutes, buildPath } from '../../model/routes';

class Sidebar extends React.Component {

  render() {
    var { location } = this.props;

    var expanded = (p) => (
      location.pathname.indexOf(p) >= 0 || this.props.expanded.has(p)
    );

    var toggle = (p) => {
      this.props.toggleMenu(p);
    };

    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <NavLink to={StaticRoutes.Config} className="nav-link" activeClassName="active">
                {'Configuration'}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={StaticRoutes.Spec} className="nav-link" activeClassName="active">
                {'Specification'}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

Sidebar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ toggleMenu }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
