import React, { PureComponent } from 'react';
import { connect } from 'dva';
import AdminLayout from '$components/AdminLayout';
import ActionNav from '$components/ActionNav';
import ListArticles from '$components/ListArticles';
import './index.css';

class AdminArticles extends PureComponent {
  render() {
    const { articles, onCreateArticle, newArticle } = this.props;
    return (
      <AdminLayout>
        <div className="admin-articles">
          <ActionNav
            onClickCreate={onCreateArticle(true)}
            onBack={onCreateArticle(false)}
            showBackBtn={newArticle}
          />
          {newArticle ? <span>New article</span> : <ListArticles articles={articles} />}
        </div>
      </AdminLayout>
    );
  }
}

const mapStateToProps = ({ admin }) => admin;
const dispatchPropsToState = dispatch => {
  return {
    onCreateArticle: newArticle => () =>
      dispatch({ type: 'admin/newArticle', payload: { newArticle } }),
  };
};
export default connect(mapStateToProps, dispatchPropsToState)(AdminArticles);
