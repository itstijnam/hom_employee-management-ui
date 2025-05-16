import React, { useState } from 'react';
import './Login.scss';
import LOGO from '/House-of-marketing-Logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../redux/authSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ admin_id: 'example_1234', password: 'example' });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [forgotToggle, setForgotToggle] = useState(false);

    const fakeAuthData = {
        adminId: 'example_1234',
        password: 'example'
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear errors when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        setApiError('');
    };

    const loginHandler = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setApiError('');

        // Simple validation
        const newErrors = {};
        if (!formData.admin_id.trim()) {
            newErrors.admin_id = 'Admin ID is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        // Simulate API call with timeout
        setTimeout(() => {
            if (formData.admin_id === fakeAuthData.adminId && formData.password === fakeAuthData.password) {
                // Successful login
                dispatch(setCurrentUser({
                    name: 'Example',
                    post: 'admin',
                    email: 'example@gmail.com',
                    employee_id: 'emp_123123879',
                    mobile: '7894654XXXX',
                    supervisor: 'John Doe',
                    join_date: '12 Feb, 20XX'
                }));
                navigate('/');
            } else {
                // Failed login
                setApiError('Invalid credentials. Please try again.');
            }
            setIsSubmitting(false);
        }, 1000); // Simulate network delay
    };

    return (
        <div className='login-container'>
            <div className="card">
                <div className="company-info">
                    <img src={LOGO} alt="Company Logo" />
                </div>
                <div className="cardform">
                    <h2 className="form-title">Welcome</h2>

                    {apiError && <div className="api-error">{apiError}</div>}

                    <form onSubmit={loginHandler}>
                        <div className="login-input">
                            <p>Admin Id</p>
                            <input
                                type="text"
                                name='admin_id'
                                placeholder='Enter your id'
                                value={formData.admin_id}
                                onChange={handleChange}
                                className={errors.admin_id ? 'input-error' : ''}
                                required
                            />
                            {errors.admin_id && <span className="error-message">{errors.admin_id}</span>}
                        </div>

                        <div className="login-input">
                            <p>Password</p>
                            <input
                                type="password"
                                name='password'
                                placeholder='Password'
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? 'input-error' : ''}
                                required
                            />
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        <div className="form-options" onClick={()=>setForgotToggle(!forgotToggle)} >
                            <a className="forgot-password">Forgot Password?
                                {forgotToggle &&

                                    <span>Please contact Supervisor</span>
                                }

                            </a>
                        </div>

                        <button
                            type="submit"
                            className='login-button'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Logging in...' : 'Enter'}
                        </button>

                        <div className="signup-link">
                            House of MarkTech
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;