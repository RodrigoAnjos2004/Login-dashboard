import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import img1 from "../LoginForm/img1.png"


function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "email":state.email,
            "password":state.password,
        }
        axios.post(API_BASE_URL+'login', payload)
            .then(function (response) {
                if(response.data.code === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login realizado com sucesso'
                    }))
                    redirectToHome();
                    props.showError(null)
                }
                else if(response.data.code === 204){
                    props.showError("Nome ou senha invalidos");
                }
                else{
                    props.showError("Nome de usuario não existe");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToRegister = () => {
        props.history.push('/register'); 
        props.updateTitle('Cadastro');
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
                <label htmlFor="exampleInputEmail1">Usuario</label>
                <i class="fa fa-user" aria-hidden="true"></i>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="email ou nome " 
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
                       placeholder="Senha"
                       value={state.password}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-success"
                    onClick={handleSubmitClick}
                >Login</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>
                    Não possui conta? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Registrar</span> 
            </div>
        </div>
    )
}

export default withRouter(LoginForm);