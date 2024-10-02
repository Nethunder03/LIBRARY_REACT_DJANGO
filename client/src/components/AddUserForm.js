// src/components/AddUserForm.js

import React, { useState } from 'react';
import { addUser } from '../services/authService';

const AddUserForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        date_joined: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();
        for (const key in formData) {
            formDataObj.append(key, formData[key]);
        }

        try {
            await addUser(formDataObj);
            setSuccessMessage('User added successfully!');
            setFormData({
                email: '',
                password: '',
                first_name: '',
                last_name: '',
                date_joined: '',
            });
            setErrors({});
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="date_joined"
                        value={formData.date_joined}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Add User</button>
            </form>
            {successMessage && <p className="success">{successMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            {errors.non_field_errors && <p className="error">{errors.non_field_errors.join(', ')}</p>}
        </div>
    );
};

export default AddUserForm;
