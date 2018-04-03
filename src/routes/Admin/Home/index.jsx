import React, { PureComponent } from 'react';
import { connect } from 'dva';
import AdminLayout from '$components/AdminLayout';
import './index.css';

class IndexPage extends PureComponent {
  render() {
    return (
      <AdminLayout>
        <div className="admin-home-page">asd</div>
      </AdminLayout>
    );
  }
}

IndexPage.propTypes = {};

export default connect(state => ({...state}))(IndexPage);
