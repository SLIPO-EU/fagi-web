import * as React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import { Container } from 'reactstrap';
import Sidebar from './views/SideBar.js';

import Configuration from './views/Configuration.js';
import App from './views/App.js';
import Statistics from './views/Statistics.js';
import Header from './views/Header.js';
import Footer from './views/Footer.js';

import {
  StaticRoutes,
  ErrorPages
} from '../model/routes';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this._toggleSidebar = this._toggleSidebar.bind(this);
    this._styleSidebar = this._styleSidebar.bind(this);
    this._setAsideMenuVisibility = this._setAsideMenuVisibility.bind(this);
    this._toggleAsideMenu = this._toggleAsideMenu.bind(this);
    this._styleAsideMenu = this._styleAsideMenu.bind(this);

    this.state = {
      sidebarOpen: true,
      sidebarStyle: 'fixed', // fixed, compact, minimized, off-canvas
      asideOpen: false,
      asideStyle: 'fixed', // fixed, off-canvas
    };
  }

  _toggleSidebar() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  _styleSidebar(style) {
    if (['fixed', 'compact', 'minimized', 'off-canvas', 'mobile-show'].indexOf(style) < 0) {
      console.warn('Ignoring unknown sidebar style: ' + style);
      return;
    }

    this.setState({ sidebarStyle: style });
  }

  _setAsideMenuVisibility(value) {
    this.setState({ asideOpen: value });
  }

  _toggleAsideMenu() {
    this.setState({ asideOpen: !this.state.asideOpen });
  }

  _styleAsideMenu(style) {
    if (['fixed', 'off-canvas'].indexOf(style) < 0) {
      console.warn('Ignoring unknown aside-menu style: ' + style);
      return;
    }

    this.setState({ asideStyle: style });
  }

  render() {
    var cssClasses = [
      'app',
      /* header-* */
      'header-fixed',
      /* sidebar-* */
      this.state.sidebarOpen ? null : 'sidebar-hidden',
      'sidebar-' + (this.state.sidebarStyle || 'fixed'),
      /* aside-menu-* */
      this.state.asideOpen ? null : 'aside-menu-hidden',
      'aside-menu-' + (this.state.asideStyle || 'fixed'),
    ];

    return (
      <div className="app">
        <Header />
        <BrowserRouter basename={'/'} >
        <div className="app-body">
          <Route path="/" component={Sidebar} />
          <div className="main">
            <Container fluid >
              <Switch>
                <Route path={'/index.html'} component={Configuration} />
                <Route path={'/configuration'} component={Configuration} />
                <Route path={'/specification'} component={App} />
                <Route path={'/statistics'} component={Statistics} />
                <Redirect push={true} to={ErrorPages.NotFound} />
              </Switch>
            </Container>
          </div>
        </div>
       </BrowserRouter>
       <Footer />
      </div>
    );
  }
}

export default Home;
