// src/components/Logout.js

import React from 'react';
import { logout } from '../auth';

function Logout() {
    const handleLogout = () => {
        logout();
        window.location.href = '/login'; // Redirige vers la page de connexion après déconnexion
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
