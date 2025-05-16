import React from 'react'
import '../style/AdminSideBar.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../redux/authSlice';

function AdminSideBar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const adminSidebarNavList = [
    { icon: '⚖', text: 'Dashboard', url: '/' },
    { icon: '👥', text: 'Manage Employee', url: 'manage-employee' },
    { icon: '🗂️', text: 'Category', url: '/' },
    { icon: '👤', text: 'Profile', url: '/' },
    { icon: '⏻', text: 'Logout', url: '/' },
]

const sideBarNavHandler = (text)=>{
    if(text === 'Dashboard'){
        navigate('/');
    }else if(text === 'Manage Employee'){
        navigate('/manage-employee');
    } else if(text === 'Category'){
        navigate('/add_category')
    } else if (text === 'Profile'){
        navigate('/profile')
    } else if(text === 'Logout'){
        dispatch(setCurrentUser(null))
        navigate('/')
    }
}

  return (
    <div className='admin-side-bar'>
        <div className="admin-side-navlist">
            <div className='nav-item'>
                {adminSidebarNavList.map((n,i)=>(
                    <p key={i} onClick={()=>sideBarNavHandler(n.text)} className='nav-icon'> {n.icon} <span className='nav-text'>{n.text.charAt(0).toUpperCase() + n.text.slice(1).toLocaleLowerCase()}</span> </p>
                ))}
            </div>
        </div>
    </div>
  )
}

export default AdminSideBar