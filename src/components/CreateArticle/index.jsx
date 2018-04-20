import React, { Component } from 'react';
import { connect } from 'dva';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Form, Input } from 'antd';
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
  handleSubmit = values => {
    console.log('=>', values);
  };

  onEditorStateChange = editorState => {
    // const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    // console.log('editorState', content);
    // console.log(this.editor);
  };

  render() {
    const { form: { getFieldDecorator } } = this.props;

    return (
      <div className="create-article">
        <Form onSubmit={this.handleSubmit}>
          <Item {...formItemLayout} label="Title" className="create-article-input">
            {getFieldDecorator('title')(<Input />)}
          </Item>
        </Form>
        <Editor
          editorRef={ref => (this.editor = ref)}
          wrapperClassName="create-article-editor"
          editorClassName="create-article-editor-textarea"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

export default connect()(Form.create()(CreateArticle));
