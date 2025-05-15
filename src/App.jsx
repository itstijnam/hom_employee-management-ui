import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminLayout from './pages/adminPage/AdminLayout'
import AdminDashBoard from './pages/adminPage/components/AdminDashBoard'
import ManageEmployees from './pages/adminPage/components/ManageEmployees'
import AddEmployee from './pages/adminPage/components/AddEmployee'
import AddCategory from './pages/adminPage/components/AddCategory'


function App() {
  const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <AdminLayout/>,
      children: [
        {
          path: '',
          element: <AdminDashBoard/>
        },
        {
          path: 'manage-employee',
          element: <ManageEmployees/>
        },
        {
          path: 'add-employee',
          element: <AddEmployee/>
        },
        {
          path: 'add_category',
          element: <AddCategory/>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={browserRouter} />
  )
}

export default App