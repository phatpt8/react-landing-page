import React, { Component } from 'react';
import { connect } from 'dva';
import { List } from 'antd';
import './index.css';

// const Item = List.Item;
// const Meta = List.Item.Meta;
class ListArticles extends Component {
  render() {
    const { articles } = this.props;

    return (
      <List
        itemLayout="horizontal"
        dataSource={articles}
        renderItem={item => {
          console.log('articles item', item);
        }}
      />
    );
  }
}

export default connect()(ListArticles);
