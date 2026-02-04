import React from "react";

function Buttons() {
  return (
    <>
      <div className="row">

        {/* Single color buttons */}
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="row">
              <div className="col-md-6">
                <div className="card-body">
                  <h4 className="card-title">Single color buttons</h4>
                  <p className="card-description">
                    Add class <code>.btn-{"{color}"}</code> for buttons in theme colors
                  </p>

                  <div className="template-demo">
                    <button type="button" className="btn btn-primary">Primary</button>
                    <button type="button" className="btn btn-secondary">Secondary</button>
                    <button type="button" className="btn btn-success">Success</button>
                    <button type="button" className="btn btn-danger">Danger</button>
                    <button type="button" className="btn btn-warning">Warning</button>
                    <button type="button" className="btn btn-info">Info</button>
                    <button type="button" className="btn btn-light">Light</button>
                    <button type="button" className="btn btn-dark">Dark</button>
                    <button type="button" className="btn btn-link">Link</button>
                  </div>
                </div>
              </div>

              {/* Rounded buttons */}
              <div className="col-md-6">
                <div className="card-body">
                  <h4 className="card-title">Rounded buttons</h4>
                  <p className="card-description">
                    Add class <code>.btn-rounded</code>
                  </p>

                  <div className="template-demo">
                    <button type="button" className="btn btn-primary btn-rounded btn-fw">Primary</button>
                    <button type="button" className="btn btn-secondary btn-rounded btn-fw">Secondary</button>
                    <button type="button" className="btn btn-success btn-rounded btn-fw">Success</button>
                    <button type="button" className="btn btn-danger btn-rounded btn-fw">Danger</button>
                    <button type="button" className="btn btn-warning btn-rounded btn-fw">Warning</button>
                    <button type="button" className="btn btn-info btn-rounded btn-fw">Info</button>
                    <button type="button" className="btn btn-light btn-rounded btn-fw">Light</button>
                    <button type="button" className="btn btn-dark btn-rounded btn-fw">Dark</button>
                    <button type="button" className="btn btn-link btn-rounded btn-fw">Link</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Outlined and Inverse Buttons */}
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="row">

              <div className="col-md-6">
                <div className="card-body">
                  <h4 className="card-title">Outlined buttons</h4>
                  <p className="card-description">
                    Add class <code>.btn-outline-{"{color}"}</code>
                  </p>

                  <div className="template-demo">
                    <button type="button" className="btn btn-outline-primary btn-fw">Primary</button>
                    <button type="button" className="btn btn-outline-secondary btn-fw">Secondary</button>
                    <button type="button" className="btn btn-outline-success btn-fw">Success</button>
                    <button type="button" className="btn btn-outline-danger btn-fw">Danger</button>
                    <button type="button" className="btn btn-outline-warning btn-fw">Warning</button>
                    <button type="button" className="btn btn-outline-info btn-fw">Info</button>
                    <button type="button" className="btn btn-outline-light btn-fw">Light</button>
                    <button type="button" className="btn btn-outline-dark btn-fw">Dark</button>
                    <button type="button" className="btn btn-link btn-fw">Link</button>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card-body">
                  <h4 className="card-title">Inverse buttons</h4>
                  <p className="card-description">
                    Add class <code>.btn-inverse-{"{color}"}</code>
                  </p>

                  <div className="template-demo">
                    <button type="button" className="btn btn-inverse-primary btn-fw">Primary</button>
                    <button type="button" className="btn btn-inverse-secondary btn-fw">Secondary</button>
                    <button type="button" className="btn btn-inverse-success btn-fw">Success</button>
                    <button type="button" className="btn btn-inverse-danger btn-fw">Danger</button>
                    <button type="button" className="btn btn-inverse-warning btn-fw">Warning</button>
                    <button type="button" className="btn btn-inverse-info btn-fw">Info</button>
                    <button type="button" className="btn btn-inverse-light btn-fw">Light</button>
                    <button type="button" className="btn btn-inverse-dark btn-fw">Dark</button>
                    <button type="button" className="btn btn-link btn-fw">Link</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Buttons;
