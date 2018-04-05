import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import './index.css';

const { Sider, Footer } = Layout;
const { Item } = Menu;

/*
  <SubMenu title={
          <span>
            <Icon type="user" />
            {!!collapsed && <span>Accounts</span>}
          </span>
        }>
          <Item>SubMenu Item</Item>
        </SubMenu>
*/
function SiderMenu({ collapsed }) {
  return (
    <div className="sider-menu">
      <Menu mode={ collapsed ? 'vertical' : 'inline' } theme="dark">
        <Item key="users">
          <Icon type="team" />
          {!collapsed && <span>Accounts</span>}
        </Item>
        <Item key="articles">
          <Icon type="paper-clip" />
          {!collapsed && <span>Articles</span>}
        </Item>
      </Menu>
    </div>
  )
}

function AdminLayout({ children, collapsed, dispatch }) {
  //<Header><span onClick={() => { dispatch({ type: 'layout/toggleSider', payload: { collapsed: !collapsed } })}}>TEAMUG Header</span></Header>
  const onCollapseHandler = (collapsed) => {
    dispatch({ type: 'layout/toggleSider', payload: { collapsed } })
  }
  return (
    <Layout className="admin-layout">
      <Sider width={175} collapsible collapsed={collapsed} onCollapse={onCollapseHandler}>
        <SiderMenu collapsed={collapsed}/>
      </Sider>
      <Layout>
        {children}
        <Footer style={{ textAlign: 'center' }}>Team UG @2018</Footer>
      </Layout>
    </Layout>
  );
}

export default connect(({ layout }) => layout)(AdminLayout);
