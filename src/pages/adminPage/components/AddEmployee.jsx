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
import { FiArrowLeft, FiUpload, FiUser, FiMail, FiLock, FiDollarSign, FiMapPin, FiBriefcase } from 'react-icons/fi';

function AddEmployee() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedEmployee, employee, categories } = useSelector(store => store.employee);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    salary: '',
    address: '',
    category: '',
    post: '',
    image: null,
    preview: null,
  });

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        ...selectedEmployee,
        salary: selectedEmployee.salary.toString(),
        preview: selectedEmployee.image || null,
      });
    }
  }, [selectedEmployee]);

  const postList = ['Admin', 'Employee'];

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length) {
      setFormData({
        ...formData,
        image: files[0],
        preview: URL.createObjectURL(files[0]),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isEdit = selectedEmployee && selectedEmployee.email === formData.email;

    // Build new list
    const updated = isEdit
      ? employee.map(emp => emp.email === formData.email ? formData : emp)
      : [formData, ...employee];

    dispatch(setEmployee(updated));

    // Salary adjustment
    if (isEdit) {
      const diff = parseFloat(formData.salary) - (selectedEmployee.salary || 0);
      if (diff) dispatch(incrementSalaryCount(diff));
    } else {
      dispatch(incrementSalaryCount(parseFloat(formData.salary)));
    }

    if (!isEdit) {
      formData.post === 'Admin' ? dispatch(incrementAdminCount()) : dispatch(incrementEmployeeCount());
    }

    // Reset
    dispatch(setSelectedEmployee(null));
    setFormData({ name: '', email: '', password: '', salary: '', address: '', category: '', post: '', image: null, preview: null });
    navigate('/');
  };

  return (
    <div className="add-employee-container">
      <div className="back-arrow" onClick={() => { navigate(-1); dispatch(setSelectedEmployee(null)); }}>
        <FiArrowLeft size={24} />
        <span>Back</span>
      </div>
      
      <div className="form-header">
        <h2>{selectedEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
        <p>{selectedEmployee ? 'Update employee details' : 'Fill in the details to add a new employee'}</p>
      </div>

      <form onSubmit={handleSubmit} className="add-employee-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-row">
            <div className="form-group">
              <FiUser className="input-icon" />
              <input name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
              {/* <label>Full Name</label> */}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <FiMail className="input-icon" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} required 
                disabled={!!selectedEmployee} placeholder="Email" />
              {/* <label>Email Address</label> */}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <FiLock className="input-icon" />
              <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Password" />
              {/* <label>Password</label> */}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Employment Details</h3>
          <div className="form-row">
            <div className="form-group">
              {/* <FiDollarSign className="input-icon" /> */}
              <input type="number" name="salary" value={formData.salary} onChange={handleChange} required placeholder="Salary " />
              {/* <label>Salary</label> */}
            </div>
            <div className="form-group">
              <FiBriefcase className="input-icon" />
              <select name="post" value={formData.post} onChange={handleChange} required>
                <option value="" disabled hidden>Select Position</option>
                {postList.map((p,i) => <option key={i} value={p}>{p}</option>)}
              </select>
              {/* <label>Position</label> */}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="" disabled hidden>Select Department</option>
                {categories.map((cat,i) => <option key={i} value={cat}>{cat}</option>)}
              </select>
              {/* <label>Department</label> */}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Information</h3>
          <div className="form-row">
            <div className="form-group">
              <FiMapPin className="input-icon" />
              <input name="address" value={formData.address} onChange={handleChange} required placeholder="Address" />
              {/* <label>Address</label> */}
            </div>
          </div>

          {/* <div className="form-row">
            <div className="file-upload-group">
              <label htmlFor="image-upload" className="file-upload-label">
                {formData.preview ? (
                  <div className="image-preview-wrapper">
                    <img src={formData.preview} alt="preview" className="img-preview" />
                    <span className="change-image-text">Change Image</span>
                  </div>
                ) : (
                  <>
                    <FiUpload className="upload-icon" />
                    <span>Upload Profile Picture</span>
                  </>
                )}
              </label>
              <input 
                id="image-upload" 
                type="file" 
                name="image" 
                accept="image/*" 
                onChange={handleChange} 
                className="file-input" 
              />
            </div>
          </div> */}
        </div>

        <button type="submit" className="submit-btn">
          {selectedEmployee ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;