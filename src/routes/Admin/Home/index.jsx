import React, { PureComponent } from 'react';
import { connect } from 'dva';
import AdminLayout from '$components/AdminLayout';
import FormLogin from '$components/FormLogin';
import './index.css';

class IndexPage extends PureComponent {
  render() {
    const { isAuth } = this.props;
    return (
      <AdminLayout>
        <div className="admin-homepage">
          {isAuth ? null : <FormLogin />}
        </div>
      </AdminLayout>
    );
  }
}

export default connect(({ admin }) => admin)(IndexPage);
