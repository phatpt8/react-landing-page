import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Layout, Button, notification } from 'antd';
import './index.css';

class IndexPage extends PureComponent {
  componentDidMount() {
    
  }

  render() {
    return (
      <div className="normal">
        wtf
      </div>
    );
  }
}

IndexPage.propTypes = {
};

export default connect(state => ({...state}))(IndexPage);
