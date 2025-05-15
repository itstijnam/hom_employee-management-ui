import React from 'react'
import '../style/ManageEmployees.scss'
import { useNavigate } from 'react-router-dom';
import { decrementAdminCount, decrementEmployeeCount, decrementSalaryCount, setEmployee, setSelectedEmployee } from '../../../redux/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';

function ManageEmployees() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { employee } = useSelector(store => store.employee)

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
        <div className="employee-list-container">
            <h2>Employee List</h2>
            <button onClick={() => {
                dispatch(setSelectedEmployee(null))
                navigate('/add-employee')
            }} className="add-employee-btn">Add Employee</button>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Salary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employee.map((emp, index) => (
                        <tr key={index}>
                            <td>{emp.name}</td>
                            <td>
                                <img src={emp.image} alt="emp" className="emp-img" />
                            </td>
                            <td>{emp.email}</td>
                            <td>{emp.address}</td>
                            <td>{emp.salary}</td>
                            <td>
                                <button className="edit-btn" onClick={() => editHandler(emp.email)}>Edit</button>
                                <button className="delete-btn"  onClick={() => deleteHandler(emp.email, emp.post)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ManageEmployees