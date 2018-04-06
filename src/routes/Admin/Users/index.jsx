import React, { PureComponent } from 'react';
import { connect } from 'dva';
import AdminLayout from '$components/AdminLayout';
import './index.css';

class AdminUsers extends PureComponent {
  render() {
    const { isAuth } = this.props;
    return (
      <AdminLayout>
        <div className="admin-users" />
      </AdminLayout>
    );
  }
}

export default connect(({ admin }) => admin)(AdminUsers);
