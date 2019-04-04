import React, {Component} from 'react';

export default class InfoBar extends Component {

  render() {
    return (
      <footer role="contentinfo" className="footer site-footer">
      <div className="container">
          <div className="row">
              <div className="content">

                  © <a href="#" target="_blank">AniGo</a>
                  {/* <span className="footer-divider">|</span> */}
                  {/* <small className="text-muted">Version 0.7</small> */}
                  <span className="footer-divider">|</span>
                  {/* <a href="#" target="_blank">FSU1.BU2</a> */}

              </div>
              <div className="sidebar">

                  <a href="http://www.anigo.com" target="_blank" className="footer-author" title="AniGo">
                      <span>AniGo</span>
                  </a>

              </div>
          </div>
      </div>
      </footer>
    );
  }
}
