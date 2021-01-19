import React from 'react';
import AuthForm from './AuthForm.js';

function Login({onLogin}) {

    function handleSubmit(email, password) {
        onLogin(email, password);
    }

    return(
        <AuthForm 
            onSubmit={handleSubmit}
            name='login'
            title="Вход"
            buttonText="Войти"/>
    )
}

export default Login;