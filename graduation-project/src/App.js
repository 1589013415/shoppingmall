import React, { lazy, Suspense } from 'react'
import { BrowserRouter } from "react-router-dom"
import { Routes, Route, Navigate, useRoutes } from "react-router";

import {Spin} from 'antd';

import UserPage from './pages/UserPage/index'
import ManagePage from "./pages/ManagePage/index"
const UserHomne =lazy(()=>import("./compoents/UserCompoents/UserHome"))
const UserLogin =lazy(()=>import("./compoents/UserCompoents/UserLogin"))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/userpage" element={<UserPage />} >
          <Route path="userhome" element={<Suspense fallback={<Spin spinning={true}/>}><UserHomne /></Suspense>} />
          <Route path="userlogin" element={<Suspense fallback={<Spin spinning={true}/>}><UserLogin /></Suspense>} />
          <Route path="/userpage/*" element={<Navigate to="userhome" />} />
        </Route>
        <Route path="/managepage" element={<ManagePage />} />
        <Route path="/*" element={<Navigate to="/userpage/*" />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
// export class App extends Component {
//   render() {
//     return (
//       <BrowserRouter>
//         <Routes>
//           <Route path="/userhome" component={UserHome} />
//           <Route path="/userlogin" component={UserLoginPage} />
//           <Route path="/register" component={Register} />
//           <Route path="/manage/page" component={ManageHome} />
//           <Redirect to="/userhome" />
//         </Routes>
//       </BrowserRouter>
//     )
//   }
// }
// export default App

