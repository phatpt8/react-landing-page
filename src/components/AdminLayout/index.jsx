import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import './index.css';

const { Header, Sider, Footer } = Layout;
const { SubMenu, Item } = Menu;

function SiderMenu({ collapsed = false }) {
  return (
    <Menu mode={collapsed?'vertical':'inline'} theme="dark">
      <SubMenu title={
        <span>
          <Icon type="search" />
          {collapsed? '' : <span>Menu Name</span>}
        </span>
      }>
        <Item>SubMenu Item</Item>
      </SubMenu>
    </Menu>
  )
}

function AdminLayout({ children }) {
  return (
    <Layout className="admin-layout">
      <Sider width={175} collapsible>
        <SiderMenu />
      </Sider>
      <Layout>
        <Header><span>TEAMUG</span></Header>
        {children}
        <Footer>footer</Footer>
      </Layout>
    </Layout>
  );
}

AdminLayout.propTypes = {};

export default connect(state => ({...state}))(AdminLayout);
