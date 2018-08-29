import React, { Component, Fragment } from 'react';
import { post } from 'axios';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { password: '', address: '', website: '' };

    this.handleLogin = this.handleLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const {
      target: { name, value },
    } = e;
    this.setState({ [name]: value });
  }

  async handleLogin() {
    try {
      await post('/auth/shelter/signup', this.state);
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    }
  }

  render() {
    const { password, address, website } = this.state;
    return (
      <Fragment>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <div className="container">
              <a className="navbar-brand" href="/">
                Paws
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent" />
            </div>
          </nav>
        </header>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card mt-5">
                <div className="card-body">
                  <div>
                    <h5 className="card-title mb-5">Login</h5>
                    <form className="form-horizontal">
                      <div className="row form-group-lg form-group">
                        <div className="row form-group-lg form-group">
                          <label className="col-sm-4 col-md-3 control-label">Website</label>
                          <div className="col">
                            <input
                              type="text"
                              name="website"
                              value={website}
                              placeholder="Website"
                              className="input-lg form-control"
                              onChange={this.onChange}
                            />
                          </div>
                        </div>
                        <label className="col-sm-4 col-md-3 control-label">Password</label>
                        <div className="col">
                          <input
                            type="text"
                            name="password"
                            value={password}
                            placeholder="Password"
                            className="input-lg form-control"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>

                      <div className="row form-group-lg form-group">
                        <label className="col-sm-4 col-md-3 control-label">Address</label>
                        <div className="col">
                          <input
                            type="text"
                            name="address"
                            value={address}
                            placeholder="Address"
                            className="input-lg form-control"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>

                      <div className="row justify-content-between">
                        <button onClick={this.handleLogin} type="submit" className="col-3 mx-3 btn btn-primary">
                          <p style={{ marginBottom: '0px' }}>Login</p>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 my-sm-1">
              <div className="card border-0 mt-5">
                <div className="card-body p-0">
                  <h6>Want to be on out platform?</h6>
                  <h6>Contact us!</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
