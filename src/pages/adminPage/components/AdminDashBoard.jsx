import React from 'react';
import '../style/AdminDashBoard.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    decrementAdminCount,
    decrementEmployeeCount,
    decrementSalaryCount,
    setSelectedEmployee,
    setEmployee,
} from '../../../redux/employeeSlice';
import { useNavigate } from 'react-router-dom';

function AdminDashBoard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { adminCount, employeeCount, salaryCount, employee } = useSelector(store => store.employee);

    // EDIT HANDLER
    const editHandler = (employeeEmail) => {
        const selected = employee.find(emp => emp.email === employeeEmail);
        if (selected) {
            dispatch(setSelectedEmployee(selected));
            navigate('/add-employee');
        }
    };

    //  DELETE HANDLER
    const deleteHandler = (employeeEmail, employeePost) => {
        const selected = employee.find(emp => emp.email === employeeEmail);
        if (!selected) return;

        // 1. Subtract salary
        dispatch(decrementSalaryCount(Number(selected.salary)));

        // 2. Filter out the employee
        const updatedEmployees = employee.filter(emp => emp.email !== employeeEmail);
        dispatch(setEmployee(updatedEmployees));

        // 3. Update post count
        if (employeePost === 'Admin') {
            dispatch(decrementAdminCount());
        } else {
            dispatch(decrementEmployeeCount());
        }
    };

    return (
        <div className='admin_dashboard'>
            <div className="admin_main_heading">Employee Management System </div>
            <div className="card_box">
                <div className="admin-employee-data-card">
                    <h1 className='card_tag'>Admin</h1>
                    <div>
                        <h2 className='card_total'>Total:</h2>
                        <h2 className='card-number'>{adminCount || 0}</h2>
                    </div>
                </div>
                <div className="admin-employee-data-card">
                    <h1 className='card_tag'>Employee</h1>
                    <div>
                        <h2 className='card_total'>Total:</h2>
                        <h2 className='card-number'>{employeeCount || 0}</h2>
                    </div>
                </div>
                <div className="admin-employee-data-card">
                    <h1 className='card_tag'>Salary</h1>
                    <div>
                        <h2 className='card_total'>Total:</h2>
                        <h2 className='card-number'>{salaryCount || 0} Rs</h2>
                    </div>
                </div>
            </div>
            <div className="admins_list">
                <div>
                    <div className="card-title">List of Admins</div>
                    {employee && employee.map((e, i) => (
                        <div className="adminlists" key={i}>
                            <div className="admins-email">{e.email}</div>
                            <div className="admins-actions-btns">
                                <button className='editBtn' onClick={() => editHandler(e.email)}>Edit</button>
                                <button className='delteBtn' onClick={() => deleteHandler(e.email, e.post)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminDashBoard;
