import React from "react";

function Typography() {
  return (
    <>
      <div className="row">

        {/* Headings */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Headings</h4>
              <p className="card-description">
                Add tags <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> or class <code>.h1</code> to <code>.h6</code>
              </p>

              <div className="template-demo">
                <h1>h1. Heading</h1>
                <h2>h2. Heading</h2>
                <h3>h3. Heading</h3>
                <h4>h4. Heading</h4>
                <h5>h5. Heading</h5>
                <h6>h6. Heading</h6>
              </div>
            </div>
          </div>
        </div>

        {/* Headings with secondary text */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Headings with secondary text</h4>
              <p className="card-description">Add faded secondary text to headings</p>

              <div className="template-demo">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <h1 key={n} className={`h${n}`}>
                    {`h${n}. Heading `}
                    <small className="text-muted">Secondary text</small>
                  </h1>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Display Headings */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Display headings</h4>
              <p className="card-description">
                Add class <code>.display1</code> to <code>.display-4</code>
              </p>

              <div className="template-demo">
                <h1 className="display-1">Display 1</h1>
                <h1 className="display-2">Display 2</h1>
                <h1 className="display-3">Display 3</h1>
                <h1 className="display-4">Display 4</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Paragraph */}
        <div className="col-md-6 d-flex align-items-stretch">
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Paragraph</h4>
                  <p className="card-description">Write text in &lt;p&gt; tag</p>

                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                    been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                  </p>
                </div>
              </div>
            </div>

            {/* Icon Sizes */}
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Icon size</h4>
                  <p className="card-description">Add class .icon-lg, .icon-md, .icon-sm</p>

                  <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                      <i className="typcn typcn-compass icon-lg text-warning"></i>
                      <p className="mb-0 ms-1">Icon-lg</p>
                    </div>

                    <div className="col-md-4 d-flex align-items-center">
                      <i className="typcn typcn-compass icon-md text-success"></i>
                      <p className="mb-0 ms-1">Icon-md</p>
                    </div>

                    <div className="col-md-4 d-flex align-items-center">
                      <i className="typcn typcn-compass icon-sm text-danger"></i>
                      <p className="mb-0 ms-1">Icon-sm</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Blockquotes */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Blockquotes</h4>
              <p className="card-description">Wrap content inside &lt;blockquote&gt;</p>

              <blockquote className="blockquote">
                <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </blockquote>

              <blockquote className="blockquote blockquote-primary mt-3">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <footer className="blockquote-footer">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Address & Lead */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">

              <h4 className="card-title">Address</h4>
              <p className="card-description">Use &lt;address&gt; tag</p>

              <div className="row">
                <div className="col-md-6">
                  <address>
                    <p className="fw-bold">PolluxUI inc.</p>
                    <p>695 Isom Ave, Suite 00</p>
                    <p>San Francisco, CA 94107</p>
                  </address>
                </div>

                <div className="col-md-6">
                  <address className="text-primary">
                    <p className="fw-bold">E-mail</p>
                    <p className="mb-2">johndoe@examplemail.com</p>

                    <p className="fw-bold">Web Address</p>
                    <p>www.PolluxUI.com</p>
                  </address>
                </div>
              </div>

              <h4 className="card-title mt-4">Lead</h4>
              <p className="lead">
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>

            </div>
          </div>
        </div>

        {/* Text Colors */}
        <div className="col-md-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Text colors</h4>

              <div className="row">
                <div className="col-md-6">
                  <p className="text-primary">.text-primary</p>
                  <p className="text-success">.text-success</p>
                  <p className="text-danger">.text-danger</p>
                  <p className="text-warning">.text-warning</p>
                  <p className="text-info">.text-info</p>
                </div>

                <div className="col-md-6">
                  <p className="text-light bg-dark ps-1">.text-light</p>
                  <p className="text-secondary">.text-secondary</p>
                  <p className="text-dark">.text-dark</p>
                  <p className="text-muted">.text-muted</p>
                  <p className="text-white bg-dark ps-1">.text-white</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media Objects */}
        <div className="col-md-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Top aligned media</h4>
              <div className="media">
                <i className="typcn typcn-globe icon-md text-info d-flex align-self-start me-3"></i>
                <div className="media-body">
                  <p className="card-text">Cras sit amet nibh libero.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center aligned */}
        <div className="col-md-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Center aligned media</h4>
              <div className="media">
                <i className="typcn typcn-globe icon-md text-info d-flex align-self-center me-3"></i>
                <div className="media-body">
                  <p className="card-text">Cras sit amet nibh libero.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom aligned */}
        <div className="col-md-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Bottom aligned media</h4>
              <div className="media">
                <i className="typcn typcn-globe icon-md text-info d-flex align-self-end me-3"></i>
                <div className="media-body">
                  <p className="card-text">Cras sit amet nibh libero.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlighted Text */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Highlighted Text</h4>
              <p className="card-description">
                Wrap text in &lt;mark&gt; to highlight
              </p>

              <p>
                It is a long <mark className="bg-warning text-white">established</mark> fact that a reader
                will be distracted by readable content.
              </p>

            </div>
          </div>
        </div>

        {/* Lists */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">List Unordered</h4>
              <ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Integer molestie lorem at massa</li>
                <li>Facilisis in pretium nisl aliquet</li>
                <li>Nulla volutpat aliquam velit</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bold */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Bold text</h4>

              <p>
                It is a long <span className="fw-bold">established fact</span> that a reader will be distracted.
              </p>

            </div>
          </div>
        </div>

        {/* Ordered List */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">List Ordered</h4>
              <ol>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Integer molestie lorem at massa</li>
                <li>Facilisis in pretium nisl aliquet</li>
                <li>Nulla volutpat aliquam velit</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Underline + Lowercase + Uppercase */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">

              <h4 className="card-title text-primary">Underline</h4>
              <p><u>Lorem ipsum dolor sit amet.</u></p>

              <h4 className="card-title text-danger mt-4">Lowercase</h4>
              <p className="text-lowercase">LOREM IPSUM DOLOR SIT AMET</p>

              <h4 className="card-title text-warning mt-4">Uppercase</h4>
              <p className="text-uppercase">lorem ipsum dolor sit amet</p>

            </div>
          </div>
        </div>

        {/* Muted + Strike + Capitalize */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">

              <h4 className="card-title">Mute</h4>
              <p className="text-muted">This is muted text example.</p>

              <h4 className="card-title text-success mt-4">Strike</h4>
              <p><del>Striked sample text goes here</del></p>

              <h4 className="card-title text-info mt-4">Capitalized</h4>
              <p className="text-capitalize">lorem ipsum dolor sit amet</p>

            </div>
          </div>
        </div>

        {/* Icon List Styles */}
        <div className="col-md-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">List with tick</h4>
              <ul className="list-ticked">
                <li>Lorem ipsum</li>
                <li>Consectetur adipiscing</li>
                <li>Integer molestie</li>
                <li>Facilisis in pretium</li>
                <li>Nulla volutpat</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">List with arrow</h4>
              <ul className="list-arrow">
                <li>Lorem ipsum</li>
                <li>Consectetur adipiscing</li>
                <li>Integer molestie</li>
                <li>Facilisis in pretium</li>
                <li>Nulla volutpat</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">List with star</h4>
              <ul className="list-star">
                <li>Lorem ipsum</li>
                <li>Consectetur adipiscing</li>
                <li>Integer molestie</li>
                <li>Facilisis in pretium</li>
                <li>Nulla volutpat</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Typography;
