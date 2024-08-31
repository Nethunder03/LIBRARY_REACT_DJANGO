import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Register.css';

export default function Register() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Ajout pour la confirmation du mot de passe
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSignupClick = () => {
        setIsLogin(false);
    };

    const handleLoginClick = () => {
        setIsLogin(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isLogin && password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas.'); // Alerte si les mots de passe ne sont pas identiques
            return;
        }

        const userData = { email, password };

        if (isLogin) {
            // Requête pour connexion
            axios.post('http://127.0.0.1:8000/api/users/login/', userData)
                .then(response => {
                    const user = response.data;
                    if (user.is_admin) {
                        navigate('/admin');
                    } else {
                        navigate('/client');
                    }
                })
                .catch(error => console.error('Erreur lors de la connexion:', error));
        } else {
            // Requête pour inscription
            const newUser = { first_name: firstName, last_name: lastName, email, password };
            axios.post('http://127.0.0.1:8000/api/users/', newUser)
                .then(response => {
                    navigate('/client'); // Rediriger vers la page client après l'inscription
                })
                .catch(error => console.error('Erreur lors de l\'inscription:', error));
        }
    };

    return (
        <>
            <div className="container">
                <div className={`message ${isLogin ? 'login' : 'signup'}`} 
                    style={{ transform: isLogin ? 'translateX(0)' : 'translateX(100%)' }}>
                    <div className="btn-wrapper">
                        <button className="button" id="login" onClick={handleLoginClick}>
                            Login
                        </button>
                        <button id="signup" className="button" onClick={handleSignupClick}>
                            Signup
                        </button>
                    </div>
                </div>
                <div className="form form--signup">
                    <div className="form--heading"><h1>Bienvenu ! Sign Up</h1></div>
                    <form autoComplete="off" className='field' onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de Passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmer le Mot de Passe"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} // État pour la confirmation du mot de passe
                            required
                        />
                        <input
                            type="submit"
                            name="submit"
                            value="Enregistrement"
                        />
                    </form>
                </div>
                <div className="form form--login">
                    <div className="form--heading"><h1>Bon retour !</h1></div>
                    <form autoComplete="off" className='field' onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de Passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="submit"
                            name="submit"
                            value="Connexion"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}
