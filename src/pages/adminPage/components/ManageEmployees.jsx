// import React from 'react'
// import '../style/ManageEmployees.scss'
// import { useNavigate } from 'react-router-dom';
// import { decrementAdminCount, decrementEmployeeCount, decrementSalaryCount, setEmployee, setSelectedEmployee } from '../../../redux/employeeSlice';
// import { useDispatch, useSelector } from 'react-redux';

// function ManageEmployees() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { employee } = useSelector(store => store.employee)

//     // EDIT HANDLER
//     const editHandler = (employeeEmail) => {
//         const selected = employee.find(emp => emp.email === employeeEmail);
//         if (selected) {
//             dispatch(setSelectedEmployee(selected));
//             navigate('/add-employee');
//         }
//     };

//     //  DELETE HANDLER
//     const deleteHandler = (employeeEmail, employeePost) => {
//         const selected = employee.find(emp => emp.email === employeeEmail);
//         if (!selected) return;

//         // 1. Subtract salary
//         dispatch(decrementSalaryCount(Number(selected.salary)));

//         // 2. Filter out the employee
//         const updatedEmployees = employee.filter(emp => emp.email !== employeeEmail);
//         dispatch(setEmployee(updatedEmployees));

//         // 3. Update post count
//         if (employeePost === 'Admin') {
//             dispatch(decrementAdminCount());
//         } else {
//             dispatch(decrementEmployeeCount());
//         }
//     };

//     return (
//         <div className="employee-list-container">
//             <h2>Employee List</h2>
//             <button onClick={() => {
//                 dispatch(setSelectedEmployee(null))
//                 navigate('/add-employee')
//             }} className="add-employee-btn">Add Employee</button>

//             <table className="employee-table">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         {/* <th>Image</th> */}
//                         <th>Email</th>
//                         <th>Address</th>
//                         <th>Salary</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {employee.map((emp, index) => (
//                         <tr key={index}>
//                             <td>{emp.name}</td>
//                             {/* <td>
//                                 <img src={emp.image} alt="emp" className="emp-img" />
//                             </td> */}
//                             <td>{emp.email}</td>
//                             <td>{emp.address}</td>
//                             <td>{emp.salary}</td>
//                             <td>
//                                 <button className="edit-btn" onClick={() => editHandler(emp.email)}>Edit</button>
//                                 <button className="delete-btn"  onClick={() => deleteHandler(emp.email, emp.post)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default ManageEmployees

import React, { useState } from 'react';
import '../style/ManageEmployees.scss'
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrementAdminCount,
  decrementEmployeeCount,
  decrementSalaryCount,
  setEmployee,
  setSelectedEmployee,
} from '../../../redux/employeeSlice';

function ManageEmployees() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employee } = useSelector((store) => store.employee);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter employees based on search term
  const filteredEmployees = employee.filter((emp) =>
    Object.values(emp).some(
      (val) =>
        typeof val === 'string' &&
        val.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  // Edit handler
  const editHandler = (employeeEmail) => {
    const selected = employee.find((emp) => emp.email === employeeEmail);
    if (selected) {
      dispatch(setSelectedEmployee(selected));
      navigate('/add-employee');
    }
  };

  // Delete handler
  const deleteHandler = (employeeEmail, employeePost) => {

    const selected = employee.find((emp) => emp.email === employeeEmail);
    if (!selected) return;

    // 1. Subtract salary
    dispatch(decrementSalaryCount(Number(selected.salary)));

    // 2. Filter out the employee
    const updatedEmployees = employee.filter((emp) => emp.email !== employeeEmail);
    dispatch(setEmployee(updatedEmployees));

    // 3. Update post count
    if (employeePost === 'Admin') {
      dispatch(decrementAdminCount());
    } else {
      dispatch(decrementEmployeeCount());
    }
  };

  // View handler
  const viewHandler = (employeeEmail) => {
    const selected = employee.find((emp) => emp.email === employeeEmail);
    if (selected) {
      dispatch(setSelectedEmployee(selected));
      navigate('/employee-details');
    }
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="employee-list-container">
      <h2>Employee Management</h2>
      
      <div className="header-section">
        <div className="search-bar">
          <FiSearch />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button
          onClick={() => {
            dispatch(setSelectedEmployee(null));
            navigate('/add-employee');
          }}
          className="add-employee-btn"
        >
          <FiPlus /> Add Employee
        </button>
      </div>

      {filteredEmployees.length > 0 ? (
        <div className="employee-table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Email</th>
                <th>Address</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp, index) => (
                <tr key={index}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div className="emp-img-container">
                        {emp.image ? (
                          <img src={emp.image} alt={emp.name} className="emp-img" />
                        ) : (
                          <div className="emp-initials">{getInitials(emp.name)}</div>
                        )}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600' }}>{emp.name}</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{emp.post}</div>
                      </div>
                    </div>
                  </td>
                  <td>{emp.email}</td>
                  <td>{emp.address || 'N/A'}</td>
                  <td>${emp.salary}</td>
                  <td>
                    <span className={`status-badge ${emp.status || 'active'}`}>
                      {emp.status || 'Active'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="view-btn"
                        onClick={() => viewHandler(emp.email)}
                      >
                        <FiEye /> View
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => editHandler(emp.email)}
                      >
                        <FiEdit2 /> Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteHandler(emp.email, emp.post)}
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <FiUser />
          <h3>No Employees Found</h3>
          <p>
            {searchTerm
              ? 'No employees match your search criteria'
              : 'Add your first employee to get started'}
          </p>
          <button
            className="add-employee-btn"
            onClick={() => {
              dispatch(setSelectedEmployee(null));
              navigate('/add-employee');
            }}
          >
            <FiPlus /> Add Employee
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageEmployees;