import React from 'react'
import { Outlet } from 'react-router-dom'

import { Layout} from 'antd';
import UserHeader from '../../compoents/UserCompoents/UserHeader';

const { Header,Content } = Layout;


function UserPage() {
  return (
    <Layout>
      <Header style={{ background: '#0a3f89', height: '75px' }} ><UserHeader /></Header>
      <Content>
        <Outlet/>
      </Content>
    </Layout>
  )
}

export default UserPage
