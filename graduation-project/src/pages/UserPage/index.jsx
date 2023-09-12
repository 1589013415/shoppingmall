import React from 'react'
import { Outlet } from 'react-router-dom'

import { Layout } from 'antd';

import UserHeader from '../../compoents/UserCompoents/UserHeader';
import "./index.css"

const { Header, Content } = Layout;


function UserPage() {
  return (
    <Layout>
      <Header className='UserPageHeaderDiv' ><UserHeader /></Header>
      <Content className='UserPageContent'>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default UserPage
