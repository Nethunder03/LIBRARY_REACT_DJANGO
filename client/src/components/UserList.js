import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
    return (
        <div>
            <div className="row">
                <h2>Liste des Clients</h2>
                <table>
                    <thead>
                        <tr className="table100-head">
                            <th className="column1">Prénoms</th>
                            <th className="column2">Nom(s)</th>
                            <th className="column3">Email</th>
                            <th className="column5">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter(user => !user.is_admin)
                            .map(user => (
                                <tr key={user.id}>
                                    <td className="column1">{user.first_name}</td>
                                    <td className="column2">{user.last_name}</td>
                                    <td className="column3">{user.email}</td>
                                    <td className="column5">
                                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                                            <button type="button" className="btn btn-warning" onClick={() => onEdit(user)}>
                                                <i className="fa-regular fa-pen-to-square"></i> Modifier
                                            </button>
                                            <button type="button" className="btn btn-danger" onClick={() => onDelete(user.id)}>
                                                <i className="fa-solid fa-trash"></i> Suppr
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className="row" style={{ marginTop: "2rem" }}>
                <h2>Liste des Admins</h2>
                <table>
                    <thead>
                        <tr className="table100-head">
                            <th className="column1">Prénoms</th>
                            <th className="column2">Nom(s)</th>
                            <th className="column3">Email</th>
                            <th className="column5">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter(user => user.is_admin)
                            .map(user => (
                                <tr key={user.id}>
                                    <td className="column1">{user.first_name}</td>
                                    <td className="column2">{user.last_name}</td>
                                    <td className="column3">{user.email}</td>
                                    <td className="column5">
                                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                                            <button type="button" className="btn btn-warning" onClick={() => onEdit(user)}>
                                                <i className="fa-regular fa-pen-to-square"></i> Modifier
                                            </button>
                                            <button type="button" className="btn btn-danger" onClick={() => onDelete(user.id)}>
                                                <i className="fa-solid fa-trash"></i> Suppr
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
