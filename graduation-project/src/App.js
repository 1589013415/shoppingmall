import React from 'react'
import PageRoutes from './PageRoutes';

function App() {
  return (
    <PageRoutes/>
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

