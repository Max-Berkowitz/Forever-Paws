import React from 'react';

export default () => (
  <div>
    <h5 className="card-title">Change Password</h5>
    <form className="form-horizontal">
      <div className="row form-group-lg form-group">
        <label className="col-sm-4 col-md-3 control-label">Current Password</label>
        <div className="col">
          <input
            type="text"
            name="last_name"
            placeholder="enter current password"
            id="last_name"
            className="input-lg form-control"
          />
        </div>
      </div>
      <div className="row form-group-lg form-group">
        <label className="col-sm-4 col-md-3 control-label">New Password</label>
        <div className="col">
          <input
            type="text"
            name="last_name"
            placeholder="enter new password"
            id="last_name"
            className="input-lg form-control"
          />
        </div>
      </div>
      <div className="row form-group-lg form-group">
        <label className="col-sm-4 col-md-3 control-label">Retype New</label>
        <div className="col">
          <input
            type="text"
            name="last_name"
            placeholder="retype new password"
            id="last_name"
            className="input-lg form-control"
          />
        </div>
      </div>
      <div className="form-group-lg form-group" />
    </form>
  </div>
);
