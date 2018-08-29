import React, { Component } from 'react';
import Password from './PasswordComponent';
import Info from './InfoComponent';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'info',
    };
  }

  changeView(option) {
    this.setState({ view: option });
  }

  renderView() {
    return this.state.view === 'info' ? <Info /> : <Password />;
  }

  render() {
    const { view } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3 my-md-5 my-sm-1">
            <ul className="nav flex-column nav-pills">
              <li className="nav-item">
                <a
                  className={view === 'info' ? 'nav-link active' : 'nav-link'}
                  href="#"
                  onClick={() => this.changeView('info')}
                >
                  Edit Info
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={view === 'password' ? 'nav-link active' : 'nav-link'}
                  href="#"
                  onClick={() => this.changeView('password')}
                >
                  Change Password
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="/">
                  Logout
                </a>
              </li>
            </ul>
          </div>
          <div className="col">
            <div className="card mt-md-5 mt-sm-1">
              <div className="card-body">{this.renderView()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
