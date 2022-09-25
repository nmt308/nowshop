import './Form.scss';
import Button from '../Button';
import HandleSignUp from './handleSignUp';
import HandleSignIn from './handleSignIn';
/*Toastify*/
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/*MDB*/
import { MDBValidationItem, MDBInput } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ type }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    return (
        <div className="container-fluid">
            <div className="container">
                <section className="vh-100">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                    <Button className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-facebook-f"></i>
                                    </Button>
                                    <Button className="btn btn-primary btn-floating mx-1">
                                        <i className="fa-solid fa-envelope"></i>
                                    </Button>
                                    <Button className="btn btn-primary btn-floating mx-1">
                                        <i className="fa-brands fa-twitter"></i>
                                    </Button>
                                </div>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                </div>
                                <MDBValidationItem className="col-md-12 mb-4">
                                    <MDBInput
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        placeholder="Ex: abc@gmail.com"
                                        label="Email"
                                        className="form-control-lg"
                                    />
                                </MDBValidationItem>

                                <MDBValidationItem className="col-md-12 mb-4">
                                    <MDBInput
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        placeholder="Type your password"
                                        label="Password"
                                        className="form-control-lg"
                                    />
                                </MDBValidationItem>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            id="form2Example3"
                                        />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    {type === 'login' && (
                                        <Button href="#!" className="text-body">
                                            Forgot password?
                                        </Button>
                                    )}
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    {type === 'register' ? (
                                        <>
                                            <Button
                                                className="btn btn-primary btn-lg"
                                                onClick={() => {
                                                    HandleSignUp(email, password, navigate);
                                                }}
                                            >
                                                Register
                                            </Button>
                                            <div className="small fw-bold mt-2 pt-1 mb-0">
                                                Already have an account ?{' '}
                                                <Button to="/login" className="link-danger">
                                                    Login
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                className="btn btn-primary btn-lg"
                                                onClick={() => {
                                                    HandleSignIn(email, password, navigate);
                                                }}
                                            >
                                                Login
                                            </Button>
                                            <div className="small fw-bold mt-2 pt-1 mb-0">
                                                Don't have an account ?{' '}
                                                <Button to="/register" className="link-danger">
                                                    Register
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Form;
