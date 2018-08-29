import React, { Component, Fragment } from 'react';
import Nav from '../navbar/index';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-sm-12  my-4">
              <div className="card">
                <div className="card-body ">
                  <h3 className="card-title my-3 mx-3">Add a pet</h3>
                  <div className="form-group my-3 mx-3">
                    <h6 className="section-header mt-5">Name and Age</h6>
                    <div className="row">
                      <div className="col-sm-12 mb-4 col-md-6">
                        <input
                          type="name"
                          className="form-control"
                          id="name"
                          aria-describedby="name"
                          placeholder="name"
                        />
                      </div>
                      <div className="col">
                        <input type="age" className="form-control" id="age" aria-describedby="age" placeholder="age" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group my-3 mx-3">
                    <h6 className="section-header mt-5">Breed</h6>
                    <div className="row">
                      <div className="col-sm-12 mb-4 col-md-6">
                        <input
                          type="breed"
                          className="form-control"
                          id="breed"
                          aria-describedby="breed"
                          placeholder="breed"
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="form-group my-3 mx-3">
                    <label className="section-header mt-3" for="exampleFormControlTextarea1">
                      Caption
                    </label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" />
                  </div>
                  <button type="button" className="btn btn-primary btn-lg btn-block">
                    Add pet
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 px-0">
              <div className="col-md-12 mt-4">
                <div className="card border-0">
                  <div className="card-body">
                    <h6>Add a pet to our database!</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
