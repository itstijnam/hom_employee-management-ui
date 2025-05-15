import React, { useState, useEffect } from 'react';
import '../style/AddEmployee.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementAdminCount,
  incrementEmployeeCount,
  incrementSalaryCount,
  setEmployee,
  setSelectedEmployee,
} from '../../../redux/employeeSlice';

function AddEmployee() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedEmployee, employee, categories } = useSelector(store => store.employee);

  // Initialize form with selectedEmployee data if available, else empty defaults
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    salary: 0,
    address: '',
    category: '',
    post: '',
    image: null,
  });

  // On mount or when selectedEmployee changes, update form data for editing
  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        name: selectedEmployee.name || '',
        email: selectedEmployee.email || '',
        password: selectedEmployee.password || '',
        salary: selectedEmployee.salary || 0,
        address: selectedEmployee.address || '',
        category: selectedEmployee.category || '',
        post: selectedEmployee.post || '',
        image: selectedEmployee.image || null,
      });
    }
  }, [selectedEmployee]);

  const postList = ['Admin', 'Employee'];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'salary') {
      setFormData({ ...formData, salary: Number(value) });
    } else if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if editing existing employee (by email)
    const isEdit = selectedEmployee && selectedEmployee.email === formData.email;

    // If editing, replace the employee, else add new
    let updatedEmployees;
    if (isEdit) {
      updatedEmployees = employee.map(emp =>
        emp.email === formData.email ? formData : emp
      );
    } else {
      updatedEmployees = [formData, ...employee];
    }

    // Dispatch updated employees
    dispatch(setEmployee(updatedEmployees));

    // Salary update: if edit, adjust by difference; if new, add full salary
    if (isEdit) {
      const salaryDiff = formData.salary - (selectedEmployee.salary || 0);
      if (salaryDiff !== 0) dispatch(incrementSalaryCount(salaryDiff));
    } else {
      dispatch(incrementSalaryCount(formData.salary));
    }

    // Update counts only on new add
    if (!isEdit) {
      if (formData.post === 'Admin') {
        dispatch(incrementAdminCount());
      } else {
        dispatch(incrementEmployeeCount());
      }
    }

    // Clear selected employee and reset form
    dispatch(setSelectedEmployee(null));
    setFormData({
      name: '',
      email: '',
      password: '',
      salary: 0,
      address: '',
      category: '',
      post: '',
      image: null,
    });

    // Navigate back to dashboard or wherever you want
    navigate('/');
  };

  return (
    <div className="add-employee-container">
      <div className='backArrow' onClick={() => {
        navigate(-1)
        dispatch(setSelectedEmployee(null))
      }}>⮜</div>
      <h2>{selectedEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit} className="add-employee-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={!!selectedEmployee} // Disable email on edit to prevent changing unique key
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Category</option>
          {categories?.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          name="post"
          value={formData.post}
          onChange={handleChange}
          required
        >
          <option value="">Post</option>
          {postList.map((post, i) => (
            <option key={i} value={post}>{post}</option>
          ))}
        </select>

        <label className="file-label">
          Select Image
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
          />
        </label>

        <button type="submit" className="submit-btn">
          {selectedEmployee ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
