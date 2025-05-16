import React from 'react'
import '../style/ProfilePage.scss'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function ProfilePage() {
    const navigate = useNavigate();
    const {currentUser} = useSelector(store => store.auth)

  return (
    <div className='profile'>
        <div className='current_user_profile'>
            <div className="current-user-detail">
                <div className="current_user_image">
                    <img src="/blank_profile.png" alt="Profile" />
                </div>
                <div className='current_user_basic_info'>
                    <h2>{currentUser?.name ? currentUser?.name : 'Name'}</h2>
                    <p>{currentUser?.post ? currentUser?.post : 'Post'}</p>
                </div>
            </div>
            <div className="current-user-action_btn" onClick={()=>navigate('/')}>Task</div>
        </div>
        <div className='current_user_official_details'>
                <div className="current_user_join_data">
                    <p>Employee ID: <span>{currentUser?.employee_id ? currentUser?.employee_id : 'emp_789202145'}</span></p>
                    <p>Join Date: <span>{ currentUser?.join_date ? currentUser?.join_date : '12 Feb, 20XX'}</span></p>
                </div>
                <div className='current_user_ids'>
                    <p>Registered Email <span>{currentUser?.email ? currentUser?.email : 'example@gmail.com'}</span></p>
                    <p>Registered Mobile <span>{ currentUser?.mobile ? currentUser?.mobile : '987865XXXX'}</span></p>
                </div>
                <div className='current_user_head'>
                    <h2>Supervisor: <span>{currentUser?.supervisor ? currentUser?.supervisor : 'John Doe'}</span></h2>
                </div>
        </div>
    </div>
  )
}

export default ProfilePage