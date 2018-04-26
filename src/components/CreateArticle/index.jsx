import React, { Component } from 'react';
import { connect } from 'dva';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Form, Input, Button } from 'antd';
import './index.css';

const Item = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class CreateArticle extends Component {
  state = {
    content: '',
  };

  componentWillReceiveProps({ forceSubmit }) {
    const { form: { validateFields }, dispatch } = this.props;
    const { content } = this.state;
    if (forceSubmit) {
      validateFields((err, values) => {
        if (!err) {
          dispatch({ type: 'admin/createNewArticle', payload: { values: { ...values, content } } });
        }
      });
    }
  }

  onEditorStateChange = editorState => {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.setState({ content });
  };

  render() {
    const { form: { getFieldDecorator }, username } = this.props;

    return (
      <div className="create-article">
        <Form layout="inline">
          <Item {...formItemLayout} label="Title" className="create-article-input">
            {getFieldDecorator('title')(<Input />)}
          </Item>
          <Item {...formItemLayout} label="Author" className="create-article-input">
            {getFieldDecorator('author', {
              initialValue: username,
            })(<Input disabled />)}
          </Item>
          <Item>
            <Editor
              editorRef={ref => (this.editor = ref)}
              wrapperClassName="create-article-editor"
              editorClassName="create-article-editor-textarea"
              onEditorStateChange={this.onEditorStateChange}
            />
          </Item>
        </Form>
      </div>
    );
  }
}

export default connect(({ admin }) => admin)(Form.create()(CreateArticle));
