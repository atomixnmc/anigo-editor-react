import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';

export default class About extends Component {
  render() {
    return (
      <div className="container">
        <h1>About Us</h1>
        <p>HRR is the system to Recruit new employee.</p>
        <ul>
          <li>Recruit new employee</li>
          <li>Rewards success application.</li>
        </ul>
        <p><a>Help</a></p>
      </div>
    );
  }
}
