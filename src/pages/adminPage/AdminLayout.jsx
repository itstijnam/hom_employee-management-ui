import React from 'react'
import Header from '../../components/header/Header'
import AdminSideBar from './components/AdminSideBar'
import { Outlet } from 'react-router-dom'
import './AdminLayout.scss'

function AdminLayout() {
  return (
    <div className='admin-layout-page-the-very-first-box'>

        {/* 
        
            --> structure
            --------------------------------------------------------------------
                House of Market (header)
            -------------------------------------------------------------------
             (side bar)     |  childrens (all pages will be show here)
                            |
             dashboard      |
             employee       |
             category       |
             profile        |
                            |
                            |
             logout         |

        */}

        <Header/>
        <div className='admin-main-layout'>
            <div className='admin-side-bar'>
                <AdminSideBar/>
            </div>
            <div className='admin-side-bar-content-display'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default AdminLayout