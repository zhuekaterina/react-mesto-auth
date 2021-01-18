import React from 'react';

function AuthForm({onSubmit, name, title, buttonText, children}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(evt) {
        evt.preventDefault();
        setEmail(evt.target.value);
    }
    function handlePasswordChange(evt) {
        evt.preventDefault();
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if(!email || !password) {
            return;
        }
        onSubmit(email, password);
    }

    return(
        <form className={`authform authform-${name}`} onSubmit={handleSubmit} noValidate>
                <h3 className="authform__title">{title}</h3>
                <input className="authform__field" placeholder="Email" onChange={handleEmailChange} name="email" id="email" type="text" required/>
                <input className="authform__field" placeholder="Пароль" onChange={handlePasswordChange} name="password" id="password" type="text" required/>
                <button className="authform__button" type="submit" name="button" >{buttonText}</button>
                {children}
        </form>
    );
}

export default AuthForm;