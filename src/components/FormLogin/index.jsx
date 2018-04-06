import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Icon, Button } from 'antd';
import './index.css';

const FormItem = Form.Item;

class FormLogin extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'admin/login', payload: values });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="form-login" onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="form-login-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default connect(({ admin }) => admin)(Form.create()(FormLogin));
