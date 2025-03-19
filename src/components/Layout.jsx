import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  HomeOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import AddBook from './SweetAlertForm.jsx';

const { Header, Sider, Content } = Layout;

const MyLayout = ({ children, inputRef }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>

      <Sider trigger={null} collapsible collapsed={!collapsed} style={{ backgroundColor: '#f1833e', color: 'white'}}>

        <div className="demo-logo-vertical" />

        <Menu
          theme='light'
          style={{ backgroundColor: '#f1833e', color: 'white' }}
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Home',
              onClick: () => {
                  window.location.href = '/';
             }
            },
            {
              key: '2',
              icon: <FileSearchOutlined />,
              label: 'Search Book',
              onClick: () => {
                if (inputRef && inputRef.current) {
                  inputRef.current.focus(); // 🔹 Focus on input field
                }
              },
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Upload',
            
            },
          ]}
        />

      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <span className='main-head'> Booklet </span>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 480,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className={collapsed ? "hidden-content" : ""}
        >
          {children}

        </Content>
      </Layout>
    </Layout>
  );
};
export default MyLayout;