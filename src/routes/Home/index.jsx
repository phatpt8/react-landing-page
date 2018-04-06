import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import { Row, Col, Layout, Button, notification } from 'antd';
import './index.css';

class IndexPage extends PureComponent {
  render() {
    return (
      <div className="home-page">
        <span>all start here</span>
      </div>
    );
  }
}

export default connect(state => ({ ...state }))(IndexPage);
