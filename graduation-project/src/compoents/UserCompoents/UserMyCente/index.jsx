import React from 'react'

export default function UserMyCente() {
    return (
        <Drawer
            title={<span style={{ color: "#FFE78F" }}>个人中心</span>}
            width={720}
            onClose={() => { }}
            open={true}
            headerStyle={{ background: "rgb(10, 63, 137)" }}
            bodyStyle={{
                background: "aliceblue",
                paddingBottom: 80,
            }}
            extra={
                <Button onClick={() => { }}>返回</Button>
            }
            destroyOnClose
        >
            <div style={{ height: "50px" }} />
            {/* <UserMsgDrawer /> */}
        </Drawer>
    )
}
