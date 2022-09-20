import './Login.scss';
import { MDBValidationItem, MDBInput } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
function Login() {
    return (
        <div className="container">
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="k"
                            ></img>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-facebook-f"></i>
                                    </button>

                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-twitter"></i>
                                    </button>

                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-linkedin-in"></i>
                                    </button>
                                </div>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                </div>
                                <MDBValidationItem className="col-md-12 mb-4">
                                    <MDBInput
                                        placeholder="Ex: abc@gmail.com"
                                        name="city"
                                        id="validationCustom03"
                                        required
                                        label="Email"
                                        className="form-control-lg"
                                    />
                                </MDBValidationItem>
                                <MDBValidationItem className="col-md-12 mb-4">
                                    <MDBInput
                                        placeholder="Type your password"
                                        name="password"
                                        id="validationCustom03"
                                        required
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
                                    <a href="#!" className="text-body">
                                        Forgot password?
                                    </a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" className="btn btn-primary btn-lg">
                                        Login
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Don't have an account?{' '}
                                        <Link to="/register" className="link-danger">
                                            Register
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
