import React from 'react';
import AuthForm from './AuthForm.js';
import { Link } from 'react-router-dom';

function Register({onRegister}) {
    
    function handleSubmit(email, password) {
        onRegister(email, password);
    }

    return(
        <AuthForm 
            onSubmit={handleSubmit}
            name='register'
            title="Регистрация"
            buttonText="Зарегистрироваться">
            <Link className="authform__link" to="/signin">Уже зарегистрированы? Войти</Link>
        </AuthForm>
    )
}

export default Register;