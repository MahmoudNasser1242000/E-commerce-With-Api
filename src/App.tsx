import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './components/routes/Layout/Layout'
import Home from './components/routes/Home/Home'
import ProductDetails from './components/routes/ProductDetails/ProductDetails'
import Register from './components/routes/Register/Register'
import Login from './components/routes/Login/Login'
import ProtectAcount from './components/routes/ProtectAcount/ProtectAcount'
import ProtectAuth from './components/routes/ProtectAuth/ProtectAuth'

function App() {

  const routes = createBrowserRouter([
    {path: "/", element: <Layout/>, children: [
      {index: true, element: <ProtectAcount><Home/></ProtectAcount>},
      {path: "product/:id", element: <ProtectAcount><ProductDetails/></ProtectAcount>},
      {path: "register", element: <ProtectAuth><Register/></ProtectAuth>},
      {path: "login", element: <ProtectAuth><Login/></ProtectAuth>},
    ]}
  ])
  return <RouterProvider router={routes}></RouterProvider>
}

export default App
