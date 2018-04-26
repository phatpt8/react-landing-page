import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import AdminLayout from '$components/AdminLayout';
import ActionNav from '$components/ActionNav';
import ListArticles from '$components/ListArticles';
import CreateArticle from '$components/CreateArticle';
import './index.css';

class AdminArticles extends PureComponent {
  render() {
    const { articles, onCreateArticle, newArticle, onSubmitCreate } = this.props;
    return (
      <AdminLayout>
        <div className="admin-articles">
          <ActionNav
            onSubmitCreate={onSubmitCreate}
            onClickCreate={onCreateArticle(true)}
            onBack={onCreateArticle(false)}
            showBackBtn={newArticle}
          />
          {newArticle ? <CreateArticle /> : <ListArticles articles={articles} />}
        </div>
      </AdminLayout>
    );
  }
}

const mapStateToProps = ({ admin }) => admin;
const dispatchPropsToState = dispatch => {
  return {
    onSubmitCreate: () => {
      dispatch({ type: 'admin/newArticle', payload: { newArticle: true, forceSubmit: true } });
    },
    onCreateArticle: newArticle => () => {
      dispatch({ type: 'admin/newArticle', payload: { newArticle } });
      dispatch(routerRedux.push(newArticle ? '/admin/articles/create' : '/admin/articles'));
    },
  };
};
export default connect(mapStateToProps, dispatchPropsToState)(AdminArticles);
