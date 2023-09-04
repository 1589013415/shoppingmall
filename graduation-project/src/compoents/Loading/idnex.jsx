import React from 'react'

import { Spin } from 'antd';
import "./index.css"
export default function Loading() {
  return (
    <div className="loadingDiv">
      <Spin spinning={true}  size="large"/>
    </div>
  )
}
