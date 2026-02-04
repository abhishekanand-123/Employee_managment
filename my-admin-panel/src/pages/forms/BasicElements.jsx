import React from "react";

const BasicElements = () => {
  return (
    <div className="content-wrapper">
      <div className="row">
        {/* Default Form */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Default Form</h4>
              <p className="card-description">Basic form layout</p>

              <form className="forms-sample">
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" placeholder="Username" />
                </div>

                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" placeholder="Email" />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Password" />
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                </div>

                <div className="form-check form-check-flat form-check-primary">
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" /> Remember me
                  </label>
                </div>

                <button type="submit" className="btn btn-primary me-2">
                  Submit
                </button>
                <button className="btn btn-light">Cancel</button>
              </form>
            </div>
          </div>
        </div>

        {/* Horizontal Form */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Horizontal Form</h4>
              <p className="card-description">Horizontal form layout</p>

              <form className="forms-sample">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Username</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" placeholder="Username" />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input type="email" className="form-control" placeholder="Email" />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Mobile</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" placeholder="Mobile Number" />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Password</label>
                  <div className="col-sm-9">
                    <input type="password" className="form-control" placeholder="Password" />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary me-2">
                  Submit
                </button>
                <button className="btn btn-light">Cancel</button>
              </form>
            </div>
          </div>
        </div>

        {/* Basic Form Elements */}
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Basic Form Elements</h4>

              <form className="forms-sample">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" placeholder="Name" />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-control" placeholder="Email" />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Password" />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select className="form-select">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>File Upload</label>
                  <input type="file" className="form-control" />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input type="text" className="form-control" placeholder="City" />
                </div>

                <div className="form-group">
                  <label>Textarea</label>
                  <textarea className="form-control" rows="4"></textarea>
                </div>

                <button type="submit" className="btn btn-primary me-2">
                  Submit
                </button>
                <button className="btn btn-light">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicElements;
