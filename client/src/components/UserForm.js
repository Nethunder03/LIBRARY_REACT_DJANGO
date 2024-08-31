import React, { useState, useEffect } from 'react';

const UserForm = ({ editingUser, onFormSubmit }) => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        is_admin: false,
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (editingUser) {
            setForm(editingUser);
            setIsEditing(true);
        } else {
            setForm({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                is_admin: false,
            });
            setIsEditing(false);
        }
    }, [editingUser]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>{isEditing ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}</h1>
            <div className="form-group">
                <label>Prénom</label>
                <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Nom</label>
                <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                />
            </div>
            {!isEditing && (
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={form.password}
                        onChange={handleInputChange}
                    />
                </div>
            )}
            <div className="form-group">
                <label>Admin</label>
                <input
                    type="checkbox"
                    name="is_admin"
                    checked={form.is_admin}
                    onChange={handleInputChange}
                />
            </div>
            <button className="btn btn-primary" type="submit">
                {isEditing ? 'Modifier' : 'Ajouter'}
            </button>
        </form>
    );
};

export default UserForm;
