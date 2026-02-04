import React from "react";

function Dropdowns() {
  return (
    <>
      <div className="row">
        <div className="col-lg-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Dropdown menu</h4>

              <div className="row">
                
                {/* Reusable Dropdown Item */}
                {[
                  { color: "primary", id: 1 },
                  { color: "secondary", id: 2 },
                  { color: "danger", id: 3 },
                  { color: "warning", id: 4 },
                  { color: "light", id: 8 },
                  { color: "success", id: 5 },
                  { color: "info", id: 6 },
                  { color: "dark", id: 7 },
                ].map((item) => (
                  <div className="col-md-3 dropdown-menu-static-demo" key={item.id}>
                    <div className="dropdown">
                      <button
                        className={`btn btn-${item.color} dropdown-toggle`}
                        type="button"
                        id={`dropdownMenuButton${item.id}`}
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        Dropdown
                      </button>

                      <div
                        className="dropdown-menu show"
                        aria-labelledby={`dropdownMenuButton${item.id}`}
                      >
                        <h6 className="dropdown-header">Settings</h6>
                        <button className="dropdown-item">Action</button>
                        <button className="dropdown-item">Another action</button>
                        <button className="dropdown-item">Something else here</button>

                        <div className="dropdown-divider"></div>

                        <button className="dropdown-item">Separated link</button>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dropdowns;
