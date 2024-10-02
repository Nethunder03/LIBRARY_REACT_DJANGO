// Users.js
import React, { useState, useEffect } from 'react';
import Wrapper from './Wrapper';
import UserForm from './UserForm';
import UserList from './UserList';
import { apiRequest } from '../utils/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiRequest('http://127.0.0.1:8000/users/profiles/');
      setUsers(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || 'Une erreur est survenue');
      } else {
        setError('Erreur réseau');
      }
    }
  };

  const handleUserEdit = (user) => {
    setEditingUser(user);
  };

  const handleUserAddOrUpdate = async (form) => {
    const formData = new FormData();
    formData.append('first_name', form.first_name);
    formData.append('last_name', form.last_name);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('is_admin', form.is_admin);

    try {
      const url = editingUser 
        ? `http://127.0.0.1:8000/users/profiles/${editingUser.id}/` 
        : 'http://127.0.0.1:8000/api/users/create/';
      const method = editingUser ? 'PUT' : 'POST';

      const response = await apiRequest(url, {
        method: method,
        data: formData,
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
      });

      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUserDelete = async (id) => {
    try {
      await apiRequest(`http://127.0.0.1:8000/profiles/users/${id}/`, {
        method: 'DELETE',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
      });

      fetchUsers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  return (
    <Wrapper>
      <div className="container-fluid">
        <div className="row align-items-start">
          <div className="col-4">
            <UserForm editingUser={editingUser} onFormSubmit={handleUserAddOrUpdate} />
          </div>
          <div className="col">
            <UserList users={users} onEdit={handleUserEdit} onDelete={handleUserDelete} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Users;
