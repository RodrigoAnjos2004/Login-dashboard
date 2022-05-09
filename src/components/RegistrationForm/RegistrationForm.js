import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import img1 from "../LoginForm/img1.png"

function RegistrationForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length) {
            props.showError(null);
            const payload={
                "email":state.email,
                "password":state.password,
            }
            axios.post(API_BASE_URL+'register', payload)
                .then(function (response) {
                    if(response.data.code === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registrado com sucesso'
                        }))
                        redirectToHome();
                        props.showError(null)
                    } else{
                        props.showError("error");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            props.showError('Favor entre com dados validos')    
        }
        
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            props.showError('Senhas não iguais');
        }
    }
    return(
        <div className="card col-12 col-lg-10 login-card mt-5 hv-center">
         <img 
         className='cart-image'
         src={img1}
         width='100px'
         />
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email </label>
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="informe seu email" 
                       value={state.email}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">Nunca compartilharemos seu e-mail com mais ninguém.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Senha</label>
                    <i class="fa fa-lock" aria-hidden="true"></i>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="senha"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirmar senha</label>
                    <i class="fa fa-lock" aria-hidden="true"></i>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="senha"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-success"
                    onClick={handleSubmitClick}
                >
                    Registrar
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Já possui conta? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login</span> 
            </div>
            
        </div>
    )
}

export default withRouter(RegistrationForm);