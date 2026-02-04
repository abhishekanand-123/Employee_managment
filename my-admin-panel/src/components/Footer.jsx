import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="card">
        <div className="card-body">
          <div className="d-sm-flex justify-content-center justify-content-sm-between">
            
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
              Copyright © 2024{" "}
              <a 
                href="https://www.bootstrapdash.com/" 
                className="text-muted" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Bootstrapdash
              </a>. 
              All rights reserved.
            </span>

            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">
              Hand-crafted & made with{" "}
              <i className="typcn typcn-heart-full-outline text-danger"></i>
            </span>

          </div>
        </div>
      </div>
    </footer>
  );
}
